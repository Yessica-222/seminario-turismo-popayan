from Modelos.Recorrido import Recorrido
from Repositorios.RepositorioRecorrido import RepositorioRecorrido


class ControladorRecorrido():
    def __init__(self):
        # Se crea una instancia del RepositorioRecorrido para interactuar con la base de datos
        self.repositorioRecorrido = RepositorioRecorrido()

    def index(self):
        # Retorna todas las Recorridos existentes en la base de datos
        return self.repositorioRecorrido.findAll()

    def create(self, infoRecorrido):
        # Crea un nuevo objeto Recorrido a partir de la información recibida
        nuevaRecorrido = Recorrido(infoRecorrido)

        # Guarda la nueva Recorrido en la base de datos utilizando el repositorio
        return self.repositorioRecorrido.save(nuevaRecorrido)

    def show(self, id):
        # Obtiene un Recorrido por su ID desde la base de datos utilizando el repositorio
        elRecorrido = Recorrido(self.repositorioRecorrido.findById(id))

        # Retorna los atributos de  Recorrido como un diccionario
        return elRecorrido.__dict__

    def update(self, id, infoRecorrido):
        # Obtiene el Recorrido actual por su ID desde la base de datos utilizando el repositorio
        recorridoActual = Recorrido(self.repositorioRecorrido.findById(id))

        # Actualiza los atributos del recorrido con la información recibida
        recorridoActual.nombreRecorrido = infoRecorrido["nombreRecorrido"]
        recorridoActual.duracionEstimada = infoRecorrido["duracionEstimada"]
        recorridoActual.precio = infoRecorrido["precio"]
        recorridoActual.ubicacionInicio = infoRecorrido["ubicacionInicio"]
        recorridoActual.ubicacionFinal = infoRecorrido["ubicacionFinal"]
        recorridoActual.estaciones = infoRecorrido["estaciones"]
        recorridoActual.podcast = infoRecorrido["podcast"]


        # Guarda los cambios de la Recorrido actualizado en la base de datos utilizando el repositorio
        return self.repositorioRecorrido.save(recorridoActual)

    def delete(self, id):
        # Elimina un Recorrido por su ID desde la base de datos utilizando el repositorio
        return self.repositorioRecorrido.delete(id)