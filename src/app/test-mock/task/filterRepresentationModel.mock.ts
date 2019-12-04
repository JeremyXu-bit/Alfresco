/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { FilterRepresentationModel, ProcessFilterParamRepresentationModel } from '@alfresco/adf-process-services';

export let fakeFilterParamRepresentationModel = <ProcessFilterParamRepresentationModel>{
    processDefinitionId: 'fake-processDefinitionId',
    processDefinitionKey: 'fake-processDefinitionKey',
    name: 'fake-name',
    state: 'fake-state',
    sort: 'fake-sort',
    assignment: 'fake-assignment',
    dueAfter: null,
    dueBefore: null
};

export let fakeFilterRepresentationModel  = <FilterRepresentationModel>{
    id: 1,
    appId: 101,
    name: 'fake-name',
    recent: true,
    icon: 'fake-icon',
    filter: fakeFilterParamRepresentationModel,
    index: 1
};
