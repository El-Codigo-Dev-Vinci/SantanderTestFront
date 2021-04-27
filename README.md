# Meetups beer :beer:

¡Bienvenida/o! En este repositorio encontrarás una plantilla (de las infinitas posibles) para crear una aplicación web con React. Las principales tecnologías que utilizamos son:

## :point_up: Prerrequisitos - para instalar antes de empezar

Para ejecutar el código es necesario tener NodeJS en su versión 14 (`lts/fermium`).

## :ballot_box_with_check: Configuración inicial del proyecto

Asumiendo que ya configuraste todos los prerrequisitos y que vas a utilizar Docker, estos son los comandos que deberías ejecutar la primera vez que trabajes en el proyecto:

```shell
# Copia las variables de entorno necesarias para interactuar con la API.
cp .env.example .env

# Instala las dependencias Node del proyecto.
npm install
```

## :file_folder: Estructura de directorios

Breve descripción de qué se puede encontrar en cada uno de los directorios del proyecto:

```shell
├── public                  # Index, favicon y otros archivos comunes
└── src
    ├── components          # Componentes de React
    └── state               # Selectores y átomos de Recoil
```

## :woman_technologist: :man_technologist: Comandos útiles para el día a día

A continuación, algunos comandos necesarios para el desarrollo diario en este proyecto.

### Código

```shell
# Levanta el proyecto y recarga automáticamente si hay cambios.
npm start
```
