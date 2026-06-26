-- Edge Function para crear eventos en Google Calendar
-- Ejecutar en Supabase SQL Editor

create or replace function public.create_google_calendar_event()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  response jsonb;
  calendar_id text;
  service_account_email text := 'grupo-via@grupo-via.iam.gserviceaccount.com';
begin
  -- Determinar el calendar ID según la ubicación
  if new.ubicacion = 'madrid' then
    calendar_id := 'f2fae0a29264f73774edfc63b2c3e7f95be91e066f68672081142e7ce831174f@group.calendar.google.com';
  elsif new.ubicacion = 'argentina' then
    calendar_id := 'c6de5139d700832ff5f5b4bd49ad1c5b0d5804b8363d94c4c5ee9a7ff22e7c4f@group.calendar.google.com';
  else
    raise exception 'Ubicación inválida: %', new.ubicacion;
  end if;

  -- Llamar a la Edge Function para crear el evento
  perform
    net.http_post(
      url := 'https://horsoqomlprirdrjbijc.supabase.co/functions/v1/create-calendar-event',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.supabase_token', true)
      ),
      body := jsonb_build_object(
        'calendar_id', calendar_id,
        'summary', format('Cita %s - %s - %s', new.servicio, new.marca_moto, new.nombre),
        'description', format('Cliente: %s\nEmail: %s\nTelefono: %s\nServicio: %s\nMoto: %s',
          new.nombre, new.email, new.telefono, new.servicio, new.marca_moto),
        'start', format('%sT%s:00', new.fecha, new.hora),
        'end', format('%sT%s:45', new.fecha, new.hora),
        'reservation_id', new.id
      )
    );

  return new;
end;
$$;

-- Crear trigger para ejecutar la función cuando se inserte una reservación
drop trigger if exists trigger_create_calendar_event on reservaciones;
create trigger trigger_create_calendar_event
after insert on reservaciones
for each row
execute function public.create_google_calendar_event();
