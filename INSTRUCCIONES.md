# GameHub - Aplicación de Consumo de API de Videojuegos

Aplicación web desarrollada con Next.js 16 y React 19 que consume la API de RAWG Video Games Database para mostrar catálogos de juegos organizados por género.

## 🎯 Requisitos Técnicos Implementados

### ✅ Peticiones Asíncronas
- Utiliza `fetch` con funciones asíncronas (`async/await`)
- Servicio centralizado en `src/services/gamesService.ts`
- Manejo apropiado de errores con try-catch

### ✅ Manejo de Estados de UI

#### 1. Loading (Cargando)
- **Componente**: `LoadingSpinner.tsx` - Spinner animado con CSS
- **Componente**: `SkeletonCard.tsx` - Skeleton loader para tarjetas
- Se muestra mientras la API responde

#### 2. Success (Éxito)
- **Componente**: `GameCard.tsx` - Tarjetas estéticas con información del juego
- **Componente**: `GameCarousel.tsx` - Carrusel horizontal con scroll
- Renderiza información de forma visual y organizada

#### 3. Error (Error)
- **Componente**: `ErrorMessage.tsx` - Mensaje de error amigable
- Incluye botón de "Reintentar"
- La aplicación no se rompe, manejo graceful de errores

## 🎮 Características

- **10 Géneros de Juegos**: Acción, Indie, Aventura, RPG, Estrategia, Shooter, Simulación, Puzzle, Carreras, Deportes
- **Carruseles Horizontales**: Navegación fluida con botones de scroll
- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Dark Mode**: Soporte para tema oscuro automático
- **Animaciones Suaves**: Transiciones y efectos hover
- **TypeScript**: Tipado estático para mayor seguridad

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar API Key

1. Visita [RAWG API Documentation](https://rawg.io/apidocs)
2. Crea una cuenta gratuita y obtén tu API key
3. Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.local.example .env.local
```

4. Edita `.env.local` y agrega tu API key:

```env
NEXT_PUBLIC_RAWG_API_KEY=tu_api_key_real_aqui
```

### 3. Ejecutar la Aplicación

```bash
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

La aplicación se ejecutará en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página de inicio con carruseles
├── components/
│   ├── ErrorMessage.tsx     # Componente de error
│   ├── GameCard.tsx         # Tarjeta de juego
│   ├── GameCarousel.tsx     # Carrusel por género
│   ├── LoadingSpinner.tsx   # Spinner de carga
│   └── SkeletonCard.tsx     # Skeleton loader
├── services/
│   └── gamesService.ts      # Servicio de API con async/await
└── types/
    └── game.ts              # Tipos TypeScript
```

## 🎨 Tecnologías Utilizadas

- **Next.js 16** - Framework de React
- **React 19** - Biblioteca de UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Estilos utility-first
- **RAWG API** - Base de datos de videojuegos

## 📚 Componentes Principales

### GameCarousel
Carrusel horizontal que muestra juegos por género con:
- Estados de loading, success y error
- Scroll horizontal suave
- Botones de navegación
- Carga asíncrona de datos

### GameCard
Tarjeta individual de juego que muestra:
- Imagen del juego
- Título
- Rating con estrellas
- Géneros
- Plataformas
- Metacritic score
- Efectos hover animados

### ErrorMessage
Mensaje de error amigable con:
- Icono visual
- Mensaje descriptivo
- Botón de reintentar
- Diseño responsive

## 🎓 Universidad Politécnica de Chiapas

**Docente**: Viviana López Rojo  
**Materia**: Desarrollo de Aplicaciones Web  
**Tema**: Consumo de APIs con Peticiones Asíncronas

## 📝 Notas Importantes

1. **API Key Gratuita**: La API de RAWG ofrece 20,000 solicitudes gratuitas por mes
2. **Rate Limiting**: Respeta los límites de la API para evitar bloqueos
3. **Imágenes**: Las imágenes se cargan bajo demanda con el componente Image de Next.js
4. **SEO**: Optimizado para motores de búsqueda con Next.js

## 🐛 Solución de Problemas

### Error: "Missing API Key"
- Verifica que el archivo `.env.local` existe
- Asegúrate de que la variable se llama `NEXT_PUBLIC_RAWG_API_KEY`
- Reinicia el servidor de desarrollo después de agregar la API key

### Error: "Cannot read properties of undefined"
- Verifica tu conexión a internet
- Confirma que la API key es válida
- Revisa la consola del navegador para más detalles

### Las imágenes no cargan
- La API puede no tener imágenes para algunos juegos
- Es comportamiento normal, se muestra un placeholder

## 📄 Licencia

Este proyecto es para fines educativos.

---

Desarrollado con ❤️ para la Universidad Politécnica de Chiapas
