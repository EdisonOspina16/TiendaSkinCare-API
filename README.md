# TiendaSkinCare API

API REST para el backend de TiendaSkinCare, construída con Express, TypeScript y Prisma.

## Descripción

Este proyecto expone los endpoints necesarios para manejar usuarios, productos, carrito, pedidos, diario personal y cargas de archivos. Está diseñada con una arquitectura de capas que separa `application`, `domain`, `infrastructure` e `interface`.

## Tecnologías principales

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- AWS S3 / Supabase Storage
- JSON Web Tokens (JWT)
- Bcrypt para hashear contraseñas

## Características

- Registro y login de usuarios
- Autenticación con JWT
- CRUD de productos
- Gestión de carrito de compras
- Generación de pedidos
- Diario de rutinas y notas de cuidado
- Upload de archivos a storage S3 compatible
- CORS configurado para el frontend

## Requisitos

- Node.js 18+ / 20+
- PostgreSQL
- Cuenta o bucket S3 compatible (Supabase Storage o S3)

## Instalación y ejecución local

1. Instala dependencias:

```bash
npm install
```

2. Genera el cliente de Prisma:

```bash
npm run prisma:generate
```

3. Configura el archivo `.env` con las variables necesarias:

```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/tienda
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:3000
SUPABASE_S3_ENDPOINT=https://your-supabase-endpoint
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
S3_REGION=your-region
S3_BUCKET_NAME=your-bucket-name
SUPABASE_STORAGE_PUBLIC_URL=https://your-public-url
```

4. Ejecuta la aplicación en modo desarrollo:

```bash
npm run dev
```

5. Abre la API en el navegador o con un cliente HTTP:

```text
http://localhost:4000
```

## Scripts disponibles

- `npm run dev` - inicia el servidor con recarga automática
- `npm run build` - compila TypeScript a JavaScript
- `npm run start` - ejecuta el backend compilado
- `npm run prisma:generate` - genera el cliente Prisma
- `npm run prisma:migrate` - ejecuta migraciones de schema
- `npm run prisma:deploy` - despliega migraciones en producción
- `npm run prisma:seed` - ejecuta el seed de datos

## Endpoints principales

- `GET /` - health check
- `POST /api/v1/auth/register` - registro de usuario
- `POST /api/v1/auth/login` - login de usuario
- `GET /api/v1/auth/profile` - perfil del usuario autenticado
- `PUT /api/v1/auth/profile` - actualización de perfil
- `GET /api/v1/products` - lista de productos
- `GET /api/v1/products/:id` - detalle de producto
- `GET /api/v1/cart` - obtener carrito actual
- `POST /api/v1/cart` - agregar producto al carrito
- `PUT /api/v1/cart` - actualizar cantidad del carrito
- `DELETE /api/v1/cart/:productId` - eliminar producto del carrito
- `GET /api/v1/orders` - lista de pedidos
- `GET /api/v1/orders/:id` - detalle de pedido
- `POST /api/v1/orders` - crear pedido
- `POST /api/v1/orders/:orderId/pay` - marcar pedido como pagado
- `GET /api/v1/diary` - lista de entradas de diario
- `POST /api/v1/diary` - crear entrada de diario
- `PUT /api/v1/diary/:id` - actualizar entrada
- `DELETE /api/v1/diary/:id` - eliminar entrada
- `POST /api/v1/upload` - subir archivo al storage

## Variables de entorno requeridas

- `DATABASE_URL`
- `JWT_SECRET`
- `SUPABASE_S3_ENDPOINT`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_REGION`
- `S3_BUCKET_NAME`
- `SUPABASE_STORAGE_PUBLIC_URL`
- `FRONTEND_URL`
- `PORT` (opcional, por defecto `4000`)
- `JWT_EXPIRES_IN` (opcional, por defecto `1d`)

## Notas de integración

- El frontend debe usar `NEXT_PUBLIC_API_URL` apuntando a `http://localhost:4000/api/v1` en desarrollo.
- El backend acepta CORS desde el origen configurado en `FRONTEND_URL`.
- La API está versionada bajo `/api/v1`.

## Despliegue

1. Asegúrate de compilar:

```bash
npm run build
```

2. Arranca el backend compilado:

```bash
npm run start
```

3. Ajusta las variables de entorno en el entorno de producción.

4. Si usas Prisma en producción, ejecuta `npm run prisma:deploy`.

## Estructura del proyecto

- `src/index.ts` - punto de entrada del servidor
- `src/app.ts` - configuración de Express y middlewares
- `src/interface/` - controladores, rutas y middlewares HTTP
- `src/application/` - casos de uso y lógica de aplicación
- `src/domain/` - entidades, repositorios y servicios de dominio
- `src/infrastructure/` - adaptadores de persistencia, validadores y configuración

## Contacto

Usa la carpeta `TiendaSkinCare-FRONTEND` para la interfaz y `TiendaSkinCare-API` para el backend. Ambas deben ejecutarse juntas para una experiencia completa de TiendaSkinCare.
