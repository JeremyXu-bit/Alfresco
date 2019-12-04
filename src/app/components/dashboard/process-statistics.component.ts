/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges, HostBinding, ViewEncapsulation } from '@angular/core';
import { forkJoin, of, Observable, Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AnalyticsService } from '@alfresco/adf-insights/';
import { ObjectDataTableAdapter, ObjectDataRow } from '@alfresco/adf-core';

@Component({
    selector: 'apw-process-statistics',
    templateUrl: './process-statistics.component.html',
    styleUrls: ['./process-statistics.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProcessStatisticsComponent implements OnInit, OnChanges, OnDestroy {

    private static PROCESS_OVERVIEW_REPORT = 'Process instances overview';

    @Input()
    reportQuery: any;

    private sub: Subscription;

    reportData: ObjectDataTableAdapter;

    showSpinner = false;

    @HostBinding('class.dw-container') true;

    constructor(private analyticsService: AnalyticsService) { }

    ngOnInit() {
        if (this.reportData === undefined) {
            this.reportData = new ObjectDataTableAdapter();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['reportQuery'] && changes['reportQuery'].currentValue) {
            this.reportQuery = changes['reportQuery'].currentValue;
            this.showSpinner = true;
            this.sub = this.getReportData().subscribe(data => {
                this.renderReport(data);
                this.showSpinner = false;
            },
            (err) => {
                this.renderReport();
                this.showSpinner = false;
            });
        }
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private renderReport(data?: any): void {
        let rows = [];
        if (data && data.datasets) {
            rows = data.datasets.map(obj => {
                return new ObjectDataRow(obj);
            });
        }
        this.reportData.setRows(rows);
    }

    private getReportData(): Observable<any> {
        return this.analyticsService.getReportByName(ProcessStatisticsComponent.PROCESS_OVERVIEW_REPORT)
            .pipe(switchMap(report => {
                if (!report) {
                    return this.createDefaultReports();
                } else {
                   return forkJoin(
                        this.getDataServices(report.id),
                        (dataActive: any, dataComplete: any) => {
                            const dataAll = Object.assign({}, this.mergeProcessDataSets(dataActive, dataComplete));
                            return dataAll;
                        });
                    }
                }
            ));
    }

    private createDefaultReports() {
        return this.analyticsService.createDefaultReports()
        .pipe(switchMap(() => this.getReportData()));
    }

    private getDataServices(reportId: number): Observable<any>[] {
        const dataServices = new Array(of({}), of({}));
        if (!this.isCompleteStatus()) {
            const reportQueryActive = Object.assign({}, this.reportQuery, { status: 'Active' });
            dataServices[0] = this.getReportService(reportId, reportQueryActive);
        }
        if (!this.isActiveStatus()) {
            const reportQueryComplete = Object.assign({}, this.reportQuery, { status: 'Complete' });
            const delay = this.isCompleteStatus() ? 0 : 100;
            dataServices[1] = timer(delay).pipe(switchMap(() => this.getReportService(reportId, reportQueryComplete)));
        }
        return dataServices;
    }

    private getReportService(reportId: number, reportQuery: any): Observable<any> {
        return this.analyticsService.getReportsByParams(reportId, reportQuery)
        .pipe(map((data: any[]) => data.filter(i => i.type === 'table')[0]));
    }

    private isActiveStatus(): boolean {
        return this.reportQuery && this.reportQuery.status === 'Active';
    }

    private isCompleteStatus(): boolean {
        return this.reportQuery && this.reportQuery.status === 'Complete';
    }

    private mergeProcessDataSets(dataActive: any, dataComplete: any): any {
        let dataSet;
        if (dataActive.datasets && dataActive.datasets.length > 0 &&
            dataComplete.datasets && dataComplete.datasets.length > 0) {
            dataActive.datasets.forEach(element => {
                let index = this.getActivityIndex(dataComplete, element[0]);
                if (index < 0) {
                    dataComplete.datasets.push(element);
                    index = dataComplete.datasets.length - 1;
                    if (dataComplete.datasets[index].length === 7) {
                        dataComplete.datasets[index].unshift(...new Array(7));
                        dataComplete.datasets[index][0] = dataComplete.datasets[index][7];
                    }
                }
                dataComplete.datasets[index].push(...element);
                dataSet = dataComplete;
            });

        } else if (dataActive.datasets && dataActive.datasets.length > 0) {
            dataActive.datasets.forEach(element => {
                element.unshift(...new Array(7));
                element[0] = element[7];
            });
            dataSet = dataActive;
        } else {
            dataSet = dataComplete;
        }
        return dataSet;
    }

    private getActivityIndex(dataSet: any, activity: string): number {
        let index = -1;
        dataSet.datasets.forEach((element, i) => {
            if (element[0] === activity) {
                index = i;
            }
        });
        return index;
    }

    getDashboardClass(): string {
        let cssClass = '';
        if (this.isActiveStatus()) {
            cssClass = 'dw-active-report';
        } else if (this.isCompleteStatus()) {
            cssClass = 'dw-complete-report';
        }
        return cssClass;
    }
}
