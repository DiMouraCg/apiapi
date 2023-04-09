import express from 'express';
import bolaoController from '../controllers/bolao.controller.mjs';

const bolaoRoutes = express.Router();

bolaoRoutes.post('/cadastrar-bolao', bolaoController.criarBolao);
bolaoRoutes.get('/buscar-bolao', bolaoController.buscarBoloes);
bolaoRoutes.get('/buscar-bolao-id/:id', bolaoController.buscarBolaoPorId);
bolaoRoutes.put('/atualiza-bolao/:id', bolaoController.atualizarBolao);
bolaoRoutes.delete('/deleta-bolao/:id', bolaoController.removerBolao);

export default bolaoRoutes;
