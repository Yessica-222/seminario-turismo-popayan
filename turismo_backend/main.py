from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from waitress import serve

from Controladores.ControladorTurista import ControladorTurista
from Controladores.ControladorRecorrido import ControladorRecorrido
from Controladores.ControladorEvento import ControladorEvento
from Controladores.ControladorExperienciaTuristica import ControladorExperienciaTuristica

# Crea una instancia de la aplicación Flask con el nombre del módulo actual (__name__).
app = Flask(__name__)
# Crea una instancia de la clase CORS y la asocia con la aplicación Flask para manejar CORS.
cors = CORS(app)

# Crea instancias de controladores para diferentes partes de la aplicación (Recorrido, Turista, ExperienciaTuristica, Evento).
miControladorRecorrido = ControladorRecorrido()
miControladorTurista = ControladorTurista()
miControladorExperienciaTuristica = ControladorExperienciaTuristica()
miControladorEvento = ControladorEvento()

#########################Servicios Eventos###################################
# Define una ruta en la aplicación Flask para manejar solicitudes GET en la ruta "/eventos".
@app.route("/eventos", methods=['GET'])
def getEvento():
    # Llama al método "index" del controlador de eventos para obtener datos.
    json = miControladorEvento.index()
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes GET en la ruta "/eventos/<string:id>".
@app.route("/eventos/<string:id>", methods=['GET'])
def getEventos(id):
    # Llama al método "show" del controlador de eventos con el ID proporcionado como parámetro.
    json = miControladorEvento.show(id)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes POST en la ruta "/eventos".
@app.route("/eventos", methods=['POST'])
def crearEvento():
    # Obtiene los datos del cuerpo de la solicitud POST en formato JSON.
    data = request.get_json()
    # Llama al método "create" del controlador de eventos con los datos obtenidos.
    json = miControladorEvento.create(data)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes PUT en la ruta "/eventos/<string:id>".
@app.route("/eventos/<string:id>", methods=['PUT'])
def modificarEvento(id):
    # Obtiene los datos del cuerpo de la solicitud PUT en formato JSON.
    data = request.get_json()
    # Llama al método "update" del controlador de eventos con el ID y los datos obtenidos.
    json = miControladorEvento.update(id, data)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes DELETE en la ruta "/eventos/<string:id>".
@app.route("/eventos/<string:id>", methods=['DELETE'])
def eliminarEvento(id):
    # Llama al método "delete" del controlador de eventos con el ID proporcionado.
    json = miControladorEvento.delete(id)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

#########################Servicios Turistas###################################
# Define una ruta en la aplicación Flask para manejar solicitudes GET en la ruta "/turistas".
@app.route("/turistas", methods=['GET'])
def getTuristas():
    # Llama al método "index" del controlador de turistas para obtener datos.
    json = miControladorTurista.index()
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes GET en la ruta "/turistas/<string:id>".
@app.route("/turistas/<string:id>", methods=['GET'])
def getTurista(id):
    # Llama al método "show" del controlador de turistas con el ID proporcionado como parámetro.
    json = miControladorTurista.show(id)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes POST en la ruta "/turistas".
@app.route("/turistas", methods=['POST'])
def crearTurista():
    # Obtiene los datos del cuerpo de la solicitud POST en formato JSON.
    data = request.get_json()
    # Llama al método "create" del controlador de turistas con los datos obtenidos.
    json = miControladorTurista.create(data)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes PUT en la ruta "/turistas/<string:id>".
@app.route("/turistas/<string:id>", methods=['PUT'])
def modificarTurista(id):
    # Obtiene los datos del cuerpo de la solicitud PUT en formato JSON.
    data = request.get_json()
    # Llama al método "update" del controlador de turistas con el ID y los datos obtenidos.
    json = miControladorTurista.update(id, data)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes DELETE en la ruta "/turistas/<string:id>".
@app.route("/turistas/<string:id>", methods=['DELETE'])
def eliminarTurista(id):
    # Llama al método "delete" del controlador de turistas con el ID proporcionado.
    json = miControladorTurista.delete(id)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes PUT en la ruta "/turistas/<string:id>/eventos/<string:id_evento>".
@app.route("/turistas/<string:id>/eventos/<string:id_evento>", methods=['PUT'])
def asignarEvento(id, id_evento):
    # Llama al método "asignarEvento" del controlador de turistas con los IDs proporcionados.
    json = miControladorTurista.asignarEvento(id, id_evento)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

#########################Servicios ExperienciaTurista###################################
# Define una ruta en la aplicación Flask para manejar solicitudes GET en la ruta "/experienciaTuristas".
@app.route("/experienciaTuristas", methods=['GET'])
def getExperienciaTuristas():
    # Llama al método "index" del controlador de experiencias turísticas para obtener datos.
    json = miControladorExperienciaTuristica.index()
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes GET en la ruta "/experienciaTuristas/<string:id>".
@app.route("/experienciaTuristas/<string:id>", methods=['GET'])
def getExperienciaTurista(id):
    # Llama al método "show" del controlador de experiencias turísticas con el ID proporcionado como parámetro.
    json = miControladorExperienciaTuristica.show(id)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes POST en la ruta "/experienciaTuristas/turistas/<string:id_turista>/recorridos/<string:id_recorrido>".
@app.route("/experienciaTuristas/turistas/<string:id_turista>/recorridos/<string:id_recorrido>", methods=['POST'])
def crearExperienciaTurista(id_turista, id_recorrido):
    # Obtiene los datos del cuerpo de la solicitud POST en formato JSON.
    data = request.get_json()
    # Llama al método "create" del controlador de experiencias turísticas con los datos y los IDs proporcionados.
    json = miControladorExperienciaTuristica.create(data, id_turista, id_recorrido)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes PUT
@app.route("/experienciaTuristas/<string:id>/turistas/<string:id_turista>/recorridos/<string:id_recorrido>", methods=['PUT'])
def modificarExperienciaTurista(id, id_turista, id_recorrido):
    # Obtiene los datos del cuerpo de la solicitud PUT en formato JSON.
    data = request.get_json()
    # Llama al método "update" del controlador de experiencias turísticas con el ID, los datos y los IDs proporcionados.
    json = miControladorExperienciaTuristica.update(id, data, id_turista, id_recorrido)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes DELETE
@app.route("/experienciaTuristas/<string:id>", methods=['DELETE'])
def eliminarExperienciaTurista(id):
    # Llama al método "delete" del controlador de experiencias turísticas con el ID proporcionado.
    json = miControladorExperienciaTuristica.delete(id)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

#########################Servicios Recorridos###################################
# Define una ruta en la aplicación Flask para manejar solicitudes GET
@app.route("/recorridos", methods=['GET'])
def getRecorridos():
    # Llama al método "index" del controlador de recorridos para obtener datos.
    json = miControladorRecorrido.index()
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes GET
@app.route("/recorridos/<string:id>", methods=['GET'])
def getRecorrido(id):
    # Llama al método "show" del controlador de recorridos con el ID proporcionado como parámetro.
    json = miControladorRecorrido.show(id)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes POST
@app.route("/recorridos", methods=['POST'])
def crearRecorrido():
    # Obtiene los datos del cuerpo de la solicitud POST en formato JSON.
    data = request.get_json()
    # Llama al método "create" del controlador de recorridos con los datos obtenidos.
    json = miControladorRecorrido.create(data)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes PUT
@app.route("/recorridos/<string:id>", methods=['PUT'])
def modificarRecorrido(id):
    # Obtiene los datos del cuerpo de la solicitud PUT en formato JSON.
    data = request.get_json()
    # Llama al método "update" del controlador de recorridos con el ID y los datos obtenidos.
    json = miControladorRecorrido.update(id, data)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)

# Define una ruta en la aplicación Flask para manejar solicitudes DELETE
@app.route("/recorridos/<string:id>", methods=['DELETE'])
def eliminarRecorrido(id):
    # Llama al método "delete" del controlador de recorridos con el ID proporcionado.
    json = miControladorRecorrido.delete(id)
    # Convierte los datos obtenidos a formato JSON y los devuelve como respuesta.
    return jsonify(json)


"--------------------------------------------------------------"


# Servicio que el servidor ofrecerá, y este consiste en retornar un JSON el cual
# tiene un mensaje que dice que el servidor está corriendo.
@app.route("/", methods=['GET'])
def test():
    json = {}
    json["message"] = "Server running ..."
    return jsonify(json)


# Método leer el archivo de configuración del proyecto,
# retornará un diccionario el cual posee la información dentro del
# JSON y se podrá acceder a los atributos necesarios.
def loadFileConfig():
    with open('config.json') as f:
        data = json.load(f)
    return data


if __name__ == '__main__':
    dataConfig = loadFileConfig()  # Se asigna lo que retorna el metodo a la variable dataConfig
    print("Server running : " + "http://" + dataConfig["url-backend-tourism"] + ":" + str(dataConfig["port"]))

    # Se crea la instancia del servidor con la url del backend y puerto especificado
    # en el archivo de configuración.
    serve(app, host=dataConfig["url-backend-tourism"], port=dataConfig["port"])



