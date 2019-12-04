/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FilterRepresentationModel, TaskFilterService } from '@alfresco/adf-process-services';
import { BpmUserService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'apw-create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateTaskComponent implements OnInit, OnDestroy {

    static selectedAppName = '';

    @Input()
    appId: string = null;

    sub: Subscription;
    defaultFilterId = '';
    involedFilterId = '';
    currentUserId: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private taskFilterService: TaskFilterService,
                private bpmUserService: BpmUserService) {
    }

    ngOnInit() {
        this.sub = this.route.parent.params.subscribe(params => {
            this.appId = params['appId'];
            this.getDefaultTaskFilter(this.getAppId());
            this.getInvolvedTaskFilter(this.getAppId());
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onStartTask(event: any): void {
        this.bpmUserService.getCurrentUserInfo().subscribe((res) => {
            this.currentUserId = res.id;
            if (this.isTaskAssignedToCurrentUser(event.assignee)) {
                this.redirectTo(this.defaultFilterId);
            } else {
                this.redirectTo(this.involedFilterId);
            }
        });
    }

    private isTaskAssignedToCurrentUser(assignee: any): boolean {
        return !assignee || assignee.id === this.currentUserId;
    }

    private redirectTo(filterId: any): void {
        this.router.navigateByUrl('apps/' + this.appId + '/tasks/' + filterId);
    }

    getAppId(): string {
        return +this.appId === 0 ? null : this.appId;
    }

    onStartTaskCancel(): void {
        this.router.navigateByUrl('apps/' + this.appId + '/tasks/' + this.defaultFilterId);
    }

    getDefaultTaskFilter(appId: string): void {
        this.taskFilterService.getTaskFilterByName('My Tasks', +appId).subscribe(
            (res: FilterRepresentationModel) => {
                this.defaultFilterId = res.id.toString();
            }
        );
    }

    getInvolvedTaskFilter(appId: string): void {
        this.taskFilterService.getTaskFilterByName('Involved Tasks', +appId).subscribe(
            (res: FilterRepresentationModel) => {
                this.involedFilterId = res.id.toString();
            }
        );
    }
}
