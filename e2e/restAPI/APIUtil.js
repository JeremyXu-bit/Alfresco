/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var url = require('url-join');
var TestConfig = require('../test.config');
var BasicAuthorization = require('../restAPI/httpRequest/BasicAuthorization');
var Ajv = require('ajv');

var APIUtils = function () {
    /**
     * Return Basic authorization
     *
     * @param user
     * @param password
     * @returns Basic authorization
     */
    this.getAuthorization = function (user, password) {
        return 'Basic ' + Buffer(user + ':' + password).toString('base64');
    };

    /** 
     * Return any application base URL 
     * <protocol>://<hostname>:<port>/<pathname> 
     *
     * @param application - any application declared in config file: main or adf 
     * @param urlComponentsParam - Object with details required to define the baseURL 
     * { 
      *      protocol: "http", 
      *      hostname: "localhost", 
      *      port: "8080" 
      * } 
     * If urlComponents empty {}, the default test configuration values are set 
     */
    this.getBaseURL = function (application, urlComponentsParam) {
        var urlComponents = {};
        urlComponents.protocol = TestConfig[application].protocol;
        urlComponents.hostname = TestConfig[application].host;
        urlComponents.port = TestConfig[application].port;
        urlComponents.path = TestConfig[application].apiContextRoot;
        Object.assign(urlComponents, urlComponentsParam);

        var baseUrl = url(urlComponents.protocol
            + "://" + urlComponents.hostname
            + (urlComponents.port !== "" ? ":" + urlComponents.port : ""),
            urlComponents.path);

        return baseUrl;
    };

};

module.exports = APIUtils;
