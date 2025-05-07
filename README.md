# Seminario Turismo Popayán

Proyecto universitario desarrollado como parte del seminario de grado en la **Fundación Universitaria de Popayán**. Este prototipo de pagina web informativa está diseñada para promover el turismo en Popayán, integrando mapas interactivos, rutas turísticas y contenido cultural relevante.

---

## Descripción

**Seminario Turismo Popayán** es una pagina wewb construida bajo una arquitectura de **microservicios** que permite a los usuarios explorar lugares turísticos de la ciudad de Popayán mediante un entorno interactivo y moderno. La aplicación presenta una interfaz amigable, datos centralizados, autenticación y módulos distribuidos para escalabilidad.

---

## Funcionalidades

- Visualización de mapas interactivos con rutas turísticas.
- Información detallada de sitios de interés en Popayán.
- Sistema de autenticación de usuarios.
- Comunicación entre servicios mediante arquitectura de microservicios.
- Diseño centrado en el usuario basado en metodología **Design Thinking**.

---

## Tecnologías Utilizadas

### Lenguajes y Frameworks

- **Java**
- **Python**
- **Angular** (Frontend)
- **Node.js** (API Gateway)
- **Django** (Backend)
- **Spring Boot** (Microservicios Java)
- **MongoDB** (Base de datos NoSQL)

### Herramientas de Desarrollo

- **PyCharm**
- **IntelliJ IDEA**
- **Visual Studio Code**
- **Postman** (pruebas de API)
- **Figma** (prototipado y diseño)
- **Git & GitHub** (control de versiones)

### Metodologías y Buenas Prácticas

- **Scrum** (gestión ágil de proyectos)
- **Design Thinking** (centrado en el usuario)
- **Microservicios** (arquitectura distribuida y modular)

---

## Requisitos Previos

Para ejecutar el proyecto correctamente, se debe tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) y NPM
- [Angular CLI](https://angular.io/cli)
- [Python 3.9+](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Java JDK 11+](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Spring Boot CLI](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-installing)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/)

---

## Estructura del Proyecto

seminario-turismo-popayan/

├── mc_apigateway/ # Microservicio API Gateway en Node.js

├── ngx-admin/ # Frontend en Angular (basado en ngx-admin)

├── turismo_backend/ # Backend en Django (Python)

├── turismo_seguridad/ # Microservicio de autenticación

└── README.md # Documentación general


---

## Instrucciones de Instalación

1. **Clonar el repositorio:**

 [Seminario Turismo Popayán](https://github.com/Yessica-222/seminario-turismo-popayan.git)

cd seminario-turismo-popayan
---

2. Instalar dependencias del frontend (Angular):
- cd ngx-admin
- npm install
- ng serve

3. Configurar y ejecutar el backend en Django:
- cd ../turismo_backend
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver


4. Ejecutar el microservicio API Gateway (Node.js):

- cd ../mc_apigateway
- npm install
- node index.js

5. Ejecutar servicios Spring Boot (Java):

- Abre IntelliJ o Visual Studio Code, importa el proyecto desde la carpeta springboot_servicios/ y ejecuta los servicios.

# Pruebas
## Angular (Frontend):
> - ng test
## Django (Backend):
> - python manage.py test
## Postman:
> - Utiliza la colección de pruebas incluida para verificar las rutas del API Gateway y microservicios.

## Autor
Yessica Alexandra Conejo Muñoz

Ingeniera de Sistemas – Fundación Universitaria de Popayán

Correo: munozyessica412@gmail.com

[GitHub](https://github.com/Yessica-222)