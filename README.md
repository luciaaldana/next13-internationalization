# INTERNACIONALIZACIÓN EN NEXT.JS 13 SIN USAR I18NEXT

En este artículo te mostraré cómo aplicar la internacionalización en next js 13 con app directory `sin i18next`.

Si tu proyecto es pequeño, disfrutarás de algunas ventajas al hacerlo de este modo, ya que esta solución simplifica tanto el código como su mantenimiento y reduce al mínimo la cantidad de dependencias necesarias.

Pero si tu proyecto crece o es grande, tendrás algunas desventajas si requieres de características avanzadas de internacionalización, como la [interpolación](https://www.i18next.com/translation-function/interpolation), implementar tu propia solución puede volverse complicado, propenso a errores e implicaría más trabajo manual. En ese caso te recomiendo utilizar i18next. Si quieres ver cómo hacerlo, puedes verlo en este [artículo]().

```
UTILIZA ESTE PROYECTO:

git clone https://github.com/luciaaldana/next13-internationalization.git

cd next13-internationalization
npm install

npm run dev
```

---

# PASOS:

🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻

## 🏁 Crear el proyecto

Si ya tienes tu proyecto, puedes saltar este paso.

```bash
npx create-next-app@latest
```

What is your project named? … next13-internationalization

✔ Would you like to use TypeScript? … No / Yes ✅

✔ Would you like to use ESLint? … No / Yes ✅

✔ Would you like to use Tailwind CSS? … No / Yes ❌

✔ Would you like to use `src/` directory? … No / Yes ✅

✔ Would you like to use App Router? (recommended) … No / Yes ✅

✔ Would you like to customize the default import alias? … No / Yes ❌

```bash
cd next13-internationalization
```

---

🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻

## ⬇ Instalar paquetes

```bash
npm install @formatjs/intl-localematcher negotiator
npm i --save-dev @types/negotiator
```

Estos dos módulos nos ayudarán a adapatarnos a las preferencias del usuario al seleccionar automáticamente el idioma más apropiado para el usuario en función de las preferencias de idioma proporcionadas en las cabeceras HTTP y la configuración de internacionalización que definiremos.

---

🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻

## ⚙️ Enrutamiento

#### (1) Creamos un archivo lng-config.ts:

```javascript

📂 src => 📄 lng-config.ts

```

[Link al archivo lng-config.ts](src/lng-config.ts)

En este archivo definimos los lenguajes que vamos a utilizar y el lenguaje por defecto.

En este caso usaré los lenguajes español e inglés, pero puedes agregar tantos como quieras.

También definiremos las secciones que tendrán los diccionarios, por ejemplo podemos definir por pages: 'home', 'second-page'.
Esta división de secciones nos ayudará a mantener una estructura más clara y limpia para manejar las traducciones.

#### (2) Creamos un archivo middleware.ts:

```javascript

📂 src => 📄 middleware.ts

```

[Link al archivo middleware.ts](src/middleware.ts)

Aqui creamos un middleware para utilizar el lenguaje del navegador del usuario.

Si cambia su lenguaje preferido, cambiará el 'accept-language' que definimos en headers.

#### (3) Creamos el diccionario de traducciones que vamos a utilizar:

El diccionario es la base de nuestra internacionalización que nos permite ofrecer la experiencia de usuario en diferentes idiomas.

En una carpeta llamada **dictionaries**, organizaremos los archivos de internacionalización de una manera estructurada. Creamos carpetas dentro de **dictionaries** con el nombre de un idioma específico, como 'es' para español, 'en' para inglés, como definimos en **locales** en el archivo **lng-config.ts**.

Dentro de cada una de estas carpetas de idioma, crearemos los archivos .json que contendrán las traducciones para cada sección que también definimos en el archivo lng-config.ts, como 'home' y 'second-page'. Todos los json deben respetar la misma estructura en cada carpeta.

```javascript

// la carpeta `en` será el diccionario para las traducciones en inglés.
// Dentro tendremos los json que serán cada sección que definimos en i18n-config.ts

📂 src => 📂 dictionaries => 📂 en => 📄 home.json
📂 src => 📂 dictionaries => 📂 en => 📄 second-page.json

// la carpeta `es` será el diccionario para las traducciones en español.
// Dentro tendremos los json que serán cada sección que definimos en i18n-config.ts

📂 src => 📂 dictionaries => 📂 es => 📄 home.json
📂 src => 📂 dictionaries => 📂 es => 📄 second-page.json
```

[Link al archivo es.json](src/dictionaries/es.json)

#### (4) Creamos la función para traer el diccionario que necesitamos según el lenguaje seleccionado:

```javascript

📂 src => 📄 get-dictionary.ts

```

[Link al archivo get-dictionary.ts](src/get-dictionary.ts)

Aquí tendremos una función que recibe el lenguaje que estamos utilizando y la sección en la que estamos. Esto devuelve el archivo json que creamos en `dictionaries` que corresponde a ese lenguaje y sección.

#### (5) En el layout.tsx agregamos los lenguajes:

Utilizamos `generateStaticParams` para añadir el idioma al HTML.

[Link al layout.tsx](src/app/%5Blang%5D//layout.tsx)

---

🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻

## 🌈 Usar las traducciones en Server Component

[Link a la Page.tsx](src/app/%5Blang%5D//page.tsx)

El componente Home utiliza la función `getDictionary` para obtener las traducciones y configuraciones necesarias para mostrar contenido multilingüe en nuestra aplicación. Para asegurarnos de que la aplicación funcione de manera fluida y que no se bloquee mientras espera que las traducciones se carguen, utilizamos async/await al llamar a getDictionary.

La función getDictionary requiere dos parámetros:

- El lenguaje: estará disponible por parámetros, cómo definimos en el layout.tsx.
- La sección: la importamos desde la definición de sections en el archivo lng-config.ts para evitar errores tipográficos.

Entonces getDictionary me devolverá el archivo json de la sección que indicamos y del diccionario que estemos utilizando.

## 🌈 Usar las traducciones en Client Component

[Link a la Page.tsx](src/app/%5Blang%5D//page.tsx)

[Link al componente SwitchLng](src/components/SwitchLng/index.tsx)

El componente `SwitchLng` es un Client Component.
Recibirá las traducciones por parámetro, directamente el String que va a mostrar.

Recordar agregar en el componente el type para este parámetro, ejemplo:

```javascript
dictionary: Record<string, string>
```

---

🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻🔻

## 🔥 Crear un Switch de lenguaje

Para cambiar de lenguaje, lo que hacemos es usar la ruta dinámica que creamos con la carpeta [lng]. Entonces debemos navegar a la ruta del lenguaje que queramos.

El componente será un client component porque usaremos el hook usePathname.

Este hook (`usePathname`) es necesario para hacer la navegación en caso de que tengamos una url con más partes que el dominio, por ejemplo /second-page que tenemos definida en esta estructura. Tomamos el path completo y luego con una expresión regular, reemplazamos el lenguaje por el que elegimos en el switch.

En langRegex modificamos nuestro array de languajes definido en lng-config.ts para usarlo en la expresión regular y no tener que agregar manualmente al switch algún idioma extra.

En el atributo href del elemento Link, sustituimos el idioma actual en la ruta de acceso (pathname) con el idioma que hemos seleccionado en el interruptor de idiomas. Esto nos permite navegar a la misma página con el nuevo idioma elegido.

[Link al componente SwitchLng](src/components/SwitchLng/index.tsx)

## Referencias

https://nextjs.org/docs/app/building-your-application/routing/internationalization

https://github.dev/vercel/next.js/tree/canary/examples/app-dir-i18n-routing
