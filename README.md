# INTERNACIONALIZACIÓN EN NEXT.JS 13 SIN USAR I18NEXT

```
UTILIZA ESTE PROYECTO:

git clone https://github.com/luciaaldana/next13-internationalization.git

cd next13-internationalization
npm install

npm run dev
```

---

# PASOS:

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

## ⬇ Instalar paquetes

```bash
npm install @formatjs/intl-localematcher negotiator
npm i --save-dev @types/negotiator
```

---

## ⚙️ Enrutamiento

#### (1) Creamos un archivo i18n-config.ts:

```javascript

📂 src => 📄 i18n-config.ts

```

[Link al archivo i18n-config.ts](src/i18n-config.ts)

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

Agrega tantos archivos json como lengaujes tengas.

Todos los json deben respetar la misma estructura.

#### (3) Creamos la función para traer el diccionario que necesitamos según el lenguaje seleccionado:

```javascript

📂 src => 📄 get-dictionary.ts

```

[Link al archivo get-dictionary.ts](src/get-dictionary.ts)

Aquí tendremos una función que recibe el lenguaje que estamos utilizando y la sección en la que estamos. Esto devuelve el archivo json que creamos en `dictionaries` que corresponde a ese lenguaje y sección.

#### (4) En el layout.tsx agregamos los lenguajes:

Utilizamos `generateStaticParams` para añadir el idioma al HTML.

---

## 🌈 Usar las traducciones en Server Component

[Link a la Page.tsx](src/app/%5Blang%5D//page.tsx)

El componente será asíncrono, utilizaremos `async/await`, para resolver la promesa de `getDictionary`.

El lenguaje estará disponible por parámetros, cómo definimos en el `layout.tsx`.

La sección la importamos desde la definición de sections en el archivo `i18n-config.ts` para evitar errores tipográficos.

Entonces getDictionary me devuelve el archivo json de la sección que indicamos y del direccionario que estamos utilizando.

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

## Referencias

https://nextjs.org/docs/app/building-your-application/routing/internationalization

https://github.dev/vercel/next.js/tree/canary/examples/app-dir-i18n-routing
