// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Testa conexão ao iniciar
connectDB();

app.get('/', (req, res) => {
  res.send('🚀 API rodando e conectada ao Neon Database');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
