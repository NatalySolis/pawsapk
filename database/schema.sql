CREATE DATABASE IF NOT EXISTS pawsapp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pawsapp_db;

CREATE TABLE negocios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(30),
    direccion TEXT,
    configuracion_telegram JSON,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    negocio_id INT NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('DUEÑO', 'EMPLEADO', 'DEV') NOT NULL DEFAULT 'EMPLEADO',
    FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
);

CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    negocio_id INT NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    categoria ENUM('CONSULTA', 'VACUNACION', 'ESTETICA', 'LABORATORIO', 'CIRUGIA', 'URGENCIAS') NOT NULL,
    duracion_estimada INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    negocio_id INT NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    correo VARCHAR(120),
    FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
);

CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    negocio_id INT NOT NULL,
    cliente_id INT NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raza VARCHAR(80),
    edad INT,
    foto VARCHAR(255),
    FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    negocio_id INT NOT NULL,
    cliente_id INT NOT NULL,
    usuario_id INT,
    fecha_hora_inicio DATETIME NOT NULL,
    fecha_hora_fin DATETIME NOT NULL,
    estado ENUM('PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA') DEFAULT 'PENDIENTE',
    FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE cita_mascota_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cita_id INT NOT NULL,
    mascota_id INT NOT NULL,
    servicio_id INT NOT NULL,
    FOREIGN KEY (cita_id) REFERENCES citas(id) ON DELETE CASCADE,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
    FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE CASCADE
);

CREATE TABLE expedientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    negocio_id INT NOT NULL,
    mascota_id INT NOT NULL,
    cita_id INT,
    usuario_id INT NOT NULL,
    sintomas TEXT,
    diagnostico TEXT,
    tratamiento TEXT,
    notas_estetica TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
    FOREIGN KEY (cita_id) REFERENCES citas(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT
);