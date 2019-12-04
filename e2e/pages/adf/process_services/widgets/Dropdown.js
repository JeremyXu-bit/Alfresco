/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var FormFields = require('../formFields');

var Dropdown = function () {

    var formFields = new FormFields();

    var selectedOptionLocator = by.css("mat-select[id='dropdown'] span span");

    this.getSelectedOptionText = function (fieldId) {
        return formFields.getFieldText(fieldId, selectedOptionLocator);
    };

};

module.exports = Dropdown;
