// src/index.ts
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env'), debug: true }); // Carrega o .env da raiz

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';

const app = express();
app.use(cors());
app.use(express.json());

// Testa conexão ao iniciar
connectDB();

console.log('process.cwd():', process.cwd());
console.log('process.env.JWT_SECRET:', process.env.JWT_SECRET);

// Debug: garante que JWT_SECRET está carregado
console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET);

app.get('/', (req, res) => {
  res.send('🚀 API rodando e conectada ao Neon Database');
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});