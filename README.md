# Sistema de Gestión de Reclamos Ciudadanos

Sistema completo de gestión de reclamos ciudadanos con API REST, gestión de imágenes y persistencia en MySQL.

## Características

- ✅ CRUD completo para usuarios, reclamos y operarios
- ✅ Gestión de imágenes con Multer
- ✅ Conexión y persistencia con MySQL
- ✅ API REST completa con filtros y búsquedas
- ✅ Dashboard con estadísticas
- ✅ Interfaz web responsive

## Tecnologías

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Node.js
- **Base de datos**: MySQL
- **Gestión de archivos**: Multer
- **Gráficos**: Recharts

## Instalación

1. **Clonar el repositorio**
   \`\`\`bash
   git clone <repository-url>
   cd sistema-reclamos
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

## Configurar lib/db.ts

const dbConfig = {
host: "127.0.0.1",
port: 3306,
user: "root",
password: "",
database: "sistema_reclamos",
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0,
};

## Configuración de Base de Datos

El sistema está configurado para usar tu base de datos MySQL existente:

- **Base de datos**: sistema_reclamos
- **Host**: 127.0.0.1 (localhost)
- **Puerto**: 3306
- **Usuario**: root
- **Esquema**: Gestion

### Configuración de la Base de Datos

1. **Ejecutar scripts SQL**:

   - Ejecutar `scripts/01-create-database-reclamos.sql` para crear las tablas
   - Ejecutar `scripts/02-seed-data-reclamos.sql` para insertar datos de ejemplo

2. **Verificar conexión**:
   - Acceder a `http://localhost:3000/api/test-connection` para probar la conexión

### Estructura de Tablas

Las tablas se crearán en tu base de datos `reclamos` existente:

- `usuarios` - Información de ciudadanos
- `operarios` - Personal municipal
- `reclamos` - Reclamos ciudadanos
- `imagenes_reclamos` - Imágenes adjuntas a reclamos

### Comandos MySQL

Para conectarte a tu base de datos desde la línea de comandos:
\`\`\`bash
mysql -h 127.0.0.1 -P 3306 -u root -p reclamos
\`\`\`

3. **Ejecutar el proyecto**
   \`\`\`bash
   npm run dev
   \`\`\`

## Estructura de la Base de Datos

### Tabla `usuarios`

- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `nombre_completo` (VARCHAR(255), NOT NULL)
- `dni` (VARCHAR(20), UNIQUE, NOT NULL)
- `direccion` (TEXT, NOT NULL)
- `email` (VARCHAR(255), UNIQUE, NOT NULL)
- `telefono` (VARCHAR(20), NOT NULL)
- `created_at`, `updated_at` (TIMESTAMP)

### Tabla `operarios`

- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `nombre` (VARCHAR(255), NOT NULL)
- `sector` (VARCHAR(255), NOT NULL)
- `email` (VARCHAR(255), UNIQUE, NOT NULL)
- `telefono` (VARCHAR(20), NOT NULL)
- `created_at`, `updated_at` (TIMESTAMP)

### Tabla `reclamos`

- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `codigo_reclamo` (VARCHAR(50), UNIQUE, NOT NULL)
- `tipo_reclamo` (ENUM: 'iluminacion', 'bache', 'residuos', 'ruidos', 'otros')
- `descripcion` (TEXT, NOT NULL)
- `ubicacion` (TEXT, NOT NULL)
- `fecha_reclamo` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `estado` (ENUM: 'pendiente', 'en_proceso', 'resuelto', 'rechazado')
- `usuario_id` (INT, FOREIGN KEY)
- `operario_id` (INT, FOREIGN KEY, NULLABLE)
- `created_at`, `updated_at` (TIMESTAMP)

### Tabla `imagenes_reclamos`

- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `reclamo_id` (INT, FOREIGN KEY)
- `nombre_archivo` (VARCHAR(255), NOT NULL)
- `ruta_archivo` (VARCHAR(500), NOT NULL)
- `created_at` (TIMESTAMP)

## API Endpoints

### Usuarios

#### GET /api/usuarios

Obtener todos los usuarios
\`\`\`json
Response: [
{
"id": 1,
"nombre_completo": "Juan Pérez",
"dni": "12345678",
"direccion": "Av. Corrientes 1234",
"email": "juan.perez@email.com",
"telefono": "11-1234-5678"
}
]
\`\`\`

#### POST /api/usuarios

Crear nuevo usuario
\`\`\`json
Request: {
"nombre_completo": "Juan Pérez",
"dni": "12345678",
"direccion": "Av. Corrientes 1234",
"email": "juan.perez@email.com",
"telefono": "11-1234-5678"
}

Response: {
"message": "Usuario creado exitosamente",
"id": 1
}
\`\`\`

#### GET /api/usuarios/[id]

Obtener usuario por ID

#### PUT /api/usuarios/[id]

Actualizar usuario

#### DELETE /api/usuarios/[id]

Eliminar usuario

### Operarios

#### GET /api/operarios

Obtener todos los operarios

#### POST /api/operarios

Crear nuevo operario
\`\`\`json
Request: {
"nombre": "Pedro Martínez",
"sector": "Obras Públicas",
"email": "pedro.martinez@municipio.gov",
"telefono": "11-5555-1111"
}
\`\`\`

#### GET /api/operarios/[id]

Obtener operario por ID

#### PUT /api/operarios/[id]

Actualizar operario

#### DELETE /api/operarios/[id]

Eliminar operario

### Reclamos

#### GET /api/reclamos

Obtener reclamos con filtros opcionales
\`\`\`
Query Parameters:

- tipo: iluminacion|bache|residuos|ruidos|otros
- estado: pendiente|en_proceso|resuelto|rechazado
- ubicacion: string (búsqueda parcial)
- fecha: YYYY-MM-DD
- usuario_id: number
- operario_id: number

Example: /api/reclamos?tipo=bache&estado=pendiente
\`\`\`

#### POST /api/reclamos

Crear nuevo reclamo
\`\`\`json
Request: {
"tipo_reclamo": "iluminacion",
"descripcion": "Farola sin funcionar",
"ubicacion": "Av. Corrientes y Callao",
"usuario_id": 1
}

Response: {
"message": "Reclamo creado exitosamente",
"id": 1,
"codigo_reclamo": "REC-2024-001"
}
\`\`\`

#### GET /api/reclamos/[id]

Obtener reclamo por ID con imágenes

#### PUT /api/reclamos/[id]

Actualizar reclamo

#### DELETE /api/reclamos/[id]

Eliminar reclamo

#### PUT /api/reclamos/[id]/estado

Cambiar estado del reclamo
\`\`\`json
Request: {
"estado": "resuelto"
}
\`\`\`

#### POST /api/reclamos/[id]/imagenes

Subir imágenes para un reclamo
\`\`\`
Content-Type: multipart/form-data
Field: imagenes (multiple files)
Max size: 5MB per file
Allowed types: image/\*
\`\`\`

#### GET /api/reclamos/[id]/imagenes

Obtener imágenes de un reclamo

### Estadísticas

#### GET /api/estadisticas

Obtener estadísticas generales
\`\`\`json
Response: {
"porTipo": [
{"tipo_reclamo": "iluminacion", "cantidad": 15},
{"tipo_reclamo": "bache", "cantidad": 23}
],
"porEstado": [
{"estado": "pendiente", "cantidad": 10},
{"estado": "resuelto", "cantidad": 25}
],
"porMes": [
{"año": 2024, "mes": 1, "cantidad": 12}
],
"porOperario": [
{
"nombre": "Pedro Martínez",
"sector": "Obras Públicas",
"reclamos_asignados": 15,
"resueltos": 12
}
],
"totales": {
"total_reclamos": 50,
"pendientes": 10,
"en_proceso": 15,
"resueltos": 20,
"rechazados": 5
}
}
\`\`\`

## Endpoints Específicos

### Buscar reclamos por tipo

\`\`\`
GET /api/reclamos?tipo=iluminacion
\`\`\`

### Buscar reclamos por estado

\`\`\`
GET /api/reclamos?estado=pendiente
\`\`\`

### Buscar reclamos por ubicación

\`\`\`
GET /api/reclamos?ubicacion=Corrientes
\`\`\`

### Buscar reclamos por fecha

\`\`\`
GET /api/reclamos?fecha=2024-01-15
\`\`\`

### Consultar reclamos de un usuario

\`\`\`
GET /api/reclamos?usuario_id=1
\`\`\`

### Listar reclamos asignados a un operario

\`\`\`
GET /api/reclamos?operario_id=1
\`\`\`

## Testing con Postman/Thunder Client

### 1. Crear Usuario

\`\`\`
POST http://localhost:3000/api/usuarios
Content-Type: application/json

{
"nombre_completo": "María González",
"dni": "87654321",
"direccion": "Calle San Martín 567",
"email": "maria.gonzalez@email.com",
"telefono": "11-8765-4321"
}
\`\`\`

### 2. Crear Operario

\`\`\`
POST http://localhost:3000/api/operarios
Content-Type: application/json

{
"nombre": "Ana Rodríguez",
"sector": "Mantenimiento",
"email": "ana.rodriguez@municipio.gov",
"telefono": "11-5555-2222"
}
\`\`\`

### 3. Crear Reclamo

\`\`\`
POST http://localhost:3000/api/reclamos
Content-Type: application/json

{
"tipo_reclamo": "bache",
"descripcion": "Bache grande en la calzada que dificulta el tránsito",
"ubicacion": "Av. Rivadavia 1200",
"usuario_id": 1
}
\`\`\`

### 4. Subir Imágenes

\`\`\`
POST http://localhost:3000/api/reclamos/1/imagenes
Content-Type: multipart/form-data

imagenes: [archivo1.jpg, archivo2.jpg]
\`\`\`

### 5. Cambiar Estado

\`\`\`
PUT http://localhost:3000/api/reclamos/1/estado
Content-Type: application/json

{
"estado": "en_proceso"
}
\`\`\`

### 6. Obtener Estadísticas

\`\`\`
GET http://localhost:3000/api/estadisticas
\`\`\`

## Funcionalidades del Frontend

- **Dashboard**: Visualización de estadísticas con gráficos
- **Gestión de Usuarios**: CRUD completo con formularios
- **Gestión de Reclamos**: CRUD con filtros y subida de imágenes
- **Gestión de Operarios**: CRUD completo
- **Responsive Design**: Adaptable a dispositivos móviles

## Estructura del Proyecto

\`\`\`
├── app/
│ ├── api/
│ │ ├── usuarios/
│ │ ├── operarios/
│ │ ├── reclamos/
│ │ └── estadisticas/
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── ui/ (shadcn components)
│ ├── usuarios-crud.tsx
│ ├── reclamos-crud.tsx
│ ├── operarios-crud.tsx
│ └── estadisticas-dashboard.tsx
├── lib/
│ ├── db.ts
│ ├── multer.ts
│ └── utils.ts
├── scripts/
│ ├── 01-create-database.sql
│ └── 02-seed-data.sql
└── public/
└── uploads/
└── reclamos/
\`\`\`

## Consideraciones de Producción

1. **Seguridad**:

   - Implementar autenticación y autorización
   - Validar y sanitizar todas las entradas
   - Usar HTTPS en producción

2. **Almacenamiento**:

   - Usar servicios de almacenamiento en la nube (AWS S3, Cloudinary)
   - Implementar CDN para imágenes

3. **Base de Datos**:

   - Configurar conexiones de pool adecuadas
   - Implementar backups automáticos
   - Optimizar consultas con índices

4. **Monitoreo**:
   - Implementar logging
   - Monitorear rendimiento
   - Configurar alertas

## Licencia

MIT License
