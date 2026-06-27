# ⚡ QUICK REFERENCE - UBICACIÓN DE CAMBIOS CLAVE

## 🎯 ENCONTRAR RÁPIDAMENTE

### GDPR en Formularios Booking

#### Madrid (index-madrid.html)
```html
Línea 201: <input id="bGDPR" type="checkbox" ... required>
Línea 465: if(!gdprAceptado){toast('Debes aceptar...')}
Línea 487: aceptado_gdpr:gdprAceptado,
Línea 488: fecha_aceptacion_gdpr:new Date().toISOString(),
```

#### Argentina (index-argentina.html)
```html
Línea 201: <input id="bGDPR" type="checkbox" ... required>
Línea 465: if(!gdprAceptado){toast('Debes aceptar...')}
Línea 487: aceptado_gdpr:gdprAceptado,
Línea 488: fecha_aceptacion_gdpr:new Date().toISOString(),
```

### GDPR en CRM (crm-taller.html)

#### Campo GDPR Disabled
```javascript
Línea ~835: <input id="edGDPR" type="checkbox" disabled>
            ⓘ Estado desde booking - Solo se actualiza cuando cliente acepta
```

#### Guardado GDPR NOT INCLUDED en saveDatos()
```javascript
Línea ~838: const updateData={nombre,apellidos,dni,telefono,correo};
            // NOTA: aceptado_gdpr NO está incluido - no editable por mecánico
```

#### Aceptar Solicitud desde Booking
```javascript
Línea ~1646: if(!existing) {
              DB.clientes.create({..., aceptado_gdpr:r.aceptado_gdpr||false, ...})
            } else if(!existing.aceptado_gdpr && r.aceptado_gdpr) {
              DB.clientes.update(cliId, {aceptado_gdpr, fecha_aceptacion_gdpr})
            }
```

### Calendario con Sábado (crm-taller.html)

```javascript
Línea ~528: const weekDays = [0,1,2,3,4,5]  // Sábado incluido
Línea ~536: const dnames = ['Lun','Mar','Mié','Jue','Vie','Sab']
Línea ~535: const endDay = days[5]  // Usa sábado, no viernes
```

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
booking_grupo_via/
├── 📄 HTML FORMULARIOS
│   ├── index-madrid.html          ← Booking Madrid (Azul, #3b82f6)
│   ├── index-argentina.html       ← Booking Argentina (Ámbar, #f59e0b)
│   └── crm-taller.html            ← CRM Completo (1725 líneas)
│
├── 📊 CSV PARA IMPORTAR (Supabase)
│   ├── clientes_COMPLETE_CON_GDPR.csv     ← 5 clientes + GDPR
│   ├── motos_COMPLETE.csv                 ← 8 motos
│   ├── citas_COMPLETE.csv                 ← 10 citas
│   ├── tareas_COMPLETE.csv                ← 7 tareas
│   ├── ordenes_COMPLETE.csv               ← 5 órdenes
│   └── facturados_COMPLETE.csv            ← 3 facturados
│
├── 💾 SQL
│   └── SUPABASE_SCHEMA_ACTUALIZADO.sql   ← Schema completo (6 tablas)
│
└── 📖 DOCUMENTACIÓN
    ├── ENTREGA_FINAL.md                   ← Este proyecto (resumen)
    ├── GDPR_IMPLEMENTATION_GUIDE.md        ← Implementación GDPR detallada
    ├── GUIA_REVISION_CAMBIOS.md           ← Testing en Chrome
    ├── VERIFICACION_SUPABASE.md           ← Queries para verificar datos
    └── QUICK_REFERENCE.md                 ← Este archivo
```

---

## 🧪 TESTING EN CHROME (30 minutos)

### Paso 1: Booking Madrid (5 min)
1. Abrir `index-madrid.html` en Chrome
2. Seleccionar fecha/hora
3. Rellenar datos
4. **NO marcar GDPR** → intenta confirmar → `Debes aceptar...`
5. **Marcar GDPR** → confirmar → ✅ Funciona

**Verificar:**
- [ ] Checkbox azul (#3b82f6)
- [ ] Texto GDPR claro
- [ ] Validación obligatoria funciona

### Paso 2: Booking Argentina (5 min)
1. Abrir `index-argentina.html`
2. Mismo flujo que Madrid
3. Verificar color ámbar (#f59e0b) en checkbox

**Verificar:**
- [ ] Checkbox ámbar (diferente a Madrid)
- [ ] Validación igual
- [ ] Mensaje y color diferente

### Paso 3: CRM - Calendario (5 min)
1. Abrir `crm-taller.html`
2. Click en "Citas" tab
3. Mira el calendario

**Verificar:**
- [ ] 6 columnas: Lun, Mar, Mié, Jue, Vie, **Sab**
- [ ] Todas igual ancho
- [ ] Rango semana = "X jun - Y jun" (incluye Sab)

### Paso 4: CRM - GDPR Disabled (5 min)
1. En CRM, ver lista de clientes
2. Click en cliente
3. Tab "Datos personales"
4. Scroll down hasta GDPR

**Verificar:**
- [ ] Checkbox MARCADO (si cliente aceptó)
- [ ] Checkbox DISABLED (no puedo hacerle click)
- [ ] Texto: "ⓘ Estado desde booking - Solo se actualiza..."
- [ ] Fecha visible
- [ ] Otros campos SÍ son editables
- [ ] Click "Guardar" funciona sin tocar GDPR

### Paso 5: Flujo Completo (10 min)
1. Booking Madrid → crear reserva con GDPR
2. CRM → Ver solicitud pendiente (badge rojo en "Citas")
3. Click "Aceptar solicitud"
4. Nueva ficha cliente se crea
5. Tab "Datos personales" → GDPR ya está CHECKED
6. Editar nombre y guardar → GDPR no cambia

**Verificar:**
- [ ] Reserva se crea en localStorage
- [ ] CRM muestra solicitud pendiente
- [ ] Cliente se crea automáticamente
- [ ] GDPR se propaga correctamente
- [ ] GDPR no se puede desmarcar

---

## 🔧 VERIFICACIÓN EN SUPABASE (15 minutos)

### 1. Ejecutar Schema (2 min)
```
Supabase > SQL Editor > New Query
Copiar contenido de: SUPABASE_SCHEMA_ACTUALIZADO.sql
Ejecutar
```

**Resultado esperado:** "Success. No rows returned"

### 2. Importar CSVs (8 min)
```
Ir a cada tabla:
1. clientes → Import > clientes_COMPLETE_CON_GDPR.csv
2. motos → Import > motos_COMPLETE.csv
3. citas → Import > citas_COMPLETE.csv
4. tareas → Import > tareas_COMPLETE.csv
5. ordenes → Import > ordenes_COMPLETE.csv
6. facturados → Import > facturados_COMPLETE.csv
```

### 3. Verificar Datos (5 min)
**En SQL Editor, ejecutar:**
```sql
SELECT COUNT(*) FROM clientes;  -- Esperado: 5
SELECT COUNT(*) FROM clientes WHERE aceptado_gdpr = true;  -- Esperado: 5
SELECT COUNT(*) FROM motos;  -- Esperado: 8
SELECT COUNT(*) FROM citas;  -- Esperado: 10
SELECT COUNT(*) FROM citas WHERE desde_booking = true;  -- Esperado: 4
```

**Todos deben retornar los valores esperados.**

---

## 🚀 PASOS A SEGUIR

### HOY (Día 1)
- [ ] Revisar HTMLs en Chrome siguiendo GUIA_REVISION_CAMBIOS.md
- [ ] Ejecutar SQL schema en Supabase
- [ ] Importar 6 CSVs en Supabase
- [ ] Ejecutar verification queries

### SEMANA 1
- [ ] Conectar CRM a Supabase
- [ ] Implementar sync localStorage ↔ Supabase
- [ ] Probar flujo completo

### SEMANA 2
- [ ] Deploy HTMLs a producción
- [ ] Conectar dominio
- [ ] Setup backups

---

## 📞 TROUBLESHOOTING RÁPIDO

| Problema | Solución |
|----------|----------|
| GDPR no obligatorio | Buscar `required` en línea ~201 |
| GDPR editable en CRM | Buscar `disabled` en línea ~835 |
| Sábado no aparece | Buscar `weekDays = [0,1,2,3,4,5]` en línea ~528 |
| Datos no se guardaban | Buscar `acceptSolicitud()` en línea ~1646 |
| Checkbox GDPR no sync | Buscar `aceptado_gdpr:r.aceptado_gdpr` en línea ~1648 |

---

## 💾 ARCHIVOS IMPORTANTES POR TAREA

### Si necesito... **CAMBIAR COLOR GDPR**
→ `index-madrid.html` línea 199: `background:#f0f9ff;border-left:4px solid #3b82f6;`

### Si necesito... **CAMBIAR TEXTO GDPR**
→ `index-madrid.html` línea 202: `<span>Acepto la...`

### Si necesito... **AGREGAR MÁS DÍAS AL CALENDARIO**
→ `crm-taller.html` línea 528: `const weekDays = [0,1,2,3,4,5]`

### Si necesito... **CAMBIAR CAMPOS GUARDADOS GDPR**
→ `index-madrid.html` línea 487-488 y `crm-taller.html` línea 1648

### Si necesito... **CAMBIAR VALIDACIÓN GDPR**
→ `index-madrid.html` línea 465: `if(!gdprAceptado){...}`

### Si necesito... **VER SQL DE TABLAS**
→ `SUPABASE_SCHEMA_ACTUALIZADO.sql` (132 líneas)

### Si necesito... **AUDITAR CLIENTES GDPR**
→ `VERIFICACION_SUPABASE.md` - Queries de auditoría

---

## 📊 ESTADÍSTICAS

- **Total archivos:** 14
- **Líneas HTML:** 2,265
- **Líneas de código:** 3,500+
- **Tablas Supabase:** 6
- **Fields GDPR:** 2
- **CSVs con datos:** 6
- **Documentación:** 5 archivos MD
- **Data rows:** 37
- **Índices:** 18
- **Foreign Keys:** 8

---

## ✅ CHECKLIST FINAL

- [ ] HTMLs funcionan en Chrome (formularios + CRM)
- [ ] GDPR obligatorio en booking (ambas sedes)
- [ ] GDPR disabled en CRM (no editable)
- [ ] Calendario muestra sábado
- [ ] SQL schema ejecutado en Supabase
- [ ] 6 CSVs importados (sin errores)
- [ ] Data count queries dan resultados esperados
- [ ] FK relationships válidas
- [ ] Documentación completa

**Cuando todo esté ✅ = LISTO PARA PRODUCCIÓN**

---

*Quick Reference v1.0 - 2025-06-26*
