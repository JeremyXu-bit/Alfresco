/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
    LogService,
    AppsProcessService,
    NotificationService,
    TranslationService,
    FormService,
} from '@alfresco/adf-core';
import {
    TaskFilterService, TaskDetailsModel, TaskListService, FilterRepresentationModel, TaskQueryRequestRepresentationModel
} from '@alfresco/adf-process-services';

import { LightUserRepresentation } from '@alfresco/js-api';
import { APWProperties, DialogEvent } from '../../models';
import { DialogConfirmationComponent } from '../layout';
import { DialogContentModel } from '../layout';
import { ToolbarIconEvent } from '../layout/toolbar/models/toolbar-icon-event';
import { PreviewService } from '../../services/preview.service';

@Component({
    selector: 'apw-task-details-container',
    templateUrl: './task-details-container.component.html',
    styleUrls: ['./task-details-container.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TaskDetailsContainerComponent implements OnInit, OnDestroy {

    static DEFAULT_TASK_FILTER = 'My Tasks';
    static SIDEBAR_DETAILS_TAB = 0;
    static SAVE_OUTCOME_ID = '$save';

    sub: Subscription;
    appId: number;
    taskDetails: TaskDetailsModel;
    showInfoDrawer = false;
    readOnlyForm = false;
    taskFormName: string;

    activeTab = TaskDetailsContainerComponent.SIDEBAR_DETAILS_TAB;
    selectedTab: number;

    appName: string;
    isformChanged: any;

    constructor(
        private logService: LogService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private taskListService: TaskListService,
        private appService: AppsProcessService,
        private taskFilterService: TaskFilterService,
        private preview: PreviewService,
        private notificationService: NotificationService,
        private translateService: TranslationService,
        public dialog: MatDialog,
        private formService: FormService
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.appId = +params['appId'];
            const taskId = params['taskId'];
            this.getAppName(this.appId);
            this.loadTaskDetails(taskId);
        });
    }

    private loadTaskDetails(taskId: string) {
        if (taskId) {
            this.taskListService.getTaskDetails(taskId).subscribe(
                (res: TaskDetailsModel) => {
                    this.taskDetails = res;

                    if (!this.taskDetails.name) {
                        this.taskDetails.name = 'No name';
                    }

                    const endDate: any = res.endDate;
                    this.readOnlyForm = !!(endDate && !isNaN(endDate.getTime()));
                });
        }
    }

    onCompleteTaskForm(processInfo) {
        if (processInfo.processInstanceId || processInfo.processDefinitionId) {
            this.notify('DW-TASK-FORM.OPERATIONS.FORM-COMPLETED');
            this.loadNextTask(processInfo.processInstanceId, processInfo.processDefinitionId);
        } else {
            this.notify('DW-TASK-FORM.OPERATIONS.FORM-COMPLETED');
            this.navigateToTaskList();
        }
    }

    onNoFormOutCome(event: any): void {
        this.notify('DW-TASK-FORM.OPERATIONS.FORM-COMPLETED');
    }

    /**
     * Retrieve the next open task
     * @param processInstanceId
     * @param processDefinitionId
     */
    private loadNextTask(processInstanceId: string, processDefinitionId: string) {
        const requestNode = new TaskQueryRequestRepresentationModel(
            {
                processInstanceId: processInstanceId,
                processDefinitionId: processDefinitionId
            }
        );
        this.taskListService.getTasks(requestNode).subscribe(
            (response) => {
                if (response && response.size > 0) {
                    this.taskDetails = new TaskDetailsModel(response.data[0]);
                } else {
                    this.reset();
                }
            },
            (error) => {
                this.logService.error(error);
            });
    }

    private reset() {
        this.taskDetails = null;
        this.navigateToTaskList();
    }

    onUpdatedTask() {
        this.loadTaskDetails(this.taskDetails.id);
    }

    onFormAttach(): void {
        this.loadTaskDetails(this.taskDetails.id);
    }

    onFormEdit() {
        this.loadTaskDetails(this.taskDetails.id);
    }

    getAppName(appId: number) {
        if (this.appId === 0) {
            this.appName = APWProperties.TASK_APP_NAME;
        } else {
            this.appService.getApplicationDetailsById(appId).subscribe(
                (res) => {
                    this.appName = res.name;
                }
            );
        }
    }

    hasTaskDetails(): boolean {
        return this.taskDetails && this.taskDetails.id !== undefined && this.taskDetails.id !== null;
    }

    onSelectedTab(tabIndex: number) {
        this.activeTab = tabIndex;
        this.selectedTab = tabIndex;
    }

    isDetailsTabActive() {
        return this.activeTab === TaskDetailsContainerComponent.SIDEBAR_DETAILS_TAB;
    }

    toggleInfoDrawer(): void {
        this.showInfoDrawer = !this.showInfoDrawer;
    }

    getToolBarActionName(): string {
        return this.showInfoDrawer ? 'info' : '';
    }

    oncloseIconClick(): void {
        if (this.isformChanged) {
            this.openDialog(ToolbarIconEvent.ACTION_CLOSE_TYPE);
        } else {
            this.navigateToTaskList();
        }
    }

    onTaskFormName(formName: any): void {
        this.taskFormName = formName;
    }

    onBackButtonClick(): void {
        if (this.isformChanged) {
            this.openDialog(ToolbarIconEvent.ACTION_BACK_TYPE);
        } else {
            this.navigateByHistory();
        }
    }

    onCancelForm() {
        this.navigateByHistory();
    }

    onClaim(): void {
        this.location.back();
    }

    onContentClick(content: any): void {
        this.showContentPreview(content);
    }

    private showContentPreview(content: any) {
        if (content.contentBlob) {
            this.preview.showBlob(content);
        }
    }

    private navigateByHistory(): void {
        this.location.back();
    }

    onNavigate(event) {
        this.navigateToTaskList();
    }

    navigateToTaskList(): void {
        this.taskFilterService.getTaskFilterByName(TaskDetailsContainerComponent.DEFAULT_TASK_FILTER, +this.appId).subscribe(
            (res: FilterRepresentationModel) => {
                const filter = res;
                const navUrl: string = '/apps/' + this.appId + '/tasks/' + filter.id;
                this.router.navigateByUrl(navUrl);
            });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    assignTaskToUser(selectedUser: LightUserRepresentation) {
        this.taskListService.assignTask(this.taskDetails.id, selectedUser).subscribe(
            (res: any) => {
                this.logService.info('Task Assigned to ' + selectedUser.email);
                this.onNavigate({ route : 'tasks'});
            });
    }

    onFormOutcomeExecute(outcome: any) {
        if ( outcome._outcome.id === TaskDetailsContainerComponent.SAVE_OUTCOME_ID ) {
            const message = this.translateService.instant('DW-TASK-FORM.OPERATIONS.FORM-SAVED');
            this.notificationService.openSnackMessage(message, 4000);
            this.isformChanged = null;
        }
    }

    onFormChanged(event: any) {
        this.isformChanged = event;
    }

    private buildDialogContent(): DialogContentModel {
        const content = {
            'title': this.translateService.instant('DW-DIALOG.TASK-DIALOG.TITLE'),
            'actions': [
                {
                    'label': this.translateService.instant('DW-DIALOG.TASK-DIALOG.SAVE'),
                    'key': 'save',
                    'color': 'primary'
                },
                {
                    'label': this.translateService.instant('DW-DIALOG.TASK-DIALOG.DISCARD'),
                    'key': 'discard'
                }
            ]
        };
        return <DialogContentModel>content;
    }

    openDialog(source: string): void {
        const dialogRef = this.dialog.open(DialogConfirmationComponent);
        dialogRef.componentInstance.dialogContent = this.buildDialogContent();
        dialogRef.afterClosed().subscribe(res => {
            if (res && res.action === DialogEvent.ACTION_SAVE) {
                this.formService.saveTaskForm(this.isformChanged.taskId, this.isformChanged.values);
                switch (source) {
                    case ToolbarIconEvent.ACTION_CLOSE_TYPE:
                    this.navigateToTaskList();
                    break;
                    case ToolbarIconEvent.ACTION_BACK_TYPE:
                    this.navigateByHistory();
                    break;
                }
                this.notify('DW-TASK-FORM.OPERATIONS.FORM-SAVED');
            } else if (res && res.action === DialogEvent.ACTION_DISCARD) {
                switch (source) {
                    case ToolbarIconEvent.ACTION_CLOSE_TYPE:
                    this.navigateToTaskList();
                    break;
                    case ToolbarIconEvent.ACTION_BACK_TYPE:
                    this.navigateByHistory();
                    break;
                }
            }
        });
    }

    private notify(message: string): void {
        const translatedMessage = this.translateService.instant(message);
        this.notificationService.openSnackMessage(translatedMessage, 4000);
    }
}
