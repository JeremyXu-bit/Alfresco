/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var TaskAssigneeModel = require('./TaskAssigneeModel');

var TaskModel = function (details) {

    this.id;
    this.name;
    this.description;
    this.category;
    this.created;
    this.dueDate;
    this.priority;
    this.parentTaskName;
    this.formKey;
    this.assignee = {};

    this.getName = function () {
        return this.name;
    };

    this.getId = function () {
        return this.id;
    };

    this.getDescription = function () {
        return this.description;
    };

    this.getCategory = function () {
        return this.category;
    };

    this.getCreated = function () {
        return this.created;
    };

    this.getDueDate = function () {
        return this.dueDate;
    };

    this.getPriority = function () {
        return this.priority;
    };

    this.getParentTaskName = function () {
        return this.parentTaskName;
    };

    this.getFormKey = function () {
        return this.formKey;
    };

    this.getAssignee = function () {
        return this.assignee;
    };

    Object.assign(this, details);
    Object.assign(this.assignee, new TaskAssigneeModel(details.assignee));
};
module.exports = TaskModel;
