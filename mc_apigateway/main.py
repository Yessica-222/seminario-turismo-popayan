from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from waitress import serve
import datetime
import requests
import re
# Importaciones relacionadas con la autenticación JWT
from flask_jwt_extended import create_access_token, verify_jwt_in_request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

# Crear una instancia de la aplicación Flask
app = Flask(__name__)
# Habilitar CORS para permitir solicitudes desde cualquier origen
cors = CORS(app)

# Configuración del secreto para JWT
app.config["JWT_SECRET_KEY"] = "super-secret" # Cambiar por el que sea conveniente
jwt = JWTManager(app)

@app.route("/login", methods=["POST"])
def create_token():
    # Obtener los datos JSON de la solicitud POST
    data = request.get_json()
    # Configurar encabezados para la solicitud al backend de seguridad
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL para la validación de usuarios en el backend de seguridad
    url=dataConfig["url-backend-security"]+'/usuarios/validar'
    # Construir la URL para la validación de usuarios en el backend de seguridad
    response = requests.post(url, json=data, headers=headers)
    # Verificar si la solicitud al backend de seguridad fue exitosa
    if response.status_code == 200:
        # Obtener los datos del usuario validado
        user = response.json()
        # Configurar la expiración del token a 24 horas
        expires = datetime.timedelta(seconds=60 * 60*24)
        # Crear un token de acceso utilizando el módulo Flask JWT Extended
        access_token = create_access_token(identity=user, expires_delta=expires)
        # Devolver el token de acceso y el ID del usuario como respuesta exitosa
        return jsonify({"token": access_token, "user_id": user["_id"]})
    else:
        # Devolver un mensaje de error si la validación falla
        return jsonify({"msg": "Bad username or password"}), 401

# Funcion que se ejecutará siempre de primero antes de que la consulta llegue a la ruta solicitada
@app.before_request
def before_request_callback():
    # Obtener el endpoint limpio (sin parámetros de ruta) de la solicitud
    endPoint = limpiarURL(request.path)
    # Rutas excluidas que no requieren verificación de token JWT
    excludedRoutes = ["/login"]
    # Verificar si la ruta actual está en las rutas excluidas
    if excludedRoutes.__contains__(request.path):
        pass
    elif verify_jwt_in_request():
        # Si el token JWT está presente en la solicitud, obtener la identidad del usuario
        usuario = get_jwt_identity()
        # Verificar si el usuario tiene un rol definido y si tiene permisos para la ruta y método solicitados
        if usuario["rol"] is not None:
            tienePersmiso = validarPermiso(endPoint, request.method, usuario["rol"]["_id"])
            # Devolver un mensaje de error y un código de estado 401 si no tiene permisos
            if not tienePersmiso:
                return jsonify({"message": "Permission denied"}), 401
        else:
            # Devolver un mensaje de error y un código de estado 401 si no tiene un rol definido
            return jsonify({"message": "Permission denied"}), 401

def limpiarURL(url):
    # Dividir la URL en partes usando el carácter "/"
    partes = url.split("/")
    # Iterar sobre las partes y reemplazar cualquier parte que contenga un dígito con el carácter "?"
    for laParte in partes:
        if re.search('\\d', laParte):
            url = url.replace(laParte, "?")
    # Devolver la URL modificada
    return url

def validarPermiso(endPoint, metodo, idRol):
    # Construir la URL para validar permisos basándose en el ID del rol
    url = dataConfig["url-backend-security"] + "/permisos-roles/validar-permiso/rol/" + str(idRol)
    # Inicializar la variable que indica si tiene permiso como False
    tienePermiso = False
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir el cuerpo de la solicitud con la URL y el método
    body = {
        "url": endPoint,
        "metodo": metodo
    }
    # Realizar una solicitud GET para validar los permisos
    response = requests.get(url, json=body, headers=headers)
    # Intentar analizar la respuesta JSON
    try:
        data = response.json()
        # Si la respuesta contiene un "_id", se considera que tiene permiso
        if ("_id" in data):
            tienePermiso = True
    except:
        # Manejar cualquier excepción que pueda ocurrir durante el análisis JSON
        pass
    # Devolver el resultado que indica si tiene permiso
    return tienePermiso

############################redireccionamiento Turista########################################
# Definir una ruta para obtener la lista de turistas
@app.route("/turistas", methods=['GET'])
def getTuristas():
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo
    url = dataConfig["url-backend-tourism"] + '/turistas'
    # Realizar una solicitud GET al backend de turismo
    response = requests.get(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para crear un nuevo turista
@app.route("/turistas", methods=['POST'])
def crearTurista():
    # Obtener los datos JSON del cuerpo de la solicitud
    data = request.get_json()
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para crear un turista
    url = dataConfig["url-backend-tourism"] + '/turistas'
    # Realizar una solicitud POST al backend de turismo con los datos JSON
    response = requests.post(url, headers=headers, json=data)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para obtener información de un turista por ID
@app.route("/turistas/<string:id>", methods=['GET'])
def getTurista(id):
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para obtener información del turista por ID
    url = dataConfig["url-backend-tourism"] + '/turistas/' + id
    # Realizar una solicitud GET al backend de turismo
    response = requests.get(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para modificar la información de un turista por ID
@app.route("/turistas/<string:id>", methods=['PUT'])
def modificarTurista(id):
    # Obtener los datos JSON de la solicitud
    data = request.get_json()
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para modificar la información del turista por ID
    url = dataConfig["url-backend-tourism"] + '/turistas/' + id
    # Realizar una solicitud PUT al backend de turismo con los datos JSON proporcionados
    response = requests.put(url, headers=headers, json=data)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para eliminar la información de un turista por ID
@app.route("/turistas/<string:id>", methods=['DELETE'])
def eliminarTurista(id):
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para eliminar al turista por ID
    url = dataConfig["url-backend-tourism"] + '/turistas/' + id
    # Realizar una solicitud DELETE al backend de turismo
    response = requests.delete(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

############################redireccionamiento ExperienciaTurista########################################
# Definir una ruta para obtener la información de todas las experiencias de turistas
@app.route("/experienciaTuristas", methods=['GET'])
def getExperienciaTuristas():
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para obtener todas las experiencias de turistas
    url = dataConfig["url-backend-tourism"] + '/experienciaTuristas'
    # Realizar una solicitud GET al backend de turismo
    response = requests.get(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

########
# Definir una ruta para crear una nueva experiencia de turista
@app.route("/experienciaTuristas/turistas/<string:id_turista>/recorridos/<string:id_recorrido>", methods=['POST'])
def crearExperienciaTurista(id_turista, id_recorrido):
    # Obtener los datos JSON de la solicitud del cliente
    data = request.get_json()
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para crear una nueva experiencia de turista
    url = dataConfig["url-backend-tourism"] + '/experienciaTuristas/turistas/' + id_turista+'/recorridos/' + id_recorrido
    #/experienciaTurista/turista/<string:id_turista>/recorrido/<string:id_recorrido>
    # Realizar una solicitud POST al backend de turismo con los datos JSON
    response = requests.post(url, headers=headers, json=data)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)
########

# Definir una ruta para obtener información de una experiencia de turista específica por ID
@app.route("/experienciaTuristas/<string:id>", methods=['GET'])
def getExperienciaTurista(id):
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para obtener la experiencia de turista por ID
    url = dataConfig["url-backend-tourism"] + '/experienciaTuristas/' + id
    # Realizar una solicitud GET al backend de turismo
    response = requests.get(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

########
# Definir una ruta para modificar la información de una experiencia de turista específica por ID
@app.route("/experienciaTuristas/<string:id>/turistas/<string:id_turista>/recorridos/<string:id_recorrido>", methods=['PUT'])
def modificarExperienciaTurista(id, id_turista, id_recorrido):
    # Obtener los datos JSON de la solicitud del cliente
    data = request.get_json()
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para modificar la experiencia de turista por ID
    url = dataConfig["url-backend-tourism"] + '/experienciaTuristas/' + id + '/turistas/' + id_turista + '/recorridos/' + id_recorrido
    # Realizar una solicitud PUT al backend de turismo con los datos modificados
    response = requests.put(url, headers=headers, json=data)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)
########

# Definir una ruta para eliminar la información de una experiencia de turista por ID
@app.route("/experienciaTuristas/<string:id>", methods=['DELETE'])
def eliminarExperienciaTurista(id):
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para eliminar la experiencia de turista por ID
    url = dataConfig["url-backend-tourism"] + '/experienciaTuristas/' + id
    # Realizar una solicitud DELETE al backend de turismo para eliminar la experiencia de turista
    response = requests.delete(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

############################redireccionamiento Evento########################################
# Definir una ruta para obtener la información de todos los eventos
@app.route("/eventos", methods=['GET'])
def getEvento():
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para obtener la información de todos los eventos
    url = dataConfig["url-backend-tourism"] + '/eventos'
    # Realizar una solicitud GET al backend de turismo para obtener la información de todos los eventos
    response = requests.get(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para crear un nuevo evento
@app.route("/eventos", methods=['POST'])
def crearEvento():
    # Obtener los datos JSON de la solicitud POST
    data = request.get_json()
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para crear un nuevo evento
    url = dataConfig["url-backend-tourism"] + '/eventos'
    # Realizar una solicitud POST al backend de turismo para crear un nuevo evento
    response = requests.post(url, headers=headers, json=data)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para obtener la información de un evento específico
@app.route("/eventos/<string:id>", methods=['GET'])
def getEventos(id):
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para obtener la información del evento específico
    url = dataConfig["url-backend-tourism"] + '/eventos/' + id
    # Realizar una solicitud GET al backend de turismo para obtener la información del evento
    response = requests.get(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para modificar la información de un evento específico
@app.route("/eventos/<string:id>", methods=['PUT'])
def modificarEvento(id):
    # Obtener los datos JSON de la solicitud
    data = request.get_json()
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para modificar la información del evento específico
    url = dataConfig["url-backend-tourism"] + '/eventos/' + id
    # Realizar una solicitud PUT al backend de turismo para modificar la información del evento
    response = requests.put(url, headers=headers, json=data)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para eliminar un evento específico
@app.route("/eventos/<string:id>", methods=['DELETE'])
def eliminarEvento(id):
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para eliminar el evento específico
    url = dataConfig["url-backend-tourism"] + '/eventos/' + id
    # Realizar una solicitud DELETE al backend de turismo para eliminar el evento
    response = requests.delete(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

############################redireccionamiento Recorrido########################################
# Definir una ruta para obtener la lista de recorridos
@app.route("/recorridos", methods=['GET'])
def getRecorridos():
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para obtener la lista de recorridos
    url = dataConfig["url-backend-tourism"] + '/recorridos'
    # Realizar una solicitud GET al backend de turismo para obtener la lista de recorridos
    response = requests.get(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para crear un nuevo recorrido
@app.route("/recorridos", methods=['POST'])
def crearRecorrido():
    # Obtener los datos JSON del cuerpo de la solicitud
    data = request.get_json()
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para crear un nuevo recorrido
    url = dataConfig["url-backend-tourism"] + '/recorridos'
    # Realizar una solicitud POST al backend de turismo para crear un nuevo recorrido
    response = requests.post(url, headers=headers, json=data)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para obtener detalles de un recorrido por ID
@app.route("/recorridos/<string:id>", methods=['GET'])
def getRecorrido(id):
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para obtener detalles de un recorrido por ID
    url = dataConfig["url-backend-tourism"] + '/recorridos/' + id
    # Realizar una solicitud GET al backend de turismo para obtener detalles del recorrido
    response = requests.get(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para modificar los detalles de un recorrido por ID
@app.route("/recorridos/<string:id>", methods=['PUT'])
def modificarRecorrido(id):
    # Obtener los datos JSON de la solicitud
    data = request.get_json()
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para modificar los detalles de un recorrido por ID
    url = dataConfig["url-backend-tourism"] + '/recorridos/' + id
    # Realizar una solicitud PUT al backend de turismo para modificar los detalles del recorrido
    response = requests.put(url, headers=headers, json=data)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para eliminar un recorrido por ID
@app.route("/recorridos/<string:id>", methods=['DELETE'])
def eliminarRecorrido(id):
    # Configurar las cabeceras para la solicitud HTTP
    headers = {"Content-Type": "application/json; charset=utf-8"}
    # Construir la URL del backend de turismo para eliminar un recorrido por ID
    url = dataConfig["url-backend-tourism"] + '/recorridos/' + id
    # Realizar una solicitud DELETE al backend de turismo para eliminar el recorrido
    response = requests.delete(url, headers=headers)
    # Analizar la respuesta JSON del backend
    json = response.json()
    # Devolver la respuesta JSON al cliente
    return jsonify(json)

# Definir una ruta para la raíz de la aplicación
@app.route("/", methods=['GET'])
def test():
    # Crear un diccionario JSON
    json = {}
    # Agregar un mensaje al diccionario JSON
    json["message"] = "Server running..."
    # Devolver el diccionario JSON como una respuesta JSON al cliente
    return jsonify(json)

# Función para cargar la configuración desde un archivo JSON
def loadFileConfig():
    # Abrir el archivo 'config.json' en modo lectura
    with open('config.json') as f:
        # Cargar los datos JSON desde el archivo
        data = json.load(f)
    # Devolver los datos cargados desde el archivo
    return data

# Verificar si el script está siendo ejecutado directamente
if __name__ == '__main__':
    # Cargar la configuración desde el archivo 'config.json'
    dataConfig = loadFileConfig()
    # Imprimir la información del servidor (URL y puerto)
    print("Server running : " + "http://" + dataConfig["url-backend"]+":" + str(dataConfig["port"]))
    # Iniciar el servidor utilizando Waitress en la dirección y puerto especificados en la configuración
    serve(app, host=dataConfig["url-backend"], port=dataConfig["port"])

