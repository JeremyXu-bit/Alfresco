/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var MultilineText = require('./MultilineText');
var Header = require('./Header');
var DisplayText = require('./DisplayText');
var AttachFile = require('./AttachFile');
var DisplayValue = require('./DisplayValue');
var RadioButtons = require('./RadioButtons');
var Hyperlink = require('./Hyperlink');
var Dropdown = require('./Dropdown');
var DynamicTable = require('./DynamicTable');

var UsingWidget = function () {

    this.usingMultilineTextWidget = function () {
        return new MultilineText();
    };

    this.usingHeaderWidget = function () {
        return new Header();
    };

    this.usingDisplayTextWidget = function () {
        return new DisplayText();
    };

    this.usingAttachFileWidget = function () {
        return new AttachFile();
    };

    this.usingDisplayValueWidget = function () {
        return new DisplayValue();
    };

    this.usingRadioWidget = function () {
        return new RadioButtons();
    };

    this.usingHyperlink = function () {
        return new Hyperlink();
    };

    this.usingDropdown = function () {
        return new Dropdown();
    };

    this.usingDynamicTable = function () {
        return new DynamicTable();
    };

};

module.exports = UsingWidget;
