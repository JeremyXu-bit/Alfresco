/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import {
    OnInit, OnDestroy, Component, Input, ViewChild, ViewEncapsulation, HostBinding
} from '@angular/core';
import { LightUserRepresentation } from '@alfresco/js-api';
import { ClickNotification,
    LogService,
    PeopleProcessService,
    FormService } from '@alfresco/adf-core';
import {
    TaskListService,
    TaskFilterService,
    FilterRepresentationModel,
    TaskDetailsModel
} from '@alfresco/adf-process-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';

import { TaskListPaginatorComponent } from './tasklist-paginator.component';
import { MediaQueryService } from '../../services/media-query.service';
import { ApplicationContentStateService } from '../../services/application-content-state.service';

@Component({
    selector: 'apw-tasklist-container',
    templateUrl: './tasklist-container.component.html',
    styleUrls: ['./tasklist-container.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TaskListContainerComponent implements OnInit, OnDestroy {

    static ACTION_INFO = 'Info';

    @HostBinding('class.dw-container') true;

    @ViewChild('tasklistPaginator')
    taskListPaginatorComponent: TaskListPaginatorComponent;

    @Input()
    appId: number;

    @Input()
    filterId: number;

    currentTaskId: string;
    taskSchemaColumns: any[] = [];
    taskFilter: FilterRepresentationModel;
    showSidebar = false;

    taskDetails: TaskDetailsModel;
    taskFormName: string = null;

    taskPeople: LightUserRepresentation[] = [];
    readOnlyForm = false;
    showAssignee = false;
    taskContent$: Observable<boolean>;
    mobile: boolean;
    private peopleSearchObserver: Observer<LightUserRepresentation[]>;
    peopleSearch$: Observable<LightUserRepresentation[]>;

    sub: Subscription;

    constructor(private route: ActivatedRoute,
                private mediaQuery: MediaQueryService,
                private activitiForm: FormService,
                private router: Router,
                private logService: LogService,
                private tasklistService: TaskListService,
                private taskFilterService: TaskFilterService,
                private peopleService: PeopleProcessService,
                private applicationContentStateService: ApplicationContentStateService) {
                this.peopleSearch$ = new Observable<LightUserRepresentation[]>(observer => this.peopleSearchObserver = observer).pipe(share());

    }

    ngOnInit() {
        this.mediaQuery.mobile$.subscribe( (isMobile) => {
            this.mobile = isMobile;
        });
        this.sub = this.route.parent.params.subscribe(params => {
            this.appId = +params['appId'];
        });

        this.sub = this.route.params.subscribe(params => {
            this.filterId = +params['taskFilterId'];

            this.taskFilter = null;
            this.currentTaskId = null;

            if (this.filterId) {
                this.getTaskFilterByFilterId(this.filterId, this.getAppId());
            }
        });
        this.taskContent$ = this.applicationContentStateService.taskContent$;
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    reloadTask() {
        this.taskListPaginatorComponent.reloadTask();
    }

    private getAppId(): number {
        return +this.appId === 0 ? null : this.appId;
    }

    private loadDetails(taskId: string) {
        this.taskPeople = [];
        this.taskFormName = null;
        if (taskId) {
            this.tasklistService.getTaskDetails(taskId).subscribe(
                (res: TaskDetailsModel) => {
                    this.taskDetails = res;
                    if (!this.taskDetails.name) {
                        this.taskDetails.name = 'No name';
                    }

                    if (!!this.taskDetails.formKey) {
                        this.getTaskForm(taskId);
                    }

                    const endDate: any = this.taskDetails.endDate;
                    this.readOnlyForm = !!(endDate && !isNaN(endDate.getTime()));

                    if (this.taskDetails && this.taskDetails.involvedPeople) {
                        this.taskDetails.involvedPeople.forEach((user) => {
                            this.taskPeople.push(<LightUserRepresentation>user);
                        });
                    }
                });
        }
    }

    hasTaskDetails() {
        return (this.taskDetails !== undefined && this.taskDetails !== null);
    }

    onFormEdit(): void {
        this.loadDetails(this.currentTaskId);
    }

    getTaskForm(taskId: string) {
        this.activitiForm.getTaskForm(taskId).subscribe(
            (res) => {
                this.taskFormName = res.name;
            }
        );
    }

    searchUser(searchedWord: string) {
        this.peopleService.getWorkflowUsers(null, searchedWord)
            .subscribe((users) => {
                users = users.filter((user) => user.id !== this.taskDetails.assignee.id);
                this.peopleSearchObserver.next(users);
            },         error => this.logService.error('Could not load users'));
    }

    assignTaskToUser(selectedUser: LightUserRepresentation) {
        this.tasklistService.assignTask(this.taskDetails.id, selectedUser).subscribe(
            (res: any) => {
                this.logService.info('Task Assigned to ' + selectedUser.email);
                this.reloadTask();
            });
        this.currentTaskId = null;
        this.showAssignee = false;
    }

    onCloseSearch() {
        this.showAssignee = false;
        this.logService.info(this.taskDetails.assignee);
    }

    getTaskHeaderViewClass() {
        return this.showAssignee ? 'assign-edit-view' : 'default-view';
    }

    getTaskFilterByFilterId(filterId: number, appId: number) {
        this.taskFilterService.getTaskFilterById(filterId, appId).subscribe(
            (res: FilterRepresentationModel) => {
                this.taskFilter = res;
            });
    }

    onSuccessTaskList(currentTaskId: any) {
        this.currentTaskId = currentTaskId;
        if (this.currentTaskId === undefined || this.currentTaskId === null) {
            this.showSidebar = false;
        } else {
            this.loadDetails(this.currentTaskId);
        }
    }

    onTaskRowClick(event: any) {
        const task = event.detail.value.obj;
        if (this.mobile) {
            this.currentTaskId = task.id;
            this.openTaskForm();
        } else {
            if (this.isCurrentTask(task.id) && this.isTaskDetailShown()) {
                this.showSidebar = false;
            } else {
                this.showSidebar = true;
                this.currentTaskId = task.id;
                this.showAssignee = false;
                this.loadDetails(this.currentTaskId);
            }
        }
    }

    onTaskRowDoubleCLick(event: any) {
        const task = event.detail.value.obj;
        this.currentTaskId = task.id;
        this.openTaskForm();
    }

    isCurrentTask(id: any) {
        return this.currentTaskId === id ? true : false;
    }

    isTaskDetailShown() {
        return this.showSidebar;
    }


    closeTaskDetailsLayout() {
        this.showSidebar = false;
    }

    openTaskForm() {
        this.router.navigate(['/taskdetails/', this.appId, this.currentTaskId]);
    }

    onTaskDetailsClick(clickNotification: ClickNotification) {
        const parentId = clickNotification.target.value.keys().next().value;
        this.router.navigate(['/processdetails/', this.appId, parentId]);
    }

    onClaim(): void {
        this.showSidebar = false;
        this.reloadTask();
    }

    toggleInfoDrawer() {
        this.showSidebar = !this.showSidebar;
    }

    getBreadcrumbActionName(): string {
        return this.showSidebar ? TaskListContainerComponent.ACTION_INFO : '';
    }
}
