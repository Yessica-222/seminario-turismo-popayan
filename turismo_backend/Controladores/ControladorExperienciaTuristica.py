
from Repositorios.RepositorioExperienciaTuristica import RepositorioExperienciaTurustica
from Modelos.ExperienciaTuristica import ExperienciaTuristica
from Modelos.Recorrido import Recorrido
from Modelos.Turista import Turista
from Repositorios.RepositorioRecorrido import RepositorioRecorrido
from Repositorios.RepositorioTurista import RepositorioTurista

# Definición de la clase ControladorExperienciaTuristica
class ControladorExperienciaTuristica():
    # Constructor de la clase
    def __init__(self):
        # Inicialización de instancias de repositorios
        self.repositorioExperienciaTuristica = RepositorioExperienciaTurustica()
        self.repositorioRecorrido = RepositorioRecorrido()
        self.repositorioTurista = RepositorioTurista()

    # Método para obtener todas las experiencias turísticas
    def index(self):
        # Llamada al método findAll del repositorio de experiencias turísticas
        return self.repositorioExperienciaTuristica.findAll()

    """ 
    Asignacion  turista y recorrido a experienciaTurista 

    """

    def create(self, infoExperienciaTuristica, id_turista, id_recorrido):
        # Crea una nueva instancia de ExperienciaTuristica con la información proporcionada.
        nuevoExperienciaTuristica = ExperienciaTuristica(infoExperienciaTuristica)
        # Crea una instancia de Turista usando el ID proporcionado y busca el turista en el repositorio.
        elTurista = Turista(self.repositorioTurista.findById(id_turista))
        # Crea una instancia de Recorrido usando el ID proporcionado y busca el recorrido en el repositorio.
        elRecorrido = Recorrido(self.repositorioRecorrido.findById(id_recorrido))
        # Asigna la instancia de Turista y Recorrido a la nueva instancia de ExperienciaTuristica.
        nuevoExperienciaTuristica.turista = elTurista
        nuevoExperienciaTuristica.recorrido = elRecorrido
        # Guarda la nueva instancia de ExperienciaTuristica en el repositorio y devuelve el resultado.
        return self.repositorioExperienciaTuristica.save(nuevoExperienciaTuristica)

    def show(self, id):
        # Busca en el repositorio la ExperienciaTuristica con el ID proporcionado y crea una instancia.
        elResultado = ExperienciaTuristica(self.repositorioExperienciaTuristica.findById(id))
        # Devuelve un diccionario que representa los atributos y valores de la instancia.
        return elResultado.__dict__

    """
    Modificacion de ExperienciaTurista de turista y recorrido 
    """

    def update(self, id, infoExperienciaTuristica, id_turista, id_recorrido):
        # Obtiene la experienciaTuristas actual por su ID desde la base de datos utilizando el repositorio
        experienciaTuristicaActual = ExperienciaTuristica(self.repositorioExperienciaTuristica.findById(id))
        # Actualiza los atributos de la fecha participacion con la información recibida
        experienciaTuristicaActual.fechaParticipacion = infoExperienciaTuristica["fechaParticipacion"]
        experienciaTuristicaActual.calificacion = infoExperienciaTuristica["calificacion"]
        experienciaTuristicaActual.comentario = infoExperienciaTuristica["comentario"]
        elTurista = Turista(self.repositorioTurista.findById(id_turista))
        elRecorrido = Recorrido(self.repositorioRecorrido.findById(id_recorrido))
        experienciaTuristicaActual.turista = elTurista
        experienciaTuristicaActual.recorrido = elRecorrido
        # Guarda los cambios de la experiencia actualizado en la base de datos utilizando el repositorio
        return self.repositorioExperienciaTuristica.save(experienciaTuristicaActual)

    def delete(self, id):
        return self.repositorioExperienciaTuristica.delete(id)