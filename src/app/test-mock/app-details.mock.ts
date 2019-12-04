/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

 import { AppDefinitionRepresentationModel,
    FilterProcessRepresentationModel} from '@alfresco/adf-process-services';


export let fakeTaskFilter = new FilterProcessRepresentationModel({
        'name': 'My Tasks',
        'appId': '55',
        'id': '111',
        'recent': true,
        'icon': 'glyphicon-random',
        'filter': {'sort': 'created-desc', 'name': '', 'state': 'running'}
});

export let fakeTaskFilters = {
    size: 1, total: 1, start: 0,
    data: [fakeTaskFilter]
};

export let fakeProcessFilter = new FilterProcessRepresentationModel({
        'name': 'Running',
        'appId': '55',
        'id': '65',
        'recent': true,
        'icon': 'glyphicon-random',
        'filter': {'sort': 'created-desc', 'name': '', 'state': 'running'}
    });

    export let defaultFakeProcessFilter = new FilterProcessRepresentationModel({
        'name': 'Running',
        'appId': 22,
        'id': 333,
        'recent': true,
        'icon': 'glyphicon-random',
        'filter': {'processDefinitionId': 12986, 'appDefinitionId': 123, 'sort': 'created-desc', 'name': '', 'state': 'running'}
    });

export let fakeEmptyFilters = {
    size: 0, total: 0, start: 0,
    data: []
};

export let fakeError = {
    message: null,
    messageKey: 'GENERAL.ERROR.FORBIDDEN'
};

export let fakeApp1 = new AppDefinitionRepresentationModel({
    deploymentId: 26,
    name: 'Expense processes',
    icon: 'expense-cloud',
    description: null,
    theme: 'theme-6',
    modelId: 4,
    id: 1
});

export let fakeApp2 = new AppDefinitionRepresentationModel({
    deploymentId: 2501,
    name: 'Claim app',
    icon: 'claim-asterisk',
    description: null,
    theme: 'theme-1',
    modelId: 1002,
    id: 1000
});

export let mockPdfData = atob(
    'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
    'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
    'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
    'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
    'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
    'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
    'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
    'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
    'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
    'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
    'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
    'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
    'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G');
