/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../util/util');
var CardViewPage = require('./cardViewPage');

var ViewerToolbarPage = function () {

    const auditProcessLogButton = element(by.id('processauditButton'));
    const auditTaskLogButton = element(by.id('taskauditButton'));
    const infoDrawerButton = element (by.css('[data-automation-id="info-icon-id"]'));
    const closeButton = element(by.css('[data-automation-id="full-form-close"]'));
    const backButton = element (by.id('backButton'));
    const diagramCanvas = element(by.css('svg'));
    const cancelProcessButton = element(by.id('process-cancel-button'));

    var fileThumbnail = element(by.css("img[class='adf-viewer__mimeicon']"));
    var fileName = element(by.id('adf-viewer-display-name'));
    var downloadButton = element(by.css("button[data-automation-id='toolbar-download'] > span > mat-icon"));
    var infoSideBar = element(by.css("div[class='adf-info-drawer-layout-header']"));
    var previousPageButton = element(by.id('viewer-previous-page-button'));
    var nextPageButton = element(by.id('viewer-next-page-button'));
    var pageSelectorInput = element(by.css("div[class='adf-pdf-viewer__toolbar-page-selector'] input"));
    var zoomInButton = element(by.id('viewer-zoom-in-button'));
    var zoomOutButton = element(by.id('viewer-zoom-out-button'));
    var scalePageButton = element(by.id('viewer-scale-page-button'));
    var imgContainer = element(by.id('viewer-image'));
    var pdfContainer = element(by.id('viewer-pdf-container'));
    var mediaContainer = element(by.css("adf-media-player[class='adf-media-player ng-star-inserted']"));
    var unsupportedFileContainer  = element(by.cssContainingText('.label','Document preview could not be loaded'));
    var allPages = element.all(by.css("div[class='canvasWrapper'] > canvas")).first();
    var pageCanvas = element.all(by.css("div[class='canvasWrapper']")).first();


    this.clickAuditProcessLogButton = () => {
        Util.waitUntilElementIsVisible(auditProcessLogButton);
        auditProcessLogButton.click();
    };

    this.clickAuditTaskLogButton = () => {
        Util.waitUntilElementIsVisible(auditTaskLogButton);
        auditTaskLogButton.click();
    };

    this.clickInfoDrawerButton = () => {
        Util.waitUntilElementIsVisible(infoDrawerButton);
        infoDrawerButton.click();
    };

    this.checkDiagramIsDisplayed = () => {
        Util.waitUntilElementIsVisible(diagramCanvas);
    };

    this.checkActiveTaskTitleIsDisplayed = (title) => {
      Util.waitUntilElementIsVisible(element(by.cssContainingText('.dw-toolbar-title--ellipsis', title)));
    };

    this.checkProcessTitleIsDisplayed = (title) => {
        Util.waitUntilElementIsVisible(element(by.cssContainingText('.dw-toolbar-title--ellipsis', title)));
    };

    this.checkToolbarTitleIsDisplayed = (title) => {
        Util.waitUntilElementIsVisible(element(by.cssContainingText('.dw-toolbar-title', title)));
    };

    this.clickBackButton = () => {
        Util.waitUntilElementIsVisible(backButton);
        backButton.click();
    };

    this.clickCancelProcessButton = () => {
        Util.waitUntilElementIsVisible(cancelProcessButton);
        cancelProcessButton.click();
    };

    this.canvasHeight = function () {
        var deferred = protractor.promise.defer();
        pageCanvas.getAttribute("style").then(function (value) {
            var canvasHeight = value.split("height: ")[1].split("px")[0];
            deferred.fulfill(canvasHeight);
        });
        return deferred.promise;
    };

    this.canvasWidth = function () {
        var deferred = protractor.promise.defer();
        pageCanvas.getAttribute("style").then(function (value) {
            var canvasWidth = value.split("width: ")[1].split("px")[0];
            deferred.fulfill(canvasWidth);
        });
        return deferred.promise;
    };

    this.viewFile = function (fileName) {
        var fileView = element(by.xpath("//div[@class='document-list-container']//span[@title='" + fileName +"']"));
        Util.waitUntilElementIsVisible(fileView);
        fileView.click();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    };

    this.checkCloseButtonIsDisplayed = function () {
        Util.waitUntilElementIsVisible(closeButton);
    };

    this.checkDownloadButtonIsDisplayed = function () {
        Util.waitUntilElementIsVisible(downloadButton);
    };

    this.checkInfoButtonIsDisplayed = function () {
        Util.waitUntilElementIsVisible(infoButton);
    };

    this.clickCloseButton = function () {
        Util.waitUntilElementIsVisible(closeButton);
        closeButton.click();
    };

    this.checkFileThumbnailIsDisplayed = function () {
        Util.waitUntilElementIsVisible(fileThumbnail);
    };

    this.checkFileNameIsDisplayed = function (file) {
        Util.waitUntilElementIsVisible(fileName);
        expect(fileName.getText()).toEqual(file);
    };

    this.clickDownloadButton = function () {
        Util.waitUntilElementIsVisible(downloadButton);
        downloadButton.click();
    };

    this.clickInfoButton = function () {
        Util.waitUntilElementIsVisible(infoButton);
        infoButton.click();
        return new CardViewPage();
    };

    this.checkInfoSideBarIsNotDisplayed = function () {
        Util.waitUntilElementIsNotVisible(infoSideBar);
    };

    this.checkInfoSideBarIsDisplayed = function () {
        Util.waitUntilElementIsVisible(infoSideBar);
    };

    this.checkInfoSideBarIsNotDisplayed = function () {
        Util.waitUntilElementIsNotOnPage(infoSideBar);
    };

    this.checkPreviousPageButtonIsDisplayed =function () {
        Util.waitUntilElementIsVisible(previousPageButton);
    };

    this.clickPreviousPageButton = function () {
        Util.waitUntilElementIsVisible(previousPageButton);
        previousPageButton.click();
    };

    this.checkNextPageButtonIsDisplayed = function () {
        Util.waitUntilElementIsVisible(nextPageButton);
    };

    this.clickNextPageButton = function () {
        Util.waitUntilElementIsVisible(nextPageButton);
        nextPageButton.click();
    };

    this.checkZoomInButtonIsDisplayed = function () {
        Util.waitUntilElementIsVisible(zoomInButton);
    };

    this.clickZoomInButton = function () {
        Util.waitUntilElementIsVisible(zoomInButton);
        zoomInButton.click();
    };

    this.checkZoomOutButtonIsDisplayed = function () {
        Util.waitUntilElementIsVisible(zoomOutButton);
    };

    this.clickZoomOutButton = function () {
        Util.waitUntilElementIsVisible(zoomOutButton);
        zoomOutButton.click();
    };

    this.checkScalePageButtonIsDisplayed = function () {
        Util.waitUntilElementIsVisible(scalePageButton);
    };

    this.clickScalePageButton = function () {
        Util.waitUntilElementIsVisible(scalePageButton);
        scalePageButton.click();
    };

    this.checkPageSelectorInputIsDisplayed = function (number) {
        Util.waitUntilElementIsVisible(pageSelectorInput);
        pageSelectorInput.getAttribute('value').then(function (pageNumber) {
            expect(pageNumber).toEqual(number);
        })
    };

    this.enterPage = function (number) {
        Util.waitUntilElementIsVisible(pageSelectorInput);
        pageSelectorInput.clear();
        pageSelectorInput.sendKeys(number);
        pageSelectorInput.sendKeys(protractor.Key.ENTER);
    };

    this.checkImgContainerIsDisplayed = function () {
        Util.waitUntilElementIsVisible(imgContainer);
    };

    this.checkPdfContainerIsDisplayed = function () {
        Util.waitUntilElementIsVisible(pdfContainer);
    };

    this.checkMediaPlayerContainerIsDisplayed = function () {
        Util.waitUntilElementIsVisible(mediaContainer);
    };

    this.checkUnsupportedFileContainerIsDisplayed = function () {
        Util.waitUntilElementIsVisible(unsupportedFileContainer);
    };

    this.checkFileContent = function (pageNumber, text) {
        var pageLoaded = element.all(by.css("div[data-page-number='" + pageNumber + "'][data-loaded='true']")).first();
        var textLayerLoaded = element.all(by.css("div[data-page-number='" + pageNumber + "'] div[class='textLayer'] > div")).first();
        var specificText = element.all(by.cssContainingText("div[data-page-number='" + pageNumber + "'] div[class='textLayer'] > div", text)).first();
        Util.waitUntilElementIsVisible(allPages);
        Util.waitUntilElementIsVisible(pageLoaded);
        Util.waitUntilElementIsVisible(textLayerLoaded);
        Util.waitUntilElementIsVisible(specificText);
    };

    this.checkConfirmationWarningMessage = (message) => {
       const confirmationMessage = element(by.cssContainingText('.cdk-live-announcer-element', message));
       Util.waitUntilElementIsPresent(confirmationMessage);
    };
};

module.exports = ViewerToolbarPage;
