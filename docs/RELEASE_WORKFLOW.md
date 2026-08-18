# Flujo seguro de cambios y publicación

Objetivo: que una mejora nunca rompa la landing pública por accidente.

## Regla principal

`master` representa producción. No se desarrolla ni se experimenta directamente ahí. El recorrido obligatorio es:

```text
master estable → rama de cambio → prueba local → Preview de Vercel → aprobación → master → producción
```

## 1. Iniciar un cambio

1. Revisar `docs/LLM_HANDOFF.md` y `git status`.
2. Partir del último `master` estable y crear una rama con un nombre específico, por ejemplo `fix/footer-mails` o `feat/nuevo-proyecto`.
3. No mezclar assets personales, descargas ni cambios ajenos en el commit.

```bash
git switch master
git pull --ff-only origin master
git switch -c fix/descripcion-corta
```

Si hay cambios locales pendientes, no usar comandos destructivos para “limpiar”: resolver primero qué pertenece al cambio.

## 2. Control local

Trabajar con `npm run dev` y abrir `http://127.0.0.1:5173`.

Antes de compartir:

- Ejecutar `npm run build` sin errores.
- Revisar desktop ancho, una ventana desktop angosta, tablet/móvil y, si el cambio afecta interacción, el flujo real de click/teclado.
- Si toca portfolio: probar abrir/cerrar todos los reels.
- Si toca formulario: confirmar estados de enviando/error/éxito sin sustituir el endpoint de Formspree.
- Si toca hero: verificar que ninguna forma cruza texto, botones o cinta de servicios.

## 3. Preview antes de producción

Commit y push de **la rama**, nunca de `master`:

```bash
git add -- <solo los archivos del cambio>
git commit -m "fix: descripción concreta"
git push -u origin fix/descripcion-corta
```

Como el proyecto está conectado a Vercel, el push de una rama debería generar un deployment Preview. Confirmar su URL en Vercel o en el commit de GitHub y probar ese link desde el teléfono; ese paso descubre diferencias de navegador que localhost no muestra.

El usuario revisa el Preview y da un OK explícito. Sin OK, la rama sigue siendo una prueba y producción no cambia.

## 4. Publicar sólo la versión aprobada

Una vez aprobada, integrar esa misma rama en `master`, pushear y confirmar que Vercel sirva el commit correcto. Guardar el SHA en el mensaje de entrega.

```bash
git switch master
git pull --ff-only origin master
git merge --no-ff fix/descripcion-corta
git push origin master
```

La comprobación mínima de producción es abrir `https://sortu-estudio.vercel.app` con cache-busting (`?v=<sha>`) y revisar que el HTML/asset actualizado se esté sirviendo.

## 5. Volver atrás sin pánico

Cada commit en `master` es una versión recuperable. Ante una regresión pública:

1. Identificar el último SHA bueno.
2. Promover ese deployment desde el panel de Vercel **o** hacer un `git revert` del commit problemático y publicarlo.
3. No usar `git reset --hard` ni reescribir historia compartida.

## Cuándo parar y preguntar

No asumir autorización para:

- Cambiar copy aprobado, fuentes, colores o dirección visual.
- Cambiar proveedor del formulario, destinatarios o dominio.
- Eliminar/reemplazar videos, fotos o SVGs.
- Añadir analítica, cookies, trackers, pagos, acceso de usuarios o costos externos.

En esos casos, mostrar una propuesta concreta y esperar la decisión antes de tocar la rama.
