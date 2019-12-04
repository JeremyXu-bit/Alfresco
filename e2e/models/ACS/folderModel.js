/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');

var FolderModel = function (details) {

    this.id = Util.generateRandomString();
    this.name = Util.generateRandomString();
    this.shortName = this.name;
    this.tooltip = this.name;
    this.location = "";

    this.getName = function () {
        return this.name;
    };

    this.getShortName = function () {
        return this.shortName;
    };

    this.getTooltip = function () {
        return this.tooltip;
    };

    this.getId = function () {
        return this.id;
    };

    this.getLocation = function () {
        return this.location;
    };

    Object.assign(this, details);

};
module.exports = FolderModel;
