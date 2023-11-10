FROM python:3.9

WORKDIR /app 

EXPOSE 8080

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

COPY . ./

CMD ["python", "app.py"]