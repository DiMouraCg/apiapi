import mysql from 'mysql2/promise';
import pool from '../config/db.config.mjs';
import Bolao from '../models/bolao.model.mjs';

const criarBolao = async (novoBolao) => {
  
  const conn = await pool.getConnection();
  try {
    const result = await conn.query('INSERT INTO boloes SET ?', novoBolao);
    return result[0].insertId;
  } catch (err) {
    console.log(novoBolao);
    console.log(err);
    throw err;
  } finally {
    conn.release();
  }
};

const buscarBoloes = async () => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query('SELECT * FROM boloes ORDER BY num_bolao DESC');
    
    return result[0].map((bolao) => new Bolao(bolao));
      
  } catch (err) {
    console.error('Erro ao criar bolão:', err);
    throw err;
  } finally {
    conn.release();
  
  }
};

const buscarBolaoPorId = async (bolaoId) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query('SELECT * FROM boloes WHERE id = ?', [bolaoId]);
    if (result[0].length === 0) {
      throw { message: 'Bolão não encontrado', status: 404 };
    }
    return new Bolao(result[0][0]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

const atualizarBolao = async (bolaoId, bolaoAtualizado) => {
 
  const conn = await pool.getConnection();
  try {
    const result = await conn.query('UPDATE boloes SET ? WHERE id = ?', [bolaoAtualizado, bolaoId]);
    if (result[0].affectedRows === 0) {
     
      throw { message: 'Bolão não encontrado', status: 404 };
     
    }
    return { message: 'Bolão atualizado com sucesso' };
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

const removerBolao = async (bolaoId) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query('DELETE FROM boloes WHERE id = ?', [bolaoId]);
    if (result[0].affectedRows === 0) {
      throw { message: 'Bolão não encontrado', status: 404 };
    }
    return { message: 'Bolão deletado com sucesso' };
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export default {criarBolao,buscarBoloes,buscarBolaoPorId,atualizarBolao,removerBolao}