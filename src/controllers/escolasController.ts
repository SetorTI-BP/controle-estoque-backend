import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getEscolas = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM escolas ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar escolas' });
  }
};

export const createEscola = async (req: Request, res: Response) => {
  const { nome, endereco, responsavel, contato } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO escolas (nome, endereco, responsavel, contato) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, endereco, responsavel, contato]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar escola' });
  }
};

export const deleteEscola = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM escolas WHERE id = $1', [id]);
    res.json({ message: 'Escola deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar escola' });
  }
};
