from Modelos.Turista import Turista
from Repositorios.RepositorioTurista import RepositorioTurista
from Repositorios.RepositorioEvento import RepositorioEvento
from Modelos.Evento import Evento

class ControladorTurista():
    def __init__(self):
        # Se crea una instancia del RepositorioTurista para interactuar con la base de datos
        self.repositorioTurista = RepositorioTurista()
        self.repositorioEvento = RepositorioEvento()
    def index(self):
        # Retorna todos los turistas existentes en la base de datos
        return self.repositorioTurista.findAll()
    def create(self, infoTurista):
        # Crea un nuevo objeto turista a partir de la información recibida
        nuevoTurista = Turista(infoTurista)

        # Guarda el nuevo turista en la base de datos utilizando el repositorio
        return self.repositorioTurista.save(nuevoTurista)

    def show(self, id):
        # Obtiene un turista por su ID desde la base de datos utilizando el repositorio
        elTurista = Turista(self.repositorioTurista.findById(id))

        # Retorna los atributos del turista como un diccionario
        return elTurista.__dict__

    def update(self, id, infoTurista):
        # Obtiene el turista actual por su ID desde la base de datos utilizando el repositorio
        turistaActual = Turista(self.repositorioTurista.findById(id))
        turistaActual.nombre = infoTurista["nombre"]
        turistaActual.apellido = infoTurista["apellido"]
        turistaActual.cedula = infoTurista["cedula"]
        turistaActual.idiomaNativo = infoTurista["idiomaNativo"]
        turistaActual.recorrido = infoTurista["recorrido"]

        # Guarda los cambios del turista actualizado en la base de datos utilizando el repositorio
        return self.repositorioTurista.save(turistaActual)

    def delete(self, id):
        # Elimina un turista por su ID desde la base de datos utilizando el repositorio
        return self.repositorioTurista.delete(id)

    """"
    Relacion Evento y Turista 
    """
    def asignarEvento(self, id, id_evento):
        # Crea una instancia de Turista utilizando el ID proporcionado y busca el turista en el repositorio.
        turistaActual = Turista(self.repositorioTurista.findById(id))
        # Crea una instancia de Evento utilizando el ID proporcionado y busca el evento en el repositorio.
        eventoActual = Evento(self.repositorioEvento.findById(id_evento))
        # Asigna la instancia de Evento al atributo 'evento' del Turista.
        turistaActual.evento = eventoActual
        # Guarda la instancia actualizada del Turista en el repositorio y devuelve el resultado.
        return self.repositorioTurista.save(turistaActual)