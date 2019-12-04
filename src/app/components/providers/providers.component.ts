/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, OnInit } from '@angular/core';
import { AppConfigService, StorageService } from '@alfresco/adf-core';

@Component({
    selector: 'apw-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

    providers = 'BPM';
    isECM = false;

    constructor(
        private storage: StorageService,
        private appConfig: AppConfigService) {
    }

    ngOnInit() {
        if (this.storage.hasItem('providers')) {
            this.providers = this.storage.getItem('providers');
        } else {
            this.providers = this.appConfig.get('adf-login.providers', this.providers);
        }

        this.initProviders();
    }

    private initProviders(): void {
        if (this.providers === 'ALL') {
            this.isECM = true;
        }
    }

    toggleECM(): void {
        this.isECM = !this.isECM;
    }


    private updateProvider(): void {
        if (this.isECM) {
            this.providers = 'ALL';
        } else {
            this.providers = 'BPM';
        }
        this.storage.setItem('providers', this.providers);
    }

    onBackClick(): void {
        window.history.back();
    }

    onApplyClick(): void {
        this.updateProvider();
        window.location.href = '/';
    }
}
