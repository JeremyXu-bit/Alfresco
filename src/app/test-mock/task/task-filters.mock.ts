/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { FilterRepresentationModel } from '@alfresco/adf-process-services';

export let fakeGlobalFilter = [];

fakeGlobalFilter.push(new FilterRepresentationModel({
    name: 'FakeInvolvedTasks',
    id: 10,
    filter: { state: 'open', assignment: 'fake-involved' }
}));

fakeGlobalFilter.push(new FilterRepresentationModel({
    name: 'FakeMyTasks1',
    id: 11,
    filter: { state: 'open', assignment: 'fake-assignee' }
}));

fakeGlobalFilter.push(new FilterRepresentationModel({
    name: 'FakeMyTasks2',
    id: 12,
    filter: { state: 'open', assignment: 'fake-assignee' }
}));

export let fakeTaskDefaultFilter  = <FilterRepresentationModel>{
    id: 1,
    appId: 101,
    name: 'FakeMyTasks',
    recent: true,
    icon: 'fake-icon',
    filter: null,
    index: 1
};
