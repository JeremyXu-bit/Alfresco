/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDefinitionRepresentationModel } from '@alfresco/adf-process-services';
import { AppConfigService } from '@alfresco/adf-core';

@Component({
    selector: 'apw-apps',
    templateUrl: 'apps.component.html',
    styleUrls: ['./apps.component.scss'],
    providers: []
})

export class AppsComponent implements OnInit {

    landingRoutePage: string;
    constructor(private appConfig: AppConfigService, public router: Router) {
    }

    ngOnInit() {
        this.landingRoutePage = this.appConfig.get('landing-page', 'dashboard/default');
    }

    onAppSelection(app: AppDefinitionRepresentationModel) {
        const appId = app.id ? app.id : 0;
        this.router.navigate([`apps/${appId}/${this.landingRoutePage}`]);
    }

}
