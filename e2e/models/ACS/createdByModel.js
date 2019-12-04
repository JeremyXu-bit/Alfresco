/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');

var AcsUserModel = function (details) {

    this.displayName = Util.generateRandomString();
    this.id = Util.generateRandomString();

    this.getId = function () {
        return this.id;
    };

    this.getDisplayName = function () {
        return this.displayName;
    };

    Object.assign(this, details);

};
module.exports = AcsUserModel;
