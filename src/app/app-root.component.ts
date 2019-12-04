/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '@alfresco/adf-core';
import { AlfrescoApiService } from '@alfresco/adf-core';

@Component({
    selector: 'apw-app-root',
    templateUrl: './app-root.component.html',
    styleUrls: ['./app-root.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppRootComponent {

    static LOGIN_URL = '/#/login';

    constructor(pageTitleService: PageTitleService, alfrescoApiService: AlfrescoApiService) {
        pageTitleService.setTitle();
        alfrescoApiService.getInstance().on('error', (error) => {
            this.handleUnauthorizedError(error);
        });
    }

    private handleUnauthorizedError(error) {
        if ( error && error.status === 401 ) {
            window.location.href = AppRootComponent.LOGIN_URL;
        }
    }
}
