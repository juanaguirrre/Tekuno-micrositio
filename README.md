# Tekuno · Micrositio (prototipo navegable)

Prototipo funcional del micrositio de Tekuno, basado en el diseño de Figma
("Micrositio 2026"). Es un sitio estático — sin backend, sin build step —
pensado para:

1. Correr localmente en PyCharm y revisarlo con el equipo.
2. Subirlo a GitHub / GitHub Pages para compartir un link navegable con los
   jefes y pedir el visto bueno.
3. Servir como base real del sitio una vez aprobado el contenido y los videos.

## Estructura del proyecto

```
tekuno-micrositio/
├── index.html              -> punto de entrada único (SPA)
├── assets/
│   ├── css/styles.css      -> todos los estilos
│   ├── js/data.js          -> TODO el contenido (categorías, módulos, textos, videos)
│   └── js/app.js           -> lógica de navegación (router) y render de vistas
└── README.md
```

No hay build step (sin npm, sin bundlers). Es HTML/CSS/JS puro, así que
cualquier navegador o servidor estático lo puede correr tal cual.

## Cómo correrlo en PyCharm

1. Abre la carpeta `tekuno-micrositio/` como proyecto en PyCharm.
2. Click derecho sobre `index.html` → **Open in Browser** (PyCharm trae un
   servidor integrado para esto), o:
3. Alternativa por terminal, desde dentro de la carpeta:
   ```bash
   python -m http.server 8000
   ```
   y abre `http://localhost:8000` en el navegador.

   (Abrir `index.html` con doble clic directamente también funciona en este
   proyecto, ya que no usa módulos ES ni fetch a archivos locales — pero se
   recomienda el servidor local para que se comporte igual que en producción.)

## Cómo publicarlo en GitHub Pages

1. Sube esta carpeta a un repositorio de GitHub (puede ser el mismo repo del
   dashboard de tickets, en una subcarpeta, o uno nuevo).
2. En **Settings → Pages** del repo, selecciona la rama y la carpeta donde
   quedó `index.html` (raíz, o `/tekuno-micrositio` si la subiste como
   subcarpeta — en ese caso ajusta la ruta en Pages).
3. GitHub te da una URL pública (`https://<usuario>.github.io/<repo>/`) que
   puedes mandar directo a los jefes para que lo revisen desde cualquier
   dispositivo, sin instalar nada.

## Cómo navega el sitio

- **Home** (`#/`) — tarjetas de las categorías principales.
- **Submenú** (`#/categoria/<id>`) — tarjetas de los módulos/funciones de esa
  categoría (ej. Recursos Humanos → Bolsa de trabajo, Clima laboral, etc.).
- **Detalle de módulo** (`#/categoria/<id>/<moduleId>`) — panel de Video Demo
  + Ficha Funcional + Ficha Técnica, tal como en el diseño de Figma.

Es ruteo por hash (`#/...`), así que funciona en cualquier hosting estático
sin configuración extra de servidor, y cada pantalla tiene su propia URL
(se puede compartir el link directo a un módulo específico).

## Cómo editar el contenido

Todo el contenido vive en `assets/js/data.js`, en un solo objeto `TEKUNO_DATA`.
No hace falta tocar `app.js` ni `styles.css` para:

- Cambiar textos de categorías o módulos.
- Agregar o quitar módulos dentro de una categoría.
- Agregar una nueva categoría completa (copia el bloque de una existente y
  cambia `id`, `name`, `desc`, `icon` y su lista de `modules`).

### Estado del contenido ahora mismo

- **Recursos Humanos** está desarrollado como ejemplo completo (8 módulos:
  Bolsa de trabajo, Clima laboral, Credenciales, Evaluación 360, Gestión de
  préstamos sobre nómina, Solicitud de vacaciones, TekAsist, Pruebas
  psicométricas), con ficha funcional y ficha técnica de ejemplo basadas en
  el diseño de Figma.
- **Gestión documental, Automatización y Desarrollo, SaaS y Hardware** están
  armadas con la misma estructura pero como *placeholders* (`status:
  "pendiente"`) — se ve la tarjeta y el flujo de navegación, pero falta el
  contenido real. Búscalas en `data.js` y complétalas cuando el equipo tenga
  definido qué módulos van en cada una.

> Nota: el nombre de la tercera categoría en el mockup de Figma aparecía
> duplicado como "Automatización y Desarrollo". Asumí que corresponde a
> "Recursos Humanos" (es la categoría cuyo submenú y ficha de detalle sí
> aparecen desarrollados en las capturas). Si no es así, solo hay que
> renombrar el `id`/`name` de esa categoría en `data.js`.

## Cómo integrar los videos reales

Cada módulo tiene un campo `video` en `data.js`. Mientras esté en `null`, el
sitio muestra un reproductor placeholder (con botón de play) que, al hacer
clic, avisa que falta el video — así el prototipo se ve completo para
presentar aunque todavía no haya material final.

Para conectar un video real:

```js
video: "assets/video/bolsa-trabajo.mp4"
```

y coloca el archivo en una carpeta `assets/video/` (créala si no existe).
Recomendaciones de formato (según la investigación previa): MP4 (H.264)
como fuente principal, peso objetivo bajo ~5 MB para que cargue rápido
dentro de la tarjeta, y agregar subtítulos si el video tiene narración
(requisito de accesibilidad).

## Siguientes pasos sugeridos

1. Revisar con el equipo si la categoría duplicada del home es "Recursos
   Humanos" o algo distinto, y ajustar `data.js`.
2. Completar contenido real de Gestión documental, Automatización, SaaS y
   Hardware.
3. Ir sustituyendo los `video: null` conforme estén listos los videos
   (ver conversación previa sobre criterios de dejar/actualizar/crear).
4. Cuando los jefes den el visto bueno sobre el prototipo, decidir si el
   sitio final vive en GitHub Pages, o se integra al hosting donde está
   `tekuno-web-upgrade.html`.
