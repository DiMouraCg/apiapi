import BolaoService from "../services/bolao.service.mjs";

class BolaoController {
  async buscarBoloes(req, res) {
    try {
      const boloes = await BolaoService.buscarBoloes();
      return res.status(200).json(boloes);      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async buscarBolaoPorId(req, res) {
    try {
      const bolao = await BolaoService.buscarBolaoPorId(req.params.id);
      if (!bolao) {
        return res.status(404).json({ message: "Bolão não encontrado" });
      }
      return res.status(200).json(bolao);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async criarBolao(req, res) {
    try {
      const bolao = await BolaoService.criarBolao(req.body);
      return res.status(201).json(bolao);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async atualizarBolao(req, res) {
    try {
      const bolao = await BolaoService.atualizarBolao(req.params.id, req.body);
      if (!bolao) {
        return res.status(404).json({ message: "Bolão não encontrado" });
      }
      return res.status(200).json(bolao);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async removerBolao(req, res) {
    try {
      const bolao = await BolaoService.removerBolao(req.params.id);
      if (!bolao) {
        return res.status(404).json({ message: "Bolão não encontrado" });
      }
      return res.status(200).json({ message: "Bolão removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new BolaoController();
