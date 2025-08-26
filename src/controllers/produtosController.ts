import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getProdutos = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM produtos ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
};

export const createProduto = async (req: Request, res: Response) => {
  const { nome, categoria, unidade_medida } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO produtos (nome, categoria, unidade_medida) VALUES ($1, $2, $3) RETURNING *',
      [nome, categoria, unidade_medida]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
};

export const deleteProduto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar produto' });
  }
};
