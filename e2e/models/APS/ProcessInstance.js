/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * Process Instance representation JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var ProcessInstance = function (details) {
    this.processDefinitionId = 1234;
    this.name = "Process started from REST API";

    Object.assign(this, details);
};

module.exports = ProcessInstance;
