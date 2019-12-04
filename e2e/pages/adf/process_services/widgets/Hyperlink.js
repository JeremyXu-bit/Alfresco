/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var FormFields = require('../formFields');

var Hyperlink = function () {

    var formFields = new FormFields();

    var fieldLocator = by.css("div[class='adf-hyperlink-widget '] a");

    this.getFieldText = function (fieldId) {
        return formFields.getFieldText(fieldId, fieldLocator);
    };

};

module.exports = Hyperlink;
