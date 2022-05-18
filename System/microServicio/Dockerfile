FROM python:3

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN pip install Flask
RUN pip install numpy
RUN pip install pandas
RUN pip install -U scikit-learn
RUN pip install matplotlib
RUN pip install -U flask-cors
RUN pip install pymongo

COPY . .
CMD ["python", "app.py"]