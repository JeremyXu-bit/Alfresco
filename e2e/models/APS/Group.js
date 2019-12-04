/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');

/**
 * Create Group Object
 *
 * @param details - Group object used to overwrite the default values
 * @constructor
 */

var Group = function (details) {

    this.name = Util.generateRandomString();
    this.type = "1";
    this.parentGroupId = null;
    this.tenantId = "1";

    Object.assign(this, details);
};

module.exports = Group;
