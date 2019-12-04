/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    template: ''
})
export class DummyComponent {
}

export const MockAPWRoutes: Routes = [
    { path: 'login', component: DummyComponent },
    { path: 'settings', component: DummyComponent },
    { path: 'processdetails/:appId/:processInstanceId', component: DummyComponent },
    { path: 'taskdetails/:appId/:taskId', component: DummyComponent },
    {
        path: 'apps/:appId',
        component: DummyComponent,
        children: [
            { path: 'tasks/new', component: DummyComponent },
            { path: 'tasks/:taskFilterId', component: DummyComponent },
            { path: 'processes/new', component: DummyComponent },
            { path: 'processes/:processFilterId', component: DummyComponent },
            { path: 'dashboard/default', component: DummyComponent }
        ]
    },
    {
        path: 'apps',
        component: DummyComponent,
        children: [ { path: '', component: DummyComponent } ]
    },
    { path: '',   redirectTo: '/apps', pathMatch: 'full' }
];
