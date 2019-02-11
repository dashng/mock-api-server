const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

class AppDAO {

    constructor() {
        if (!AppDAO.db) {
            this.initDBConn();
        }
    }

    initDBConn(dbFilePath = './db') {
        AppDAO.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Could not connect to database', err)
            } else {
                console.log('Connected to database')
            }
        });
    }

    getDB() {
        return AppDAO.db;
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            let data = AppDAO.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows)
                }
            });
        });
    }
}

module.exports = AppDAO;