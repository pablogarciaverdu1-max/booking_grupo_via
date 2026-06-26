# 🚀 PUBLICAR EN GITHUB PAGES

## 📍 CONFIGURACIÓN INICIAL

Tu repositorio en GitHub es:
```
https://github.com/pablogarciaverdu1-max/booking_grupo_via
```

---

## ✅ PASO 1: HABILITAR GITHUB PAGES

1. Ve a tu repositorio en GitHub
2. **Settings** (en la barra superior)
3. **Pages** (en la barra izquierda)
4. En **"Source"**, selecciona:
   - **Branch:** `claude/trusting-ptolemy-fonh5r`
   - **Folder:** `/` (raíz del repositorio)
5. Click **Save**

**Resultado esperado:** "Your site is published at: `https://pablogarciaverdu1-max.github.io/booking_grupo_via/`"

---

## 📋 PASO 2: ESPERAR A QUE SE PUBLIQUE

GitHub Pages tarda 1-2 minutos en publicar. Verás:
- ✅ Un check verde si está listo
- ⏳ Un círculo amarillo si aún está procesando

**No hagas nada durante este tiempo.**

---

## 🔗 PASO 3: ACCEDER A LOS FORMULARIOS

Una vez publicado, tus archivos estarán en:

### 📱 FORMULARIO MADRID
```
https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-madrid.html
```
- Ubicación: Avenida Madrid, 80
- Color: Azul (#3b82f6)

### 📱 FORMULARIO ARGENTINA
```
https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-argentina.html
```
- Ubicación: Avenida República Argentina, 83
- Color: Ámbar (#f59e0b)

### 💼 CRM TALLER
```
https://pablogarciaverdu1-max.github.io/booking_grupo_via/crm-taller.html
```
- Gestión completa de citas
- Ficha del cliente con GDPR

---

## 🧪 PASO 4: PROBAR LA CONEXIÓN

### Test 1: Verificar que los archivos cargan
Abre en nuevas pestañas:
1. Madrid: https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-madrid.html
2. Argentina: https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-argentina.html
3. CRM: https://pablogarciaverdu1-max.github.io/booking_grupo_via/crm-taller.html

**Esperado:** Todas cargan sin errores en console (F12)

### Test 2: Verificar localStorage sincronización
1. Abre index-madrid.html
2. Selecciona fecha y hora
3. Rellena datos (nombre, teléfono, DNI, moto, servicio)
4. Marca GDPR
5. Click "Confirmar reserva"
6. Abre crm-taller.html en otra pestaña
7. Ve a "Citas" tab
8. Deberías ver un badge rojo: "1 solicitud de reserva pendiente"

**Esperado:** La reserva se sincroniza entre pestaña de formulario y CRM

### Test 3: Verificar GDPR en CRM
1. En CRM, click "Ver solicitudes" (desde badge rojo)
2. Verás la reserva que creaste
3. Click "Aceptar solicitud"
4. Nueva ficha cliente se crea
5. Click en el cliente para abrir ficha
6. Tab "Datos personales"
7. Verifica:
   - ✅ Checkbox GDPR está CHECKED
   - ✅ Checkbox está DISABLED (no puedes hacerle click)
   - ✅ Muestra la fecha de aceptación
   - ✅ Mensaje: "ⓘ Estado desde booking - Solo se actualiza..."

**Esperado:** Todo funciona como en testing local

### Test 4: Verificar calendario con sábado
1. En CRM, tab "Citas"
2. Mira el calendario en la parte superior
3. Verifica:
   - ✅ 6 columnas: Lun, Mar, Mié, Jue, Vie, SAB
   - ✅ Todas igual ancho
   - ✅ Rango incluye sábado (ej: "26 jun - 1 jul")

**Esperado:** Sábado aparece correctamente

---

## ⚠️ SI ALGO NO FUNCIONA

### Error: "Files not found" (404)
→ GitHub Pages aún está procesando. Espera 2-3 minutos y recarga.

### Error: localStorage no sincroniza
→ Verifica que ambas pestañas usan la MISMA URL base:
```
https://pablogarciaverdu1-max.github.io/booking_grupo_via/
```
No mezcles con `localhost` o rutas diferentes.

### Error: Console muestra errores JavaScript
→ Abre F12 > Console, copia el error y verifica:
- Todas las funciones están definidas
- No hay referencias a variables indefinidas
- Rutas de archivos son correctas

### Error: GDPR no es obligatorio
→ Verifica que línea 201 de `index-madrid.html` tiene `required`
→ Haz commit de cambios y espera a que GitHub Pages se actualice (1-2 min)

### Error: Calendario no muestra sábado
→ Verifica que línea 536 de `crm-taller.html` tiene:
```javascript
const dnames=['Lun','Mar','Mié','Jue','Vie','Sab']
```
→ Haz commit de cambios y espera a que GitHub Pages se actualice

---

## 🔄 ACTUALIZAR CAMBIOS EN GITHUB PAGES

Si después haces cambios en los archivos:

1. **Edita el archivo** (ej: `index-madrid.html`)
2. **Commit:**
   ```bash
   git add index-madrid.html
   git commit -m "Fix: Cambio en formulario Madrid"
   ```
3. **Push:**
   ```bash
   git push origin claude/trusting-ptolemy-fonh5r
   ```
4. **Espera 1-2 minutos** para que GitHub Pages se actualice
5. **Recarga la página** (Ctrl+F5 para limpiar cache)

---

## 📌 CHECKLIST DE PUBLICACIÓN

- [ ] Habilité GitHub Pages en Settings > Pages
- [ ] Seleccioné rama `claude/trusting-ptolemy-fonh5r`
- [ ] GitHub Pages muestra "Your site is published at..."
- [ ] Esperé 2-3 minutos a que se procese
- [ ] Abrí Madrid: `https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-madrid.html`
- [ ] Abrí Argentina: `https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-argentina.html`
- [ ] Abrí CRM: `https://pablogarciaverdu1-max.github.io/booking_grupo_via/crm-taller.html`
- [ ] Probé flujo: Booking → CRM → Aceptar → GDPR syncronizado
- [ ] Verifiqué calendario con sábado
- [ ] Confirmé GDPR disabled en CRM
- [ ] Toda la comunicación funciona sin errores

---

## 💡 TIPS IMPORTANTES

### LocalStorage es por dominio
- Madrid booking guarda en: `localStorage[gv_reservas_madrid]`
- Argentina booking guarda en: `localStorage[gv_reservas_argentina]`
- CRM sincroniza ambas

**Por eso debes abrir los 3 links del MISMO dominio:**
```
https://pablogarciaverdu1-max.github.io/booking_grupo_via/
```

**NO mezcles:**
- ❌ `https://...github.io/...` + `localhost:3000`
- ❌ `https://...github.io/...` + `file:///C:/Users/.../index-madrid.html`
- ✅ Todo desde `https://...github.io/booking_grupo_via/`

### Cache del navegador
Si haces cambios y no ves actualizaciones:
1. Presiona **Ctrl+F5** (limpia cache)
2. O abre en **modo incógnito** (Ctrl+Shift+N en Chrome)
3. O espera 5 minutos

### LocalStorage para testing
Si quieres limpiar datos de testing:
```javascript
// En Chrome DevTools Console (F12):
localStorage.removeItem('gv_reservas_madrid')
localStorage.removeItem('gv_reservas_argentina')
```

---

## 📞 VALIDACIÓN FINAL

Cuando todo funcione, confirma:

```
✅ Madrid booking: https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-madrid.html
✅ Argentina booking: https://pablogarciaverdu1-max.github.io/booking_grupo_via/index-argentina.html
✅ CRM: https://pablogarciaverdu1-max.github.io/booking_grupo_via/crm-taller.html

✅ Flujo completo funciona (Booking → CRM → Sincronización)
✅ GDPR obligatorio en formularios
✅ GDPR disabled y sincronizado en CRM
✅ Calendario con sábado
✅ Sin errores en console

LISTO PARA PRODUCCIÓN 🚀
```

---

*Guía GitHub Pages v1.0 - 2025-06-26*
