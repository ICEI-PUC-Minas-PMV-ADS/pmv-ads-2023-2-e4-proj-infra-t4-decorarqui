import Database from './DbServices';

const DB_EXEC = Database.getConnection();


export const insertProjeto = async (param) => {
  let results = await DB_EXEC(`insert into projetos(nomeProjeto,descricaoProjeto,preco)
  values(?,?,?)`, [param.nomeProjeto, param.descricaoProjeto, param.preco]);
  console.log(results);
  return results.rowsAffected;
}

export const deleteProjeto = async (id) => {
  let results = await DB_EXEC(`delete from projetos where id=?`, [id]);
  console.log(results);
  return results.rowsAffected;
}