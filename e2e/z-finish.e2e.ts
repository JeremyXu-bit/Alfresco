/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import AlfrescoApi = require('alfresco-js-api-node');
import { UploadActions } from './actions/ACS/upload.actions';
import TestConfig = require('./test.config');

import fs = require('fs');
import path = require('path');

let buildNumber: any = process.env.TRAVIS_BUILD_NUMBER;
const saveScreenshot = process.env.SAVE_SCREENSHOT;

describe('Save screenshot at the end', () => {

    beforeAll(async (done) => {
        const uploadActions = new UploadActions();

        if (saveScreenshot === 'true') {
            if (!buildNumber) {
                buildNumber = Date.now();
            }

            const alfrescoJsApi = new AlfrescoApi({
                provider: 'ECM',
                hostEcm: TestConfig.adf.url
            });

            const files = fs.readdirSync(path.join(__dirname, '../e2e-output/screenshots'));

            if (files && files.length > 0) {
                alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

                const folder = await alfrescoJsApi.nodes.addNode('-my-', {
                    'name': 'Screenshot-e2e-' + buildNumber,
                    'nodeType': 'cm:folder'
                }, {}, {});

                for (const fileName of files) {

                    const pathFile = path.join(__dirname, '../e2e-output/screenshots', fileName);
                    const file: any = fs.createReadStream(pathFile);

                    await  alfrescoJsApi.upload.uploadFile(
                        file,
                        '',
                        folder.entry.id,
                        null,
                        {
                            'name': file.name,
                            'nodeType': 'cm:content'
                        }
                    );
                }
            }
        }

        done();
    });

    it('screenshot need it', () => {
        expect(true).toEqual(true);
    });
});
