/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var exports = module.exports = {};
var request = require('request');
var RequestCoreAPI = require('./RequestUtil/RequestCoreAPI');
var url = require('url-join');
var path = require('path');
var fs = require('fs');
var TestConfig = require('../../test.config');

var peopleBaseUrl = 'people';


function read(initialFile) {
    return new Promise(function (resolve, reject) {
        fs.readFile(initialFile, function (err, file) {
            if (err) {
                //console.log('read error', err);
                reject(err);
            }

            // console.log('read success', file);
            resolve(file);
        })
    })
}

function write(file, uri, header) {
    return new Promise(function (resolve, reject) {
        request.put({url: uri, headers: header, body: file}, function (err, httpResponse, body) {
            if (err) {
                console.error('updated failed:', err);
                reject(err);
            }
            var json_data = JSON.parse(body);

            // console.log('write success', json_data);
            resolve(body);
        });
    });
}

/**
 * Update avatar using API
 *
 * @param requestUserModel {User that makes the request}
 * @param fileModel
 * @param personId
 * @method updateAvatarViaAPI
 */
exports.updateAvatarViaAPI = function (requestUserModel, fileModel, personId) {

    var absolutePath = path.resolve(path.join(TestConfig.main.rootPath, fileModel.getLocation()));
    var uri = url(RequestCoreAPI.getBaseURL(), peopleBaseUrl, personId, "avatar");
    // console.debug("Update avatar via API: fileName=" + fileModel.getName() + " uri=" + uri + " auth=" + requestUserModel.id + " password: " + requestUserModel.password);

    var allHeaders = RequestCoreAPI.requestHeaders(requestUserModel);
    allHeaders['Content-Type'] = 'application/octet-stream';

    return read(absolutePath)
        .then(function (file) {
            return write(file, uri, allHeaders);
        });
};

/**
 * Get avatar using API
 *
 * @param requestUserModel {User that makes the request}
 * @param personId
 * @method getAvatarViaAPIWithRetry
 */
exports.getAvatarViaAPI = function (retry, requestUserModel, personId, callback) {
    var uri = url(RequestCoreAPI.getBaseURL(), peopleBaseUrl, personId, "avatar");

    // console.debug("Get avatar via API: uri= " + uri + " auth=" + requestUserModel.id + " password: " + requestUserModel.password);

    function run() {
        request.get({
            url: uri,
            headers: RequestCoreAPI.requestHeaders(requestUserModel)
        }, function (error, httpResponse, body) {
            retry--;
            var statusCode = httpResponse.statusCode;
            // console.log("status code: " + statusCode);
            if (statusCode != "200" && retry > 0) {
                run();
            }
            else if (typeof callback === 'function') {
                callback.apply(null);
            }
        });
    }

    run();
};

/**
 * Delete avatar using API
 *
 * @param requestUserModel {User that makes the request}
 * @param personId
 * @param callback
 */
exports.deleteAvatarViaAPI = function (requestUserModel, personId, callback) {

    var uri = url(RequestCoreAPI.getBaseURL(), peopleBaseUrl, personId, "avatar");

    request.del({url: uri, headers: RequestCoreAPI.requestHeaders(requestUserModel)}, function (error, response, body) {
        if (error) {
            return console.error('delete failed:', error);
        }
        // console.debug("Avatar deleted via API: " + " uri=" + uri + " auth=" + requestUserModel.id + " password: " + requestUserModel.password);

        if (typeof callback === 'function') {
            callback.apply(null);
        }
    });
};
