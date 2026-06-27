# 🔍 GUÍA RÁPIDA DE REVISIÓN - CHROME

## 📋 QUÉ REVISAR

Abre en Chrome los 3 archivos HTML que te acabo de enviar:

### 1️⃣ **index-madrid.html** 
**Ubicación:** Avenida Madrid, 80
**Color:** Azul (#3b82f6)

**Revisa:**
- [ ] Checkbox GDPR visible antes del botón "Confirmar reserva"
- [ ] El texto dice: "Acepto la Política de Privacidad y autorizo el tratamiento..."
- [ ] Intenta enviar SIN marcar GDPR → debe mostrar error "Debes aceptar la Política..."
- [ ] Marca GDPR, rellena datos, confirma → debe funcionar

---

### 2️⃣ **index-argentina.html** 
**Ubicación:** Avenida República Argentina, 83
**Color:** Ámbar (#f59e0b) - DIFERENTE a Madrid

**Revisa:**
- [ ] Checkbox GDPR visible (con color ámbar, no azul)
- [ ] Mismo comportamiento que Madrid
- [ ] Los colores del formulario son ámbar en lugar de azul

---

### 3️⃣ **crm-taller.html**
**Sistema CRM Completo**

#### ✅ Verificar CALENDARIO (Tab "Citas")
- [ ] El calendario ahora muestra **6 COLUMNAS**: Lun, Mar, Mié, Jue, Vie, **Sab**
- [ ] Sábado tiene la misma anchura que otros días
- [ ] El rango de semana ahora incluye sábado (ej: "26 jun – 1 jul")

#### ✅ Verificar GDPR en Ficha Cliente (Tab "Datos personales")
**MUY IMPORTANTE:**
- [ ] El checkbox de GDPR está **DISABLED** (no puedes hacerle click)
- [ ] Debería estar gris/desactivado visualmente
- [ ] Hay un mensaje pequeño: "ⓘ Estado desde booking - Solo se actualiza cuando cliente acepta en formulario"
- [ ] El botón "Guardar" guarda los otros datos pero NO toca el GDPR

---

## 🧪 FLUJO COMPLETO DE PRUEBA

### Paso 1: Booking Madrid
1. Abre `index-madrid.html` en Chrome
2. Selecciona fecha y hora
3. Rellena datos
4. **NO marques GDPR** → intenta confirmar → debe fallar con error
5. **Marca GDPR** → ahora confirma → debe funcionar
6. Copia la reserva que se creó

### Paso 2: CRM - Ver Solicitud
1. Abre `crm-taller.html` en Chrome
2. Ve a "Citas" → deberías ver un badge rojo con "1 solicitud de reserva pendiente"
3. Haz click en "Ver solicitudes"
4. Verás la reserva que acabas de crear
5. Haz click en "Aceptar solicitud"

### Paso 3: CRM - Ficha Cliente con GDPR
1. Ahora deberías ver un nuevo cliente creado
2. Haz click en su fila para abrir la ficha
3. Ve al tab "Datos personales"
4. Verifica:
   - [ ] El checkbox de GDPR está **CHECKED** (porque lo aceptaste en booking)
   - [ ] El checkbox está **DISABLED** (no puedes desmarcarlo)
   - [ ] Muestra la fecha de aceptación
   - [ ] El mensaje informativo está visible
5. Intenta cambiar otros datos (nombre, teléfono)
6. Haz click "Guardar" → debe funcionar sin tocar GDPR

### Paso 4: Calendario - Verificar Sábado
1. Desde "Citas", mira el calendario
2. Verifica:
   - [ ] 6 columnas: Lun, Mar, Mié, Jue, Vie, **Sab**
   - [ ] El rango dice "26 jun – 1 jul" (incluye sábado)
   - [ ] Todas tienen el mismo ancho
3. La cita que creaste debería estar en el día/hora que seleccionaste

---

## ✅ CHECKLIST FINAL

| Aspecto | ¿OK? |
|---------|------|
| Booking Madrid: GDPR es obligatorio | ☐ |
| Booking Argentina: Color ámbar | ☐ |
| CRM: Calendario muestra Sábado | ☐ |
| CRM: Todas las columnas igual ancho | ☐ |
| CRM: GDPR disabled en ficha | ☐ |
| CRM: GDPR se guarda desde booking | ☐ |
| CRM: Mecánico NO puede editar GDPR | ☐ |

---

## 🎯 SI ALGO NO FUNCIONA

**Problema:** Checkbox GDPR no es obligatorio
- Busca `required` en el input del checkbox en `index-madrid.html`

**Problema:** GDPR no se deshabilita en CRM
- Busca `disabled` en el input de `crm-taller.html` en tabDatos()

**Problema:** Sábado no aparece en calendario
- Busca `dnames=['Lun','Mar','Mié','Jue','Vie','Sab']` en renderCal()

**Problema:** GDPR se guarda al editar datos en CRM
- Revisa que `saveDatos()` NO incluya `aceptado_gdpr`

---

## 📞 PRÓXIMOS PASOS

Una vez verificado todo en Chrome:
1. Confirma que todo funciona correctamente
2. Los archivos ya están en el repositorio git
3. Listos para hacer push a producción

¡Dale!
