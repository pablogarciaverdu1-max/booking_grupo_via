// Edge Function para Supabase - Crear eventos en Google Calendar
// Archivo: supabase/functions/create-calendar-event/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!
const SERVICE_ACCOUNT_JSON = Deno.env.get("GOOGLE_SERVICE_ACCOUNT")! // Archivo JSON de la cuenta de servicio
const GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3"

// Función para obtener token JWT
async function getServiceAccountToken() {
  const serviceAccount = JSON.parse(SERVICE_ACCOUNT_JSON)

  const now = Math.floor(Date.now() / 1000)
  const expiresAt = now + 3600

  const header = {
    alg: "RS256",
    typ: "JWT",
  }

  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp: expiresAt,
    iat: now,
  }

  const encodedHeader = btoa(JSON.stringify(header))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")

  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")

  const message = `${encodedHeader}.${encodedPayload}`

  // Aquí necesitarías firmar con la clave privada RSA
  // Por ahora, retornamos un placeholder - en producción usarías crypto.subtle
  const signature = await signRS256(message, serviceAccount.private_key)

  const token = `${message}.${signature}`

  // Intercambiar JWT por access token
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`,
  })

  const data = await response.json()
  return data.access_token
}

// Función para firmar JWT
async function signRS256(message: string, privateKey: string) {
  const key = await crypto.subtle.importKey(
    "pkcs8",
    new TextEncoder().encode(
      privateKey
        .replace(/-----BEGIN PRIVATE KEY-----/g, "")
        .replace(/-----END PRIVATE KEY-----/g, "")
        .replace(/\n/g, "")
    ),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(message)
  )

  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

// Función principal
serve(async (req) => {
  try {
    const { calendar_id, summary, description, start, end, reservation_id } = await req.json()

    // Obtener token de la cuenta de servicio
    const accessToken = await getServiceAccountToken()

    // Crear evento en Google Calendar
    const eventResponse = await fetch(
      `${GOOGLE_CALENDAR_API}/calendars/${calendar_id}/events`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          description,
          start: {
            dateTime: start,
            timeZone: "Europe/Madrid",
          },
          end: {
            dateTime: end,
            timeZone: "Europe/Madrid",
          },
          transparency: "opaque",
          status: "confirmed",
        }),
      }
    )

    if (!eventResponse.ok) {
      const error = await eventResponse.text()
      console.error("Error creating calendar event:", error)
      return new Response(
        JSON.stringify({ error: "Failed to create calendar event", details: error }),
        { status: 500 }
      )
    }

    const event = await eventResponse.json()

    // Actualizar la reservación con el google_event_id
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    const { error: updateError } = await supabase
      .from("reservaciones")
      .update({ google_event_id: event.id })
      .eq("id", reservation_id)

    if (updateError) {
      console.error("Error updating reservation:", updateError)
      return new Response(
        JSON.stringify({ error: "Event created but failed to update reservation", details: updateError }),
        { status: 500 }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        event_id: event.id,
        event_link: event.htmlLink
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
