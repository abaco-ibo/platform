# ÁBACO — Sistema de Información Web con Analítica Comercial

> **Proyecto de Grado — Ingeniería de Sistemas**  
> Universidad Nacional Abierta y a Distancia (UNAD) — Escuela de Ciencias Básicas, Tecnología e Ingeniería (ECBTI)
> **Línea de investigación:** Ingeniería de Software y Gestión de Sistemas (Grupo GUANE)

---

## Descripción del Proyecto

**ÁBACO** es un sistema de información web con analítica descriptiva de datos diseñado para optimizar la gestión de inventario, el registro de movimientos comerciales y la toma de decisiones sobre reposición y comercialización en distribuidores independientes.

El prototipo funcional (nivel de maduración tecnológica **TRL5**) centraliza el control de existencias, diferencia los distintos tipos de movimiento operativo (compras, ventas, autoconsumo, cesiones y préstamos entre socios) e incorpora un enfoque de **Privacidad por Diseño (*Privacy by Design*)** en cumplimiento de la **Ley Estatutaria 1581 de 2012** (sin almacenar datos personales identificables de clientes finales).

- **Despliegue en vivo (TRL5):** [https://abaco-platform.vercel.app](https://abaco-platform.vercel.app)

---

## Funcionalidades Principales (Requisitos Implementados)

- **Gestión del Catálogo de Productos (`RF-01`, `RF-02`):** Creación, edición, búsqueda por código SKU o nombre, filtrado por categoría/estado y control diferenciado entre **stock físico total**, **stock retenido en tránsito** y **stock disponible**.
- **Registro de Movimientos Comerciales (`RF-03` – `RF-06`):**
  - **Compras / Entradas:** Incremento automático de existencias al costo de adquisición.
  - **Ventas:** Descuento de inventario con registro opcional de alias y nota contextual del cliente (*Privacy by Design*).
  - **Autoconsumo y Muestras:** Registro diferenciado de salidas internas sin distorsionar los ingresos por ventas.
  - **Cesiones y Préstamos Bilaterales:** Transferencias retornables (en producto o dinero pactado) o definitivas entre distribuidores socios, con retención preventiva de stock, buzón de notificaciones para aprobación y cierre automático tras devolución.
- **Validación Transaccional (`RF-08`):** Bloqueo automático de operaciones de salida que superen las existencias disponibles.
- **Historial y Trazabilidad (`RF-07`):** Consulta filtrable por fecha, producto, tipo de operación y socio involucrado, con exportación a `.csv`.
- **Analítica Descriptiva y Apoyo a la Reposición (`RF-09` – `RF-11`):** Tablero de indicadores clave (ingresos, costo de lo vendido, margen bruto estimado, rotación) y alertas automáticas de sugerencia de pedido.

---

## Stack Tecnológico

- **Frontend:** React 19, Vite 6, Tailwind CSS, Lucide Icons
- **Persistencia (Prototipo TRL5):** Almacenamiento estructurado en cliente (`localStorage`) con semilla de datos operativos y exportación CSV (UTF-8 BOM)
- **Arquitectura Objetivo Full-Stack:** Cliente-Servidor desacoplado (React + TypeScript / Node.js + Fastify + Prisma ORM / PostgreSQL 16)
- **Despliegue y Control de Versiones:** Git, GitHub y Vercel (CI/CD con HTTPS)

---

## Instalación y Ejecución en Local

### Requisitos previos
- [Node.js](https://nodejs.org/) `v20` o `v22 LTS`
- `npm` `v10+`

### Pasos de ejecución
```bash
# 1. Clonar el repositorio
git clone [https://github.com/abaco-ibo/platform.git](https://github.com/abaco-ibo/platform.git)
cd platform

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Equipo de Desarrollo

- **Emanuel Martínez Pinzón** — Investigador Principal / Arquitecto y Desarrollador
- **Luis Carlos Caro** — Coinvestigador / Documentación, Calidad y Validación Funcional
- **Tutor:** Ing. Orlando Gómez Barboza