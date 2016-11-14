'use strict';

const Fs = require('fs');
const _ = require('lodash');
const Moment = require('moment');

function createObj(obj, name) {
    if (!obj[name]) {
        obj[name] = {};
    }
    return obj[name];
}

function etc2tc(srcFile, dstFile) {
    if (!srcFile || !dstFile) {
        return null;
    }

    var srcJson = JSON.parse(Fs.readFileSync(srcFile, 'utf8'));
    var dstJson = {};

    _.each(srcJson, function(c) {
        createObj(createObj(createObj(dstJson, c.domain), c.path), c.name);

        dstJson[c.domain][c.path][c.name] = {
            'key': c.name,
            'value': c.value,
            'domain': c.domain,
            'path': c.path,
            'hostOnly': c.hostOnly,
            'creation': Moment(),
            'lastAccessed': Moment()
        };

        if (c.expirationDate) {
            dstJson[c.domain][c.path][c.name]['expires'] = Moment(parseInt(c.expirationDate * 1000));
        }
    });

    Fs.writeFileSync(dstFile, JSON.stringify(dstJson), 'utf8');
    return dstFile;
}

module.exports = etc2tc;
