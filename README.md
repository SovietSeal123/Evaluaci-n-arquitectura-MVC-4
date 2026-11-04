## API - Biblioteca Digital

La API fue desarrollada con Node.js, Express, TypeScript y MongoDB para gestionar una colección de libros.

El proyecto permite realizar operaciones CRUD (crear, consultar, actualizar y eliminar libros), además de filtrar la colección por título, autor, género y año de publicación.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** framework para desarrollar el servidor y las rutas de la API.
- **TypeScript:** lenguaje utilizado para desarrollar el proyecto con tipado estático.
- **MongoDB:** base de datos NoSQL.
- **Mongoose:** herramienta para modelar los datos y comunicarse con MongoDB.
- **CORS:** middleware para permitir solicitudes desde distintos orígenes.

## Requisitos previos

Para ejecutar este proyecto se necesita tener instalado:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) 
- Git (opcional, para clonar el repositorio).

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/SovietSeal123/Evaluaci-n-arquitectura-MVC-4.git
   ```

2. Entrar en la carpeta del proyecto:

   ```bash
   cd Evaluaci-n-arquitectura-MVC-4
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto y configurar las siguientes variables:

```env
PORT= puerto del servidor
URI_DB= conexion a la base de datos MongoDB
```

- `PORT`: puerto en el que se ejecutará el servidor.
- `URI_DB`: cadena de conexión a la base de datos MongoDB.

## Ejecución

Para iniciar el servidor en entorno local, ejecutar:

```bash
npm run dev
```

Si la conexión con MongoDB se establece correctamente, aparecerá un mensaje indicando que la base de datos está conectada y que el servidor está escuchando en el puerto configurado.

## Estructura del proyecto

```text
src/
├── config/
│   └── connectMongoDB.ts
├── constant/
│   └── bookConstant.ts
├── controllers/
│   └── bookController.ts
├── interfaces/
│   └── bookInterface.ts
├── models/
│   └── bookModel.ts
├── routes/
│   └── bookRouter.ts
├── utils/
│   └── validateBookData.ts
└── index.ts
```

### Organización

- **config:** configuración y conexión con MongoDB.
- **constant:** mensajes utilizados en las respuestas HTTP.
- **controllers:** lógica de las operaciones de la API.
- **interfaces:** definición de los tipos e interfaces de los libros.
- **models:** esquema y modelo de Mongoose.
- **routes:** definición de las rutas disponibles.
- **utils:** funciones auxiliares y validaciones.
- **index.ts:** configuración e inicio del servidor Express.

## Endpoints

La API utiliza la ruta base `http://localhost:3001/books`.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/books` | Obtener todos los libros. |
| GET | `/books/:id` | Obtener un libro por su ID. |
| POST | `/books` | Registrar un nuevo libro. |
| PATCH | `/books/:id` | Actualizar los datos de un libro. |
| DELETE | `/books/:id` | Eliminar un libro. |

### Filtros de búsqueda

El endpoint `GET /books` permite filtrar los libros mediante parámetros de consulta:

| Parámetro | Descripción |
|---|---|
| `title` | Buscar por título (coincidencia parcial). |
| `author` | Buscar por autor (coincidencia parcial). |
| `genre` | Buscar por género exacto. |
| `publishedYear` | Buscar por año de publicación exacto. |

Se pueden combinar varios filtros en una misma solicitud.

Ejemplos:

```http
GET /books?title=princip
GET /books?author=Cervantes
GET /books?genre=Novela
GET /books?publishedYear=1943
GET /books?author=Cervantes&genre=Novela
```

### Crear un libro

**POST** `/books`

Enviar un objeto JSON con los datos del libro:

```json
{
  "title": "El principito",
  "author": "Antoine de Saint-Exupéry",
  "publishedYear": 1943,
  "genre": "Fantasía",
  "available": true
}
```

Los campos `title` y `author` son obligatorios. El campo `available` es opcional y su valor predeterminado es `true`.

**Respuesta exitosa (201 Created):**

```json
{
  "message": "Libro creado correctamente",
  "book": {
    "_id": "ID_GENERADO",
    "title": "El principito",
    "author": "Antoine de Saint-Exupéry",
    "publishedYear": 1943,
    "genre": "Fantasía",
    "available": true
  }
}
```
### Consultar un libro por ID

**GET** `/books/:id`

Permite obtener los datos de un libro mediante su identificador.

**Respuesta exitosa (200 OK):**

```json
{
  "message": "Libro obtenido correctamente",
  "book": {
    "_id": "ID_DEL_LIBRO",
    "title": "El principito",
    "author": "Antoine de Saint-Exupéry",
    "publishedYear": 1943,
    "genre": "Fantasía",
    "available": true
  }
}
```

### Eliminar un libro

**DELETE** `/books/:id`

Permite eliminar un libro mediante su identificador.

**Respuesta exitosa (200 OK):**

```json
{
  "message": "Libro eliminado correctamente",
  "book": {
    "_id": "ID_DEL_LIBRO",
    "title": "El principito",
    "author": "Antoine de Saint-Exupéry"
    "publishedYear": 1943,
    "genre": "Fantasía",
    "available": true
  }
}
```


### Actualizar un libro

**PATCH** `/books/:id`

Enviar únicamente los campos que se desean modificar.

Ejemplo de solicitud:

```json
{
  "genre": "Literatura infantil",
  "available": false
}
```

**Respuesta exitosa (200 OK):**

```json
{
  "message": "Libro actualizado correctamente",
  "book": {
    "_id": "ID_DEL_LIBRO",
    "title": "El principito",
    "author": "Antoine de Saint-Exupéry",
    "publishedYear": 1943,
    "genre": "Literatura infantil",
    "available": false
  }
}
```

## Códigos de respuesta HTTP

| Código | Descripción |
|---|---|
| 200 OK | Solicitud procesada correctamente. |
| 201 Created | Libro creado correctamente. |
| 400 Bad Request | Datos inválidos o ID incorrecto. |
| 404 Not Found | Libro no encontrado. |
| 409 Conflict | Ya existe un libro con ese título. |
| 500 Internal Server Error | Error interno del servidor. |

Las respuestas incluyen un campo `message` con una descripción del resultado de la operación.