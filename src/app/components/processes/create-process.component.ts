/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ProcessFilterService, FilterProcessRepresentationModel } from '@alfresco/adf-process-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfigService } from '@alfresco/adf-core';

@Component({
    selector: 'apw-create-process',
    templateUrl: './create-process.component.html',
    styleUrls: ['./create-process.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateProcessComponent implements OnInit, OnDestroy {

    @Input()
    appId: string = null;

    sub: Subscription;
    defaultFilterId = '';

    defaultProcessDefinitionName: string;
    defaultProcessName: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private appConfig: AppConfigService,
        private processFilterService: ProcessFilterService) {

    }

    ngOnInit() {
        this.defaultProcessName = this.appConfig.get<string>('adf-start-process.name');
        this.defaultProcessDefinitionName = this.appConfig.get<string>('adf-start-process.processDefinitionName');

        this.sub = this.route.parent.params.subscribe(params => {
            this.appId = params['appId'];
            this.getDefaultProcessFilter(this.getAppId());
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    backFromProcessCreation(): void {
        this.router.navigateByUrl('apps/' + this.appId + '/processes/' + this.defaultFilterId);
    }

    getDefaultProcessFilter(appId: string): void {
        this.processFilterService.getProcessFilterByName('Running', +appId).subscribe(
            (res: FilterProcessRepresentationModel) => {
                this.defaultFilterId = res.id.toString();
            }
        );
    }

    getAppId(): string {
        return +this.appId === 0 ? null : this.appId;
    }
}
