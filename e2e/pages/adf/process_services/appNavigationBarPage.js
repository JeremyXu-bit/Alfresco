/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Util = require('../../../util/util');
var TasksPage = require('./tasksPage');

var AppNavigationBarPage = function () {

    const dashboardButton = element(by.css('[data-automation-id="adf-accordion-dashboard"]'));
    const tasksButton = element(by.css('[data-automation-id="adf-accordion-task"] .adf-panel-heading-text'));
    const processButton = element(by.css('[data-automation-id="adf-accordion-process"] .adf-panel-heading-text'));
    const processButtonText = element(by.cssContainingText('.adf-panel-heading-text','Process'));
    const createNewProcessButton = element(by.cssContainingText('.adf-sidebar-action-menu-options span', 'New Process'));
    const createNewTaskButton = element(by.cssContainingText('.adf-sidebar-action-menu-options span', 'New Task'));
    const createButton = element(by.className('adf-sidebar-action-menu-icon'));
    const menuItems = element(by.className('mat-menu-panel'));
    const sideNavigationBarButton = element(by.css('[data-automation-id="adf-menu-icon"]'));
    const runningFilter = element(by.css('[data-automation-id="Running_filter"]'));
    const completedFilter = element(by.css('[data-automation-id="Completed_filter"]'));
    const allFilter = element(by.css('[data-automation-id="All_filter"]'));

    const involvedTasksFilter = element(by.css('[data-automation-id="Involved Tasks_filter"]'));
    const completedTasksFilter = element(by.css('[data-automation-id="Completed Tasks_filter"]'));
    const queuedTasksFilter = element(by.css('[data-automation-id="Queued Tasks_filter"]'));
    const myTasksFilter = element(by.css('[data-automation-id="My Tasks_filter"]'));


    this.clickTasksButton = function () {
        Util.waitUntilElementIsVisible(tasksButton);
        Util.waitUntilElementIsClickable(tasksButton);
        tasksButton.click();
    };

    this.clickProcessButton = function () {
        Util.waitUntilElementIsVisible(processButton);
        Util.waitUntilElementIsClickable(processButton);
        processButton.click();
    };

    this.clickProcessButtonText = function () {
        Util.waitUntilElementIsVisible(processButtonText)
        processButtonText.click();
    };

    this.clickCreateButton = () => {
        createButton.click();
        Util.waitUntilElementIsVisible(menuItems);
        Util.waitUntilElementIsVisible(menuItems);
    };

    this.clickCreateProcessButton = () =>  {
        createNewProcessButton.click();
        Util.waitUntilElementIsVisible(element(by.className('adf-start-process')))
        Util.waitUntilElementIsVisible(element(by.css('apw-create-process')));
        Util.waitUntilElementIsStale(element(by.className('cdk-global-overlay-wrapper')));
    };

    this.clickCreateTaskButton = () => {
        createNewTaskButton.click();
        Util.waitUntilElementIsVisible(element(by.className('adf-new-task-layout-card')));
    };

    this.clickSideNavigationBarButton = () => {
        sideNavigationBarButton.click();
        Util.waitUntilElementIsVisible(element(by.className('adf-sidebar-action-menu-text')));

    };

    this.clickRunningFilterButton = function () {
        Util.waitUntilElementIsVisible(runningFilter);
        Util.waitUntilElementIsClickable(runningFilter);
        return runningFilter.click();
    };

    this.clickCompletedFilterButton = function () {
        Util.waitUntilElementIsVisible(completedFilter);
        Util.waitUntilElementIsClickable(completedFilter);
        completedFilter.click();
        expect(completedFilter.isEnabled()).toBe(true);
    };

    this.clickAllFilterButton = () => {
        Util.waitUntilElementIsVisible(allFilter);
        Util.waitUntilElementIsClickable(allFilter);
        allFilter.click();
        expect(allFilter.isEnabled()).toBe(true);
    };

    this.clickMyTasksFilterButton= () =>{
        Util.waitUntilElementIsVisible(myTasksFilter);
        Util.waitUntilElementIsClickable(myTasksFilter);
        myTasksFilter.click();
        expect(myTasksFilter.isEnabled()).toBe(true);
    };

    this.clickCompletedTasksFilterButton= () =>{
        Util.waitUntilElementIsVisible(completedTasksFilter);
        Util.waitUntilElementIsClickable(completedTasksFilter);
        completedTasksFilter.click();
        expect(completedTasksFilter.isEnabled()).toBe(true);
    };

    this.clickInvolvedTasksFilterButton= () =>{
        Util.waitUntilElementIsVisible(involvedTasksFilter);
        Util.waitUntilElementIsClickable(involvedTasksFilter);
        involvedTasksFilter.click();
        expect(involvedTasksFilter.isEnabled()).toBe(true);
    };

    this.clickQueuedTasksFilterButton= () =>{
        Util.waitUntilElementIsVisible(queuedTasksFilter);
        Util.waitUntilElementIsClickable(queuedTasksFilter);
        queuedTasksFilter.click();
        expect(queuedTasksFilter.isEnabled()).toBe(true);
    };

    this.clickDashboardButton = () => {
        Util.waitUntilElementIsVisible(dashboardButton);
        dashboardButton.click();
    };
};

module.exports = AppNavigationBarPage;
