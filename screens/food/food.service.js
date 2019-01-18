import { SQLite } from 'expo';
import { Query } from '../../config/Database';

const db = SQLite.openDatabase('db.db');

export const findAll = () => {
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(Query.EXPIRE.SELECT_ALL, [], (_, { rows }) => {
            return resolve(rows._array);
        });
    }));
}

export const search = (name) => {
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(Query.EXPIRE.SELECT_ALL_FOR_NAME, ['%'+name+'%'], (_, { rows }) => {
            return resolve(rows._array);
        });
    }));
}