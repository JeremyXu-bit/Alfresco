/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');

    var SearchDialog = function () {

    var searchIcon = element(by.css("button[class*='adf-search-button']"));
    var searchBar = element(by.css("adf-search-control div[style*='translateX(0%)'] input"));
    var searchBarNotExpanded = element(by.css("adf-search-control div[style*='translateX(81%)']"));
    var no_result_message = element(by.css("p[class*='adf-search-fixed-text']"));
    var rowsAuthor = by.css("div[class='mat-list-text'] p[class*='adf-search-fixed-text']");
    var completeName = by.css("h4[class*='adf-search-fixed-text']");
    var highlightName = by.css("div[id*='results-content'] span[class='highlight']");
    var searchDialog = element(by.css("mat-list[id*='autocomplete-search-result-list']"));
    var allRows = element.all(by.css("h4[class*='adf-search-fixed-text']"));

    this.clickOnSearchIcon = function () {
        Util.waitUntilElementIsVisible(searchIcon);
        searchIcon.click();
        return this;
    };

    this.checkSearchIconIsVisible = function () {
        Util.waitUntilElementIsVisible(searchIcon);
        return this;
    };

    this.checkSearchBarIsVisible = function () {
        Util.waitUntilElementIsVisible(searchBar);
        return this;
    };

    this.checkSearchBarIsNotVisible = function () {
        Util.waitUntilElementIsVisible(searchBarNotExpanded);
        return this;
    };

    this.checkNoResultMessageIsDisplayed = function () {
        Util.waitUntilElementIsVisible(no_result_message);
        return this;
    };

    this.checkNoResultMessageIsNotDisplayed = function () {
        Util.waitUntilElementIsNotOnPage(no_result_message);
        return this;
    };

    this.enterText = function (text) {
        Util.waitUntilElementIsVisible(searchBar);
        searchBar.click();
        searchBar.sendKeys(text);
        return this;
    };

    this.enterTextAndPressEnter = function (text) {
        Util.waitUntilElementIsVisible(searchBar);
        searchBar.click();
        searchBar.sendKeys(text);
        searchBar.sendKeys(protractor.Key.ENTER);
        return this;
    };

    this.resultTableContainsRow = function (name) {
        Util.waitUntilElementIsVisible(searchDialog);
        Util.waitUntilElementIsVisible(this.getRowByRowName(name));
        return this;
    };
    this.clickOnSpecificRow = function (name) {
        this.resultTableContainsRow(name);
        this.getRowByRowName(name).click();
        return this;
    };

    this.getRowByRowName = function (name) {
        return element(by.css("mat-list-item[data-automation-id='autocomplete_for_" + name +"']"));
    };

    this.getAllRowsValues = function () {
        var deferred = protractor.promise.defer();
        var array = [], i =0;

        allRows.map(function(element) {
            return element.getText();
        }).then(function (texts) {
            texts.forEach(function (text) {
                array[i] = text;
                i++;
            });
        });

        deferred.fulfill(array);
        return deferred.promise;
    };

    this.getSpecificRowsHighlightName = function (name) {
        var deferred = protractor.promise.defer();
        this.getRowByRowName(name).element(highlightName).getText().then(function (result) {
            deferred.fulfill(result);
        })
        return deferred.promise;
    };

    this.getSpecificRowsCompleteName = function (name) {
        var deferred = protractor.promise.defer();
        this.getRowByRowName(name).element(completeName).getText().then(function (result) {
            deferred.fulfill(result);
        })
        return deferred.promise;
    };

    this.getSpecificRowsAuthor = function (name) {
        var deferred = protractor.promise.defer();
        this.getRowByRowName(name).element(rowsAuthor).getText().then(function (result) {
            deferred.fulfill(result);
        })
        return deferred.promise;
    };

    this.clearText = function () {
        Util.waitUntilElementIsVisible(searchBar);
        var deferred = protractor.promise.defer();
        searchBar.clear().then(function (value) {
            searchBar.sendKeys(protractor.Key.ESCAPE);
        });
        return deferred.promise;
    };

    this.resultTableContainsRowWithRetry = function (name, retry) {

        var isPresent = false;

        function run() {
            element(by.css("mat-list-item[data-automation-id='autocomplete_for_" + name +"']")).isPresent().then(
                function (result) {
                    if(result === true) {
                        isPresent = true;
                    }
                    else {
                        retry --;

                        if(retry > 0) {
                            // console.log("Retry: " + retry);
                            run();
                        };
                    }

                }

                );
            };

            run();

        };
};
module.exports = SearchDialog;
