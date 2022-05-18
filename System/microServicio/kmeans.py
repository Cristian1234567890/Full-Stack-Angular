# importaciones de herramientas
import numpy as np
from pandas import DataFrame
import matplotlib.pyplot as plt
import pandas as pd

# importaciones de modelos

from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split

# importar librerias para mongo

from pymongo import MongoClient

''' MONGO_URI = "mongodb://localhost" '''

MONGO_URI = "mongodb://mongodb"

client = MongoClient(MONGO_URI)
db = client['informacion']
collection = db['clients']

class modelos:

    def obtenerData(self, objetivo):
        
        
        df =  pd.DataFrame(list(collection.find()))
        df =  df.iloc[: , 1:]
        df =  df.drop('Marital_Status', 1)
        
        ''' df = pd.read_csv("limpia.csv") '''

        # tranformacion de data
        
        earning_map = {'$60K - $80K':2, 'Less than $40K':0, '$80K - $120K':3, '$40K - $60K':1,'$120K +':4, 'Unknown':-999}
        df["Income_Category"] = df["Income_Category"].map(earning_map)

        
        df["Attrition_Flag"] = df["Attrition_Flag"].map({'Existing Customer':0, 'Attrited Customer':1})
        
        
        df["Gender"] = df.Gender.map({'M':0, 'F':1})

        
        df["Card_Category"] = df["Card_Category"].map({'Blue':0, 'Gold':2, 'Silver':1, 'Platinum':3})
        
    
        education_mappping = {
        "Uneducated":0,
        "High School":1,
        "Graduate": 2,
        "College": 3,
        "Post-Graduate":4,
        "Doctorate":5,
        "Unknown": -9}
        
        df["Education_Level"] = df["Education_Level"].map(education_mappping)
        
        # obtener objetivos
        
        datos = df
        
        ''' Eliminar objetivos e id '''
        
        datos.drop(["Attrition_Flag"], inplace=True, axis=1)
        
        ''' df.drop(["CLIENTNUM"], inplace=True, axis=1) '''
    
        
        return datos, df
        
        
    
    def kmeans(self,a):
        
        modelo, df = self.obtenerData(a)
        
        clustering = KMeans(n_clusters = 2, max_iter = 600) #creacion de modelo
        clustering.fit(modelo)
        
        modelo['kmeans_clusters'] = clustering.labels_  #Guardar resultados.
        
        result = modelo.query(f"CLIENTNUM == {a}")
        result = modelo.iat[0,9]
        
        count=pd.value_counts(modelo['kmeans_clusters']).tolist()
        
        return int(result), count
    


