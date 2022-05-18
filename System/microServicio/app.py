from re import X
from flask import Flask, render_template, make_response, jsonify, request
from flask_cors import CORS
from kmeans import modelos

app = Flask(__name__)
PORT = 80
HOST= '0.0.0.0'
CORS(app)

# Post method
@app.route("/evaluate", methods=["POST"])
def evalute():
    
    req = request.get_json()
    calculador = modelos()
    
    ''' Creando respuesta '''
    res = {}
    x,y = calculador.kmeans(req['CLIENTNUM'])
    res["KmeasCluster"] = x
    
    y1 = (int) (y[0])
    y2 = (int) (y[1])
    res["AttritedCustomer"] = y1
    res["ExistingCustomer"] = y2
    
    res = make_response(jsonify(res),200)
    
    return res


if __name__=="__main__":
    print("server running")
    app.run(host=HOST, port=PORT)