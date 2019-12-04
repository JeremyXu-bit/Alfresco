/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var url = require('url-join');
var APIUtils = require('../../../restAPI/APIUtil');
var CONSTANTS = require('../../../util/constants');

var ACMBaseURL = '/alfresco/versions/1';

exports.getBaseURL = function () {
    return url(new APIUtils().getBaseURL(CONSTANTS.APPLICATION.ADF_ACS), ACMBaseURL);
};

exports.requestHeaders = function (auth) {
    var headers = {
        'Authorization': new APIUtils().getAuthorization(auth.id, auth.password)
    };
    return headers;
};
