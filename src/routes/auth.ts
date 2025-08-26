import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ erro: 'Credenciais inválidas' });
    }

    const usuario = result.rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// Registrar
router.post('/registrar', async (req, res) => {
  try {
    const { nome, email, senha, tipo = 'nutricionista' } = req.body;

    const usuarioExistente = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email]
    );

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ erro: 'Usuário já existe' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, tipo) 
       VALUES ($1, $2, $3, $4) RETURNING id, nome, email, tipo`,
      [nome, email, senhaHash, tipo]
    );

    const novoUsuario = result.rows[0];

    const token = jwt.sign(
      { id: novoUsuario.id, email: novoUsuario.email, tipo: novoUsuario.tipo },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      usuario: novoUsuario,
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

export default router;
