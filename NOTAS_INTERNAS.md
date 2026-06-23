# 📝 Notas Internas - Grupo Via CRM

## Ideas y Tareas Pendientes

### 1. 🚨 Botón de Pánico - WhatsApp + n8n + GPT
**Estado:** En espera de webhook n8n  
**Descripción:**
- Crear botón "🚨 Citas saturadas" en ficha del cliente
- Envía POST a webhook n8n con datos del cliente
- n8n usa GPT para generar mensaje personalizado
- n8n envía mensaje por WhatsApp al cliente
- Mensaje incluye número de teléfono del negocio para llamar

**Requisitos:**
- [ ] URL del webhook de n8n
- [ ] Número de teléfono del negocio
- [ ] Flujo n8n configurado (GPT + WhatsApp)

**Ubicación en CRM:** Ficha del cliente (probablemente en el header)

**Progreso:** Pendiente de datos

---

### 2. 🤖 Chatbot WhatsApp - Recepcionista Virtual
**Estado:** Idea inicial  
**Descripción:**
Un chatbot que actúe como recepcionista automático con capacidades de:
- **Agendar citas:** El usuario puede solicitar agendar cita por WhatsApp
- **Reprogramar citas:** El usuario puede cambiar fecha/hora de una cita existente
- **Cancelar citas:** El usuario puede cancelar una cita
- **Recibir input del botón de pánico:** Cuando se activa el botón de pánico desde el CRM, el chatbot envía mensaje diciendo que llame a teléfono para reservar
- **Números de dos talleres:** Debe manejar teléfonos de dos ubicaciones diferentes

**Funcionalidades principales:**
1. Reconocimiento de intención (agendar, reprogramar, cancelar)
2. Integración con base de datos de citas
3. Sincronización con calendario del CRM
4. Manejo de dos talleres/ubicaciones
5. Respuestas automáticas con GPT para naturalidad

**Requisitos:**
- [ ] Números de teléfono de los 2 talleres
- [ ] Flujo n8n para manejar WhatsApp
- [ ] Integración con base de datos de citas (obtener disponibilidad)
- [ ] Configuración de GPT para respuestas naturales
- [ ] Diferenciación entre talleres

**Progreso:** Pendiente de datos y arquitectura

---

## Historial
- **2026-06-23:** Idea 1 creada (botón de pánico)
- **2026-06-23:** Idea 2 creada (chatbot recepcionista)
