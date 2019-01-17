export const Query = {
    EXPIRE: {
        INIT: 'CREATE TABLE IF NOT EXISTS expire (id INTEGER PRIMARY KEY NOT NULL, name VARCHAR, date TEXT);',

        SELECT_ALL: 'SELECT * FROM expire;',
        SELECT_ALL_FOR_ID: 'SELECT * FROM expire WHERE name = ?;'
    }
}