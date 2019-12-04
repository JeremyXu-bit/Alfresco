/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { ProcessInstance } from '@alfresco/adf-process-services';

export let fakeTaskEvent = {
    'id': '91',
    'name': 'Request translation',
    'description': null,
    'category': null,
    'assignee': '',
    'created': '2016-11-03T15:25:42.749+0000',
    'dueDate': null,
    'endDate': null,
    'duration': null,
    'priority': 50,
    'parentTaskId': null,
    'parentTaskName': null,
    'processInstanceId': '86',
    'processInstanceName': null,
    'processDefinitionId': 'TranslationProcess:2:8',
    'processDefinitionName': 'Translation Process',
    'processDefinitionDescription': null,
    'processDefinitionKey': 'TranslationProcess',
    'processDefinitionCategory': 'http://www.activiti.org/processdef',
    'processDefinitionVersion': 2,
    'processDefinitionDeploymentId': '5',
    'formKey': '4',
    'processInstanceStartUserId': '1001',
    'initiatorCanCompleteTask': false,
    'adhocTaskCanBeReassigned': false,
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'executionId': '86',
    'involvedPeople': [],
    'memberOfCandidateUsers': false,
    'managerOfCandidateGroup': false,
    'memberOfCandidateGroup': false
};

export let fakeProcessInstance = new ProcessInstance({
    id: 1,
    name: 'Process 773443333',
    processDefinitionId: 'fakeprocess:5:7507',
    processDefinitionKey: 'fakeprocess',
    processDefinitionName: 'Fake Process Name',
    description: null, category: null,
    started: '2015-11-09T12:36:14.184+0000',
    startedBy: {
        id: 3, firstName: 'tenant2', lastName: 'tenantLastname', email: 'tenant2@tenant'
    },
    ended: '2016-11-09T12:36:14.184+0000'
});

export let fakeRunningProcessInstance = new ProcessInstance({
    id: 1,
    name: 'Process 773443333',
    processDefinitionId: 'fakeprocess:5:7507',
    processDefinitionKey: 'fakeprocess',
    processDefinitionName: 'Fake Process Name',
    description: null, category: null,
    started: '2015-11-09T12:36:14.184+0000',
    startedBy: {
        id: 3, firstName: 'tenant2', lastName: 'tenantLastname', email: 'tenant2@tenant'
    }
});

export let processInstanceMock = new ProcessInstance({
    'businessKey': '1',
    'ended': false,
    'graphicalNotationDefined': true,
    'id': '1',
    'name': 'fake ProcessName',
    'processDefinitionCategory': 'fake-defcatagory',
    'processDefinitionDeploymentId': 'fake-defdep',
    'processDefinitionDescription': 'fake-defdes',
    'processDefinitionId': 'fake-defid',
    'processDefinitionKey': 'fake-defkey',
    'processDefinitionName': 'fake-defname',
    'processDefinitionVersion': 1,
    'startFormDefined': true,
    'started': '2016-11-10T03:37:30.010+0000',
    'startedBy': {
        'id': 1001,
        'firstName': 'firstname',
        'lastName': 'lastname',
        'email': 'email.activiti.com'
    },
    'suspended': true,
    'tenantId': 'fake-tenantID',
    'variables': null
});

export let taskDetailsEventMock = {
    '_value': {},
    '_defaultPrevented': false
};

export let fakeprocessDefinitions = [
    new ProcessInstance({
        id: 1,
        name: 'Process 773443333',
        processDefinitionId: 'fakeprocess:5:7507',
        processDefinitionKey: 'fakeprocess',
        processDefinitionName: 'Fake Process Name',
        description: null, category: null,
        started: '2015-11-09T12:36:14.184+0000',
        startedBy: {
            id: 3, firstName: 'tenant2', lastName: 'tenantLastname', email: 'tenant2@tenant'
        },
        'ended': '2016-11-09T12:36:14.184+0000'
    }),
    new ProcessInstance({
        id: 1,
        name: 'Process 773443333',
        processDefinitionId: 'fakeprocess:5:7507',
        processDefinitionKey: 'fakeprocess',
        processDefinitionName: 'Fake Process Name',
        description: null, category: null,
        started: '2015-11-09T12:36:14.184+0000',
        startedBy: {
            id: 3, firstName: 'tenant2', lastName: 'tenantLastname', email: 'tenant2@tenant'
        },
        'ended': '2016-11-09T12:36:14.184+0000'
    })
];


export let fakeProcessInstances = {
    size: 2, total: 2, start: 0,
    data: [
        {
            id: '1', name: 'Process 773443333', businessKey: null,
            processDefinitionId: 'fakeprocess:5:7507',
            tenantId: 'tenant_1',
            started: '2015-11-09T12:36:14.184+0000',
            ended: null,
            startedBy: { id: 3, firstName: 'tenant2', lastName: 'tenantLastname', email: 'tenant2@tenant'},
            processDefinitionName: 'Fake Process Name',
            processDefinitionDescription: null,
            processDefinitionKey: 'fakeprocess',
            processDefinitionCategory: 'http://www.activiti.org/processdef',
            processDefinitionVersion: 1,
            processDefinitionDeploymentId: '2540',
            graphicalNotationDefined: true,
            startFormDefined: false,
            suspended: false,
            variables: []
        },
        {
            id: '2', name: 'Process 382927392', businessKey: null,
            processDefinitionId: 'fakeprocess:5:7507',
            tenantId: 'tenant_1',
            started: '2018-01-10T17:02:22.597+0000',
            ended: null,
            startedBy: { id: 3, firstName: 'tenant2', lastName: 'tenantLastname', email: 'tenant2@tenant' },
            processDefinitionName: 'Fake Process Name',
            processDefinitionDescription: null,
            processDefinitionKey: 'fakeprocess',
            processDefinitionCategory: 'http://www.activiti.org/processdef',
            processDefinitionVersion: 1,
            processDefinitionDeploymentId: '2540',
            graphicalNotationDefined: true,
            startFormDefined: false,
            suspended: false,
            variables: []
        }
    ]
};
