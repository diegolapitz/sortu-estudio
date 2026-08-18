# Sortu Estudio — handoff para personas y LLMs

> **Leé este archivo antes de proponer o tocar código.** Describe el estado publicado y el criterio de trabajo al 17 de agosto de 2026. El `README.md` conserva el brief y el sistema visual original; algunas de sus notas sobre placeholders y el preview de Servicios son históricas, no describen el producto actual.

## Qué es este proyecto

Landing comercial de una página para **Sortu Estudio**, el estudio de Martu Santín y Guada Madrazo. El sitio presenta su propuesta —estrategia, comunicación digital y producción audiovisual—, muestra trabajos reales y canaliza consultas.

- Idioma: español rioplatense, con voseo.
- Público: potenciales clientes de Sortu.
- Producción actual: `https://sortu-estudio.vercel.app`.
- Código remoto: `https://github.com/diegolapitz/sortu-estudio.git`.
- Orden narrativo: hero → cinta de servicios → Servicios → Portfolio → Nosotras → Contacto → footer.

## Criterio creativo y de colaboración

El diseño fue preparado durante varias horas en Claude Design y **la clienta ya aprobó la dirección visual**. La implementación debe ser fiel, no una reinterpretación.

### No negociables

- No cambiar tipografías, CTAs, paleta, copy ni jerarquías sin una aprobación explícita.
- No inventar clientes, casos, números, promesas ni texto de relleno.
- No reemplazar los SVG provistos por PNGs de baja calidad, formas CSS genéricas ni recursos “parecidos”. Las formas del hero son assets de marca.
- La web usa intencionalmente la paleta clara también si el teléfono está en modo oscuro. No diseñar una segunda paleta oscura.
- No añadir cards genéricas, gradientes de fondo, glassmorphism, emojis ni “efectos” por iniciativa propia.
- Las formas ornamentales no pueden tapar contenido en ventanas angostas. El layout intermedio y mobile es parte del diseño, no un afterthought.
- El copy validado por las fundadoras no se reescribe por “sonar más IA” sin proponer primero el antes/después y recibir OK.

### Forma de trabajar esperada

El dueño del proyecto participa activamente del QA visual y valora el criterio, pero no quiere sorpresas: primero se explica la decisión si cambia diseño o contenido; después se implementa sólo lo acordado. Las respuestas deben ser claras, concretas y con evidencia de lo verificado. No hace falta incluir contexto personal privado: alcanza con este marco de colaboración.

## Arquitectura técnica

Es una landing estática construida con **Vite** (no React ni backend propio).

| Elemento | Rol |
| --- | --- |
| `index.html` | Estructura, copy, secciones, enlaces, assets, diálogo de reels y formulario. |
| `src/main.js` | Interacciones: reveals, header, menú mobile, videos, cursor de portfolio, modal, parallax y envío del formulario. |
| `src/styles.css` | Diseño final, animaciones y breakpoints. Importa tokens desde `ds/styles.css`. |
| `ds/tokens/*` | Fuente de verdad de colores, tipografía, espacios, radios, sombras y movimiento. |
| `assets/` | Logo, tipografías, fotos gastronómicas y algunos recursos visuales publicados. |
| `videos-etc/` | Reels fuente, fotos de fundadoras y SVG de identidad. No eliminar ni renombrar sin actualizar las referencias. |
| `public/favicon.png` | Favicon derivado del isotipo de Sortu. |

Los archivos `Sortu Estudio - Landing.dc.html`, `support.js`, `media-slot.js` e `image-slot.js` pertenecen al prototipo/origen de diseño. Son referencia histórica, pero **no son el runtime que publica Vite**; no portar ni modificar su lógica como parte de un cambio normal de la landing.

Comandos:

```bash
npm install
npm run dev       # local: http://127.0.0.1:5173
npm run build     # build de producción; debe pasar antes de publicar
npm run preview   # previsualiza dist localmente
```

## Integraciones y datos operativos

### Contacto

El formulario no abre el cliente de correo y no usa una API propia. `src/main.js` hace `fetch` al endpoint Formspree configurado:

```text
https://formspree.io/f/xrpzlpaa
```

Campos: `nombre`, `empresa`, `email` (obligatorio), `telefono` (opcional) y `mensaje`; `_gotcha` funciona como honeypot. El estado de envío, éxito y error se muestra en la propia UI. La configuración de Formspree distribuye a `hola@sortuestudio.com`.

Contacto visible en el sitio:

- Instagram: `@sortuestudio` / `https://instagram.com/sortuestudio`
- Mail general: `hola@sortuestudio.com`
- Footer: `martusantin@sortuestudio.com` y `guadamadrazo@sortuestudio.com`

No hay claves en este repositorio ni variables de entorno requeridas para el formulario actual. No sustituir Formspree por Resend, `mailto:` o una API sin una decisión explícita.

### Deploy

GitHub es el origen de versiones y Vercel publica producción desde `master`. Ver `docs/RELEASE_WORKFLOW.md`: **nunca empujar un cambio experimental directo a `master`**.

## Mapa funcional de la landing

### Hero

- Copy aprobado: “Ideas que se producen.”
- CTAs: `Hablemos` lleva a `#contacto`; `Ver proyectos` a `#portfolio`.
- El arte es una composición de cuatro SVG en `videos-etc/assets/brand/svg/`: ocre, coral, azul y ramita verde. Se mueve suavemente con animaciones y parallax.
- Desktop, tablet y mobile usan composiciones distintas para evitar solapamientos. En mobile las formas deben seguir vivas, pero contenidas.

### Servicios

Es una lista editorial, no un conjunto de cards. Servicios actuales:

1. Producción audiovisual
2. Comunicación digital
3. Estrategia y contenido
4. Contenido para marcas

La previsualización de reels de Servicios fue retirada a propósito. No volver a incorporarla sin validar el cambio: no aportaba al scroll y generaba problemas en móvil.

### Portfolio

Fondo azul. Los cinco reels publicados deben seguir siendo exactamente:

| Proyecto | Archivo |
| --- | --- |
| Diseño arquitectura | `videos-etc/Diseño arquitectura.mp4` |
| Gastronomía | `videos-etc/Gastronimia nuevo.mp4` |
| Tour Casa de La Rosalía | `videos-etc/TOUR CASA DE LA ROSALIA.mp4` |
| Parlante doble | `videos-etc/PARLANTE DOBLE.mp4` |
| Paraíso | `videos-etc/PARAISO.mp4` |

También existe el bloque fotográfico Gastronomía: usa `assets/portfolio/gastronomia/preparacion.jpg` y `horneado.jpg`, superpuestas como fotos físicas y no como un before/after con slider.

Los reels reproducen un preview al entrar en viewport y se abren en un modal al clickear. El modal se cierra con botón, clic fuera o `Escape`; al cerrar devuelve el foco al reel que lo abrió.

### Nosotras

Martu y Guada tienen el mismo peso visual: nunca presentar una como principal y la otra como secundaria. Sus rutas actuales son `videos-etc/Foto Martu.png` y `videos-etc/Foto Guada.png`. Guada lleva escala de grises por decisión de composición.

### Contacto y footer

El contacto combina el texto y el enlace de Instagram del lado izquierdo con el formulario real del lado derecho. El texto “¿Preferís escribirnos?” acompaña al formulario. El footer contiene los dos correos personales y el año se actualiza con JavaScript.

## Responsive, navegador y accesibilidad

- Breakpoints principales: `1080px` (composición de una columna), `980px` (navegación mobile) y `620px` (móvil compacto).
- Existe una regla específica para el rango `621–980px`: el hero deja de ser dos columnas y el arte queda en su propia franja.
- `prefers-reduced-motion` desactiva animaciones y deja los reveals visibles.
- `color-scheme: only light`, `forced-color-adjust: none` y reglas de `prefers-color-scheme: dark` fuerzan la paleta clara. Se agregaron por una incompatibilidad conocida de navegadores Samsung/embebidos que aplican “Force dark”.
- Cada cambio visual debe revisarse al menos en escritorio ancho, escritorio angosto, móvil y un navegador móvil real o preview público. En especial: hero, menú, portfolio, modal y contacto.

## Estado y pendientes deliberados

La última auditoría se conserva como backlog, no como permiso para rediseñar de inmediato. Pendientes posibles para una iteración acordada: mejorar accesibilidad de foco del modal, revisar contraste WCAG, SEO/canonical y tamaños de videos. No tocarlos automáticamente en un arreglo de contenido o diseño.

## Higiene de Git y assets

La carpeta de trabajo puede contener fotos, zips y videos sueltos agregados por el dueño, además de archivos marcados como eliminados. Son material de trabajo: preservarlos y no usar `git add .`, `git clean`, `git reset --hard` ni borrados masivos. Antes de cualquier commit, inspeccionar `git status` y añadir sólo los archivos que forman parte del cambio.

Para cada cambio funcional o visual: build limpio, QA local, commit descriptivo y luego el flujo de preview/aprobación de `docs/RELEASE_WORKFLOW.md`.
