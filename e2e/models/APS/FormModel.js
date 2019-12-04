/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var FormModel = function (details) {

    this.id;
    this.name;
    this.description;
    this.modelId;
    this.appDefinitionId;
    this.appDeploymentId;
    this.tenantId;

    this.getName = function () {
        return this.name;
    };

    this.getId = function () {
        return this.id;
    };

    this.getDescription = function () {
        return this.description;
    };

    this.getModelId = function () {
        return this.modelId;
    };

    this.getAppDefinitionId = function () {
        return this.appDefinitionId;
    };

    this.getAppDeploymentId = function () {
        return this.appDeploymentId;
    };

    this.getTenantId = function () {
        return this.tenantId;
    };

    Object.assign(this, details);
};
module.exports = FormModel;
