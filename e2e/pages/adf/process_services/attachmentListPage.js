/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');
var TestConfig = require('../../../test.config');
var path = require('path');

var AttachmentListPage = function () {

    const attachFileButton = element(by.css("input[type='file']"));

    this.clickAttachFileButton = function (fileLocation) {
        attachFileButton.sendKeys(path.resolve(path.join(TestConfig.main.rootPath, fileLocation)));
    };

    this.checkFileIsAttached = function (name) {
        var fileAttached = element.all(by.css('div[filename="'+name+'"]')).first();
        Util.waitUntilElementIsVisible(fileAttached);
    };

    this.checkAttachFileButtonIsNotDisplayed = function () {
        Util.waitUntilElementIsNotVisible(attachFileButton);
    };

};
module.exports = AttachmentListPage;
