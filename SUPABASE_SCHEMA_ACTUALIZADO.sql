-- ✅ SCHEMA ACTUALIZADO CON GDPR COMPLIANCE
-- CAMBIOS: Agregar campos aceptado_gdpr y fecha_aceptacion_gdpr en tabla clientes

-- TABLE: clientes (ACTUALIZADO)
CREATE TABLE clientes (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  apellidos TEXT,
  dni TEXT,
  telefono TEXT NOT NULL,
  correo TEXT,
  aceptado_gdpr BOOLEAN DEFAULT FALSE,
  fecha_aceptacion_gdpr DATE,
  fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_clientes_dni ON clientes(dni);
CREATE INDEX idx_clientes_telefono ON clientes(telefono);
CREATE INDEX idx_clientes_aceptado_gdpr ON clientes(aceptado_gdpr);

-- TABLE: motos
CREATE TABLE motos (
  id TEXT PRIMARY KEY,
  cliente_id TEXT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  cilindrada TEXT,
  matricula TEXT,
  bastidor TEXT,
  kilometros INTEGER,
  anotaciones JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_motos_cliente_id ON motos(cliente_id);
CREATE INDEX idx_motos_matricula ON motos(matricula);

-- TABLE: citas
CREATE TABLE citas (
  id TEXT PRIMARY KEY,
  cliente_id TEXT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  moto_id TEXT NOT NULL REFERENCES motos(id) ON DELETE CASCADE,
  fecha_cita DATE NOT NULL,
  hora_cita TEXT NOT NULL,
  hora_fin TEXT,
  tipo_servicio TEXT NOT NULL CHECK (tipo_servicio IN ('mantenimiento', 'siniestro', 'itv', 'reparacion')),
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_progreso', 'listo_entrega', 'entregado_pagado')),
  mecanico_id TEXT NOT NULL,
  nota TEXT,
  desde_booking BOOLEAN DEFAULT FALSE,
  taller TEXT CHECK (taller IN ('madrid', 'argentina')),
  fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_citas_cliente_id ON citas(cliente_id);
CREATE INDEX idx_citas_moto_id ON citas(moto_id);
CREATE INDEX idx_citas_fecha_cita ON citas(fecha_cita);
CREATE INDEX idx_citas_taller ON citas(taller);
CREATE INDEX idx_citas_estado ON citas(estado);
CREATE INDEX idx_citas_desde_booking ON citas(desde_booking);

-- TABLE: tareas
CREATE TABLE tareas (
  id TEXT PRIMARY KEY,
  cliente_id TEXT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  descripcion TEXT NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  hora_inicio TEXT,
  hora_fin TEXT,
  mecanico_id TEXT NOT NULL,
  completada BOOLEAN DEFAULT FALSE,
  fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tareas_cliente_id ON tareas(cliente_id);
CREATE INDEX idx_tareas_fecha_vencimiento ON tareas(fecha_vencimiento);
CREATE INDEX idx_tareas_completada ON tareas(completada);

-- TABLE: ordenes
CREATE TABLE ordenes (
  id TEXT PRIMARY KEY,
  numero TEXT UNIQUE NOT NULL,
  cliente_id TEXT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  moto_id TEXT NOT NULL REFERENCES motos(id) ON DELETE CASCADE,
  moto_marca TEXT,
  moto_modelo TEXT,
  moto_matricula TEXT,
  kilometros INTEGER,
  conceptos JSONB NOT NULL DEFAULT '[]',
  observaciones TEXT,
  subtotal NUMERIC(10,2) NOT NULL,
  iva_total NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  estado TEXT DEFAULT 'pendiente',
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ordenes_cliente_id ON ordenes(cliente_id);
CREATE INDEX idx_ordenes_moto_id ON ordenes(moto_id);
CREATE INDEX idx_ordenes_numero ON ordenes(numero);
CREATE INDEX idx_ordenes_fecha ON ordenes(fecha);

-- TABLE: facturados
CREATE TABLE facturados (
  id TEXT PRIMARY KEY,
  cita_id TEXT NOT NULL REFERENCES citas(id) ON DELETE CASCADE,
  cliente_id TEXT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  servicios_std JSONB DEFAULT '[]',
  servicios_custom JSONB DEFAULT '[]',
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_facturados_cita_id ON facturados(cita_id);
CREATE INDEX idx_facturados_cliente_id ON facturados(cliente_id);
CREATE INDEX idx_facturados_fecha ON facturados(fecha);

-- NOTA: Si la tabla clientes ya existe, usar ALTER para agregar columnas:
-- ALTER TABLE clientes ADD COLUMN aceptado_gdpr BOOLEAN DEFAULT FALSE;
-- ALTER TABLE clientes ADD COLUMN fecha_aceptacion_gdpr DATE;
-- CREATE INDEX idx_clientes_aceptado_gdpr ON clientes(aceptado_gdpr);
