/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    Output,
    EventEmitter,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import {
    FormOutcomeEvent,
    FormModel,
    BpmUserService,
    ContentLinkModel,
    FormRenderingService,
    NotificationService,
    TranslationService,
    LogService
} from '@alfresco/adf-core';
import {
    TaskDetailsModel,
    AttachFileWidgetComponent,
    AttachFolderWidgetComponent,
    TaskListService
} from '@alfresco/adf-process-services';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormService, FormFieldEvent } from '@alfresco/adf-core';
import { MatDialog } from '@angular/material';
import { TaskFormDialogComponent } from './task-form-dialog/task-form-dialog.component';

@Component({
    selector: 'apw-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TaskFromComponent implements OnInit, OnDestroy {

    @Input()
    taskDetails: TaskDetailsModel;

    @Input()
    readOnlyForm = false;

    @Output()
    navigate: EventEmitter<any> = new EventEmitter<any>();


    @Output()
    cancel: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    complete: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    executeNoFormOutcome: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    taskFormName: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    contentClicked: EventEmitter<ContentLinkModel> = new EventEmitter<ContentLinkModel>();

    @Output()
    formOutcomeExecute: EventEmitter<FormOutcomeEvent> = new EventEmitter<FormOutcomeEvent>();

    @Output()
    formChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    formAttached: EventEmitter<any> = new EventEmitter<any>();

    appId;
    taskId: string;

    showInfoDrawer: boolean;
    attachmentDetails: any = {};

    taskFormValues: string;

    noTaskDetailsTemplateComponent: TemplateRef<any>;

    sub: Subscription;
    private currentUserId: number;

    constructor(
        private taskListService: TaskListService,
        private logService: LogService,
        private route: ActivatedRoute,
        private bpmUserService: BpmUserService,
        private formRenderingService: FormRenderingService,
        private formService: FormService,
        public dialog: MatDialog,
        private notificationService: NotificationService,
        private translateService: TranslationService) {
        this.formRenderingService.setComponentTypeResolver('upload', () => AttachFileWidgetComponent, true);
        this.formRenderingService.setComponentTypeResolver('select-folder', () => AttachFolderWidgetComponent, true);
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.appId = params['appId'];
            this.taskId = params['taskId'];
        });
        this.loadCurrentUser();
    }

    hasFormKey() {
        return !!this.taskDetails.formKey;
    }

    isTaskLoaded(): boolean {
        return !!this.taskDetails;
    }

    onFormCompleted(form: FormModel) {
        const processInfo = {
            processInstanceId: this.taskDetails.processInstanceId,
            processDefinitionId: this.taskDetails.processDefinitionId
        };
        this.complete.emit(processInfo);
    }

    onFormLoaded(form: FormModel): void {
        this.taskFormValues = JSON.stringify(form.values);
        const formName = (form && form.name ? form.name : null);
        this.taskFormName.emit(formName);
        this.onFormChange();
    }

    onFormContentClick(content: ContentLinkModel): void {
        this.contentClicked.emit(content);
    }

    isCompletedTask(): boolean {
        return this.taskDetails && this.taskDetails.endDate !== undefined && this.taskDetails.endDate !== null;
    }

    hasCompleteButton(): boolean {
        return !this.isCompletedTask() && this.isAssignedToCurrentUser();
    }

    onCompleteTask(): void {
        this.taskListService.completeTask(this.taskDetails.id)
            .subscribe(
                (res) => {
                    this.navigate.emit();
                    this.executeNoFormOutcome.emit();
                },
                error => {
                    this.logService.error('Task form' + error);
                }
        );
    }

    private loadCurrentUser(): void {
        this.bpmUserService.getCurrentUserInfo().subscribe((res) => {
            this.currentUserId = res && res.id;
        });
    }

    isAssignedToCurrentUser(): boolean {
        return +this.currentUserId === (this.taskDetails.assignee && this.taskDetails.assignee.id);
    }

    canInitiatorComplete(): boolean {
        return this.taskDetails.initiatorCanCompleteTask;
    }

    isReadOnlyForm(): boolean {
        return this.readOnlyForm || !(this.isAssignedToCurrentUser() || this.canInitiatorComplete());
    }

    isProcessInitiator(): boolean {
        return this.currentUserId === +this.taskDetails.processInstanceStartUserId;
    }

    isSaveButtonVisible(): boolean {
        return this.isAssignedToCurrentUser() || (!this.canInitiatorComplete() && !this.isProcessInitiator());
    }

    getTaskName(): any {
        return { taskName: this.taskDetails.name };
    }

    onCancelButtonClick() {
        this.cancel.emit();
    }

    onFormOutcomeExecute(formOutcomeEvent: FormOutcomeEvent) {
        this.formOutcomeExecute.emit(formOutcomeEvent);
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onFormChange() {
        this.formService.formFieldValueChanged.subscribe(
            (e: FormFieldEvent) => {
                const eventChanges = JSON.stringify(e.form.values);
                if (eventChanges !== this.taskFormValues) {
                    this.formChange.emit(e.form);
                }
            }
        );
    }

    onShowAttachForm() {
        const dialogRef = this.dialog.open(TaskFormDialogComponent, {
            data: {
                taskId: this.taskDetails.id,
                formKey: this.taskDetails.formKey
            },
            width: '80%',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.isYes()) {
                this.formAttached.emit();
                this.notify('DW-TASK-FORM.OPERATIONS.FORM-ATTACH');
            } else if (result && result.isNo()) {
                this.dialog.closeAll();
            } else if (result && result.isError()) {
                this.notify('DW-TASK-FORM.OPERATIONS.FORM-ERROR');
            }
        });
    }

    private notify(message: string): void {
        const translatedMessage = this.translateService.instant(message);
        this.notificationService.openSnackMessage(translatedMessage, 4000);
    }

    hasProcessDefinitionId() {
        return !!this.taskDetails.processDefinitionId;
    }
}
