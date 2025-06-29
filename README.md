# Rueda-Fortuna-NestJS-NextJS
Juego interactivo de la Rueda de la Fortuna con frontend en Next.js (React/Material-UI) y backend en NestJS (Node.js/Prisma/SQLite) con gestión de saldos y premios.

Demo: https://rueda-fortuna-nest-js-next-js-santiagourdanetas-projects.vercel.app/  

# 🎰 Rueda de la Fortuna Interactiva - Juego Web (Next.js & NestJS)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-v10-red.svg?logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-v14-black.svg?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-v18-blue.svg?logo=react)](https://react.dev/)
[![SQLite](https://img.shields.io/badge/SQLite-blue.svg?logo=sqlite)](https://www.sqlite.org/index.html)
[![Material-UI](https://img.shields.io/badge/Material--UI-v5-blue.svg?logo=mui)](https://mui.com/)
[![GSAP](https://img.shields.io/badge/GSAP-green.svg?logo=greensock)](https://greensock.com/gsap/)

Este proyecto es un **juego interactivo de la Rueda de la Fortuna** desarrollado como una aplicación web completa (_full-stack_), demostrando la integración y comunicación entre un frontend moderno y un backend robusto. Permite a los usuarios girar una rueda para ganar premios simulados, gestionando su saldo y un historial de giros.

---

## ✨ **Características Principales**

* **Frontend en Next.js:** Interfaz de usuario dinámica y responsiva construida con React y estilizada con Material-UI.
* **Animaciones con GSAP:** Rueda de la fortuna animada de forma fluida y atractiva.
* **Backend en NestJS:** API RESTful robusta y modular para la lógica del juego.
* **Gestión de Saldo:** Simulación de un balance de usuario, con costo por giro y adición de premios.
* **Ponderación de Premios:** Probabilidades ajustadas para cada premio (ej. premios grandes son más raros).
* **Historial de Giros:** Visualización de los últimos giros y premios obtenidos por el usuario.
* **Base de Datos SQLite:** Almacenamiento ligero y persistente para datos de usuarios y giros.
* **ORM Prisma:** Abstracción eficiente para interactuar con la base de datos.
* **Comunicación Cliente-Servidor:** Uso de **Axios** para peticiones HTTP entre frontend y backend, incluyendo configuración de **CORS**.
* **Mensajes Dinámicos y Carga:** Mejora de la experiencia de usuario con retroalimentación visual en tiempo real.

---

## 🚀 **Cómo Empezar (Modo de Desarrollo)**

Para poner en marcha este proyecto, necesitas tener [Node.js](https://nodejs.org/) (versión 18 o superior) y [npm](https://www.npmjs.com/) instalados en tu sistema.

### 1. **Clonar el Repositorio**

```bash
git clone https://github.com/santiagourdaneta/Rueda-Fortuna-NestJS-NextJS/
cd Rueda-Fortuna-NestJS-NextJS

2. Configuración del Backend (NestJS)
Navega a la carpeta del backend, instala las dependencias y prepara la base de datos

cd backend
npm install
npx prisma migrate dev --name init # Esto creará la base de datos SQLite y las tablas.
npm run start:dev # Inicia el servidor backend en http://localhost:3000

Asegúrate de que el backend se inicie correctamente y muestre Nest application successfully started.

3. Configuración del Frontend (Next.js)
Abre una nueva terminal, navega a la carpeta del frontend, instala las dependencias e inicia el servidor de desarrollo.

cd ../frontend # Vuelve a la raíz del proyecto y luego entra a la carpeta 'frontend'
npm install
npm run dev # Inicia el servidor frontend en http://localhost:3001

4. ¡Juega!
Una vez que ambos servidores estén corriendo (backend en http://localhost:3000 y frontend en http://localhost:3001), abre tu navegador web y visita:

http://localhost:3001

📂 Estructura del Proyecto

Rueda-Fortuna-NestJS-NextJS/
├── .gitignore
├── README.md
├── backend/
│   ├── src/
│   │   ├── main.ts             # Punto de entrada del backend
│   │   ├── app.module.ts       # Módulo principal de NestJS
│   │   ├── prisma/             # Configuración de Prisma y esquema de DB
│   │   │   └── schema.prisma
│   │   └── user/               # Módulo de usuarios (lógica del juego, saldo, giros)
│   │       ├── user.controller.ts
│   │       ├── user.module.ts
│   │       └── user.service.ts
│   ├── prisma/
│   │   └── dev.db              # Archivo de base de datos SQLite (generado)
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── app/
    │   ├── page.tsx            # Componente principal de la página (la Rueda)
    │   └── layout.tsx          # Layout de la aplicación
    ├── public/                 # Archivos estáticos
    ├── package.json
    ├── next.config.mjs
    └── tsconfig.json

🛠️ Tecnologías Utilizadas

Frontend:
Next.js (Framework de React)
React (Biblioteca UI)
Material-UI (MUI) (Componentes de UI)
GSAP (Biblioteca de animación)
Axios (Cliente HTTP)
TypeScript

Backend:
NestJS (Framework Node.js)
Node.js
Prisma ORM
SQLite (Base de datos)
TypeScript

🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, siéntete libre de abrir un issue o enviar un pull request.




`Rueda de la Fortuna`, `Juego Web`, `Next.js`, `NestJS`, `React`, `Material-UI`, `GSAP`, `TypeScript`, `Node.js`, `Full-Stack`, `SQLite`, `Prisma`, `Backend`, `Frontend`, `Juego Interactivo`, `Desarrollo Web`
