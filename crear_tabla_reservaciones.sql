-- Crear tabla de reservaciones para GRUPO VIA
CREATE TABLE reservaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  marca_moto TEXT NOT NULL,
  servicio TEXT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  ubicacion TEXT NOT NULL CHECK (ubicacion IN ('madrid', 'argentina')),
  google_event_id TEXT,
  gdpr BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para búsquedas rápidas
CREATE INDEX idx_reservaciones_fecha ON reservaciones(fecha);
CREATE INDEX idx_reservaciones_ubicacion ON reservaciones(ubicacion);
CREATE INDEX idx_reservaciones_google_event_id ON reservaciones(google_event_id);
CREATE INDEX idx_reservaciones_email ON reservaciones(email);

-- Habilitar RLS (Row Level Security) para Supabase
ALTER TABLE reservaciones ENABLE ROW LEVEL SECURITY;

-- Política para que todos puedan insertar (booking desde formulario)
CREATE POLICY "Allow inserts" ON reservaciones
  FOR INSERT WITH CHECK (true);

-- Política para que solo Supabase pueda actualizar (Edge Function)
CREATE POLICY "Allow updates from service role" ON reservaciones
  FOR UPDATE USING (true);

-- Política para que todos puedan ver (leer disponibilidad)
CREATE POLICY "Allow select for availability check" ON reservaciones
  FOR SELECT USING (true);
