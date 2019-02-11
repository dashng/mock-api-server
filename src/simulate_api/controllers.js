const SimulateQuery = require('./simulate_query');

module.exports.getSimulateAPI = function (originalUrl, method) {
    let query = new SimulateQuery();
    return query.
        getDetail(
            'select data from simulate_table where api = ? and method = ? limit 1;',
            [originalUrl, method]
        );
};

module.exports.deleteSimulateAPI = function (originalUrl, method) {
    let query = new SimulateQuery();
    return query.
        getDetail(
            'delete from simulate_table where api = ? and method = ?;',
            [originalUrl, method]
        );
};

module.exports.createTable = function () {
    let query = new SimulateQuery();
    let promise = query.createTable(`
        CREATE TABLE simulate_table (
            project Varchar,
            method Varchar,
            api Varchar,
            headers Varchar,
            data Varchar,
            PRIMARY KEY (project, method, api, headers)
        );
    `);
    return promise;
};

module.exports.insertSimulatedAPIData = function (data) {
    let query = new SimulateQuery();
    let promise = query.insert(`
        INSERT OR REPLACE 
        INTO 
            simulate_table (project, method, api, headers, data)
        VALUES 
            (?, ?, ?, ?, ?);
    `, data);
    return promise;
};

module.exports.getAllSimulaetdAPIData = function() {
    let query = new SimulateQuery();
    return query.
        getDetail(
            'select project, method, api, headers, data from simulate_table where  1 = 1;'
        );
}

