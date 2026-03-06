# Consumo RAWG desde Frontend (sin backend)

Este frontend en Next.js consume la API de RAWG directamente, sin usar el proyecto `API_back` ni Docker.

## Configuración

1. Crea o edita el archivo `.env.local`:

```env
NEXT_PUBLIC_RAWG_API_KEY=tu_api_key_de_rawg
NEXT_PUBLIC_RAWG_BASE_URL=https://api.rawg.io/api
```

2. Instala dependencias:

```bash
npm install
```

3. Ejecuta en local:

```bash
npm run dev
```

La app estará en `http://localhost:3000`.

## Deploy en Vercel

En Vercel configura estas variables de entorno:

- `NEXT_PUBLIC_RAWG_API_KEY`
- `NEXT_PUBLIC_RAWG_BASE_URL` (opcional)

No se requiere backend adicional ni contenedores Docker para esta app.
