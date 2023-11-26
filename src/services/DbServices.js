import * as SQLite from 'expo-sqlite';

export const Database = {
  getConnection: () => {
    const db = SQLite.openDatabase('decorarqui.db');

    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists projetos(id integer primary key not null, nomeProjeto varchar not null, descricaoProjeto varchar not null, preco decimal not null);'
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists usuario (id integer primary key not null, nome varchar(10) not null, email varchar(30) not null, senha varchar(20) not null);'
        );
    });

    const ExecuteQuery = (sql, params = []) =>
      new Promise((resolve, reject) => {
        db.transaction((trans) => {
          trans.executeSql(
            sql,
            params,
            (trans, results) => {
              resolve(results);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });

    return ExecuteQuery;
  },
};

export default Database;