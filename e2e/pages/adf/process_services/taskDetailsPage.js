/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var Util = require('../../../util/util');

var TaskDetailsPage = function () {

    const cancelButton = element(by.className('dw-task-button-cancel'));
    const completeButton = element(by.id('dw-no-form-complete-button'));
    const completeButtonStandAloneTask = element(by.id('adf-no-form-complete-button'));
    const userTaskCompleteButton = element(by.id('adf-form-complete'));
    const editDescriptionButton = element(by.css('[data-automation-id="card-textitem-edit-icon-description"]'));
    const inputDescriptionField = element(by.css('[data-automation-id="card-textitem-edittextarea-description"]'));
    const updateDescriptionButton = element(by.css('[data-automation-id="card-textitem-update-description"]'));
    const editPriorityButton = element(by.css('[data-automation-id="card-textitem-edit-icon-priority"]'));
    const inputPriorityField = element(by.css('[data-automation-id="card-textitem-editinput-priority"]'));
    const updatePriorityButton = element(by.css('[data-automation-id="card-textitem-update-priority"]'));
    const datePickerButton = element(by.css('[data-automation-id="datepickertoggle-dueDate"]'));
    const datePickerValue = element(by.cssContainingText('.mat-datetimepicker-calendar-body-cell-content', '24'));
    const formNameField = element(by.css("span[data-automation-id*='formName'] span"));
    const assigneeField = element(by.css("span[data-automation-id*='assignee'] span"));
    const editAssigneeButton = element(by.css('[data-automation-id="card-textitem-edit-icon-create"]'));
    const statusField = element(by.css("span[data-automation-id*='status'] span"));
    const categoryField = element(by.css("span[data-automation-id*='category'] span"));
    const parentNameField = element(by.css("span[data-automation-id*='parentName'] span"));
    const createdField = element(by.css("span[data-automation-id='card-dateitem-created'] span"));
    const idField = element(by.css("span[data-automation-id*='id'] span"));
    const descriptionField = element(by.css("span[data-automation-id*='description'] span"));
    const dueDateField = element(by.css("span[data-automation-id*='dueDate'] span"));
    const activitiesTitle = element(by.css("div[class*='adf-info-drawer-layout-header-title'] div"));
    const commentField = element(by.css("input[id='comment-input']"));
    const activityTab = element(by.cssContainingText("div[class*='mat-tab-label ']", "Activity"));
    const detailsTab = element(by.cssContainingText("div[class*='mat-tab-label ']", "Details"));
    const assigmentPeopleTitle = element(by.id("people-title"));
    const involvePeopleButton = element(by.css("div[class*='add-people']"));
    const addPeopleField = element(by.css("input[data-automation-id='adf-people-search-input']"));
    const addInvolvedUserButton = element(by.css("button[id='add-people'] span"));
    const peopleFullName = element(by.css(".people-full-name"));
    const emailInvolvedUser = by.xpath("following-sibling::div[contains(@class, 'people-email')]");
    const removeButton = element(by.css('[data-automation-id="Remove"]'));
    const actionMenuButton = element (by.css('[data-automation-id="action_menu_0"]'));
    const noPeopleInvolved = element(by.id('no-people-label'));

    this.clickCancelProcessButton = () => {
        Util.waitUntilElementIsVisible(cancelButton);
        cancelButton.click();
    };

    this.clickCompleteButton = () => {
        Util.waitUntilElementIsVisible(completeButton);
        completeButton.click();
    };

    this.clickCompleteButtonStandAloneTask = () => {
        Util.waitUntilElementIsVisible(completeButtonStandAloneTask);
        completeButtonStandAloneTask.click();
    };

    this.clickUserTaskCompleteButton = () => {
        Util.waitUntilElementIsVisible(userTaskCompleteButton);
        userTaskCompleteButton.click();
    };

    this.clickEditDescriptionButton = () => {
        Util.waitUntilElementIsVisible(editDescriptionButton);
        editDescriptionButton.click();
    };

    this.setDescription = (descriptionText) => {
        Util.waitUntilElementIsVisible(inputDescriptionField);
        inputDescriptionField.sendKeys(descriptionText);
    };

    this.clickUpdateDescriptionButton = () => {
        Util.waitUntilElementIsVisible(updateDescriptionButton);
        updateDescriptionButton.click();
    };

    this.clickEditPriorityButton = () => {
        Util.waitUntilElementIsVisible(editPriorityButton);
        editPriorityButton.click();
    };

    this.setPriority = (priorityValue) => {
        Util.waitUntilElementIsVisible(inputPriorityField);
        inputPriorityField.clear().sendKeys(priorityValue);
    };

    this.clickUpdatePriorityButton = () => {
        Util.waitUntilElementIsVisible(updatePriorityButton);
        updatePriorityButton.click();
    };

    this.clickDatePickerDueDate = () => {
        datePickerButton.click();
        Util.waitUntilElementIsVisible(element(by.className('mat-datetimepicker-content')));
    };

    this.clickEditAssigneeButton = () => {
        Util.waitUntilElementIsVisible(editAssigneeButton);
        editAssigneeButton.click();
    };

    this.selectDatePickerValue = () => {
        Util.waitUntilElementIsVisible(datePickerValue);
        Util.waitUntilElementIsClickable(datePickerValue);
        datePickerValue.click();
    };

    this.checkActiveTaskTitleIsDisplayed = (title) => {
        Util.waitUntilElementIsVisible(element(by.cssContainingText('.dw-toolbar-title--ellipsis', title)));
    };

    this.checkFormSectionIsDisplayed = () => {
        Util.waitUntilElementIsVisible(element(by.className('mat-card-content')));
    };

    this.getFormName = function () {
        Util.waitUntilElementIsVisible(formNameField);
        return formNameField.getText();
    };

    this.getAssignee = () => {
        Util.waitUntilElementIsVisible(assigneeField);
        return assigneeField.getText();
    };

    this.getStatus = function () {
        Util.waitUntilElementIsVisible(statusField);
        return statusField.getText();
    };

    this.getCategory = function () {
        Util.waitUntilElementIsVisible(categoryField);
        return categoryField.getText();
    };

    this.getParentName = () => {
        Util.waitUntilElementIsVisible(parentNameField);
        return parentNameField.getText();
    };

    this.clickParentNameLink = () => {
        Util.waitUntilElementIsVisible(parentNameField);
        parentNameField.click();
    };

    this.getCreated = function () {
        Util.waitUntilElementIsVisible(createdField);
        return createdField.getText();
    };

    this.getId = function () {
        Util.waitUntilElementIsVisible(idField);
        return idField.getText();
    };

    this.getDescription = function () {
        Util.waitUntilElementIsVisible(descriptionField);
        return descriptionField.getText();
    };

    this.getDueDate = function () {
        Util.waitUntilElementIsVisible(dueDateField);
        return dueDateField.getText();
    };

    this.getTitle = function () {
        Util.waitUntilElementIsVisible(activitiesTitle);
        return activitiesTitle.getText();
    };

    this.selectActivityTab = function () {
        Util.waitUntilElementIsVisible(activityTab);
        activityTab.getAttribute('aria-selected').then(function (check) {
            if (check === 'false') {
                activityTab.click();
                expect(activityTab.getAttribute('aria-selected')==="true");
            }
        });
        return this;
    };

    this.selectDetailsTab = function () {
        Util.waitUntilElementIsVisible(detailsTab);
        detailsTab.getAttribute('aria-selected').then(function (check) {
            if (check === 'false') {
                detailsTab.click();
                expect(detailsTab.getAttribute('aria-selected')==="true");
            }
        });
        return this;
    };

    this.addComment = function (comment) {
        Util.waitUntilElementIsVisible(commentField);
        commentField.sendKeys(comment);
        commentField.sendKeys(protractor.Key.ENTER);
        return this;
    };

    this.checkCommentIsDisplayed = function (comment) {
        var row = element(by.cssContainingText("div[id='comment-message']", comment));
        Util.waitUntilElementIsVisible(row);
        return this;
    };

    this.clickInvolvePeopleButton = function () {
        Util.waitUntilElementIsVisible(involvePeopleButton);
        Util.waitUntilElementIsClickable(involvePeopleButton);
        browser.actions().mouseMove(involvePeopleButton).perform();
        involvePeopleButton.click();
        return this;
    };

    this.typeUser = function (user) {
        Util.waitUntilElementIsVisible(addPeopleField);
        addPeopleField.sendKeys(user);
        return this;
    };

    this.selectUserToInvolve = (user) => {
        this.getRowsUser(user).click();
        return this;
    };

    this.involveAndSelectPeople = (user) => {
       this.typeUser(user);
       this.selectUserToInvolve(user);
       this.checkUserIsSelected(user);
    };

    this.checkUserIsSelected = function(user) {
        var row = element(by.cssContainingText("div[class*='search-list-container'] div[class*='people-full-name']", user));
        var selectedRow = this.getRowsUser(user).element(by.css("ancestor::tr[class*='is-selected']"));
        Util.waitUntilElementIsVisible(row);
        return this;
    };

    this.clickAddInvolvedUserButton = function () {
        Util.waitUntilElementIsVisible(addInvolvedUserButton);
        Util.waitUntilElementIsClickable(addInvolvedUserButton);
        addInvolvedUserButton.click();
        return this;
    };

    this.getRowsUser = function (user) {
        var row = element(by.cssContainingText("div[class*='people-full-name']", user));
        Util.waitUntilElementIsVisible(row);
        return row;
    };

    this.getInvolvedUserEmail = function (user) {
        const email = this.getRowsUser(user).element(emailInvolvedUser);
        Util.waitUntilElementIsVisible(email);
        return email.getText();
    };

    this.getInvolvedUserFullName = () => {
        Util.waitUntilElementIsVisible(peopleFullName);
        return peopleFullName.getText();
    };

    this.clickActionMenuButton = () => {
        Util.waitUntilElementIsVisible(element(by.className('adf-datatable-row')));
        actionMenuButton.click();
    };

    this.clickRemoveButton = () => {
        Util.waitUntilElementIsVisible(removeButton);
        removeButton.click();
    };

    this.checkIfNoPeopleAssigned = () => {
        Util.waitUntilElementIsVisible(noPeopleInvolved);
    };

    this.checkPeopleNotDisplayed = async(userName) => {
        const usersEmailList = await element.all(by.className('people-full-name')).getText();
        return usersEmailList.includes(userName);
    };

    this.scrollTo = (targetElement) => {
        browser.executeScript(`return document.body.querySelector('${targetElement}').scrollIntoView({behavior: "instant", block: "end", inline: "nearest"})`);
        Util.waitUntilElementIsVisible(element(by.css(targetElement)));
    };

    this.checkAssigmentPeopleTitleIsDisplayed = () => {
        Util.waitUntilElementIsVisible(assigmentPeopleTitle);
        return assigmentPeopleTitle.getText();
    };
};

module.exports = TaskDetailsPage;
