/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LogService, AlfrescoApiService } from '@alfresco/adf-core';

@Component({
    selector: 'apw-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingComponent implements OnInit {

    providers: string[] = ['BPM', 'ALL'];

    constructor(
        private router: Router,
        private logService: LogService,
        private alfrescoApiService: AlfrescoApiService) {
    }

    ngOnInit() {
    }

    onError(error: string): void {
      this.logService.log(error);
    }

    onCancel() {
        this.router.navigate(['/']);
    }

    onSuccess() {
        this.alfrescoApiService.reset();
        this.router.navigate(['/']);
    }
}
