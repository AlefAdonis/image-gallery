import os
import json
from dotenv import load_dotenv
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from mongo_client import mongo_client
from bson import json_util

# Creating Variables that will create the database
gallery = mongo_client.gallery
images_collection = gallery.images

# Loading the .env.local token to the enviroment
load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError("The token to Unslash API is missing!")

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


def parse_json(data):
    return json.loads(json_util.dumps(data))


@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    headers = {"Authorization": f"Client-ID {UNSPLASH_KEY}", "Accept-Version": "v1"}

    payload = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=payload)

    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        # read image from database
        images_result = list(images_collection.find({}))
        return parse_json(images_result)

    if request.method == "POST":
        # save image on the database
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def delete_images(image_id):
    if request.method == "DELETE":
        result = images_collection.delete_one({"_id": image_id})

        if not result:
            return {"error": "Image was not deleted. Try Again!"}, 500

        if result and not result.deleted_count:
            return {"error": "Image not Found"}, 404

        else :
            return {"delete_id": image_id}

    return jsonify(message="Method Not Allowed"), 405


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
