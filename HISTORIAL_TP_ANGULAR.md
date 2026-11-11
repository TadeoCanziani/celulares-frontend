# Historial de trabajo — TP Angular (Frontend)
**Materia:** Tecnologías Web (TUARI/UNICEN)  
**Fecha:** 04 de noviembre de 2026  
**Alumno:** Tadeo Canziani  
**Repo:** https://github.com/TadeoCanziani/celulares-frontend.git  
**Ubicación local:** `C:\Users\Dell\celulares frontend`

---

## 1. Repositorio y proyecto

- Repositorio de GitHub creado y vinculado como remote `origin`.
- Proyecto Angular generado con Angular CLI (versión 22).
- Característica clave: usa **standalone components** (no tiene `app.module.ts`).
  - `src/app/app.config.ts` → configuración de la app (`provideRouter`, `provideBrowserGlobalErrorListeners`).
  - `src/app/app.routes.ts` → array de rutas (vacío por ahora).
  - `src/app/app.ts` → componente raíz `App` (standalone).
  - `src/app/app.html` → layout base con Bootstrap 5 por CDN.
  - `src/index.html` → incluye Bootstrap CSS y JS desde CDN.
- Dependencias principales: `@angular/common`, `@angular/compiler`, `@angular/core`, `@angular/forms`, `@angular/platform-browser`, `@angular/router`, `rxjs`.

---

## 2. Decisiones de diseño tomadas

| Decisión | Detalle |
|----------|---------|
| Idioma del código | **Todo en español** (nombres de componentes, interfaces, propiedades). Nada de spanglish ni inglés mixto. |
| Orden de trabajo | Primero **interfaces**, después **arreglo mock**, luego tabla con `@for`, y finalmente conexión a `HttpClient`. |
| Componentes | Standalone (no se declaran en ningún módulo). Se importan donde se usan. |
| Modelo de datos | Igual que el backend NestJS: entidad `Celular` y `Marca`. |
| Estilos | Bootstrap 5 por CDN en `index.html`. |

---

## 3. Archivos creados

### `src/app/models/marca.ts`
```ts
export interface Marca {
  id: number;
  nombre: string;
}
```

### `src/app/models/celular.ts`
```ts
export interface Celular {
  id: number;
  nombre: string;
  tamano: string;
  memoriaRam: string;
  espacioAlmacenamiento: string;
  nucleos: number;
  marcaId: number;
}
```
> Nota: `nucleos` es `number` (coincide con el backend). `tamano`, `memoriaRam`, `espacioAlmacenamiento` son `string`.

### `src/app/lista-celulares/` (generado con `ng g c lista-celulares`)
- `lista-celulares.ts`: componente standalone `ListaCelulares`.
  - Importa `Celular` desde `../models/celular`.
  - Tiene propiedad `celulares: Celular[]` con un **array mock** de 2 celulares (Galaxy S24, iPhone 15).
  - Algunos campos aún vacíos (`tamano`, `espacioAlmacenamiento`, `nucleos`) por completar.
- `lista-celulares.html`: tabla Bootstrap `<table class="table table-hover">` con filas de ejemplo hardcodeadas (Mark, Otto, etc.). **Todavía no usa `@for` sobre el array `celulares`.**
- `lista-celulares.scss`: estilos vacíos.
- `lista-celulares.spec.ts`: test generado por el CLI (no modificado).

---

## 4. Archivos modificados (sin commitear)

Según `git status -sb` en el repo del frontend:

- `M angular.json`
- `M src/app/app.html` (layout con columnas "Marcas" y "Modelos", navbar, footer)
- `M src/index.html` (Bootstrap por CDN)
- `?? public/logo.png` (nuevo, sin trackear)

---

## 5. Estado de Git

- Rama: `main`
- Remote: `https://github.com/TadeoCanziani/celulares-frontend.git`
- Último commit en backend: `b133942 typerorm` (no aplica al frontend).
- **Hay cambios sin commitear** en el frontend (ver punto 4).

---

## 6. Próximos pasos pendientes (en orden)

1. **Terminar el mock** en `lista-celulares.ts`: completar los campos vacíos con valores coerentes (`tamano: '6.1"'`, `espacioAlmacenamiento: '256GB'`, `nucleos: 8`, etc.).
2. **Cambiar la tabla** en `lista-celulares.html`: borrar las filas hardcodeadas y usar `@for (celular of celulares; track celular.id)` con interpolación `{{ celular.nombre }}`, etc.
3. **Insertar el componente** en `app.html` (columna "Modelos") y **importarlo** en `app.ts` (standalone).
4. **Crear componente `lista-marcas`** con su interface y mock.
5. **Habilitar CORS** en el backend (`celulares\src\main.ts`: `app.enableCors()`).
6. **Conectar `HttpClient`**: generar servicio, importar `HttpClientModule`/`provideHttpClient`, consumir `GET /celulares` y `GET /marcas` desde el backend NestJS.
7. **Routing**: definir rutas para listado de celulares y marcas.
8. **Commitear todo** en el repo del frontend antes de seguir.

---

## 7. Videos de cátedra relevantes (Angular)

- Angular - Introducción: https://www.youtube.com/watch?v=uzqWh7dC6Yk
- Angular - Components: https://www.youtube.com/watch?v=a9aJj9n0fTg
- Angular - Interfaces & Directivas: https://www.youtube.com/watch?v=XH5VMnLI2ps
- Angular - Events and Binding: https://www.youtube.com/watch?v=KHZG6afbzgk
- Angular - Routing: https://www.youtube.com/watch?v=GDpg7WRuuSM
- Angular - Rest: https://www.youtube.com/watch?v=kB59jNuwU9Y
- Angular - Rest Crear Recursos: https://www.youtube.com/watch?v=icgP4QE6H1s
- Angular - Services & Dependency Injection: https://www.youtube.com/watch?v=ZAEsr_qi6tU

> Nota: la cátedra da Angular 12 con NgModules (`app.module.ts`, `*ngIf`, `*ngFor`). Este proyecto usa Angular 22 con standalone components y `@if`/`@for`. La lógica es la misma, la sintaxis es distinta.

---

## 8. Backend relacionado (para contexto)

- Repo: https://github.com/TadeoCanziani/celulares.git
- Endpoints disponibles: `GET/POST/PATCH/DELETE /celulares` y `GET/POST/DELETE /marcas`.
- Filtros: `?nombre=`, `?memoriaRam=`, `?marcaId=`, `?sortBy=`, `?orderBy=`, `?page=`, `?limit=`.
- El backend aún no tiene CORS habilitado (pendiente para conectar con Angular).

---

## 9. Búsqueda avanzada (último paso implementado)

- **Fecha:** 11 de noviembre de 2026
- **Archivos creados/modificados:**
  - `src/app/filtros-celulares.service.ts` (nuevo): servicio con `BehaviorSubject` que guarda los filtros (`nombre`, `memoriaRam`, `marcaId`) y los difunde a los componentes suscriptos.
  - `src/app/service-datos-celular.ts`: se agregó el método `buscar(filtros)` que envía query params al backend (`?nombre=`, `?memoriaRam=`, `?marcaId=`).
  - `src/app/lista-celulares/lista-celulares.ts`: ahora usa `signal<Celular[]>` y se suscribe a los cambios de filtros para volver a consultar el backend.
  - `src/app/app.ts`: inyecta `FiltrosCelularService` y lo expone como `public filtros` para usarlo en el template.
  - `src/app/app.html`: la izquierda (col-4) tiene el buscador con 3 inputs (Nombre, Memoria RAM, Marca ID). La derecha (col-8) muestra la lista `<lista-celulares>`.
- **Estado:** funciona. Al escribir en los inputs de la izquierda, la tabla de la derecha se actualiza consultando `GET /celulares?nombre=...&memoriaRam=...&marcaId=...` al backend.
- **Pending:** pendiente agregar modal para crear celulares y marcas, y gráfico de torta (opcional).

---

*Este historial debe entregarse junto con el TP como parte de la evaluación.*
