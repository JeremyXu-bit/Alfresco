/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var FormFields = require('../formFields');

var MultilineText = function () {

    var formFields = new FormFields();

    var valueLocator = by.css("textarea");

    this.getFieldValue = function (fieldId) {
        return formFields.getFieldValue(fieldId, valueLocator);
    };

};

module.exports = MultilineText;
