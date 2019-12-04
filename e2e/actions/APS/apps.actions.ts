/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import path = require('path');
import fs = require('fs');
import TestConfig = require('../../test.config');
import AppPublish = require('../../models/APS/AppPublish');
import remote = require('selenium-webdriver/remote');

export class AppsActions {

    async importPublishDeployApp(alfrescoJsApi, appFileLocation) {
        browser.setFileDetector(new remote.FileDetector());


        const pathFile = path.join(TestConfig.main.rootPath + appFileLocation);
        const file = fs.createReadStream(pathFile);

        const appCreated = await alfrescoJsApi.activiti.appsApi.importAppDefinition(file);

        const publishApp = await alfrescoJsApi.activiti.appsApi.publishAppDefinition(appCreated.id, new AppPublish());

        await alfrescoJsApi.activiti.appsApi.deployAppDefinitions({ appDefinitions: [{ id: publishApp.appDefinition.id }] });

        return appCreated;
    }

    async startProcess(alfrescoJsApi, app, processName) {

        const appDefinitionsList = await alfrescoJsApi.activiti.appsApi.getAppDefinitions();

        const appDefinition = appDefinitionsList.data.filter((currentApp) => {
            return currentApp.name === app.name;
        });

        const processDefinitionList = await alfrescoJsApi.activiti.processApi.getProcessDefinitions(
            { deploymentId: appDefinition.deploymentId });

        const startProcessOptions = { processDefinitionId: processDefinitionList.data[0].id, name: '' };

        if (typeof processName !== 'undefined') {
            startProcessOptions.name = processName;
        }

        return await alfrescoJsApi.activiti.processApi.startNewProcessInstance(startProcessOptions);

    }

}
