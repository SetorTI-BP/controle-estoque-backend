// src/controllers/estoqueController.ts
import { Request, Response } from 'express';
import { pool } from '../config/database';
import { EstoqueVisita } from '../types';

export const getEstoqueByVisita = async (req: Request, res: Response) => {
  const visitaId = Number(req.params.visitaId);
  if (!visitaId) return res.status(400).json({ erro: 'visitaId inválido' });

  try {
    const result = await pool.query(
      `SELECT ev.*, p.nome as produto_nome
       FROM estoque_visitas ev
       LEFT JOIN produtos p ON ev.produto_id = p.id
       WHERE ev.visita_id = $1
       ORDER BY ev.id`,
      [visitaId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar estoque da visita' });
  }
};

export const createOrUpdateEstoque = async (req: Request, res: Response) => {
  const data: EstoqueVisita = req.body;

  // validações mínimas
  if (!data.visita_id || !data.produto_id) {
    return res.status(400).json({ erro: 'visita_id e produto_id são obrigatórios' });
  }

  try {
    if (data.id) {
      // Atualiza registro existente
      const result = await pool.query(
        `UPDATE estoque_visitas SET
           produto_id = $1,
           saldo_anterior = $2,
           entrada_1 = $3,
           entrada_2 = $4,
           entrada_3 = $5,
           entrada_4 = $6,
           saldo_final = $7,
           validade = $8,
           observacoes = $9
         WHERE id = $10
         RETURNING *`,
        [
          data.produto_id,
          data.saldo_anterior ?? 0,
          data.entrada_1 ?? 0,
          data.entrada_2 ?? 0,
          data.entrada_3 ?? 0,
          data.entrada_4 ?? 0,
          data.saldo_final ?? 0,
          data.validade ?? null,
          data.observacoes ?? null,
          data.id
        ]
      );
      return res.json(result.rows[0]);
    } else {
      // Insere novo registro
      const result = await pool.query(
        `INSERT INTO estoque_visitas
          (visita_id, produto_id, saldo_anterior, entrada_1, entrada_2, entrada_3, entrada_4, saldo_final, validade, observacoes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         RETURNING *`,
        [
          data.visita_id,
          data.produto_id,
          data.saldo_anterior ?? 0,
          data.entrada_1 ?? 0,
          data.entrada_2 ?? 0,
          data.entrada_3 ?? 0,
          data.entrada_4 ?? 0,
          data.saldo_final ?? 0,
          data.validade ?? null,
          data.observacoes ?? null
        ]
      );
      return res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar/atualizar item de estoque' });
  }
};

export const deleteEstoqueItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ erro: 'id inválido' });

  try {
    await pool.query('DELETE FROM estoque_visitas WHERE id = $1', [id]);
    res.json({ message: 'Item removido com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar item do estoque' });
  }
};
