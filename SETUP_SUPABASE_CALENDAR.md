# Setup: Integración Google Calendar + Supabase

## Paso 1: Agregar Variables de Entorno

1. Ve a tu proyecto Supabase → **Settings** → **Environment variables**
2. Agrega esta variable:
   - **Name**: `GOOGLE_SERVICE_ACCOUNT`
   - **Value**: Pega el contenido completo del archivo JSON de la cuenta de servicio (el que obtuviste de Google Cloud)

## Paso 2: Crear la Edge Function

1. Ve a **Functions** en Supabase
2. Haz clic en **"Create a new function"**
3. Name: `create-calendar-event`
4. Copia el código de `edge_function_create_calendar_event.js` (archivo que creé)
5. Reemplaza todo el contenido del archivo `index.ts` con ese código
6. Haz clic en **Deploy**

## Paso 3: Crear el Trigger en Supabase

1. Ve a **SQL Editor**
2. Copia el contenido de `create_google_calendar_event.sql`
3. Pégalo y ejecuta (botón **RUN**)
4. Esto crea la función y el trigger que dispara automáticamente cuando se inserta una reservación

## Paso 4: Verificar que Funciona

1. Ve a **Table Editor** → tabla `reservaciones`
2. Inserta una nueva fila manualmente con datos de prueba:
   ```
   nombre: Test User
   email: test@example.com
   telefono: +34 600 000 000
   marca_moto: BMW
   servicio: Mantenimiento
   fecha: 2026-07-01
   hora: 10:00
   ubicacion: madrid
   gdpr: true
   ```
3. Si todo funciona, deberías ver:
   - Un evento creado en Google Calendar (Madrid)
   - El campo `google_event_id` poblado en la reservación

## Paso 5: Conectar los Formularios HTML

Una vez que la Edge Function funciona, actualizar:
- `index-madrid.html` → Leer calendario de Madrid con API Key
- `index-argentina.html` → Leer calendario de Argentina con API Key
- Ambos guardan en `reservaciones` de Supabase (trigger crea evento automáticamente)

## Troubleshooting

**Error: "Failed to create calendar event"**
- Verifica que:
  - Las cuentas de Google compartieron sus calendarios con `grupo-via@grupo-via.iam.gserviceaccount.com`
  - La variable `GOOGLE_SERVICE_ACCOUNT` está correctamente guardada
  - Los Calendar IDs son correctos:
    - Madrid: `f2fae0a29264f73774edfc63b2c3e7f95be91e066f68672081142e7ce831174f@group.calendar.google.com`
    - Argentina: `c6de5139d700832ff5f5b4bd49ad1c5b0d5804b8363d94c4c5ee9a7ff22e7c4f@group.calendar.google.com`

**Error: "Event created but failed to update reservation"**
- El evento se creó pero la Edge Function no pudo guardar el ID
- Esto es normal la primera vez - la siguiente inserción funcionará

**No aparece el evento en Google Calendar**
- Espera 5-10 segundos después de insertar la reservación
- Verifica que el calendario no esté oculto en Google Calendar
