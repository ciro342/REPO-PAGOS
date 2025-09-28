# PagosPt

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Instalacion de sweetalert2 

npm install sweetalert2
Lo eh instalado para hacer alertas mas interactivas y esteticas con la pagina


## DESICIONES

-Principalmente en el Crud , la parte del post la hice en otro componente para seguir la recomendacion (dada en el correo electronico), no obstante el resto del crud (ver,borrar,editar), lo hice en forma de modales con valores booleanos para asi no crear componentes inecesarios.


## ESTRUCTURA
src/
└── app/
├── features/
│ └── pagos/
│ ├── components/
│ │ └── pago-form/        → Componente para crear un nuevo pago (Form reactivo)
│ │ ├── pago-form.component.ts
│ │ ├── pago-form.component.html
│ │ ├── pago-form.component.css
│ │ └── pago-form.component.spec.ts
│ └── pages/
│ └── pagos-list/          → Página que lista todos los pagos (e incluir parte del CRUD)
│ ├── pagos-list.component.ts
│ ├── pagos-list.component.html
│ ├── pagos-list.component.css
│ └── pagos-list.component.spec.ts
└── services/ → Servicios que manejan lógica y datos
├── pagos.service.ts        →  Servicio para CRUD de pagos
├── pagos.service.spec.ts
├── access.service.ts       →     Servicio para control de accesos/permisos
└── access.service.spec.ts
└── guards/
    ├── pago.guard.ts
    └── pago.guard.spec.ts

## POR MEJORAR
-Uso de trackBy en tabla


# Instalacion de PrimeNG y dependencias básicas
npm i primeng primeicons


## para subir a github pages
npm install -g angular-cli-ghpages



## GUARDS
Los guards protegen las rutas para que solo usuarios con permisos puedan acceder a ciertas páginas.
Si un usuario sin permisos trata de entrar a una URL protegida (como /features/pago-forms), será redirigido automáticamente a la página principal y verá una alerta de "Acceso Denegado".


## Uso de IA

Eh Usado la ia copilot en partes relacionadas a primeng (sigo en ruta de aprendizaje del mismo), pero bajo vigilancia
para que no de algun error o mal resultado

Tambien en la parte del export del csv (estoy mas acostumbrado a hacerlo desde el backend )