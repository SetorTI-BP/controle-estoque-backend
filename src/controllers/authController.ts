import { Request, Response } from 'express';
import { pool } from '../config/database';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ erro: 'Usuário não encontrado' });

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) return res.status(401).json({ erro: 'Senha incorreta' });

    const token = generateToken({ id: user.id, nome: user.nome, email: user.email, tipo: user.tipo });

    res.json({ token, usuario: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};
