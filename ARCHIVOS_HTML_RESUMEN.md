# 📄 ARCHIVOS HTML - GUÍA COMPLETA

## 🎯 3 ARCHIVOS PRINCIPALES

---

## 1️⃣ **index-madrid.html** (520 líneas)

### 📍 Información
- **Nombre:** Formulario de Booking - Madrid
- **Ubicación:** Avenida Madrid, 80 - Barcelona
- **Color theme:** Azul (#3b82f6)
- **Tipo:** Formulario de reserva

### 🎨 Características
- ✅ Selector de fecha y hora
- ✅ Formulario con campos: Nombre, Teléfono, DNI, Email
- ✅ Selector de marca y modelo de moto
- ✅ Selector de servicio solicitado
- ✅ **CHECKBOX GDPR OBLIGATORIO** (línea 201)
  - Texto: "Acepto la Política de Privacidad y autorizo el tratamiento de mis datos conforme a RGPD"
  - Color: Azul (#3b82f6)
  - Requerido: SÍ
- ✅ Validación completa
- ✅ Almacenamiento en localStorage (`gv_reservas_madrid`)

### 🔧 Configuración
```javascript
// Línea 15-20:
const TALLER = 'madrid';
const UBICACION = 'Avenida Madrid, 80 - Barcelona';
const COLOR_PRIMARIO = '#3b82f6'; // Azul
const HORARIO = {09:00-14:00, 16:00-20:00}; // Lunes a Viernes
const ADVANCE_BOOKING = 12 * 60; // 12 horas
```

### 📝 Campos GDPR
- **Línea 201:** `<input id="bGDPR" type="checkbox" required>`
- **Línea 465:** Validación: `if(!gdprAceptado){toast('Debes aceptar...')}`
- **Línea 487-488:** Guardado:
  ```javascript
  aceptado_gdpr: gdprAceptado,
  fecha_aceptacion_gdpr: new Date().toISOString()
  ```

### 🌐 URL en GitHub Pages
```
https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-madrid.html
```

### 🧪 Testing
1. Abre el formulario
2. Intenta confirmar SIN marcar GDPR → **Debe fallar**
3. Marca GDPR y confirma → **Debe crear reserva**
4. Verifica en DevTools > Storage > LocalStorage: `gv_reservas_madrid`

---

## 2️⃣ **index-argentina.html** (520 líneas)

### 📍 Información
- **Nombre:** Formulario de Booking - Argentina
- **Ubicación:** Avenida República Argentina, 83 - Barcelona
- **Color theme:** Ámbar (#f59e0b)
- **Tipo:** Formulario de reserva

### 🎨 Características
- ✅ Idéntico a Madrid pero con color DIFERENTE
- ✅ Checkbox GDPR obligatorio (color ámbar)
- ✅ Almacenamiento en localStorage (`gv_reservas_argentina`)

### 🔧 Configuración
```javascript
// Línea 15-20:
const TALLER = 'argentina';
const UBICACION = 'Avenida República Argentina, 83 - Barcelona';
const COLOR_PRIMARIO = '#f59e0b'; // Ámbar
const HORARIO = {09:00-14:00, 16:00-20:00}; // Lunes a Viernes
const ADVANCE_BOOKING = 12 * 60; // 12 horas
```

### 📝 Campos GDPR
- **Línea 201:** `<input id="bGDPR" type="checkbox" required>` (Ámbar)
- **Línea 465:** Validación: `if(!gdprAceptado){...}`
- **Línea 487-488:** Guardado: aceptado_gdpr + fecha_aceptacion_gdpr

### 🌐 URL en GitHub Pages
```
https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-argentina.html
```

### 🎨 DIFERENCIAS CON MADRID
| Aspecto | Madrid | Argentina |
|---------|--------|-----------|
| Color | Azul #3b82f6 | Ámbar #f59e0b |
| Ubicación | Avenida Madrid, 80 | Avenida Rep. Argentina, 83 |
| localStorage key | gv_reservas_madrid | gv_reservas_argentina |
| Checkbox GDPR | Azul | Ámbar |

### 🧪 Testing
1. Abre el formulario
2. Verifica que checkbox GDPR es ÁMBAR (diferente a Madrid)
3. Mismo flujo que Madrid
4. Verifica en DevTools: `gv_reservas_argentina`

---

## 3️⃣ **crm-taller.html** (1725 líneas)

### 📍 Información
- **Nombre:** CRM Taller - Sistema de Gestión Completo
- **Tipo:** Aplicación web completa
- **Funcionalidad:** Gestión de citas, clientes, motos, tareas, órdenes

### 🎯 Secciones Principales

#### 📋 **Tab: Citas** (Principal)
- ✅ Calendario semanal con 6 días: **Lun, Mar, Mié, Jue, Vie, SAB**
- ✅ Todas las columnas igual ancho
- ✅ Rango de semana incluye sábado (ej: "26 jun - 1 jul")
- ✅ Badge rojo: "X solicitudes de reserva pendiente"
- ✅ Flujo Kanban: pendiente → en_progreso → listo_entrega → entregado_pagado
- ✅ Citas desde booking se muestran en MORADO (#a855f7)

**Configuración del calendario:**
```javascript
// Línea ~528:
const weekDays = [0,1,2,3,4,5]; // Incluye sábado (5)

// Línea ~536:
const dnames = ['Lun','Mar','Mié','Jue','Vie','Sab'];

// Línea ~535:
const endDay = days[5]; // Usa sábado
```

#### 👥 **Tab: Datos personales** (GDPR)
- ✅ Checkbox GDPR **DISABLED** (no editable por mecánico)
- ✅ Muestra estado GDPR: ✓ Aceptó / ✗ No aceptó
- ✅ Muestra fecha de aceptación
- ✅ Mensaje informativo: "ⓘ Estado desde booking - Solo se actualiza cuando cliente acepta en formulario"
- ✅ Otros campos (nombre, teléfono, etc.) SÍ son editables

**Implementación:**
```javascript
// Línea ~835 (tabDatos):
<input id="edGDPR" type="checkbox" disabled>
<span>✓ Aceptó Política de Privacidad RGPD ${fecha}</span>

// Línea ~838 (saveDatos):
const updateData = {nombre, apellidos, dni, telefono, correo};
// NOTA: aceptado_gdpr NO está incluido - no se puede editar
```

#### 🏍️ **Tab: Motos**
- ✅ Lista de motos del cliente
- ✅ Edición de datos de moto
- ✅ Anotaciones en JSONB

#### 📅 **Tab: Citas**
- ✅ Todas las citas del cliente
- ✅ Cambio de estado
- ✅ Flujo Kanban visual

#### 🔧 **Tab: Recambios**
- ✅ Gestión de piezas
- ✅ Inventario

#### 📝 **Tab: Tareas**
- ✅ Tareas asociadas al cliente
- ✅ Estados de completadas
- ✅ Fechas de vencimiento

#### 📋 **Tab: Orden**
- ✅ Órdenes de trabajo
- ✅ Conceptos de trabajo
- ✅ Presupuesto y total
- ✅ Exportar a PDF

#### 📜 **Tab: Historial**
- ✅ Log de cambios
- ✅ Trazabilidad completa

### 🔧 Flujos Principales

#### **Flujo: Aceptar Solicitud de Booking**
1. Booking creado desde Madrid o Argentina
2. CRM muestra badge: "1 solicitud pendiente"
3. Mecánico ve solicitud
4. Click "Aceptar solicitud"
5. Se crea cliente CON GDPR sincronizado:
   ```javascript
   // Línea ~1646:
   DB.clientes.create({
     ...,
     aceptado_gdpr: r.aceptado_gdpr || false,
     fecha_aceptacion_gdpr: r.fecha_aceptacion_gdpr || null
   })
   ```

#### **Flujo: Ver GDPR en Ficha Cliente**
1. Abre cliente
2. Tab "Datos personales"
3. Checkbox GDPR está CHECKED (si aceptó en booking)
4. Checkbox está DISABLED
5. No se puede editar

#### **Flujo: Editar Datos del Cliente**
1. Cambia nombre, teléfono, etc.
2. Click "Guardar"
3. Se guardan todos EXCEPTO GDPR
4. GDPR mantiene su valor original

### 🌐 URL en GitHub Pages
```
https://pablogarciaverdu1-max.github.io/booking_grupo_via/crm-taller.html
```

### 💾 Almacenamiento
- **Datos:** localStorage (sincronización entre pestañas)
- **Cliente actual:** `curCliente` (ID)
- **Reservas Madrid:** `gv_reservas_madrid`
- **Reservas Argentina:** `gv_reservas_argentina`

### 🧪 Testing
1. Abre CRM
2. Va a "Citas" → Verifica 6 columnas (Lun-Sab)
3. Click en cliente
4. Tab "Datos personales"
5. Verifica:
   - [ ] Checkbox GDPR está DISABLED
   - [ ] Muestra fecha de aceptación
   - [ ] Mensaje informativo visible
   - [ ] Otros campos editables
6. Edita nombre y guarda
7. Verifica que GDPR no cambió

---

## 🚀 CÓMO PUBLICAR EN GITHUB PAGES

### Paso 1: Ir a GitHub
```
https://github.com/pablogarciaverdu1-max/booking_grupo_via
```

### Paso 2: Settings → Pages
1. Branch: `claude/trusting-ptolemy-fonh5r`
2. Folder: `/` (raíz)
3. Click Save

### Paso 3: Esperar (1-2 minutos)
Verás: "Your site is published at..."

### Paso 4: Acceder a los formularios
```
✅ Madrid: https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-madrid.html
✅ Argentina: https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-argentina.html
✅ CRM: https://pablogarciaverdu1-max.github.io/booking_grupo_via/crm-taller.html
```

---

## 📊 RESUMEN TÉCNICO

| Propiedad | Madrid | Argentina | CRM |
|-----------|--------|-----------|-----|
| Líneas | 520 | 520 | 1725 |
| Color | Azul | Ámbar | Multi |
| GDPR | ✅ Obligatorio | ✅ Obligatorio | ✅ Disabled |
| localStorage | madrid | argentina | ambos |
| Calendario | - | - | ✅ 6 días |
| Validación | ✅ Completa | ✅ Completa | ✅ Completa |

---

## ✅ VERIFICACIÓN FINAL

Cuando todo esté publicado, verifica:

**Madrid:**
- [ ] Formulario carga sin errores
- [ ] Checkbox GDPR azul
- [ ] Validación funciona
- [ ] Reserva se crea en localStorage

**Argentina:**
- [ ] Formulario carga sin errores
- [ ] Checkbox GDPR ámbar (diferente a Madrid)
- [ ] Validación funciona
- [ ] Reserva se crea en localStorage

**CRM:**
- [ ] CRM carga sin errores
- [ ] Calendario muestra 6 días (Lun-Sab)
- [ ] GDPR checkbox disabled
- [ ] Sincronización funciona entre pestañas

---

## 🎯 FLUJO COMPLETO DE TESTING

1. **Abre Madrid:** Crea una reserva con GDPR
2. **Abre CRM:** Verás "1 solicitud pendiente"
3. **Aceptar:** Cliente se crea con GDPR
4. **Verificar:** Tab "Datos personales" muestra GDPR checked y disabled
5. **Editar:** Cambias otros datos, GDPR no cambia
6. **Guardar:** Todo funciona

**Si TODO funciona → ¡LISTO PARA SUPABASE!** 🚀

---

*Guía de Archivos HTML v1.0 - 2025-06-26*
