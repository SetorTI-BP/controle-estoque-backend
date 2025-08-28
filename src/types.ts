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

// Adicione ao seu types.ts
export interface RetiradaAlimento {
  id?: number;
  escola_id: number;
  produto_id: number;
  quantidade: number;
  data_retirada?: string;
  observacoes?: string;
  usuario_id: number;
  produto_nome?: string;
  unidade_medida?: string;
}

export interface DesperdicioAlimento {
  id?: number;
  escola_id: number;
  produto_id: number;
  quantidade_desperdicada: number;
  data_registro?: string;
  motivo?: string;
  observacoes?: string;
  usuario_id: number;
  produto_nome?: string;
  unidade_medida?: string;
}