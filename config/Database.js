export const Query = {
    EXPIRE: {
        INIT: 'CREATE TABLE IF NOT EXISTS expire (id INTEGER PRIMARY KEY NOT NULL, name VARCHAR, note VARCHAR, date TEXT);',
              
        SAVE: 'INSERT INTO expire (name, note, date) VALUES (?, ?, ?)',
        SELECT_ALL: 'SELECT * FROM expire',
        SELECT_ALL_FOR_NAME: "SELECT * FROM expire WHERE name LIKE ?"
    }
}