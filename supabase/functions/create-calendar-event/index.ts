import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import * as jose from "https://deno.land/x/jose@v5.0.0/index.ts"

const SERVICE_ACCOUNT_JSON = {
  type: "service_account",
  project_id: "grupo-via",
  private_key_id: "e43398a6cc70b86c3787c591453a1fe5313f530c",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDGYkNaSS/D4guN\na2MZAH13IK8f1xCiEEEifE3rj9vPQbP+xHMTsABsrE/GlZgSibIui4taDjPSv1je\nxZWVv/nTIKKxZTmbqgdCpf4HDmsKQ7/kCe5Ok3zrR2QpxjpcaqoGSBcnOJsCyfF9\nxxWoEM5ulCJpluoDAv00QeuUq0miQXZO4RdLzzn/ig5kjwikGLI6hxn2eq4sGnbh\nVg2DfQXcQOTCWTeB8wKyysfG+CAW2LyMUIPjgzLGHvB59M78CZ+FBQKjsD4RVGm9\nCFKjyyyek8Sgc42ThIEHWKd44jtNic1loelCkvJppqzQmZs5lQUUe6k/Wt0cMcvk\nq4QIG97pAgMBAAECggEAF7GIOEoJ56QBe7Yx63xEv9vaNpwNy0FUOi1s8/+mQdJn\n0Dt/v//zCQeqbn4S39Hsw0Tc05hjJZ4/W7nu8+fuC0J4U+YSU45i2BmxpX+aFquB\nSVfLS7yvPH12D8wyT7PYky/8fe1zjAl462wB4OUC9q+ADardz5bFjX57B7JOdM+V\nII497dpv2Eq7pjUC0jeTcC/4WMHeT2JOWXBaHho4i27FC5D7vrZ7h1wh10W6ynhw\nWKUpVBeCLoXyWYjJRrDQZ6FhRS2lsfrWA6lbYp2idTdqH2YrqhZjpNXFW4aVmABh\nU9sHPyCDZbnfEECscqO6dHHHcS1ymdLnzO71ORLEYQKBgQD4Fmsfi3HxaavTnBcQ\nHV6AbtBRFaPkK0uWoN3WCCG+XW/qee9ywpFiq7EG3IEMJLL5jD5kdwJa8iJI3JnG\ntKnXC1yxnbtqtavi1V2TBfS34j9zPb3+NpW5E1jWqeqUEvRsehdXGkHuYEJKlJbg\nkogbuXnZA9kYJB6fJngSftS8UQKBgQDMtgY+ZNDYNzKB43AYicnpuAtQGEb6PJMy\nH7lbiKgsz2s0aEBzS199xelqVEaWvWSaxuqXBbZ/NZ57M0CHthcMqVFJ1Yut3UWs\nKmZuieT5pHMmGMZ7wV8zhELbb7yjmpPD5djROfYPE00vfqqajrYSx84RUb4adE0c\nHfseQ94LGQKBgC8xfJFUoolNE82+bLi5DYgbDG/QUQwPnGJ8GZcklt6ywZ52MbHA\nB44goR1wBvB7bryADEJqTT1lwFXh+TLOnVx2Idz753ImOxt8gT99q47rcCyI+0KH\nubWqU4UKb8BZVrvoAdak/RPOpe2wFH+GAHRdtSsuSzcHb/fQhpjmHavxAoGATP8h\n9hHhY5HPU3+CSBh7c4cf6i5XdAOYsb+w7jbGWqRhhEK6CyOMdTgdhTrRmhz+XCD5\nV3h0ngBC7b/nQ6Q/oymEQ6socGrLq+f+wxDmqOcr0GZ9MUsYTb4vj23FnBul/IbV\nOEz+ucjevUB9VsjavtGcNnNyd2zLHApCy61nNPECgYBaC/Ked/HwGsqKmGMqu0yL\nTHubrDXB1ew72bcr/9u7Mj+CkZgP8ckl14OGcsQ4dDPXavJVcd4jJrA+xGLf+Ine\n4W+Zrn8R0EOQph4dZOf6+La8YxVDMpDIKQapms37DbnVYOEA3WH8Gf4PJ/Ko+9yu\nkKmCvdN2c3Yy39cPbR4VTA==\n-----END PRIVATE KEY-----\n",
  client_email: "grupo-via@grupo-via.iam.gserviceaccount.com",
  client_id: "113330415382642477407",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/grupo-via%40grupo-via.iam.gserviceaccount.com"
}

async function getAccessToken() {
  const privateKey = SERVICE_ACCOUNT_JSON.private_key
  const clientEmail = SERVICE_ACCOUNT_JSON.client_email

  const now = Math.floor(Date.now() / 1000)
  const expiresIn = 3600

  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + expiresIn,
    iat: now
  }

  const secretKey = await jose.importPKCS8(privateKey, "RS256")
  const jwt = await jose.SignJWT(payload)
    .setProtectedHeader({ alg: "RS256" })
    .sign(secretKey)

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  })

  if (!tokenResponse.ok) {
    throw new Error(`Failed to get access token: ${tokenResponse.statusText}`)
  }

  const data = await tokenResponse.json()
  return data.access_token
}

async function createCalendarEvent(accessToken: string, event: any) {
  const { title, description, start, end, calendarId } = event

  const calendarEvent = {
    summary: title,
    description: description,
    start: { dateTime: start },
    end: { dateTime: end },
    visibility: "public"
  }

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(calendarEvent)
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create calendar event: ${error}`)
  }

  const data = await response.json()
  return data
}

serve(async (req) => {
  try {
    const payload = await req.json()

    if (!payload.title || !payload.start || !payload.end || !payload.calendarId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: title, start, end, calendarId" }),
        { status: 400 }
      )
    }

    const accessToken = await getAccessToken()
    const result = await createCalendarEvent(accessToken, payload)

    return new Response(
      JSON.stringify({ success: true, eventId: result.id }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
