const express = require("express");

const { 
    getSimulateAPI,
    createTable,
    insertSimulatedAPIData,
    getAllSimulaetdAPIData,
    deleteSimulateAPI } = require('./controllers');

const router = express.Router();

const FormatRes = require('../shared/format-res');

const _ = require('lodash');


(function createSimulateTable() {
    const promise = createTable();
    promise.then((ret) => {
        console.log('Create Simulate api data table successfully.');
    });
    promise.catch((err) => {
        console.log(`Create Simulate api data table failed, ${err}`);
    });
})();

router.post("/simulate_data", (req, res) => {
    var row = req.body;
    if (!row || !_.isArray(row) || row.length !== 5) {
        res.send(
            new FormatRes(
                false, "The api should contains project, method, api, headers, payload.", undefined).to_json()
        );
    }
    var [project, method, url, headers, payload] = row;
    var avaliableMethods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'];
    if (_.indexOf(avaliableMethods, (method)) === -1) {
        res.send(
            new FormatRes(
                false, `The method must be one of ${avaliableMethods.join(',')}.`, undefined).to_json()
        );
    }
    row = row.slice(0, 2);
    row = row.concat([encodeURIComponent(url), JSON.stringify(headers), JSON.stringify(payload)]);
    const promise = insertSimulatedAPIData(row);
    promise.then((ret) => {
        res.send(
            new FormatRes(
                true, "Insert simulate data successfully.", undefined).to_json()
        );
    });
});

router.get("/simulate_data", (req, res) => {
    const promise = getAllSimulaetdAPIData();
    promise.then((ret) => {
        var msg = new FormatRes(
            true, "Get all simulate api data successfully.", ret).to_json();
        res.send(msg);
    });
});

router.delete("/simulate_data/:url/:method", (req, res) => {
    const promise = deleteSimulateAPI(req.params.url, req.params.method);
    promise.then((ret) => {
        var msg = new FormatRes(
            true, "Remove simulate api data successfully.", ret).to_json();
        res.send(msg);
    });
});

router.all("*", (req, res) => {
    const originalUrl = encodeURIComponent(req.originalUrl);
    const method = req.method;
    const promise = getSimulateAPI(originalUrl, method.toUpperCase());
    promise.then((ret) => {
        const data = _.get(ret, '[0].data', null);
        const headers = _.get(ret, '[0].headers', null);
        headers && res.set(JSON.parse(headers));
        if (data) {
            res.send(data && JSON.parse(data));
        } else {
            var msg = new FormatRes(
                false, "The quired simulate api doesn't exist.", null).to_json();
            res.send(msg);
        }

    });
});

module.exports = router;