/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var ContentPropertiesModel = function (details) {
    this['cm:author'] = '';
    this['cm:description'] = '';
    this['cm:title'] = '';

    this.getAuthor = function () {
        return this['cm:author'];
    };

    this.getDescription = function () {
        return this['cm:description'];
    };

    this.getTitle = function () {
        return this['cm:title'];
    };

    Object.assign(this, details);

};
module.exports = ContentPropertiesModel;
