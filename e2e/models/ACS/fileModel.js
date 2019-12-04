/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');
var resources = require('../../util/resources');
var CreatedByModel = require('./createdByModel');
var ContentModel = require('./contentModel');
var ContentPropertiesModel = require('./contentProperties');

var FileModel = function (details) {

    this.id = Util.generateRandomString();
    this.name = Util.generateRandomString();
    this.shortName = this.name;
    this.location = resources.Files.ADF_DOCUMENTS.PDF.file_location;
    this.tooltip = this.name;
    this.version = "";
    this.firstPageText = resources.Files.ADF_DOCUMENTS.PDF.first_page_text;
    this.lastPageText = resources.Files.ADF_DOCUMENTS.PDF.last_page_text;
    this.secondPageText = resources.Files.ADF_DOCUMENTS.PDF.second_page_text;
    this.lastPageNumber = resources.Files.ADF_DOCUMENTS.PDF.last_page_number;
    this.createdAt = "";
    this.createdByUser = {};
    this.modifiedByUser = {};
    this.content = {};
    this.properties = {};

    this.getName = function () {
        return this.name;
    };

    this.setVersion = function (ver) {
        this.version = "-" + ver;
    };

    this.getVersionName = function () {
        var extension = this.name.split(".")[1];
        var name = this.name.split(".")[0];
        return name + this.version + "." + extension;
    };

    this.getShortName = function () {
        return this.shortName;
    };

    this.getLocation = function () {
        return this.location;
    };

    this.getTooltip = function () {
        return this.tooltip;
    };

    this.getId = function () {
        return this.id;
    };

    this.getFirstPageText = function () {
        return this.firstPageText;
    };

    this.getLastPageText = function () {
        return this.lastPageText;
    };

    this.getSecondPageText = function () {
        return this.secondPageText;
    };

    this.getLastPageNumber = function () {
        return this.lastPageNumber;
    };

    this.getCreatedByUser = function () {
        return this.createdByUser;
    };

    this.getModifiedByUser = function () {
        return this.modifiedByUser;
    };

    this.getContent = function () {
        return this.content;
    };

    this.getProperties = function () {
        return this.properties;
    };

    this.update = function(details) {
        Object.assign(this, {
            createdByUser: new CreatedByModel(details.createdByUser),
            modifiedByUser: new CreatedByModel(details.modifiedByUser),
            content: new ContentModel(details.content),
            properties: new ContentPropertiesModel(details.properties)
        })
    }

    Object.assign(this, details);

};
module.exports = FileModel;
