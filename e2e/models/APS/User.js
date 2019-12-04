/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');

/**
 * Create User JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var User = function (details) {

    this.email = Util.generateRandomEmail();
    this.firstName = Util.generateRandomString();
    this.lastName = Util.generateRandomString();
    this.password = Util.generatePasswordString();
    this.type = 'enterprise';
    this.tenantId = "1";
    this.company = null;

    Object.assign(this, details);
};
module.exports = User;
