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
    Output,
    EventEmitter,
    HostBinding,
    ViewEncapsulation,
    OnInit,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
import { TaskDetailsModel } from '@alfresco/adf-process-services';
import { LightUserRepresentation } from '@alfresco/js-api';
import { Observable, Observer, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import {
    ClickNotification,
    LogService,
    UpdateNotification,
    CardViewUpdateService,
    PeopleProcessService,
    NotificationService,
    TranslationService
} from '@alfresco/adf-core';

import { TaskListService } from '@alfresco/adf-process-services';
import { Router } from '@angular/router';
import { TaskFormDialogComponent } from '../../task-details/task-form-dialog/task-form-dialog.component';
@Component({
    selector: 'apw-task-sidebar',
    templateUrl: './task-sidebar.component.html',
    styleUrls: ['./task-sidebar.component.scss'],
    providers: [CardViewUpdateService],
    encapsulation: ViewEncapsulation.None
})

export class TaskSidebarComponent implements OnInit, OnChanges, OnDestroy {

    @HostBinding('class.dw-task-sidebar') true;

    @Input()
    appId: number;

    @Input()
    taskDetails: TaskDetailsModel;

    @Input()
    taskFormName: string;

    @Input()
    readOnlyForm = false;

    @Input()
    selectedTab: number;

    @Output()
    changeAssignee: EventEmitter<LightUserRepresentation> = new EventEmitter<LightUserRepresentation>();

    @Output()
    updated: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    claim: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    currentTab: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    formEdit: EventEmitter<any> = new EventEmitter<any>();

    taskPeople: LightUserRepresentation[] = [];

    showInfoDrawer = false;

    showAssignee = false;

    private peopleSearchObserver: Observer<LightUserRepresentation[]>;
    peopleSearch$: Observable<LightUserRepresentation[]>;
    cardViewUpdateSub: Subscription;
    cardViewClickSub: Subscription;

    constructor(
        private taskListService: TaskListService,
        private logService: LogService,
        private router: Router,
        private peopleService: PeopleProcessService,
        private cardViewUpdateService: CardViewUpdateService,
        public dialog: MatDialog,
        private notificationService: NotificationService,
        private translateService: TranslationService
    ) { }

    ngOnInit() {
        this.peopleSearch$ = new Observable<LightUserRepresentation[]>(observer => this.peopleSearchObserver = observer).pipe(share());
        this.cardViewUpdateSub = this.cardViewUpdateService.itemUpdated$.subscribe(this.updateTaskDetails.bind(this));
        this.cardViewClickSub = this.cardViewUpdateService.itemClicked$.subscribe(this.clickTaskDetails.bind(this));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.taskDetails && changes.taskDetails.currentValue) {
            this.setInvolvedPeople();
        }
    }

    ngOnDestroy() {
        this.cardViewUpdateSub.unsubscribe();
        this.cardViewClickSub.unsubscribe();
    }

    setInvolvedPeople(): void {
        this.taskPeople = [];
        if (this.taskDetails.involvedPeople) {
            this.taskDetails.involvedPeople.forEach((user) => {
                this.taskPeople.push(<LightUserRepresentation>user);
            });
        }
    }

    hasTaskDetails(): boolean {
        return this.taskDetails && !!this.taskDetails.id;
    }

    onCurrentTab(tabIndex: number) {
        this.currentTab.emit(tabIndex);
    }

    getTaskHeaderViewClass() {
        return this.showAssignee ? 'assign-edit-view' : 'default-view';
    }

    searchUser(searchedWord: string) {
        this.peopleService.getWorkflowUsers(null, searchedWord)
            .subscribe((users) => {
                users = users.filter((user) => user.id !== (this.taskDetails.assignee && this.taskDetails.assignee.id));
                this.peopleSearchObserver.next(users);
            }, error => this.logService.error('Could not load users'));
    }

    assignTaskToUser(selectedUser: LightUserRepresentation) {
        this.changeAssignee.emit(selectedUser);
        this.showAssignee = false;
    }

    onCloseSearch() {
        this.showAssignee = false;
    }

    onClaim(): void {
        this.claim.emit();
    }

    private updateTaskDetails(updateNotification: UpdateNotification) {
        this.taskListService.updateTask(this.taskDetails.id, updateNotification.changed)
            .subscribe(
                () => {
                    this.updated.emit();
                }
            );
    }

    isCompletedTask(): boolean {
        return this.taskDetails && this.taskDetails.endDate !== undefined && this.taskDetails.endDate !== null;
    }

    hasProcessDefinitionId(): boolean {
        return !!this.taskDetails.processDefinitionId;
    }

    private clickTaskDetails(clickNotification: ClickNotification) {
        if (clickNotification.target.key === 'assignee') {
            this.showAssignee = true;
        }
        if (clickNotification.target.key === 'formName') {
            if (!this.isCompletedTask()) {
                this.showAttachForm();
            }
        }
        if (clickNotification.target.key === 'parentName' && clickNotification.target.value !== undefined) {
            this.onTaskDetailsClick(clickNotification);
        }
    }

    showAttachForm() {
        if (!this.hasProcessDefinitionId()) {
            const dialogRef = this.dialog.open(TaskFormDialogComponent, {
                data: {
                    taskId: this.taskDetails.id,
                    formKey: this.taskDetails.formKey
                },
                width: '80%',
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result && result.isYes()) {
                    this.formEdit.emit();
                    this.notify('DW-TASK-FORM.OPERATIONS.FORM-UPDATE');
                } else if (result && result.isNo()) {
                    dialogRef.close();
                } else if (result && result.isError()) {
                    this.notify('DW-TASK-FORM.OPERATIONS.FORM-ERROR');
                }
            });
        }
    }

    onTaskDetailsClick(clickNotification: ClickNotification) {
        const parentId = clickNotification.target.value.keys().next().value;
        this.router.navigate([`/processdetails/${this.appId}/${parentId}`]);
    }

    private notify(message: string): void {
        const translatedMessage = this.translateService.instant(message);
        this.notificationService.openSnackMessage(translatedMessage, 4000);
    }
}
