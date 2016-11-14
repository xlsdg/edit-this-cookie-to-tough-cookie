'use strict';

const Fs = require('fs');
const _ = require('lodash');
const Moment = require('moment');

function createObj(obj, name) {
    if (obj[name] === undefined) {
        obj[name] = {};
    }
    return obj[name];
}

function pushValue(src, key, dst) {
    if (src[key] !== undefined) {
        dst[key] = src[key];
    }
}

function etc2tc(srcFile, dstFile) {
    if (!srcFile || !dstFile) {
        return null;
    }

    var srcJson = JSON.parse(Fs.readFileSync(srcFile, 'utf8'));
    var dstJson = {};

    _.each(srcJson, function(c) {
        let dst = {
            'domain': c.domain,
            'path': c.path,
            'key': c.name,
            // 'value': c.value,
            // 'maxAge': c.maxAge,
            // 'secure': c.secure,
            // 'httpOnly': c.httpOnly,
            // 'extensions': c.extensions,
            'creation': Moment(),
            // 'creationIndex': c.creationIndex,
            // 'hostOnly': c.hostOnly,
            // 'pathIsDefault': c.pathIsDefault,
            'lastAccessed': Moment()
        };

        pushValue(c, 'value', dst);
        pushValue(c, 'maxAge', dst);
        pushValue(c, 'secure', dst);
        pushValue(c, 'httpOnly', dst);
        pushValue(c, 'extensions', dst);
        pushValue(c, 'creationIndex', dst);
        pushValue(c, 'hostOnly', dst);
        pushValue(c, 'pathIsDefault', dst);

        if (c.expirationDate !== undefined) {
            dst['expires'] = Moment(parseInt(c.expirationDate * 1000));
        }

        createObj(createObj(createObj(dstJson, c.domain), c.path), c.name);
        dstJson[c.domain][c.path][c.name] = dst;
    });

    Fs.writeFileSync(dstFile, JSON.stringify(dstJson), 'utf8');
    return dstFile;
}

module.exports = etc2tc;
