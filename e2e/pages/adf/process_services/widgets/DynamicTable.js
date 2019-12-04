/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var FormFields = require('../formFields');

var DynamicTable = function () {

    var formFields = new FormFields();

    var labelLocator = by.css("dynamic-table-widget div div");
    var columnNameLocator = by.css("table[id*='dynamic-table'] th");

    this.getFieldLabel = function (fieldId) {
        return formFields.getFieldLabel(fieldId, labelLocator);
    };

    this.getColumnName = function (fieldId) {
        return formFields.getFieldText(fieldId, columnNameLocator);
    };

};

module.exports = DynamicTable;
