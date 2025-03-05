## Descripción del Proyecto

Este proyecto es una aplicación web moderna construida con una arquitectura de microservicios. El **frontend** está desarrollado en **React**, mientras que el **backend** está dividido en tres microservicios principales: **API Gateway**, **Auth Service** y **HTTP Service**, todos implementados en **Node.js**.

La aplicación permite a los usuarios registrarse, iniciar sesión y realizar operaciones específicas según su rol. El sistema está diseñado para ser escalable, seguro y fácil de mantener, utilizando tecnologías como **Docker** para la contenerización y **MongoDB** como base de datos principal.

---

### Características Principales:
- **Autenticación y Autorización:** Gestión de usuarios y roles mediante el **Auth Service**.
- **API Gateway:** Centraliza las solicitudes y redirige a los microservicios correspondientes.
- **Frontend Dinámico:** Interfaz de usuario interactiva construida con React.
- **Escalabilidad:** Arquitectura basada en microservicios que permite escalar componentes individualmente.
- **Contenerización:** Uso de Docker y Docker Compose para facilitar el despliegue y desarrollo.

---

## Instalación con Docker Compose

### Clona el repositorio:

Abre una terminal y ejecuta: git clone https://github.com/erich1989/prueba-tecnica-domina.git

Navega a la carpeta del proyecto: cd tu-repositorio

### Construye y levanta los contenedores:

Ejecuta: docker-compose up --build

### Accede a la aplicación:

Frontend: Abre tu navegador y visita http://localhost:4000.

Backend (API Gateway): Estará disponible en http://localhost:5000.

### Detener los contenedores:

Ejecuta: docker-compose down

## Instalación Manual con npm

### Clona el repositorio:

Abre una terminal y ejecuta: git clone https://github.com/erich1989/prueba-tecnica-domina.git

Navega a la carpeta del proyecto: cd tu-repositorio

### Instala las dependencias de cada servicio:

#### Frontend:

Navega a la carpeta: cd 1.frontend

Ejecuta: npm install

#### API Gateway:

Navega a la carpeta: cd ../api-gateway

Ejecuta: npm install

#### Auth Service:

Navega a la carpeta: cd ../auth-service

Ejecuta: npm install

#### HTTP Service:

Navega a la carpeta: cd ../http-service

Ejecuta: npm install


## Inicia los servicios:

#### API Gateway:

Navega a la carpeta: cd ../api-gateway

Ejecuta: npm run dev

#### Auth Service:

Navega a la carpeta: cd ../auth-service

Ejecuta: npm run dev

#### HTTP Service:

Navega a la carpeta: cd ../http-service

Ejecuta: npm run dev

#### Frontend:

Navega a la carpeta: cd ../1.frontend

Ejecuta: npm start

#### Variables de Entorno

Para facilitar la configuración y el despliegue, las variables de entorno necesarias para cada servicio se encuentran en archivos `.env` dentro de sus respectivos directorios (por ejemplo, `1.frontend/.env`, `api-gateway/.env`, etc.). Asegúrate de revisar y modificar estos archivos con los valores adecuados antes de ejecutar la aplicación.