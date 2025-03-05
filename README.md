## Descripción del Proyecto

Este proyecto es una aplicación web moderna construida con una arquitectura de microservicios. El **frontend** está desarrollado en **React**, mientras que el **backend** está dividido en tres microservicios principales: **API Gateway**, **Auth Service** y **HTTP Service**, todos implementados en **Node.js**.

La aplicación permite a los usuarios registrarse, iniciar sesión y realizar operaciones específicas según su rol. El sistema está diseñado para ser escalable, seguro y fácil de mantener, utilizando tecnologías como **Docker** para la contenerización y **MongoDB** como base de datos principal.

---

### Características Principales:
- **Frontend:** Interfaz de usuario interactiva construida con React. Permite funcionalidades como **inicio de sesión**, **registro de usuario**, y la capacidad de **crear**, **editar** y **eliminar tareas**.
- **API Gateway:** Centraliza las solicitudes y redirige a los microservicios correspondientes.
- **Auth Service:** **Autenticación y Autorización**, Gestión de usuarios y roles, permitiendo el control de acceso.
- **Http Service:** Gestión de peticiones HTTP para la manipulación de tareas, incluyendo operaciones como **obtener**, **crear**, **editar** y **eliminar** tareas.
- **Escalabilidad:** Arquitectura basada en microservicios que permite escalar componentes individualmente.
- **Contenerización:** Uso de Docker y Docker Compose para facilitar el despliegue y desarrollo.
- **Base de Datos:** Para la persistencia de datos, se ha implementado **MongoDB**, una base de datos NoSQL orientada a documentos. Esta elección permite una mayor flexibilidad en el manejo de datos y facilita la escalabilidad de la aplicación.

---

# Instalación

Para iniciar este proyecto en tu entorno local, primero asegúrate de cumplir con los siguientes **prerequisitos**.

## Prerequisitos

Antes de proceder con la instalación, asegúrate de tener instalados los siguientes programas:

- **Docker** y **docker-compose** (si eliges la instalación con Docker)
- **Node.js** (si eliges la instalación nativa)

Si ya tienes estas herramientas, puedes continuar con la instalación utilizando uno de los dos métodos disponibles.

---

Puedes iniciar este proyecto de dos maneras: utilizando **Docker** con **docker-compose**, o de forma nativa con **Node.js**. A continuación, se detallan ambas opciones para que elijas la que prefieras.

1. **Instalación con Docker y docker-compose**
2. **Instalación de forma nativa con Node.js**

Elige el método que mejor se adapte a tus necesidades o preferencias. A continuación, se explican los pasos para cada opción.


## 1. Instalación con Docker Compose

### Clona el repositorio:

Abre una terminal y ejecuta:
```Bash
git clone https://github.com/erich1989/prueba-tecnica-domina.git
```

Desde la terminal navega a la carpeta donde clonaste el proyecto:
```Bash
cd /tu-repositorio
```

### Instala las dependencias de cada servicio:

#### Frontend:

Navega a la carpeta:
```Bash
cd 1.frontend
```

Ejecuta: 

```Bash
npm install
```

#### API Gateway:

Navega a la carpeta:
```Bash
cd ../api-gateway
```

Ejecuta: 
```Bash
npm install
```

#### Auth Service:

Navega a la carpeta:
```Bash
cd ../auth-service
```

Ejecuta:
```Bash
npm install
```

#### HTTP Service:

Navega a la carpeta:
```Bash
cd ../http-service
```

Ejecuta:
```Bash
npm install
```

### Construye y levanta los contenedores:

Ejecuta:
```Bash
sudo docker-compose up --build
```

### Accede a la aplicación:

Frontend: Abre tu navegador y visita http://localhost:4000.

Backend (API Gateway): Estará disponible en http://localhost:5000.

### Detener los contenedores:

Ejecuta:
```Bash
docker-compose down
```

## 2. Instalación Manual con npm

### Clona el repositorio:

Abre una terminal y ejecuta:

```Bash
git clone https://github.com/erich1989/prueba-tecnica-domina.git
```

Desde la terminal navega a la carpeta donde clonaste el proyecto:
```Bash
cd /tu-repositorio
```

#### Frontend:

Navega a la carpeta:
```Bash
cd 1.frontend
```

Ejecuta: 

```Bash
npm install
```

#### API Gateway:

Navega a la carpeta:
```Bash
cd ../api-gateway
```

Ejecuta: 
```Bash
npm install
```

#### Auth Service:

Navega a la carpeta:
```Bash
cd ../auth-service
```

Ejecuta:
```Bash
npm install
```

#### HTTP Service:

Navega a la carpeta:
```Bash
cd ../http-service
```

Ejecuta:
```Bash
npm install
```

## Inicia los servicios:

#### API Gateway:

Navega a la carpeta:
```Bash
cd ../api-gateway
```

Ejecuta:
```Bash
npm run dev
```

#### Auth Service:

Navega a la carpeta:
```Bash
cd ../auth-service
```

Ejecuta:
```Bash
npm run dev
```

#### HTTP Service:

Navega a la carpeta:
```Bash
cd ../http-service
```

Ejecuta:
```Bash
npm run dev
```

#### Frontend:

Navega a la carpeta:
```Bash
cd ../1.frontend
```

Ejecuta:
```Bash
npm start
```

### Variables de Entorno

Para facilitar la configuración y el despliegue, las variables de entorno necesarias para cada servicio se encuentran en archivos `.env` dentro de sus respectivos directorios (por ejemplo, `1.frontend/.env`, `api-gateway/.env`, etc.).