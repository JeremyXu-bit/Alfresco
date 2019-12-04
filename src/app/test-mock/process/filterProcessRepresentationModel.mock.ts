/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { ProcessInstanceFilterRepresentation } from '@alfresco/js-api';

export let fakeProcessFilterParamRepresentationModel = <ProcessInstanceFilterRepresentation>{
    state: 'fake-state',
    sort: 'fake-sort'
};
export let fakeFilterProcessRepresentationModel = <ProcessInstanceFilterRepresentation>{
    id: 10,
    appId: 101,
    name: 'fake-name',
    recent: true,
    icon: 'fake-icon',
    filter: fakeProcessFilterParamRepresentationModel,
    index: 1
};
