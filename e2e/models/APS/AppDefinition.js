/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/**
 * App definition representation JSON Object
 *
 * @param details - JSON object used to overwrite the default values
 * @constructor
 */

var AppDefinition = function (details) {
    this.defaultAppId = "1";
    this.deploymentId = "1";
    this.description = "App deployment";
    this.icon = "default icon";
    this.id = 0;
    this.modelId = 0;
    this.name = "App name";
    this.tenantId = 0;
    this.theme = "default theme";

    Object.assign(this, details);
};

module.exports = AppDefinition;
