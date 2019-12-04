/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var HTTPRequestBase = function(host, rootPath, requestMethod, uri, dataSet, port) {
    this.host = host;

    if (!port) {
        port = "";
    }

    this.port = port;
    this.rootPath = rootPath;
    this.requestMethod = requestMethod;
    this.uri = uri;
    this.dataSet = dataSet;
};

module.exports = HTTPRequestBase;
