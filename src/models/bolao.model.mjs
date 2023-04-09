import db from "../config/db.config.mjs";

class Bolao {
    constructor(bolao) {
        this.id= bolao.id;
        this.num_bolao = bolao.num_bolao;
        this.dt_inicio = bolao.dt_inicio;
        this.dt_final = bolao.dt_final;
        this.tipo_bolao = bolao.tipo_bolao;
        this.dez_pontos = bolao.dez_pontos;
        this.nove_pontos = bolao.nove_pontos;
        this.oito_pontos = bolao.oito_pontos;
        this.sete_pontos = bolao.sete_pontos;
        this.menos_pontos = bolao.menos_pontos;
        this.maisp_pontos = bolao.maisp_pontos;
        this.status_bolao = bolao.status_bolao;
        this.vdez_pontos = bolao.vdez_pontos;
        this.vnove_pontos = bolao.vnove_pontos;
        this.voito_pontos = bolao.voito_pontos;
        this.vsete_pontos = bolao.vsete_pontos;
        this.vmenos_pontos = bolao.vmenos_pontos;
        this.vmaisp_pontos = bolao.vmaisp_pontos;
        this.valor_bolao = bolao.valor_bolao;
        this.obs_bolao = bolao.obs_bolao;
        this.id_proprietario = bolao.id_proprietario;
    }
    static criarBolao(novoBolao, result) {
        db.query("INSERT INTO boloes SET ?", novoBolao, (err, res) => {
            if (err) {
                console.log("Erro ao criar o bolão: ", err);
                result(err, null);
                return;
            }

            console.log("Bolão criado com sucesso: ", { id: res.insertId, ...novoBolao });
            result(null, { id: res.insertId, ...novoBolao });
        });
    }
    static buscarBolaoPorId(bolaoId, result) {
        db.query(`SELECT * FROM boloes WHERE num_bolao = '${bolaoId}'`, (err, res) => {
            if (err) {
                console.log("Erro ao buscar o bolão pelo ID: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("Bolão encontrado: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ message: `Nenhum bolão encontrado com o ID ${bolaoId}` }, null);
        });
    }
    static buscarBoloes(result) {
        db.query("SELECT * FROM boloes ORDER BY num_bolao DESC", (err, res) => {
            if (err) {
                console.log("Erro ao buscar todos os bolões: ", err);
                result(null, err);
                return;
            }

            console.log("Bolões encontrados: ", res);
            result(null, res);
        });
    }
    static atualizarBolaoById(id, bolao, result) {
        db.query(`
        UPDATE boloes 
        SET 
          dt_inicio = ?, dt_final = ?, tipo_bolao = ?, dez_pontos = ? , nove_pontos = ?, 
          oito_pontos = ?, sete_pontos = ?, menos_pontos = ?, maisp_pontos = ?,
          status_bolao = ?, vdez_pontos = ?, vnove_pontos = ?, voito_pontos = ?,
          vsete_pontos = ?, vmenos_pontos = ?,
          vmaisp_pontos = ?, valor_bolao = ?, obs_bolao = ?, id_proprietario = ?
        WHERE id = ?
      `,
            [bolao.dt_inicio, bolao.dt_final, bolao.tipo_bolao, bolao.dez_pontos
                ,bolao.nove_pontos,bolao.oito_pontos,bolao.sete_pontos,bolao.menos_pontos,
                bolao.maisp_pontos,bolao.status_bolao,bolao.vdez_pontos,bolao.vnove_pontos,
                bolao.voito_pontos,bolao.vsete_pontos,bolao.vmenos_pontos,bolao.vmaisp_pontos,
                bolao.valor_bolao,bolao.obs_bolao,bolao.id_proprietario, id],
            (err, res) => {
                if (err) {
                    console.log("Erro ao atualizar o bolão: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    result({ message: `Nenhum bolão encontrado com o ID ${id}` }, null);
                    return;
                }

                console.log("Bolão atualizado com sucesso: ", { id: id, ...bolao });
                result(null, { id: id, ...bolao });
            }
        );
    }
    static removerBolao(id, result) {
        db.query("DELETE FROM boloes WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("Erro ao deletar o bolão: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ message: `Nenhum bolão encontrado com o ID ${id}` }, null);
                return;
            }

            console.log("Bolão deletado com sucesso, ID: ", id);
            result(null, res);
        });
    }
}






export default Bolao;
