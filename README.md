# Portafolio — DevPortfolio

Sitio estático (HTML, CSS y JavaScript) listo para publicar en **GitHub** y desplegar en **Vercel**.

## Desarrollo local

Requisitos: [Node.js](https://nodejs.org/) (LTS recomendado).

```powershell
cd "c:\Users\andre\Desktop\Portafolio"
npm install
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:3000`).

---

## 1. Crear cuenta y subir el proyecto a GitHub

### 1.1 Crear cuenta

1. Entra en [https://github.com/signup](https://github.com/signup) y crea tu cuenta.
2. Verifica tu correo si GitHub lo pide.

### 1.2 Instalar Git (si no lo tienes)

1. Descarga Git desde [https://git-scm.com/download/win](https://git-scm.com/download/win).
2. Instálalo con las opciones por defecto.
3. Abre una terminal nueva y comprueba:

```powershell
git --version
```

### 1.3 Crear el repositorio en GitHub

1. En GitHub: **New repository**.
2. Nombre sugerido: `portafolio` (o el que prefieras).
3. Deja el repositorio **vacío** (sin README, sin .gitignore; ya están en este proyecto).
4. Copia la URL del repo, por ejemplo: `https://github.com/TU_USUARIO/portafolio.git`

### 1.4 Primer commit y subida (en tu PC)

Desde la carpeta del proyecto:

```powershell
cd "c:\Users\andre\Desktop\Portafolio"
git init
git add .
git commit -m "Initial commit: portfolio static site"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/portafolio.git
git push -u origin main
```

La primera vez, GitHub puede pedirte iniciar sesión (navegador o token personal).

> **Importante:** `node_modules` y `.env` no se suben gracias al `.gitignore`.

---

## 2. Crear cuenta y desplegar en Vercel

### 2.1 Crear cuenta

1. Entra en [https://vercel.com/signup](https://vercel.com/signup).
2. Regístrate con la misma cuenta de **GitHub** (recomendado): así Vercel puede importar tus repos automáticamente.

### 2.2 Importar el proyecto

1. En el dashboard de Vercel: **Add New… → Project**.
2. Elige el repositorio `portafolio` (o el nombre que hayas usado).
3. Vercel detectará un sitio estático. La configuración recomendada es:

| Campo | Valor |
|--------|--------|
| Framework Preset | **Other** |
| Root Directory | `./` |
| Build Command | *(vacío)* |
| Output Directory | `./` |
| Install Command | *(vacío o `npm install` si quieres; no es necesario para el deploy)* |

4. Pulsa **Deploy**.

El archivo `vercel.json` ya define URLs limpias (`/floreria` en lugar de `/floreria.html`) y caché para los archivos de idioma en `locales/`.

### 2.3 Dominio

Tras el deploy, Vercel te dará una URL tipo `https://portafolio-xxx.vercel.app`. Puedes cambiar el nombre del proyecto en **Settings → Domains** o conectar un dominio propio más adelante.

---

## 3. Flujo de trabajo después del primer deploy

Cada vez que hagas cambios:

```powershell
git add .
git commit -m "Describe tu cambio"
git push
```

Vercel **vuelve a desplegar automáticamente** en cada push a `main` (si conectaste GitHub al importar el proyecto).

---

## Estructura relevante

| Archivo / carpeta | Uso |
|-------------------|-----|
| `index.html` | Página principal |
| `*.html` | Páginas de proyectos (case studies) |
| `locales/` | Traducciones (i18n) |
| `vercel.json` | Configuración de despliegue en Vercel |
| `.gitignore` | Archivos que no deben ir a GitHub |
| `.env.example` | Plantilla para variables secretas (futuro formulario) |

---

## Formulario de contacto (futuro)

El envío real por email está preparado en comentarios en `script.js` (`/api/send`). Cuando quieras activarlo, necesitarás una función serverless en Vercel y variables en `.env` (ver `.env.example`). Hasta entonces, el formulario simula el envío en el navegador.

---

## Problemas frecuentes

**Git pide usuario/contraseña en cada push**  
Usa [GitHub CLI](https://cli.github.com/) (`gh auth login`) o un [Personal Access Token](https://github.com/settings/tokens) en lugar de la contraseña de la cuenta.

**Vercel no encuentra `index.html`**  
Comprueba que **Root Directory** y **Output Directory** sean `./` y que el commit en GitHub incluya `index.html` en la raíz del repo.

**Las traducciones no cargan en producción**  
Asegúrate de que la carpeta `locales/` esté en el repositorio (`git add locales/`).
