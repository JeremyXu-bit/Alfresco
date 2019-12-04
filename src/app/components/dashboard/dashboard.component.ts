/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaQueryService } from '../../services/media-query.service';

@Component({
    selector: 'apw-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
    static ACTION_INFO = 'Info';
    static SIDEBAR_WIDTH_MAX = '350px';
    static SIDEBAR_WIDTH_MIN = '0px';

    reportQuery: any;
    appId: string;
    private routeSub: Subscription;

    showSidebar = true;
    mobile = false;
    sideBarWidth: string;

    constructor(private mediaQuery: MediaQueryService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.routeSub = this.route.parent.params.subscribe(params => {
            this.appId = params['appId'];
        });

        this.mediaQuery.mobile$.subscribe( (isMobile) => {
            this.mobile = isMobile;
            if (this.mobile) {
                this.showSidebar = false;
            }
            this.calculateMainContentPercentage();
        });
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }

    toggleDashboardSettings(): void {
        this.showSidebar = !this.showSidebar;
        this.calculateMainContentPercentage();
    }

    calculateMainContentPercentage() {
        this.sideBarWidth =  this.showSidebar ? DashboardComponent.SIDEBAR_WIDTH_MAX : DashboardComponent.SIDEBAR_WIDTH_MIN;
    }

    onParameterChange(reportParam): void {
        this.reportQuery = reportParam;
    }

    getBreadcrumbActionName(): string {
        return this.showSidebar ? DashboardComponent.ACTION_INFO : '';
    }
}
