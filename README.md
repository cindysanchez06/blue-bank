# blue-bank

## requisitos
- node >= 14
- php 7.4.0
- mySql
- composer

## instalacion y ejecucion en local

### cliente FE
- `cd cliente/`
- `npm install` para instalar dependencias 
- `npm run dev` para correr el FE

### server BE
- crear base de datos con nombre blue_bank
- `cd server/`
- `composer install`
- `php artisan migrate` para crear tablas y su estructura
- `php artisan serve` para correr el BE

### Arquitectura 
- El BE esta compuesto de controladores, servicios, modelos y repositorios 
- En el FE se implementan paginas que utilizan servicios para hacer peticiones al api

###
- las tecnologias que se utilizaron son:
- php 7.4.0
- laravel en su version 8.0
- react
- node js 
- css
