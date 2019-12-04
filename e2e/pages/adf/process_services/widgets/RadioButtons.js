/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var FormFields = require('../formFields');
var Util = require('../../../../util/util');

var RadioButtons = function () {

    var formFields = new FormFields();

    this.getSpecificOptionLabel = function (fieldId, optionNumber) {
        var optionLocator = by.css("label[for*='radiobuttons-option_" + optionNumber + "'] div[class*='content']");
        var option = formFields.getWidget(fieldId).element(optionLocator);
        Util.waitUntilElementIsVisible(option);
        return option.getText();
    };

};

module.exports = RadioButtons;
