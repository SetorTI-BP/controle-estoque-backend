// src/types.ts
export interface EstoqueVisita {
  id: number;
  visita_id: number;
  produto_id: number;
  saldo_anterior: number;
  entrada_1: number;
  entrada_2: number;
  entrada_3: number;
  entrada_4: number;
  saldo_final: number;
  validade: Date | null;
  observacoes: string | null;
  created_at: Date;
}