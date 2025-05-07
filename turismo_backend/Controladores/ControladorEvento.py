from Modelos.Evento import Evento
from Modelos.Turista import Turista
from Repositorios.RepositorioEvento import RepositorioEvento

class ControladorEvento():
    def __init__(self):
        # Se crea una instancia del RepositorioEvento para interactuar con la base de datos
        self.repositorioEvento = RepositorioEvento()

    def index(self):
        # Retorna todos los Eventos existentes en la base de datos
        return self.repositorioEvento.findAll()

    def create(self, infoEvento):
        # Crea un nuevo objeto Evento a partir de la información recibida
        nuevoEvento = Evento(infoEvento)

        # Guarda el nuevo Evento en la base de datos utilizando el repositorio
        return self.repositorioEvento.save(nuevoEvento)

    def show(self, id):
        # Obtiene un Evento por su ID desde la base de datos utilizando el repositorio
        elEvento = Evento(self.repositorioEvento.findById(id))

        # Retorna los atributos del Evento como un diccionario
        return elEvento.__dict__

    def update(self, id, infoEvento):
        # Obtiene el Evento actual por su ID desde la base de datos utilizando el repositorio
        eventoActual = Evento(self.repositorioEvento.findById(id))

        # Actualiza los atributos del Evento con la información recibida
        eventoActual.ubicacion = infoEvento["ubicacion"]
        eventoActual.fecha = infoEvento["fecha"]
        eventoActual.tipoDeEvento = infoEvento["tipoDeEvento"]
        eventoActual.costoEntrada = infoEvento["costoEntrada"]

        # Guarda los cambios del Evento actualizado en la base de datos utilizando el repositorio
        return self.repositorioEvento.save(eventoActual)

    def delete(self, id):
        # Elimina un Evento por su ID desde la base de datos utilizando el repositorio
        return self.repositorioEvento.delete(id)
