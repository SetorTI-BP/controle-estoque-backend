// src/config/database.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// 👉 Carrega variáveis do .env na raiz do projeto
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true });
  console.log('⚙️  Arquivo .env carregado de', envPath);
} else {
  console.warn('⚠️  Arquivo .env não encontrado, usando variáveis de ambiente do sistema');
}

// 👉 Usa DATABASE_URL do .env ou fallback direto (apenas para testes locais)
const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_bNKIzZFmo6d1@ep-plain-lake-adykc2sn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

// 👉 Cria pool de conexões
export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // necessário para Neon
});

// 👉 Função para testar conexão
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conectado ao Neon Database com sucesso!');
    client.release();
  } catch (err) {
    console.error('❌ Erro ao conectar ao Neon Database:', (err as Error).message);
    throw err;
  }
};
