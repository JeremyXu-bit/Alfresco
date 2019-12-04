/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var BasicAuthorization = function (user, password) {
    this.user = user;
    this.password = password;

    this.displayCredentials = function () {
        // console.info("Basic Authorization: " + user + "(" + password + ")");
    }
};

module.exports = BasicAuthorization;
