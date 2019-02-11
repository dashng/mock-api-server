const AppDAO = require('../shared/dao');

class SimulateQuery {
    constructor() {
        this.appDao = new AppDAO();
    }

    getDetail(sql, params=[]) {
        let promise = this.appDao.run(sql, params);
        return promise;
    }

    createTable(sql, params=[]) {
        let promise = this.appDao.run(sql, params);
        return promise;
    }

    insert(sql, params=[]) {
        let promise = this.appDao.run(sql, params);
        return promise;
    }
}

module.exports = SimulateQuery;