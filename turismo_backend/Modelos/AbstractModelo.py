# Importa la clase ABCMeta del módulo abc para crear clases abstractas en Python.
from abc import ABCMeta

# Define una clase abstracta llamada AbstractModelo con ABCMeta como metaclass.
class AbstractModelo(metaclass=ABCMeta):
    # Define el método de inicialización (__init__) que se ejecuta al crear una instancia.
    def __init__(self,data):
        # Itera sobre los elementos del diccionario data proporcionado como argumento.
        for llave, valor in data.items():
            # Establece dinámicamente atributos en la instancia con los datos del diccionario.
            setattr(self, llave, valor)
