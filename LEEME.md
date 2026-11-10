# Web de servicios · ByRuby12

## Abrir la web

Extrae TODO el ZIP en una carpeta. Para probar el formulario y el editor, sirve la carpeta con un servidor HTTP estático (por ejemplo, `python -m http.server`) y abre la dirección local en un navegador moderno. No abras el HTML dentro del ZIP: necesita los archivos que lo acompañan.

## Estructura

- `index.html`: contenido y estructura de la web. Incluye el catálogo inicial como datos JSON.
- `css/styles.css`: estilos, diseño responsive, estados hover, transiciones y animaciones.
- `js/app.js`: catálogo interactivo, búsqueda, filtros, galerías, sonidos, navegación y editor.
- `assets/brand/`: tu logotipo completo y personaje, optimizados para web y con transparencia conservada.
- `assets/showcase/`: imágenes de los proyectos de muestra.
- `assets/fonts/`: tipografía local. No se descarga de servicios externos.
- `assets/docs/`: documentos públicos, incluido el CV.
- `.nojekyll`: archivo para publicación estática en GitHub Pages.

No necesita instalar dependencias, compilar ni utilizar un servidor de aplicación. No se ha publicado en tu cuenta de GitHub: tú puedes subir este paquete cuando quieras.

## Qué cambia en esta versión

- HTML, CSS y JavaScript separados.
- Tus dos logotipos originales integrados en cabecera, presentación y sección de marca.
- Tipografía local y títulos con animación de entrada.
- Fondo con partículas sutiles y luces ambientales.
- Tarjetas con relieve, luz y movimiento al pasar el ratón.
- Botones con brillo, respuesta magnética moderada y efecto de pulsación.
- Apertura animada de fichas, imágenes y editor.
- Transición al cambiar de categoría cuando el navegador la admite.
- Búsqueda de servicios por título, descripción e incluidos, también sin tildes.
- Menú móvil, progreso de lectura y botón para volver arriba.
- Navegación directa a Inicio, Servicios, Proyectos, Proceso, Preguntas frecuentes, Clientes y Contacto.
- Sonidos de interfaz opcionales; apagados al entrar.
- Respeto por el movimiento reducido configurado en el dispositivo. El efecto 3D de tarjetas se desactiva en pantallas táctiles.
- Los diez servicios, precios y condiciones anteriores se conservan.
- El panel `/admin/` también permite editar email, horario, enlaces del CV, portfolio y redes, fondo de preguntas y tipografía.
- SEO técnico con título y metadatos sociales, datos estructurados, URL canónica, `robots.txt` y sitemap para la URL pública indicada.
- Formulario de contacto con envío AJAX mediante FormSubmit y borrador de Gmail como alternativa ante errores.
- Sección de clientes: más de 54 clientes durante el último año, sumando todos los servicios. Pedro, Viviana, Isra, Eduardo y Lester estuvieron entre los primeros clientes de hostelería.
- Enlace al portfolio para consultar trabajos reales; la galería local se mantiene identificada como material de muestra.
- La galería se identifica como una selección de muestras visuales, no como una lista de encargos reales.
- Condiciones visibles: la mayoría de los encargos suele entregarse en 24–48 horas; trabajos por adelantado y cuotas mensuales al inicio del mes. Transferencia bancaria o efectivo para negocios cercanos si se acuerda.
- El mantenimiento web incluye hasta cuatro horas al mes para los cambios descritos en el catálogo; las horas extra cuestan 20 €/hora y requieren aprobación. La atención se ofrece en el horario editable de la web.
- El formulario explica qué datos se envían mediante FormSubmit y ofrece un borrador de Gmail si el envío da error.
- Para webs con entrega de código, se prepara un repositorio gratuito y se ofrece mantenimiento mensual. Dominio propio, hosting de pago y licencias se ofrecen aparte con coste adicional.

## Añadir tus imágenes y editar servicios

1. Abre la ruta `/admin/` de la web publicada o el archivo `admin/index.html` en una previsualización local.
2. Abre **Ajustes de la web** para modificar el email, el horario, el CV, el portfolio, las redes, el fondo de preguntas frecuentes y el estilo tipográfico.
3. Selecciona un servicio y modifica sus textos, precio o condiciones. Pulsa **Guardar ficha**.
4. Añade imágenes JPG, PNG o WebP, una o varias. Se optimizan para web a un máximo de 1600 píxeles de lado; tus originales no se modifican.
5. Usa **Portada** para elegir la imagen principal o **Quitar** para retirarla.
6. Puedes crear fichas con **Nuevo servicio**. Se crean ocultas hasta que actives **Mostrar este servicio**.
7. Para publicar lo editado, pulsa **Exportar index.html actualizado**.
8. Sustituye `index.html` en la carpeta de la web o en tu repositorio, conservando `css/`, `js/` y `assets/` junto a él.

Las imágenes añadidas desde el editor se integran en el archivo exportado como datos de imagen: no tienes que subirlas por separado. Las diez fichas incluyen imágenes numeradas en `assets/imagenes/` para sus galerías verticales. En las tarjetas exteriores se muestran las miniaturas 16:9 optimizadas en `assets/imagenes/vistas/portada-<servicio>.jpg`, generadas desde los PNG originales 1920×1080 de `assets/miniatura/`. Si añades imágenes propias, se mantienen como portada y galería en lugar de sustituirse por las predeterminadas. El pack Creador muestra sus seis imágenes en orden numérico, incluida la imagen `03` de stickers y portadas. La galería usa diez muestras independientes en `assets/showcase/`; puedes sustituir esos archivos conservando sus nombres y extensiones.

El editor guarda borradores en este navegador mediante IndexedDB, cuando está disponible. NO modifica tu repositorio ni el servidor público. `/admin/` no aparece enlazado desde la web pública y lleva una indicación `noindex`, pero GitHub Pages es hosting estático: la ruta no tiene contraseña ni control de acceso y cualquiera que conozca la URL puede abrirla. Los cambios locales no se comparten con otros visitantes. No guardes datos privados ni contraseñas en el catálogo público.

El editor exporta solamente el HTML con el catálogo actualizado; el ZIP inicial contiene toda la web. Si cambias de carpeta, ordenador o alojamiento, lleva contigo también las carpetas `css/`, `js/` y `assets/`.

## Copias y migración

- **Copia del catálogo (.json)** guarda una copia del contenido y sus imágenes añadidas.
- **Importar copia** recupera una copia válida; pide confirmación antes de sustituir el catálogo.
- Si ya editaste la versión anterior, exporta allí el JSON e impórtalo aquí para trasladar los textos e imágenes.
- Guarda una copia antes de borrar los datos del navegador.
- Si un borrador local es más reciente que el archivo abierto, la web mostrará ese borrador. Para revisar solo lo publicado, utiliza un navegador sin ese borrador.
- Las copias que hagan referencia a imágenes iniciales necesitan conservar `assets/`.

## Publicar en GitHub Pages

1. Sube el CONTENIDO de la carpeta a la raíz de tu repositorio: `index.html`, `admin/`, `css/`, `js/`, `assets/`, `robots.txt`, `sitemap.xml` y `.nojekyll`.
2. Activa GitHub Pages para la rama y carpeta raíz elegidas.
3. Abre la URL que te proporcione GitHub cuando termine la publicación.
4. Para actualizar el catálogo, sustituye `index.html` por el exportado desde el editor.

Si editas el diseño en un editor de código, trabaja en `css/styles.css`; para las interacciones, en `js/app.js`. No cambies los identificadores de elementos sin actualizar sus referencias en JavaScript.

## Contacto, formulario y servicios

Tomás Cano · ByRuby12
byruby12.contacto@gmail.com
Instagram: @byruby12
Horario: lunes a viernes, 10:00–18:00.

El formulario envía mediante FormSubmit el servicio, nombre, correo de respuesta y mensaje a `byruby12.contacto@gmail.com`. Si el servicio devuelve un error, conserva los datos y ofrece un enlace a Gmail con un borrador preparado. La dirección del formulario ya está activada; no se ha realizado un envío real de prueba para evitar mandar datos a la bandeja.

La URL canónica, los metadatos para compartir y el sitemap están configurados para `https://byruby12.github.io/ByRuby12-Servicios/`. Si publicas con otro dominio o ruta, actualiza esas URLs antes de publicar. Una vez en línea, puedes registrar la página en Google Search Console y enviar `/ByRuby12-Servicios/sitemap.xml`.

Servicios: e-commerce, web profesional, Pack Creador, contactos en Excel, mantenimiento web, Universal Works, carteles/flyers/cartas, carta digital para hostelería, retoque fotográfico y publicidad de gran formato.

Los montajes de la galería son ejemplos ilustrativos. La galería no cambia al editar las imágenes de los servicios. Al recuperar borradores de versiones anteriores se retiran solo las antiguas imágenes predeterminadas; se conservan las fotos que añadiste desde el editor.

## Verificación

Superadas las comprobaciones de sintaxis, referencias a archivos, diez servicios, filtros, búsqueda, estados sin resultados, fichas, serialización e importaciones inválidas mediante pruebas del código.

La cabecera, la galería, el contacto, el formulario y el pie se verifican también en una previsualización local y en tamaños de escritorio y móvil. La disposición móvil se comprueba desde 320 px hasta 700 px, sin desbordamiento horizontal; también se comprueba la ficha ampliada de servicio en 320 px. El pie incluye tarjetas para el CV y el portfolio, y un acceso al correo con asunto y texto inicial preparados. El envío del formulario debe probarse con una consulta real desde la web publicada; las comprobaciones locales no mandan datos a la bandeja.

## Actualización visual

La galería presenta tres muestras a la vez en escritorio y permite recorrer las diez con flechas; en pantallas pequeñas se adapta al ancho disponible. Las barras de desplazamiento se ocultan sin desactivar el desplazamiento de la página. La galería de muestras se crea una sola vez y no se reconstruye al buscar o filtrar servicios. Las animaciones decorativas se pausan cuando sus secciones salen de pantalla y las partículas solo se activan en dispositivos con puntero preciso. El formulario envía el servicio, nombre, dirección de respuesta y mensaje mediante FormSubmit, y ofrece un borrador de Gmail si el servicio devuelve un error. El botón de cada ficha lleva al formulario con ese servicio ya seleccionado. Los estilos móviles se ajustan para pantallas estrechas y táctiles: cabecera compacta, controles accesibles, campos de una columna, tarjetas y modales adaptables, y redes sociales que se redistribuyen sin desbordarse. El pie organiza en bloques la navegación, las nueve redes/perfiles con iconos, el CV, el portfolio, el email y el horario. Los fondos alternan entre secciones para mejorar el contraste; las preguntas frecuentes usan una franja clara de lado a lado. La sección de clientes muestra proyectos de hostelería, no citas inventadas. El cursor de marca no tiene retardo y respeta el movimiento reducido; en dispositivos táctiles se conserva el comportamiento nativo.
