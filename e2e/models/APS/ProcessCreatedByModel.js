/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var ProcessCreatedByModel = function (details) {

    this.id;
    this.firstName;
    this.lastName;
    this.email;

    this.getFirstName = function () {
        return this.firstName;
    };

    this.getId = function () {
        return this.id;
    };

    this.getLastName = function () {
        return this.lastName;
    };

    this.getEmail = function () {
        return this.email;
    };

    this.getEntireName = function() {
        return this.firstName + " " + this.getLastName();
    };

    Object.assign(this, details);

};

module.exports = ProcessCreatedByModel;
