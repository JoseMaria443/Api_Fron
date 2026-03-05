# 🎮 GameHub - Guía Rápida de Inicio

## ⚡ Inicio Rápido (3 pasos)

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Configurar API Key

Obtén tu API key GRATUITA aquí: https://rawg.io/apidocs

Crea el archivo `.env.local`:
```bash
NEXT_PUBLIC_RAWG_API_KEY=tu_api_key_aqui
```

### 3️⃣ Ejecutar la aplicación
```bash
npm run dev
```

Abre tu navegador en: http://localhost:3000

---

## ✅ Checklist de Requisitos Técnicos

### Peticiones Asíncronas
- ✅ Uso de `fetch` con `async/await`
- ✅ Servicio centralizado en `src/services/gamesService.ts`
- ✅ Manejo de errores con try-catch

### Estados de UI

#### Loading
- ✅ `LoadingSpinner.tsx` - Spinner animado
- ✅ `SkeletonCard.tsx` - Skeleton loader
- ✅ Se muestra durante la carga de datos

#### Success
- ✅ `GameCard.tsx` - Tarjetas estéticas
- ✅ `GameCarousel.tsx` - Carruseles por género
- ✅ Información renderizada de forma visual

#### Error
- ✅ `ErrorMessage.tsx` - Mensaje amigable
- ✅ Botón de reintentar
- ✅ Aplicación no se rompe

### Diseño
- ✅ 10 Géneros (Acción, Aventura, RPG, etc.)
- ✅ Carruseles horizontales con scroll
- ✅ Vista organizada por categorías
- ✅ Diseño responsive

---

## 📂 Archivos Creados

```
✅ src/types/game.ts              - Tipos TypeScript
✅ src/services/gamesService.ts   - Servicio de API
✅ src/components/LoadingSpinner.tsx
✅ src/components/SkeletonCard.tsx
✅ src/components/ErrorMessage.tsx
✅ src/components/GameCard.tsx
✅ src/components/GameCarousel.tsx
✅ src/hooks/useApiState.ts       - Hook personalizado
✅ src/app/page.tsx               - Página principal
✅ src/app/globals.css            - Estilos personalizados
✅ .env.local.example             - Ejemplo de variables
✅ INSTRUCCIONES.md               - Documentación completa
```

---

## 🎯 Funcionalidades Implementadas

1. **Carruseles por Género**: 10 categorías principales
2. **Scroll Horizontal Suave**: Con botones de navegación
3. **Loading States**: Spinners y skeletons
4. **Error Handling**: Mensajes amigables con retry
5. **Diseño Responsive**: Móvil, tablet y desktop
6. **Dark Mode**: Tema oscuro automático
7. **Animaciones**: Transiciones suaves
8. **TypeScript**: Código con tipado fuerte
9. **Next.js 16**: Última versión con optimizaciones
10. **Tailwind CSS**: Estilos modernos y responsive

---

## 🐛 Problemas Comunes

**No funciona la aplicación:**
- Verifica que creaste el archivo `.env.local`
- Asegúrate de que la API key es válida
- Reinicia el servidor (`npm run dev`)

**Las imágenes no cargan:**
- Es normal, algunos juegos no tienen imágenes
- Se muestra un placeholder automáticamente

---

## 📞 Soporte

Para más información, consulta `INSTRUCCIONES.md`

Universidad Politécnica de Chiapas
Docente: Viviana López Rojo
