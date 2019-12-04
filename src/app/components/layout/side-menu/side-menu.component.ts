/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ProcessInstanceFilterRepresentation } from '@alfresco/js-api';
import { Subscription } from 'rxjs';

import { ProcessFiltersComponent,
    FilterRepresentationModel,
    TaskFiltersComponent,
    FilterProcessRepresentationModel} from '@alfresco/adf-process-services';

import { APWRoutes } from './apw-routes.model';
import { MediaQueryService } from '../../../services/media-query.service';
import { MatExpansionPanel } from '@angular/material';

@Component({
    selector: 'apw-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements OnInit, OnDestroy {

    static DEFAULT_TASK_FILTER = 'My Tasks';
    static DEFAULT_PROCESS_FILTER = 'Running';
    static FILTER_NEW = 'new';

    static ACTION_TYPE = 3;
    static ACTION_TYPE_ID = 4;

    @Input()
    expanded = true;

    @Output()
    minimizeSidenav: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('dashboardPanel')
    dashboardPanel: MatExpansionPanel;

    @ViewChild('taskPanel')
    taskPanel: MatExpansionPanel;

    @ViewChild('processPanel')
    processPanel: MatExpansionPanel;

    @ViewChild('processFilter')
    processFilter: ProcessFiltersComponent;

    @ViewChild('taskFilter')
    taskFilter: TaskFiltersComponent;

    appId: number = null;

    currentProcessFilter: any;

    currentTaskFilter: any;

    private defaultDashboardFilter: any = { 'id': 'default' };

    private currentAccordionName: string;

    private currentFilterId: any;

    newProcessOrTask: boolean;

    private sub: Subscription;

    private routeSub: Subscription;

    mobile: boolean;

    constructor(
        private mediaQuery: MediaQueryService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {

        this.routeSub = this.route.params.subscribe(params => {
            this.appId = params['appId'];
        });

        this.mediaQuery.mobile$.subscribe((isMobile) => {
            this.mobile = isMobile;
        });

        this.sub = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.initializeComponent(event.url);
            }
        });

        const routerState = this.router.routerState.snapshot;
        this.initializeComponent(routerState.url);
    }

    initializeComponent(url: string) {
        this.newProcessOrTask = false;
        const {actionType, filterId} = this.getContextFromURL(url);
        this.currentAccordionName = actionType;
        this.currentFilterId = filterId;

        if (this.isCreateAction()) {
            this.reset();
        } else if (this.isProcessAction()) {
            this.currentProcessFilter = this.getFilter();
        } else if (this.isTaskAction()) {
            this.currentTaskFilter = this.getFilter();
        }
    }

    onCreateClick(type: string): void {
        this.navigateToNew(type);
    }

    onProcessFilterClick(filter: FilterProcessRepresentationModel): void {
        this.navigateToFilter(APWRoutes.processes, filter);
    }

    onTaskFilterClick(filter: FilterRepresentationModel): void {
        this.navigateToFilter(APWRoutes.tasks, filter);
    }

    onSuccessTaskFilterList(event: FilterRepresentationModel[]): void {
        this.currentTaskFilter = this.taskFilter.getCurrentFilter();
        if (this.isTaskAction()) {
            this.navigateToFilter(APWRoutes.tasks, this.currentTaskFilter);
        }
    }

    onSuccessProcessFilterList(event: ProcessInstanceFilterRepresentation[]): void {
        this.currentProcessFilter = this.processFilter.getCurrentFilter();
        if (this.isProcessAction()) {
            this.navigateToFilter(APWRoutes.processes, this.currentProcessFilter);
        }
    }

    onAccordionClick(accodion: string): void {
        this.selectDefaultFilter(accodion);
    }

    private selectDefaultFilter(accordion: string): void {
        if (accordion === APWRoutes.tasks) {
            if (!this.expanded) {
                this.taskPanel.close();
            }
            this.navigateToFilter(APWRoutes.tasks, this.currentTaskFilter);
        } else if (accordion === APWRoutes.processes) {
            if (!this.expanded) {
                this.processPanel.close();
            }
            this.navigateToFilter(APWRoutes.processes, this.currentProcessFilter);
        } else if (accordion === APWRoutes.dashboard) {
            this.dashboardPanel.close();
            this.navigateToFilter(APWRoutes.dashboard, this.defaultDashboardFilter);
        }
    }

    private navigateToFilter(action: string, filter: any): void {
        if (!this.hasSameAction(action) || !this.hasSameFilterId(filter.id + '')) {
            this.currentAccordionName = action;
            this.currentFilterId = filter.id;
            this.router.navigate([`/apps/${this.appId}/${action}/${filter.id}`]);
            if (this.mobile) {
                this.minimizeSidenav.emit();
            }
        }
    }

    private navigateToNew(type: string): void {
        this.router.navigate([`/apps/${this.appId}/${type}/${APWRoutes.create}`]);
        this.minimizeSidenav.emit();
    }

    getAppId(): number {
        return +this.appId === 0 ? null : this.appId;
    }

    isMenuSelected(menu: string): boolean {
        return this.currentAccordionName === menu;
    }

    isExpanded(): boolean {
        return this.expanded;
    }

    getMenuHeading(accordion: string): string {
        return this.expanded ? accordion : '';
    }

    private getFilter() {
        if (this.currentFilterId) {
            return  Object.assign({}, { id : +this.currentFilterId});
        }
        return { index : 0};
    }

    private getContextFromURL(url: string) {
        const parts = url.split('/');
        const actionType = parts[SideMenuComponent.ACTION_TYPE];
        const filterId = parts[SideMenuComponent.ACTION_TYPE_ID];
        return {actionType, filterId};
    }

    private isTaskAction(): boolean {
        return this.currentAccordionName === APWRoutes.tasks;
    }

    private isProcessAction(): boolean {
        return this.currentAccordionName === APWRoutes.processes;
    }

    private isCreateAction(): boolean {
        return this.currentFilterId === 'new';
    }

    private hasSameAction(action: string): boolean {
        return this.currentAccordionName === action;
    }

    private hasSameFilterId(id: string): boolean {
        return this.currentFilterId === id;
    }

    private reset() {
        this.newProcessOrTask = true;
        this.currentAccordionName = null;
        this.currentFilterId = null;
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }

        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }
}
