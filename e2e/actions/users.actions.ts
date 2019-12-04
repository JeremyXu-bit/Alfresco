/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import Tenant = require('../models/APS/Tenant');
import User = require('../models/APS/User');
import TestConfig = require('../test.config');
import path = require('path');
import fs = require('fs');

export class UsersActions {

    async createTenantAndUser(alfrescoJsApi) {
        const newTenant = await alfrescoJsApi.activiti.adminTenantsApi.createTenant(new Tenant());

        const user = new User({ tenantId: newTenant.id });

        await alfrescoJsApi.activiti.adminUsersApi.createNewUser(user);

        return user;
    }

    async createApsUser(alfrescoJsApi, tenantId) {
        const user = new User({ tenantId: tenantId });

        await alfrescoJsApi.activiti.adminUsersApi.createNewUser(user);

        return user;
    }

    async cleanupTenant(alfrescoJsApi, tenantId) {
        return alfrescoJsApi.activiti.adminTenantsApi.deleteTenant(tenantId);
    }

    async changeProfilePictureAps(alfrescoJsApi, fileLocation) {
        const pathFile = path.join(TestConfig.main.rootPath + fileLocation);
        const file = fs.createReadStream(pathFile);

        return alfrescoJsApi.activiti.profileApi.uploadProfilePicture(file);
    }

}
