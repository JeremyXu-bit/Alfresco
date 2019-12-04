/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import {
    Component,
    OnInit, Input, Output, ViewChild, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Pagination } from '@alfresco/js-api';
import { ObjectDataTableAdapter, DataSorting, UserPreferencesService, UserPreferenceValues } from '@alfresco/adf-core';
import { FilterRepresentationModel, TaskListComponent } from '@alfresco/adf-process-services';
import { ApplicationContentStateService } from '../../services/application-content-state.service';
@Component({
    selector: 'apw-tasklist-paginator',
    templateUrl: './tasklist-paginator.component.html',
    styleUrls: ['./tasklist-paginator.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class TaskListPaginatorComponent implements OnInit {

    @ViewChild('taskList')
    taskList: TaskListComponent;

    @Input()
    currentFilter: FilterRepresentationModel;

    @Input()
    selectionMode = 'single'; // none|single|multiple

    @Output()
    success: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    rowClick: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    rowDoubleClick: EventEmitter<any> = new EventEmitter<any>();

    dataTasks: ObjectDataTableAdapter;
    paginationPageSize = 10;
    supportedPageSizes: any[];

    presetColoum = 'dw-task-list';

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
        this.dataTasks = new ObjectDataTableAdapter([], []);
        this.dataTasks.setSorting(new DataSorting('created', 'desc'));
    }

    onSuccessTaskList(event: any) {
        this.applicationContentStateService.hasTaskContent = this.hasTaskContent(event);
        const currentTaskId = this.taskList && this.taskList.getCurrentId();
        this.success.emit(currentTaskId);
    }

    onRowClick(event: any) {
        this.rowClick.emit(event);
    }

    onRowDoubleClick(event: any) {
        this.rowDoubleClick.emit(event);
    }

    reloadTask() {
        this.taskList.reload();
    }

    onChangePageSize(pagination: Pagination): void {
        this.userPreferenceService.paginationSize = pagination.maxItems;
    }

    private hasTaskContent(event: any): boolean {
        if (event) {
            return event.data.length === 0 ? false : true;
        }
    }
}
