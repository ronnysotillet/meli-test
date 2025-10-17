# Meli Test — Análisis de Consumos e Infraestructura

Este proyecto corresponde a una prueba técnica orientada al análisis de datos de consumo de infraestructura.  
Permite visualizar, filtrar y analizar datos históricos y proyectados mediante una interfaz dinámica e interactiva.  
Desarrollado con **Next.js**, **Recharts**, **MongoDB**, **TailwindCSS** y **OpenAI API**.

---

## Descripción General

Gracias a la variedad de productos y servicios dispuestos, uno de los procesos que requiere la empresa es **monitorear los consumos de infraestructura de los servicios que utilizan las diferentes unidades de negocio** y **hacer proyecciones/predicciones** para la toma de decisiones por parte de los líderes de cada área.

En este contexto, hay 2 equipos en la organización:
- Un equipo encargado de **analizar datos históricos**.
- Otro equipo orientado a **generar predicciones de consumo**.

Esta aplicación unifica ambos enfoques, ofreciendo una plataforma web donde se pueden visualizar, comparar y analizar ambos conjuntos de datos.

---

## Funcionalidades Principales

- **Carga dinámica de datos** históricos y proyectados desde MongoDB.  
- **Tablas interactivas** con filtros, paginación y selección múltiple.  
- **Gráficas dinámicas** desarrolladas con Recharts para comparar métricas.  
- **Análisis automatizado** de los datos mediante la API de OpenAI (`POST /api/analyzer`),  
  que genera un texto explicativo e interpretativo del comportamiento de los consumos.  
- **Gestión de entorno** mediante variables configuradas en Vercel.  

---

## Métricas Identificadas

El sistema permite analizar métricas como:
- Costos mensuales por unidad de negocio.  
- Porcentaje de variación entre el histórico y la proyección.  
- Distribución de consumo entre equipos o servicios.  
- Tendencias y patrones de uso de infraestructura.  

Estas métricas facilitan la **identificación de picos de gasto, anomalías** y **comportamientos cíclicos**, apoyando la toma de decisiones presupuestales.

---

## Justificación de las Visuales

Se emplean **dos gráficos principales** desarrollados con **Recharts**:

- **Gráfico de líneas / barras** para comparar datos históricos y proyectados.  
- **Agrupación por tipo de dato** (por ejemplo, área, servicio o mes), facilitando la interpretación visual.  

El diseño mantiene un enfoque **limpio, funcional y adaptable**, priorizando la lectura y la interpretación rápida de los resultados.

Además, las **tablas interactivas** permiten:
- Paginación controlada.  
- Filtros personalizados.  
- Selección de filas específicas para enviar al análisis automatizado.

---

## API Documentation (Swagger Style)

### `POST /api/analyzer`

Analiza los datos seleccionados por el usuario y devuelve un texto interpretativo generado por OpenAI.

#### Request Body

```json
{
  "data": [
    {
      "equipo": "Backend",
      "consumo": 1200,
      "mes": "Enero"
    },
    ...
  ]
}
```

#### Response

```json
{
  "analysis": "Durante enero el equipo Backend presentó un aumento del 15% en consumo respecto al mes anterior..."
}
```

#### Descripción
- Si no se envían datos seleccionados, el sistema analiza **todo el dataset cargado** por defecto.  
- El modelo genera insights interpretativos que ayudan a comprender la evolución de los consumos.

---

## Tecnologías Utilizadas

- **Next.js 14 (App Router)**
- **TypeScript**
- **TailwindCSS**
- **Recharts**
- **MongoDB Atlas**
- **OpenAI API**
- **Vercel (Deploy y Variables de Entorno)**

---

## Instalación y Ejecución Local

```bash
# Clonar el repositorio
git clone https://github.com/ronnysotillet/meli-test

# Entrar al directorio
cd meli-test

# Instalar dependencias
npm install

# Configurar variables de entorno (.env.local)
MONGODB_URI="tu_uri_de_mongodb"
OPENAI_API_KEY="tu_api_key_de_openai"

# Ejecutar el servidor
npm run dev
```

Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

---

## Deploy en Producción

El proyecto está desplegado en **Vercel**:  
🔗 [https://meli-test-three.vercel.app](https://meli-test-three.vercel.app)

---

## Autor

**Ronny Sotillet**  
Desarrollador Mobile & Web — Prueba Técnica Meli Test  
Contacto: ronny.sotillet777@gmail.com

---
