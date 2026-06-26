# ✅ VERIFICACIÓN DE IMPORTACIÓN SUPABASE

## 📊 VERIFICAR DATOS IMPORTADOS

Ejecuta estas queries en **Supabase > SQL Editor** para verificar que los CSV se importaron correctamente:

---

### 1️⃣ VERIFICAR CLIENTES CON GDPR

```sql
-- Contar clientes totales
SELECT COUNT(*) as total_clientes FROM clientes;
-- Resultado esperado: 5

-- Ver clientes con GDPR aceptado
SELECT id, nombre, apellidos, aceptado_gdpr, fecha_aceptacion_gdpr 
FROM clientes 
WHERE aceptado_gdpr = true;
-- Resultado esperado: 5 clientes

-- Clientes sin GDPR
SELECT COUNT(*) FROM clientes WHERE aceptado_gdpr = false;
-- Resultado esperado: 0
```

---

### 2️⃣ VERIFICAR MOTOS

```sql
-- Contar motos
SELECT COUNT(*) as total_motos FROM motos;
-- Resultado esperado: 8

-- Ver motos con anotaciones
SELECT id, cliente_id, marca, modelo, anotaciones 
FROM motos 
WHERE anotaciones != '[]';
-- Resultado esperado: 2 motos (mot1, mot3, mot6 con anotaciones)
```

---

### 3️⃣ VERIFICAR CITAS

```sql
-- Contar citas totales
SELECT COUNT(*) as total_citas FROM citas;
-- Resultado esperado: 10

-- Ver citas desde booking
SELECT id, cliente_id, desde_booking, taller, fecha_cita 
FROM citas 
WHERE desde_booking = true;
-- Resultado esperado: 4 citas (cit3, cit8, cit10 + 1 more)

-- Citas por taller
SELECT taller, COUNT(*) as cantidad FROM citas GROUP BY taller;
-- Resultado esperado:
--   madrid: 5
--   argentina: 5

-- Citas por estado
SELECT estado, COUNT(*) FROM citas GROUP BY estado;
-- Resultado esperado:
--   pendiente: 5
--   en_progreso: 2
--   listo_entrega: 1
--   entregado_pagado: 2
```

---

### 4️⃣ VERIFICAR TAREAS

```sql
-- Contar tareas
SELECT COUNT(*) as total_tareas FROM tareas;
-- Resultado esperado: 7

-- Ver tareas completadas
SELECT COUNT(*) FROM tareas WHERE completada = true;
-- Resultado esperado: Dependerá de los datos importados
```

---

### 5️⃣ VERIFICAR ÓRDENES

```sql
-- Contar órdenes
SELECT COUNT(*) as total_ordenes FROM ordenes;
-- Resultado esperado: 5

-- Ver órdenes con conceptos (JSONB)
SELECT numero, cliente_id, conceptos, total 
FROM ordenes 
LIMIT 5;
-- Resultado esperado: 5 órdenes con conceptos en JSONB
```

---

### 6️⃣ VERIFICAR FACTURADOS

```sql
-- Contar servicios facturados
SELECT COUNT(*) as total_facturados FROM facturados;
-- Resultado esperado: 3

-- Ver servicios con arrays
SELECT id, cita_id, servicios_std, servicios_custom 
FROM facturados;
-- Resultado esperado: Arrays JSON con servicios
```

---

## 🔗 VERIFICAR RELACIONES (Foreign Keys)

```sql
-- Todas las motos tienen cliente válido
SELECT COUNT(*) FROM motos m 
WHERE NOT EXISTS (SELECT 1 FROM clientes c WHERE c.id = m.cliente_id);
-- Resultado esperado: 0 (todas las FK son válidas)

-- Todas las citas tienen cliente y moto válidos
SELECT COUNT(*) FROM citas c
WHERE NOT EXISTS (SELECT 1 FROM clientes cl WHERE cl.id = c.cliente_id)
   OR NOT EXISTS (SELECT 1 FROM motos m WHERE m.id = c.moto_id);
-- Resultado esperado: 0

-- Todas las órdenes tienen cliente y moto válidos
SELECT COUNT(*) FROM ordenes o
WHERE NOT EXISTS (SELECT 1 FROM clientes c WHERE c.id = o.cliente_id)
   OR NOT EXISTS (SELECT 1 FROM motos m WHERE m.id = o.moto_id);
-- Resultado esperado: 0
```

---

## 📋 CHECKLIST DE VERIFICACIÓN

| Aspecto | Query | Resultado Esperado | ✓ |
|---------|-------|-------------------|---|
| Clientes importados | COUNT(*) clientes | 5 | ☐ |
| GDPR completado | COUNT WHERE aceptado_gdpr=true | 5 | ☐ |
| Fechas GDPR grabadas | COUNT WHERE fecha_aceptacion_gdpr IS NOT NULL | 5 | ☐ |
| Motos importadas | COUNT(*) motos | 8 | ☐ |
| Citas importadas | COUNT(*) citas | 10 | ☐ |
| Citas desde booking | COUNT WHERE desde_booking=true | 4 | ☐ |
| Citas Madrid | COUNT WHERE taller='madrid' | 5 | ☐ |
| Citas Argentina | COUNT WHERE taller='argentina' | 5 | ☐ |
| Tareas importadas | COUNT(*) tareas | 7 | ☐ |
| Órdenes importadas | COUNT(*) ordenes | 5 | ☐ |
| Facturados importados | COUNT(*) facturados | 3 | ☐ |
| FK Motos válidas | COUNT invalid motos | 0 | ☐ |
| FK Citas válidas | COUNT invalid citas | 0 | ☐ |
| FK Órdenes válidas | COUNT invalid órdenes | 0 | ☐ |

---

## ⚠️ PROBLEMAS COMUNES

### Error: "No existe tabla clientes"
→ Ejecutar primero el SQL schema: **SUPABASE_SCHEMA_ACTUALIZADO.sql**

### Error: "Columna aceptado_gdpr no existe"
→ Ejecutar ALTER TABLE en Supabase SQL Editor:
```sql
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS aceptado_gdpr BOOLEAN DEFAULT FALSE;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS fecha_aceptacion_gdpr DATE;
```

### CSV importados pero tablas vacías
→ Verificar que los headers del CSV coincidan con los nombres de columnas exactamente (mayúsculas/minúsculas)

### JSONB vacío en motos o órdenes
→ Es correcto si `anotaciones` o `conceptos` son `[]` o `{}`

---

## 🚀 PRÓXIMOS PASOS DESPUÉS DE VERIFICACIÓN

Una vez confirmado que todos los datos se importaron correctamente:

1. ✅ Configurar RLS (Row Level Security) en Supabase si es necesario
2. ✅ Conectar la aplicación CRM a Supabase
3. ✅ Probar flujo completo: Booking → CRM → Supabase
4. ✅ Verificar que GDPR se actualiza correctamente en ambas direcciones

---

**Nota:** Si alguna query retorna un resultado diferente al esperado, verifica:
- La codificación del CSV (debe ser UTF-8)
- Espacios en blanco al inicio/final de datos
- Formato de fechas (YYYY-MM-DD)
- Comillas en JSONB (deben ser " dobles, no simples)
