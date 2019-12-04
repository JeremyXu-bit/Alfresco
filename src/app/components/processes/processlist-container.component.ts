/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import {
    OnInit,
    OnDestroy,
    Component,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    HostBinding
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
    ObjectDataTableAdapter,
    DataSorting
} from '@alfresco/adf-core';
import {
    ProcessFilterService,
    ProcessService,
    FilterProcessRepresentationModel,
    ProcessInstance
} from '@alfresco/adf-process-services';

import { ActivatedRoute, Router } from '@angular/router';
import { MediaQueryService } from '../../services/media-query.service';
import { ApplicationContentStateService } from '../../services/application-content-state.service';

@Component({
    selector: 'apw-processlist-container',
    templateUrl: './processlist-container.component.html',
    styleUrls: ['./processlist-container.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProcessListContainerComponent implements OnInit, OnDestroy {

    static ACTION_INFO = 'Info';
    mobile: boolean;

    @HostBinding('class.dw-container') true;

    @Input()
    appId: number;

    @Input()
    filterId: number;

    @Output()
    onSuccessProcessService: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onProcessRowClick: EventEmitter<any> = new EventEmitter<any>();

    currentProcessInstanceId: string;
    processSchemaColumns: any[] = [];

    processFilter: FilterProcessRepresentationModel;

    showSidebar = false;
    dataProcesses: ObjectDataTableAdapter;

    defaultFilterId: string;

    sub: Subscription;
    processInstanceDetails: ProcessInstance;
    processContent$: Observable<boolean>;

    constructor(
        private mediaQuery: MediaQueryService,
        private route: ActivatedRoute,
        private router: Router,
        private processService: ProcessService,
        private processFilterService: ProcessFilterService,
        private applicationContentStateService: ApplicationContentStateService) {

    }

    ngOnInit() {
        this.mediaQuery.mobile$.subscribe( (isMobile) => {
            this.mobile = isMobile;
        });

        this.sub = this.route.parent.params.subscribe(params => {
            this.appId = +params['appId'];
        });

        this.sub = this.route.params.subscribe(params => {
            this.filterId = +params['processFilterId'];
            this.processFilter = null;
            this.currentProcessInstanceId = null;
            this.setSortOrder();
            this.getProcessFilterByFilterId(this.filterId, this.getAppId());
            this.getDefaultProcessFilter(this.getAppId());
        });
        this.processContent$ = this.applicationContentStateService.processContent$;
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private getAppId() {
        return +this.appId === 0 ? null : this.appId;
    }

    loadProcessDetails(processId: string) {
        if (processId) {
            this.processService.getProcess(processId).subscribe(
                (res: ProcessInstance) => {
                    this.processInstanceDetails = res;
                }
            );
        }
    }

    isRunning(): boolean {
        return this.processInstanceDetails && !this.processInstanceDetails.ended;
    }

    getProcessFilterByFilterId(filterId: number, appId: number) {
        this.processFilterService.getProcessFilterById(filterId, appId).subscribe(
            (res: FilterProcessRepresentationModel) => {
                this.processFilter = res;
            }
        );
    }

    getDefaultProcessFilter(appId: number) {
        this.processFilterService.getProcessFilterByName('Running', appId).subscribe(
            (res: FilterProcessRepresentationModel) => {
                this.defaultFilterId = res.id.toString();
            }
        );
    }

    openProcessForm() {
        this.router.navigate(['/processdetails/', this.appId, this.currentProcessInstanceId]);
    }

    closeProcessDetailsLayout() {
        this.showSidebar = false;
    }

    onProcessRowSelect(event: any) {
        const process = event.detail.value.obj;
        if (this.mobile) {
            this.currentProcessInstanceId = process.id;
            this.openProcessForm();
        } else {
            if (this.isCurrentProcess(process.id) && this.isProcessDetailShown()) {
                this.showSidebar = false;
            } else {
                this.showSidebar = true;
                this.currentProcessInstanceId = process.id;
                this.loadProcessDetails(this.currentProcessInstanceId);
                this.onProcessRowClick.emit(this.currentProcessInstanceId);
            }
        }
    }

    onProcessRowDoubleClick(event: any) {
        const process = event.detail.value.obj;
        this.currentProcessInstanceId = process.id;
        this.openProcessForm();
    }

    isCurrentProcess(id: string) {
        return this.currentProcessInstanceId === id ? true : false;
    }

    isProcessDetailShown() {
        return this.showSidebar;
    }

    onSuccessProcessList(currentProcessInstanceId: any) {
        this.currentProcessInstanceId = currentProcessInstanceId;
        this.loadProcessDetails(this.currentProcessInstanceId);
        this.onSuccessProcessService.emit(this.currentProcessInstanceId);
    }

    hasProcessDetails() {
        return (this.processInstanceDetails !== undefined && this.processInstanceDetails !== null);
    }

    private setSortOrder(): void {
        this.dataProcesses = new ObjectDataTableAdapter([], []);
        this.dataProcesses.setSorting(new DataSorting('started', 'desc'));
    }

    toggleInfoDrawer() {
        this.showSidebar = !this.showSidebar;
    }

    getBreadcrumbActionName(): string {
        return this.showSidebar ? ProcessListContainerComponent.ACTION_INFO : '';
    }
}
