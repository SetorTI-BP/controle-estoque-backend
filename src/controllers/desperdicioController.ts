import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getRetiradasEscola = async (req: Request, res: Response) => {
  const escolaId = Number(req.params.escolaId);
  try {
    const result = await pool.query(
      `SELECT r.*, p.nome as produto_nome, p.unidade_medida
       FROM retiradas_alimentos r
       JOIN produtos p ON r.produto_id = p.id
       WHERE r.escola_id = $1
       ORDER BY r.data_retirada DESC`,
      [escolaId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar retiradas' });
  }
};

export const getRetiradasByEscola = async (req: Request, res: Response) => {
  const escolaId = Number(req.params.escolaId);
  try {
    const result = await pool.query(
      `SELECT r.*, p.nome as produto_nome, p.unidade_medida
       FROM retiradas_alimentos r
       JOIN produtos p ON r.produto_id = p.id
       WHERE r.escola_id = $1
       ORDER BY r.data_retirada DESC`,
      [escolaId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar retiradas' });
  }
};

export const createRetirada = async (req: Request, res: Response) => {
  const { escola_id, produto_id, quantidade, observacoes, usuario_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO retiradas_alimentos 
       (escola_id, produto_id, quantidade, observacoes, usuario_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [escola_id, produto_id, quantidade, observacoes, usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar retirada' });
  }
};

export const getDesperdicioByEscola = async (req: Request, res: Response) => {
  const escolaId = Number(req.params.escolaId);
  try {
    const result = await pool.query(
      `SELECT d.*, p.nome as produto_nome, p.unidade_medida
       FROM desperdicio_alimentos d
       JOIN produtos p ON d.produto_id = p.id
       WHERE d.escola_id = $1
       ORDER BY d.data_registro DESC`,
      [escolaId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar desperdício' });
  }
};

export const createDesperdicio = async (req: Request, res: Response) => {
  const { escola_id, produto_id, quantidade_desperdicada, motivo, observacoes, usuario_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO desperdicio_alimentos 
       (escola_id, produto_id, quantidade_desperdicada, motivo, observacoes, usuario_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [escola_id, produto_id, quantidade_desperdicada, motivo, observacoes, usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar desperdício' });
  }
};