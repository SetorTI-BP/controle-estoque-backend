import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getVisitas = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT v.*, u.nome as nutricionista_nome, e.nome as escola_nome
       FROM visitas v
       JOIN usuarios u ON v.usuario_id = u.id
       JOIN escolas e ON v.escola_id = e.id
       ORDER BY data_visita DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar visitas' });
  }
};

export const createVisita = async (req: Request, res: Response) => {
  const { escola_id, usuario_id, data_visita, observacoes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO visitas (escola_id, usuario_id, data_visita, observacoes) VALUES ($1, $2, $3, $4) RETURNING *',
      [escola_id, usuario_id, data_visita, observacoes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar visita' });
  }
};

export const deleteVisita = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM visitas WHERE id = $1', [id]);
    res.json({ message: 'Visita deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar visita' });
  }
};
