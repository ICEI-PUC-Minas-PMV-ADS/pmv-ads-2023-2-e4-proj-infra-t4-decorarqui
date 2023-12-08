import * as SQLite from 'expo-sqlite';

export const Database = {
  getConnection: () => {
    const db = SQLite.openDatabase('decorarqui.db');

    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists Cliente (id integer  primary key not null, nome varchar(10) not null, email varchar(30) not null, telefone varchar(14) not null, senha varchar(20) not null);'
      );
      tx.executeSql(
        'create table if not exists Arquiteto (id integer  primary key not null, nome varchar(10) not null, email varchar(30) not null, senha varchar(20) not null,infoProfissional varchar(500));'
      );
    });

    const ExecuteQuery = (sql, params = []) =>
      new Promise((resolve, reject) => {
        db.transaction(
          (trans) => {
            trans.executeSql(
              sql,
              params,
              (_, results) => {
                resolve(results);
              },
              (_, error) => {
                console.log(error);
                reject(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      });

    return ExecuteQuery;
  },
}

export default Database;