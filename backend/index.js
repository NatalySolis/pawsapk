const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        res.json({ status: 'OK', message: 'Conectado a MariaDB', dbTest: rows[0].solution });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', error: error.message });
    }
});

// Ruta de inicio de sesión y auto-registro con contraseña cifrada y nombre
app.post('/api/login', async (req, res) => {
  const { email, password, nombre } = req.body;

  console.log("Datos recibidos:", { email, nombre });

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios.' });
  }

  try {
    const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [email]);

    let usuarioId;
    let nombreUsuario = nombre || email.split('@')[0];
    let rolUsuario = 'CLIENTE'; // Rol por defecto (usuario común)

    if (usuarios.length > 0) {
      const userRecord = usuarios[0];
      
      // Comparamos la contraseña ingresada con el hash guardado de forma segura
      const passwordMatch = await bcrypt.compare(password, userRecord.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Contraseña incorrecta.' });
      }

      usuarioId = userRecord.id;
      nombreUsuario = userRecord.nombre;
      rolUsuario = userRecord.rol;
    } else {
      // Si no existe, lo registramos cifrando su contraseña y asignando rol 'CLIENTE'
      const negocioIdDefault = 1; 
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const [result] = await pool.query(
        'INSERT INTO usuarios (negocio_id, nombre, correo, password_hash, rol) VALUES (?, ?, ?, ?, ?)',
        [negocioIdDefault, nombreUsuario, email, passwordHash, 'CLIENTE']
      );
      
      usuarioId = result.insertId;
      console.log("¡Usuario común registrado con contraseña cifrada! ID:", usuarioId);
    }

    res.json({
      success: true,
      message: 'Procesado correctamente',
      user: {
        id: usuarioId,
        name: nombreUsuario,
        email: email,
        rol: rolUsuario, // Permite validar en el frontend si puede editar o no
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      }
    });

  } catch (error) {
    console.error('Error en base de datos:', error);
    res.status(500).json({ success: false, message: 'Error interno en la base de datos' });
  }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en puerto ${PORT}`);
});