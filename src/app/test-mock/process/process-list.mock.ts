/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { FilterProcessRepresentationModel } from '@alfresco/adf-process-services';

export let fakeProcessFilters = {
    size: 1, total: 1, start: 0,
    data: [new FilterProcessRepresentationModel({
        'name': 'Running',
        'appId': '22',
        'id': 1001,
        'recent': true,
        'icon': 'glyphicon-random',
        'filter': {'sort': 'created-desc', 'name': '', 'state': 'running'}
    })]
};

export let fakeFilter = new FilterProcessRepresentationModel({
        'name': 'Running',
        'appId': '55',
        'id': '111',
        'recent': true,
        'icon': 'glyphicon-random',
        'filter': {'sort': 'created-desc', 'name': '', 'state': 'running'}
});


