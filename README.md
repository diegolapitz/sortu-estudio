# Handoff: Landing page — Sortu Estudio

> **Estado actual del producto y reglas de handoff:** ver [`docs/LLM_HANDOFF.md`](docs/LLM_HANDOFF.md). Este README conserva el brief y diseño de partida; algunas notas de placeholders describen el prototipo original y fueron superadas en la landing publicada.

## Overview

Landing page comercial de una sola página para **Sortu Estudio**, estudio de comunicación y producción audiovisual fundado por Martu y Guada. Funciona como carta de presentación: un potencial cliente entra, entiende qué hace el estudio, ve trabajos reales, conoce a las dos fundadoras y se pone en contacto.

Secciones, en orden: Hero → cinta de servicios → Servicios → Portfolio → Nosotras → Contacto → Footer. Navegación superior sticky con scroll suave entre anclas.

Idioma: **español rioplatense (voseo)**. El copy es provisional pero está aprobado — no reescribirlo.

---

## About the design files

Los archivos de este bundle son **referencias de diseño construidas en HTML** — un prototipo que muestra el aspecto y el comportamiento buscados, **no código de producción para copiar y pegar**.

La tarea es **recrear este diseño en el entorno del codebase destino** (React/Next, Astro, Vue, lo que corresponda), usando sus patrones y librerías establecidas. Si todavía no hay codebase, elegir el framework más apropiado — para una landing estática de este tipo, **Astro o Next.js con export estático** son las opciones naturales.

`Sortu Estudio - Landing.dc.html` está escrito en un formato propietario (Design Component: template + clase de lógica, renderizado por `support.js`). **No portar ese runtime.** Abrilo en el navegador como referencia visual y de comportamiento, y leé el markup inline para sacar medidas exactas.

## Fidelity

**Alta fidelidad (hifi).** Colores, tipografía, espaciados, estados e interacciones son finales. Recrear pixel-perfect. Todos los valores salen de tokens CSS que se incluyen en el bundle (`ds/tokens/`) — usarlos como fuente de verdad en vez de hardcodear.

Lo único no final es el **contenido**: los videos, las fotos de las fundadoras y los datos de contacto son placeholders (ver *Assets*).

---

## Design tokens

Todos en `ds/tokens/`. Importar `ds/styles.css`, que hace los `@import` de los ocho archivos.

### Color

| Token | Valor | Uso |
|---|---|---|
| `--sortu-crema` | `#F5EDD6` | Fondo de página por defecto. **Nunca blanco.** |
| `--sortu-crema-clara` | `#FCF0D8` | Fondo de la sección Servicios; fondo de retratos |
| `--sortu-terracota` | `#C75B3B` | Acento principal, botón primario, links |
| `--action-primary-hover` | `#B44F32` | Hover de botón primario |
| `--action-primary-active` | `#9E4529` | Press |
| `--sortu-ocre` | `#E8A838` | Acento sobre fondo oscuro (volantas, links en azul) |
| `--sortu-azul-profundo` | `#1B3A8C` | Fondo oscuro: Portfolio y Contacto |
| `--sortu-azul-collage` | `#184878` | Fondo de los tiles de video mientras cargan |
| `--sortu-verde` | `#2D5A27` | Acento de la sección Nosotras, nombres grandes |
| `--sortu-carmesi` | `#B22222` | Hover de link de texto |
| `--ink-900` | `#1C1E1B` | Títulos |
| `--ink-700` | `#494D46` | Cuerpo |
| `--ink-500` | `#7B7E74` | Texto atenuado |
| `--ink-200` | `#D7D5C9` | Bordes sutiles (1px) |
| `--paper` | `#FFFFFF` | Sólo inputs |

Sobre azul profundo, texto e interfaces usan crema con alfa: `rgba(245,237,214,.72)` cuerpo · `.58` atenuado · `.20` bordes · `.07` superficies.

**Regla:** un solo color de acento por bloque. Nunca gris puro — los neutrales están teñidos hacia el crema.

### Tipografía

**Eastman Grotesque** en display y en cuerpo (el DS originalmente listaba Source Sans 3 + Jost como sustitutos; fueron reemplazados por la fuente real). Archivos `.otf` en `assets/fonts/`, pesos 300/400/400i/500/600/700.

⚠️ **Los archivos incluidos son las versiones *trial* de Zetafonts.** Antes de producción hay que comprar la licencia web y reemplazarlos — idealmente por `.woff2`, que además pesa mucho menos.

Escala: 11 · 12 · 13 · 15 · 17 · 19 · 22 · 27 · 34 · 44 · 58 · 76 · 96 px (`--text-3xs` … `--text-7xl`).

Line-height: `1.06` tight · `1.18` snug · `1.28` heading · `1.55` normal · `1.72` relaxed.

Tracking: `-0.022em` tighter (H1) · `-0.012em` tight (H2/H3) · `0.09em` wider · `0.16em` widest (volantas y botones en versalitas).

**Casing:** títulos en sentence case. Volantas, botones y etiquetas en VERSALITAS con tracking abierto — es el único lugar donde la marca "grita".

Columnas de texto: nunca más de 54ch.

### Espaciado

Base 4px: `2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160` (`--space-1` … `--space-16`).

Gutter: `24px` mobile / `48px` desktop. Contenedores: `640 · 880 · 1140 · 1360` px. La página usa `--container-xl` (1360) salvo Nosotras, que usa `--container-lg` (1140).

### Radios

`4 · 8 · 14 · 24 · 36 px` · pill `999px`. Botones = pill. Inputs = 8px. Tiles de video = 14px. Formulario de contacto = 24px.

`--radius-blob: 62% 38% 46% 54% / 55% 45% 55% 45%` y `--radius-blob-alt: 38% 62% 58% 42% / 44% 58% 42% 56%` — radios orgánicos, **sólo para los retratos**. Nunca en un control.

### Sombras

`--shadow-sm: 0 2px 6px rgba(28,30,27,.07)` · `--shadow-md: 0 6px 18px -4px rgba(28,30,27,.12)` · `--shadow-paper: 0 12px 28px -10px rgba(27,58,140,.24)` (teñida de azul, para el reel del hero y el formulario).

### Movimiento

`--dur-fast:140ms` (color) · `--dur-base:220ms` (transform) · `--dur-slow:420ms` (entradas).
`--ease-out: cubic-bezier(.22,.61,.36,1)` · `--ease-soft: cubic-bezier(.34,.80,.30,1)`.

**Sin rebote ni elástico.** Nada de `scale()` en press.

---

## Screens / Views

Una sola vista, scrolleable. Breakpoints: **≤620px** (mobile), **≤980px** (nav colapsa), **≤1080px** (columnas colapsan), **>1080px** (desktop).

### 1. Header (sticky)

- `position:sticky; top:0; z-index:60`. Fondo `rgba(245,237,214,.88)` + `backdrop-filter: blur(14px)`. **Es el único lugar del sistema donde se usa desenfoque.**
- Contenido: `max-width:1360px`, padding `12px 48px`, flex space-between.
- **Logo:** oculto (`opacity:0`) mientras el hero está en pantalla; aparece con fade de 320ms cuando el borde inferior del hero pasa los 140px del top. Evita que se vean dos logos a la vez. Lockup a 53px de isotipo + 8px gap + wordmark de 87px de ancho.
- **Nav:** Servicios · Proyectos · Nosotras, en `--text-2xs` (12px) versalitas, tracking `.16em`, color `--ink-700`. Más un botón pill "Hablemos" terracota, padding `12px 24px`.
- **≤980px:** los links se ocultan y aparece un botón hamburguesa de 46×46 con borde 1px. Abre un panel vertical crema debajo del header con los cuatro links a `--text-lg`. Se cierra al clickear cualquiera.

### 2. Hero (`#top`)

`max-width:1360px`, padding `64px 48px 80px`, `scroll-margin-top:110px`.

- **Lockup del logo** a 102px de isotipo + 15px gap + wordmark de 169px, en fila con la volanta "ESTUDIO DE COMUNICACIÓN Y CONTENIDO" (12px, versalitas, tracking `.16em`, terracota, `max-width:14ch`). Gap 20px. Margen inferior 24px.
- **H1:** "Ideas que se producen." — `clamp(54px, 9.4vw, 132px)`, `line-height:.94`, tracking `-0.022em`, weight 600, `max-width:13ch`.
- **Grid de dos columnas** `.82fr 1.18fr`, gap 80px, `align-items:end`, margen superior 64px:
  - Izquierda: bajada a 19px / `1.72` / `max-width:40ch`, color `--ink-700`. Debajo, dos CTA con gap 12px — primario "HABLEMOS" (terracota, pill, `16px 30px`, 15px versalitas, con flecha `arrow-right` de 17px) y secundario "VER PROYECTOS" (transparente, borde 1px `--ink-900`).
  - Derecha: **reel** en `aspect-ratio:16/9`, `border-radius:14px`, `--shadow-paper`, fondo `--sortu-azul-collage`.
- **Tres formas orgánicas** en `position:absolute`, `pointer-events:none`, `z-index:0–1`: forma ocre a la derecha a la altura del reel (300px), forma coral saliendo por abajo a la derecha (300px), media luna azul chica entre bajada y reel (74px). Ver *Movimiento*.

### 3. Cinta de servicios

Banda horizontal de altura mínima entre reglas de 1px `--border-subtle`, fondo `--surface-page` sólido y `z-index:5` (tiene que taparlas las formas del hero, si no el texto queda ilegible sobre el coral).

Los cuatro servicios en 12px versalitas `--ink-500`, separados por puntos de 5px terracota, duplicados y desplazándose con `translateX(0 → -50%)` en 74s lineales infinito. Todo el bloque es un link a `#servicios`.

### 4. Servicios (`#servicios`)

Fondo `--sortu-crema-clara`, padding `96px 48px`, `overflow:clip`.

- **Encabezado:** grid `1fr .9fr` — volanta "QUÉ HACEMOS" + H2 "Estrategia y producción, en el mismo lugar" (`clamp(32px,4.2vw,52px)`, `max-width:16ch`) a la izquierda; párrafo de contexto a la derecha (19px, `max-width:48ch`).
- **Cuerpo:** grid `1.2fr .8fr`, gap 80px.
  - **Izquierda — lista editorial.** Cuatro filas separadas por borde superior 1px, padding vertical 32px (la última también lleva borde inferior). Cada fila: `<h3>` a `clamp(24px,2.6vw,34px)` + flecha `arrow-up-right` terracota de 20px oculta, y debajo un párrafo de 17px `max-width:46ch`.
    **Hover:** el `<h3>` se desplaza `translateX(10px)` y vira a terracota (220ms `--ease-soft`); la flecha entra con `opacity 0→1` y `translateX(-8px)→0`.
    **No convertir esto en cards ni volver a numerarlas.**
  - **Derecha — preview.** `position:sticky; top:150px`. Contenedor `aspect-ratio:4/5`, `border-radius:36px`, **fondo transparente** (nada de card beige). Adentro, cuatro capas superpuestas en `position:absolute; inset:0`, una por servicio; se hace crossfade de `opacity` en 520ms al hacer hover en la fila correspondiente. Debajo, un epígrafe de 12px versalitas que cambia con el nombre del servicio activo.
    **≤1080px:** el preview se oculta por completo.
  - Los cuatro servicios: Producción audiovisual · Comunicación digital · Estrategia y contenido · Contenido para marcas.

### 5. Portfolio (`#portfolio`)

Fondo `--sortu-azul-profundo`, padding `80px 0 96px`, `overflow:clip`.

- Encabezado: volanta ocre "PROYECTOS" + H2 crema "Algunas cosas que hicimos".
- **Grid de 12 columnas**, gap `40px 24px`, cuatro piezas de escalas y proporciones distintas:

| Pieza | Columnas | Proporción | Offset |
|---|---|---|---|
| Proyecto 01 | 7 | 16/9 | — |
| Proyecto 02 | 4 | 3/4 | `margin-top:64px` |
| Proyecto 03 | 5 | 4/3 | — |
| Proyecto 04 | 6 | 16/10 | `margin-top:48px` |

  Ninguna pieza debe dominar la sección — la asimetría y los offsets son deliberados.
- Cada tile: `border-radius:14px`, `overflow:hidden`, fondo `--sortu-azul-collage`. Debajo, título de 22px crema y rótulo de 11px versalitas `rgba(245,237,214,.58)`.
  **Rótulos actuales = placeholders neutros** ("Horizontal · 16:9"). **No inventar clientes, campañas, años ni categorías** — reemplazar sólo con información confirmada.
- **Hover:** la capa de media escala a `1.045` en 900ms `--ease-soft`, y aparece un cursor custom (círculo ocre de 92px con la palabra "VER") que sigue al mouse. Sólo en `pointer:fine`.
- Una forma verde entra por el borde izquierdo, `opacity .85`.
- **≤1080px:** todas las piezas pasan a 6 columnas sin offset. **≤620px:** 12 columnas, `aspect-ratio:4/3` forzado.

### 6. Nosotras (`#nosotras`)

Fondo `--surface-page`, padding `96px 0`, `max-width:1140px`.

- Encabezado: volanta verde "NOSOTRAS" + H2 "Somos dos, y trabajamos como una" + párrafo (19px, `max-width:54ch`).
- **Grid de dos columnas iguales**, gap 80px, `align-items:start`. **Igualdad absoluta entre Martu y Guada: mismo tamaño de foto, mismo tamaño y peso de nombre, misma longitud de bio, misma posición vertical. No introducir jerarquía, offsets ni orden visual entre las dos.**
- Cada columna, **espejada**:
  - **Nombre** — "Martu" / "Guada" a `clamp(52px,6.6vw,92px)`, weight 600, `line-height:.92`, color `--sortu-verde`, `z-index:0`, **`margin-bottom:-.30em`** para que la foto tape el tercio inferior de las letras. En flujo normal (no `position:absolute`, que fue causa de bugs de visibilidad). Martu alineado a la izquierda, Guada a la derecha.
  - **Retrato** — `aspect-ratio:4/5`, `z-index:1`, `--shadow-sm`, `--radius-blob` en Martu y `--radius-blob-alt` en Guada.
  - **Rol** (11px versalitas verde) + **bio** (17px, `max-width:34ch`). Columna derecha alineada a la derecha.
- **Cierre:** borde superior 1px y la frase "Crear con propósito, con estrategia y con corazón." centrada, `clamp(28px,3.6vw,44px)`, `max-width:22ch`.
- **≤1080px:** una columna, retratos `max-width:420px` centrados.

### 7. Contacto (`#contacto`)

Fondo `--sortu-azul-profundo`, padding `96px 48px`, grid de dos columnas iguales, gap 80px.

- **Izquierda:** volanta ocre + H2 crema "¿Empezamos por saber qué querés contar?" (`clamp(32px,4.4vw,56px)`, `max-width:15ch`) + párrafo. Debajo, tres canales directos en filas de `16px 20px`, borde 1px `rgba(245,237,214,.20)`, radio 14px, fondo `rgba(245,237,214,.07)`, con icono Lucide ocre de 20px a la izquierda y `arrow-up-right` a la derecha. **Hover:** `translateY(-3px)` y fondo a `.12`.
  WhatsApp `+54 11 0000-0000` · `hola@estudiosortu.com` · `@estudiosortu` — **todos placeholders**.
- **Derecha:** formulario sobre fondo `--sortu-crema`, `border-radius:24px`, `--shadow-paper`, padding `48px 40px`. Campos apilados con gap 16px: Nombre (requerido) · Empresa o marca · Email (requerido) · Teléfono (opcional) · "Contanos qué tenés en mente" (textarea, 4 filas). Labels en 11px versalitas `--ink-500`; inputs `--paper`, borde 1px `--ink-200`, radio 8px, padding `14px 16px`. Botón "ENVIAR" pill terracota.
  **Al enviar**, se publica por AJAX a Formspree y el formulario se reemplaza por un estado de éxito. Los errores de red o del proveedor permanecen visibles en el mismo bloque, sin redirecciones ni apertura del cliente de correo.
- Una forma coral sale por el borde inferior izquierdo.

### 8. Footer

Fondo `--sortu-crema`, padding `40px 48px`, flex `space-between` con wrap, gap 32px.

Lockup del logo (87px isotipo + 13px gap + wordmark 144px) · nav de cinco links en 13px versalitas (los cuatro internos en `--ink-700`, Instagram en terracota) · bloque a la derecha (`margin-left:auto`) con el mail a 15px `--ink-700` y "© 2026 Sortu Estudio" a 13px `--ink-500`.

---

## Interactions & behavior

### Jerarquía de movimiento

Tres capas, deliberadamente distintas:

**1. Ambiental** — las formas orgánicas derivan de forma continua e independiente. Tres keyframes (`sortuDriftA/B/C`) que combinan `translate3d` de 40–60px, rotación de 4–14° y escala de `.97–1.08`, en ciclos de **17 a 38 segundos**, `--ease-in-out`, infinitos. Cada forma usa una animación y una duración distintas para que nunca se sincronicen. Además, cada una tiene un factor de parallax de scroll (`data-sp`, entre `-0.05` y `0.24`) aplicado sobre `translate3d` en un listener de scroll throttleado con `requestAnimationFrame`.

**2. Navegación** — reveals al entrar en viewport. Los elementos arrancan en `opacity:0` + `translate3d(0,24px,0)`; los marcados como *mask* arrancan en `opacity:1` + `clip-path: inset(0 0 100% 0)` y se descubren de abajo hacia arriba. Transiciones de 700ms (opacity) / 900ms (transform) / 1000ms (clip-path), con delay escalonado de `0/70/140/210ms` según posición. Los dos retratos entran además con desplazamiento horizontal opuesto (`±46px`).

⚠️ **Nota de implementación importante.** En el prototipo, el `IntersectionObserver` no recibía entradas porque el contenedor que scrollea no era la ventana. La solución fue un barrido con `getBoundingClientRect()` contra `innerHeight * 0.94`, enganchado a: (a) doble `requestAnimationFrame` al montar, (b) `scroll` en **fase de captura sobre `document`** (no `window`), (c) `resize`, y (d) un `setInterval` de 220ms que se autodestruye cuando ya no queda nada oculto. En un codebase normal alcanza con un `IntersectionObserver` bien configurado, pero **hay que verificar que dispare con el contenedor de scroll real de la app**.

**3. Interacción** — hover en filas de servicios, tiles de portfolio, botones, links y canales de contacto (detallados arriba).

### `prefers-reduced-motion`

Respetado. Con la preferencia activa: se desactivan `scroll-behavior:smooth`, todas las animaciones ambientales y la cinta; los reveals no se aplican (todo arranca visible); el parallax de scroll no se registra; los videos no autoplayean (sólo al hover).

### Tweak de movimiento

El prototipo expone una prop `motionLevel` con tres valores: `completo` (default) · `sutil` (animaciones ambientales al doble de duración, parallax a la mitad) · `ninguno` (equivalente a reduced-motion). Portar sólo si tiene sentido en el producto final.

### Scroll suave

`html { scroll-behavior: smooth }` y `scroll-margin-top: 110px` en cada sección ancla, para que el header sticky no tape los títulos.

---

## State management

Mínimo — es una landing casi estática:

| Estado | Tipo | Disparador | Efecto |
|---|---|---|---|
| `sent` | boolean | submit del formulario | Cambia el formulario por el mensaje de agradecimiento |
| menú mobile abierto | boolean | click en hamburguesa / en un link | Muestra u oculta el panel |
| servicio activo | índice 0–3 | `mouseenter` en una fila | Crossfade del preview + cambio de epígrafe |
| logo del header visible | boolean | posición de scroll | Fade del logo de la barra |

El formulario se envía directamente a Formspree desde el navegador; no requiere una función propia de Vercel ni variables de entorno.

---

## Assets

Todo en `assets/`. Los recursos de marca originales vienen del design system de Sortu (exportaciones de Canva).

### Logo

`assets/brand/iso-sortu.png` (358×285) + `assets/brand/wordmark-sortu.svg`.

El logo se compone como **lockup de dos piezas**: isotipo arriba, wordmark abajo, centrados, con un gap del 14.7% de la altura del isotipo. Proporción: `ancho del wordmark = 1.654 × altura del isotipo`.

**Por qué está partido:** Canva exportó el SVG con el isotipo como `<image>` vacíos, sin datos. Sólo el wordmark salió vectorial. Al separarlos, el texto —que es lo que más se notaba borroso a tamaño grande— quedó nítido, y el isotipo se usa a resolución nativa.

🔴 **Pendiente:** conseguir el isotipo en SVG real (seleccionándolo solo en Canva y exportando suele funcionar). Con eso, el logo pasa a ser 100% vectorial. `logo-sortu-color.png` (557×436) es el original completo, se deja como referencia.

### Formas orgánicas

`shape-ocre` · `shape-coral` · `shape-verde` · `shape-terracota` · `shape2-azul2` (media luna) — PNG con transparencia.

**No son originales del design system:** las extraje programáticamente de `formas-organicas.png` y `collage-dinamico.png` separando componentes conexos por color y rellenando huecos internos. Funcionan, pero son de resolución limitada. Si se consiguen las formas sueltas desde Canva, reemplazarlas.

Los collages completos (`collage-dinamico`, `collage-papeles`, `panel-vertical-azul`) **no se usan en la landing** — encerrarlos en cajas rectangulares fue explícitamente rechazado. Se incluyen sólo como referencia.

### Tipografía

`assets/fonts/EastmanGrotesque-{Light,Regular,Italic,Medium,DemiBold,Bold}.otf`. **Versiones trial** — comprar licencia y convertir a `.woff2` antes de producción.

### Iconos

Lucide, trazo de 2px, remates redondeados, caja 24×24, inline como SVG: `arrow-right`, `arrow-up-right`, `menu`, `phone`, `mail`, `instagram`. **Sin emoji en ninguna superficie** — es regla de marca.

### Contenido pendiente (todo placeholder)

**Videos** — el componente busca `.mp4` y `.mov` en este orden, autoplay `muted loop playsinline` al entrar en viewport, pausa al salir:

```
videos/reel.mp4                    → hero
videos/proyecto-1.mp4 … -4.mp4     → portfolio
videos/servicio-audiovisual.mp4    → preview de servicios
videos/servicio-digital.mp4
videos/servicio-estrategia.mp4
videos/servicio-contenido.mp4
```

**Fotos** — retratos de Martu y Guada, 4:5. Deben tener **tratamiento visual equivalente**: misma calidad, mismo encuadre, misma temperatura de color. La composición está diseñada asumiendo eso.

**Datos de contacto** — WhatsApp, mail e Instagram reales.

**Rótulos de portfolio** — cliente, proyecto y categoría confirmados.

---

## Files

```
Sortu Estudio - Landing.dc.html   El diseño. Todo el markup y la lógica.
support.js                        Runtime del prototipo. NO portar.
media-slot.js                     Slot de video/imagen: autoplay en viewport,
                                  fallback mp4→mov, placeholder, drag & drop.
image-slot.js                     Slot de imagen para los retratos.
ds/styles.css                     Entry point de tokens (8 @import).
ds/tokens/*.css                   Los tokens. Fuente de verdad de todos los valores.
assets/brand/*                    Logo, formas orgánicas, texturas.
assets/fonts/*                    Eastman Grotesque (trial).
```

Para ver el prototipo: abrir `Sortu Estudio - Landing.dc.html` en un navegador. Los errores de consola por `videos/*.mp4` son esperables — esos archivos todavía no existen.

---

## Criterio general — qué NO hacer

Estas decisiones costaron varias iteraciones. Respetarlas:

- **No encerrar collages ni formas en rectángulos.** Las formas van sueltas, sangrando fuera del layout, pasando por detrás del contenido. El video sí puede ser rectangular: es contenido audiovisual real.
- **No agregar recursos gráficos "porque existen".** Menos elementos, mejor colocados. Cada forma tiene que enmarcar contenido, equilibrar la composición o dar profundidad.
- **No introducir jerarquía entre Martu y Guada.** Nada de "perfil 1 / perfil 2".
- **No usar cards ni numeración en Servicios.** Es una lista editorial.
- **No inventar clientes, campañas, métricas ni promesas comerciales.**
- **No agregar texto explicativo de interfaz** ("los videos arrancan solos", etc.). El comportamiento tiene que ser evidente.
- **No usar emoji, ni gradientes de fondo, ni glassmorphism** (salvo el blur del header sticky), ni bordes de color a la izquierda de las cards.
- **No reescribir el copy** sin validarlo con las fundadoras.
