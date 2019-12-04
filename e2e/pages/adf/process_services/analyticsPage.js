/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');

var AnalyticsPage = function () {

    var toolbarTitleInput = element(by.css("input[data-automation-id='reportName']"));
    var toolbarTitleContainer = element(by.css("div[class='adf-report-title ng-star-inserted']"));
    var toolbarTitle =  element(by.xpath("//mat-toolbar/adf-toolbar-title/div/h4"));
    var reportContainer = element(by.css("div[class='adf-report-report-container']"));
    var reportMessage = element(by.css("div[class='ng-star-inserted'] span"));

    this.getReport = function (title) {
        var reportTitle = element(by.css("mat-icon[data-automation-id='"+ title +"_filter']"));
        Util.waitUntilElementIsVisible(reportTitle);
        reportTitle.click();
    };

    this.changeReportTitle = function (title) {
        Util.waitUntilElementIsVisible(reportContainer);
        Util.waitUntilElementIsVisible(toolbarTitleContainer);
        toolbarTitleContainer.click();
        Util.waitUntilElementIsVisible(toolbarTitleInput);
        toolbarTitleInput.clear();
        toolbarTitleInput.sendKeys(title);
        toolbarTitleInput.sendKeys(protractor.Key.ENTER);
    };

    this.getReportTitle = function () {
        Util.waitUntilElementIsVisible(toolbarTitle);
        return toolbarTitle.getText();
    };

    this.checkNoReportMessage = function () {
        Util.waitUntilElementIsVisible(reportMessage);
    };

};

module.exports = AnalyticsPage;
