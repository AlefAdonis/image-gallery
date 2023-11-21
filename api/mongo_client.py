import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Loading the .env.local token to the enviroment
load_dotenv(dotenv_path="./.env.local")

mongo_client = MongoClient(
    host=os.environ.get("MONGO_URL ", "mongo"),
    username=os.environ.get("MONGO_USER", "root"),
    password=os.environ.get("MONGO_PASSWORD", ""),
    port=os.environ.get("MONGO_PORT", 27017),
)


def insert_test_document():
    '''Insert sample document to mongo database'''
    db = mongo_client.test
    test_colection = db.test_colection
    res = test_colection.insert_one({"name": "alef", "isCute": True})

    print(res)
