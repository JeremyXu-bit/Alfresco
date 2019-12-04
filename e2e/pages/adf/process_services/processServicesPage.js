/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');
var AppNavigationBarPage = require('./appNavigationBarPage');


var ProcessServicesPage = function(){

    var apsAppsContainer = element(by.css("div[class='adf-app-listgrid ng-star-inserted']"));
    var processServices = element(by.css("a[data-automation-id='Process Services']"));
    var taskApp = element(by.css("mat-card[title='Task App']"));
    var iconTypeLocator = by.css("mat-icon[class*='card-logo-icon']");
    var descriptionLocator = by.css("mat-card-subtitle[class*='subtitle']");

    /**
     * Check Process Page Container is displayed
     * @method checkApsContainer
     */
    this.checkApsContainer = function(){
        Util.waitUntilElementIsVisible(apsAppsContainer);
    };

    /**
     * Go to Process Services Page
     * @method goToProcessServices
     * */
    this.goToProcessServices = function() {
        Util.waitUntilElementIsVisible(processServices);
        processServices.click();
        this.checkApsContainer();
        return this;
    };

    /**
     * Go to App
     * @method goToApp
     * */
    this.goToApp = function(applicationName) {
        var app = element(by.css("mat-card[title='" + applicationName +"']"));
        Util.waitUntilElementIsVisible(app);
        app.click();
        return new AppNavigationBarPage();
    };

    /**
     * Go to Task App
     * @method goToTaskApp
     * */
    this.goToTaskApp = function() {
        Util.waitUntilElementIsVisible(taskApp);
        taskApp.click();
        return new AppNavigationBarPage();
    };

    this.getAppIconType = function (applicationName) {
        var app = element(by.css("mat-card[title='" + applicationName +"']"));
        Util.waitUntilElementIsVisible(app);
        var iconType = app.element(iconTypeLocator);
        Util.waitUntilElementIsVisible(iconType);
        return iconType.getText();
    };

    this.getBackgroundColor = function(applicationName) {
        var app = element(by.css("mat-card[title='" + applicationName +"']"));
        Util.waitUntilElementIsVisible(app);
        return app.getCssValue("color").then(function (value) {
            return value;
        });
    };

    this.getDescription = function(applicationName) {
        var app = element(by.css("mat-card[title='" + applicationName +"']"));
        Util.waitUntilElementIsVisible(app);
        var description = app.element(descriptionLocator);
        Util.waitUntilElementIsVisible(description);
        return description.getText();
    };

    this.goToAppsMenu = () => {
        browser.get('/apps');
    };

};

module.exports = ProcessServicesPage;
