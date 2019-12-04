/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ObjectDataTableAdapter, DataSorting, UserPreferencesService, UserPreferenceValues } from '@alfresco/adf-core';
import { ProcessInstanceListComponent, FilterProcessRepresentationModel } from '@alfresco/adf-process-services';
import { Pagination } from '@alfresco/js-api';
import { ApplicationContentStateService } from '../../services/application-content-state.service';

@Component({
    selector: 'apw-processlist-paginator',
    templateUrl: './processlist-paginator.component.html',
    styleUrls: ['./processlist-paginator.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProcessListPaginatorComponent implements OnInit {

    static RUNNING_PROCESS_FILTER_NAME = 'Running';
    static RUNNING_SCHEMA = 'running';
    static COMPLETED_SCHEMA = 'completed';

    @ViewChild('processInstanceList')
    processlistComponentInstance: ProcessInstanceListComponent;

    @Input()
    currentFilter: FilterProcessRepresentationModel;

    @Output()
    success: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    rowClick: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    rowDoubleClick: EventEmitter<any> = new EventEmitter<any>();

    dataProcesses: ObjectDataTableAdapter;

    paginationPageSize = 10;
    supportedPageSizes: any[];

    constructor(private userPreferenceService: UserPreferencesService,
                private applicationContentStateService: ApplicationContentStateService) {
    }

    ngOnInit() {
        if ( this.userPreferenceService.get(UserPreferenceValues.PaginationSize)) {
            this.paginationPageSize = +this.userPreferenceService.get(UserPreferenceValues.PaginationSize);
        } else {
            this.userPreferenceService.select(UserPreferenceValues.PaginationSize).subscribe((pageSize) => {
                this.paginationPageSize = pageSize;
            });
        }
        this.userPreferenceService.select(UserPreferenceValues.SupportedPageSizes).subscribe((supportedPageSizes) => {
            if (typeof supportedPageSizes === 'string') {
                supportedPageSizes = JSON.parse(supportedPageSizes);
            }
            this.supportedPageSizes = supportedPageSizes;
        });
        this.setSortOrder();
    }

    private setSortOrder(): void {
        this.dataProcesses = new ObjectDataTableAdapter([], []);
        this.dataProcesses.setSorting(new DataSorting('started', 'desc'));
    }

    onSuccessProcessList(event: any): void {
        this.applicationContentStateService.hasProcessContent = this.hasProcessContent(event);
        const currentTaskId = this.processlistComponentInstance.getCurrentId();
        this.success.emit(currentTaskId);
    }

    onRowClick(event: any): void {
        this.rowClick.emit(event);
    }

    onRowDoubleClick(event: any): void {
        this.rowDoubleClick.emit(event);
    }

    reloadTask(): void {
        this.processlistComponentInstance.reload();
    }

    getProcessListSchema(): string {
        return this.isRunningFilter() ? ProcessListPaginatorComponent.RUNNING_SCHEMA : ProcessListPaginatorComponent.COMPLETED_SCHEMA;
    }

    isRunningFilter(): boolean {
        return this.currentFilter.name === ProcessListPaginatorComponent.RUNNING_PROCESS_FILTER_NAME;
    }

    onChangePageSize(pagination: Pagination): void {
        this.userPreferenceService.paginationSize = pagination.maxItems;
    }

   private hasProcessContent(event: any): boolean {
        if (event) {
            return event.data.length === 0 ? false : true;
        }
    }
}
