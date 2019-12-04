/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { LightUserRepresentation } from '@alfresco/js-api';
import { TaskDetailsModel } from '@alfresco/adf-process-services';
import { ContentLinkModel} from '@alfresco/adf-core';

export let fakeUser = <LightUserRepresentation> ({'id': 1001, 'firstName': 'Admin', 'lastName': 'Paul', 'email': 'admin@app.activiti.com'});

export let firstInvolvedUser: LightUserRepresentation = <LightUserRepresentation> ({
    id: 1,
    email: 'fake-user1@fake.com',
    firstName: 'fakeName1',
    lastName: 'fakeLast1'
});

export let secondInvolvedUser: LightUserRepresentation = <LightUserRepresentation> {
    id: 2,
    email: 'fake-user2@fake.com',
    firstName: 'fakeName2',
    lastName: 'fakeLast2'
};

export let fakeUser1 = <LightUserRepresentation> { id: 1, email: 'fake-email@dom.com', firstName: 'firstName', lastName: 'lastName' };

export let fakeUser2 = <LightUserRepresentation> { id: 1001, email: 'some-one@somegroup.com', firstName: 'some', lastName: 'one' };

export let fakeUser3 = <LightUserRepresentation>
                        {'id': 1001, 'firstName': 'Admin', 'lastName': 'Paul', 'email': 'admin@app.activiti.com'};

export let taskDetailsMock = new TaskDetailsModel({
    'id': '91',
    'name': 'Request translation',
    'description': 'fake description',
    'category': null,
    'assignee': fakeUser3,
    'created': '2016-11-03T15:25:42.749+0000',
    'dueDate': '2016-11-03T15:25:42.749+0000',
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
    'initiatorCanCompleteTask': true,
    'adhocTaskCanBeReassigned': false,
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'executionId': '86',
    'involvedPeople': [fakeUser2, fakeUser3],
    'memberOfCandidateUsers': false,
    'managerOfCandidateGroup': false,
    'memberOfCandidateGroup': false
});

export let taskDetailsWithInvolvedPeopleMock = new TaskDetailsModel({
    'id': '91',
    'name': 'Request translation',
    'description': 'fake description',
    'category': null,
    'assignee': fakeUser3,
    'created': '2016-11-03T15:25:42.749+0000',
    'dueDate': '2016-11-03T15:25:42.749+0000',
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
    'initiatorCanCompleteTask': true,
    'adhocTaskCanBeReassigned': false,
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'executionId': '86',
    'involvedPeople': [fakeUser2, fakeUser3],
    'memberOfCandidateUsers': true,
    'managerOfCandidateGroup': true,
    'memberOfCandidateGroup': true
});

export let taskDetailsWithOutInvolvedPeopleMock = new TaskDetailsModel({
    'id': '91',
    'name': 'Request translation',
    'description': 'fake description',
    'category': null,
    'assignee': fakeUser3,
    'created': '2016-11-03T15:25:42.749+0000',
    'dueDate': '2016-11-03T15:25:42.749+0000',
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
    'initiatorCanCompleteTask': true,
    'adhocTaskCanBeReassigned': false,
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'executionId': '86',
    'involvedPeople': null,
    'memberOfCandidateUsers': false,
    'managerOfCandidateGroup': false,
    'memberOfCandidateGroup': false
});

export let taskDetailsWithOutFormMock = new TaskDetailsModel({
    'id': '91',
    'name': 'Request translation',
    'description': 'fake description',
    'category': null,
    'assignee': fakeUser3,
    'created': '2016-11-03T15:25:42.749+0000',
    'dueDate': '2016-11-03T15:25:42.749+0000',
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
    'formKey': null,
    'processInstanceStartUserId': '1001',
    'initiatorCanCompleteTask': false,
    'adhocTaskCanBeReassigned': false,
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'executionId': '86',
    'involvedPeople': [fakeUser2, fakeUser3],
    'memberOfCandidateUsers': false,
    'managerOfCandidateGroup': false,
    'memberOfCandidateGroup': false
});

export let completedTaskDetailsMock = new TaskDetailsModel({
    'id': '91',
    'name': 'Request translation',
    'description': 'fake description',
    'category': null,
    'assignee': fakeUser3,
    'created': '2016-11-03T15:25:42.749+0000',
    'dueDate': '2016-11-03T15:25:42.749+0000',
    'endDate': '2016-12-03T15:25:42.749+0000',
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
    'formKey': null,
    'processInstanceStartUserId': '1001',
    'initiatorCanCompleteTask': false,
    'adhocTaskCanBeReassigned': false,
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'executionId': '86',
    'involvedPeople': [fakeUser2, fakeUser3],
    'memberOfCandidateUsers': false,
    'managerOfCandidateGroup': false,
    'memberOfCandidateGroup': false
});

export let tasksMock = {
    data: [
        taskDetailsMock
    ]
};

export let noDataMock = {
    data: []
};

export let emptytaskDetails = {
    'id': '',
    'name': '',
    'description': null,
    'category': null,
    'assignee': {'id': 1001, 'firstName': '', 'lastName': '', 'email': ''},
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
    'processDefinitionKey': '',
    'processDefinitionCategory': 'http://www.activiti.org/processdef',
    'processDefinitionVersion': 2,
    'processDefinitionDeploymentId': '5',
    'formKey': null,
    'processInstanceStartUserId': '1001',
    'initiatorCanCompleteTask': false,
    'adhocTaskCanBeReassigned': false,
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'executionId': '',
    'involvedPeople': [],
    'memberOfCandidateUsers': false,
    'managerOfCandidateGroup': false,
    'memberOfCandidateGroup': false
};

export let contentLinkModelMock = new ContentLinkModel({
    id: 4004,
    name: 'FakeBlob.pdf',
    created: 1490354907883,
    createdBy: {
        id: 2,
        firstName: 'dasdas', 'lastName': 'dasads', 'email': 'administrator@admin.com'
    },
    relatedContent: false,
    contentAvailable: true,
    link: false,
    mimeType: 'application/pdf',
    simpleType: 'pdf',
    previewStatus: 'created',
    thumbnailStatus: 'created'
});


export let fakeTaskList = {
    size: 2, total: 2, start: 0,
    data: [
        {
            'id': '91',
            'name': 'Task-1',
            'description': 'fake description',
            'category': null,
            'assignee': fakeUser3,
            'created': '2016-11-03T15:25:42.749+0000',
            'dueDate': '2016-11-03T15:25:42.749+0000',
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
            'initiatorCanCompleteTask': true,
            'adhocTaskCanBeReassigned': false,
            'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
            'executionId': '86',
            'involvedPeople': [fakeUser2, fakeUser3],
            'memberOfCandidateUsers': false,
            'managerOfCandidateGroup': false,
            'memberOfCandidateGroup': false
        },
        {
            'id': '101',
            'name': 'Task-2',
            'description': 'fake description',
            'category': null,
            'assignee': fakeUser3,
            'created': '2016-11-03T15:25:42.749+0000',
            'dueDate': '2016-11-03T15:25:42.749+0000',
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
            'initiatorCanCompleteTask': true,
            'adhocTaskCanBeReassigned': false,
            'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
            'executionId': '86',
            'involvedPeople': [fakeUser2, fakeUser3],
            'memberOfCandidateUsers': false,
            'managerOfCandidateGroup': false,
            'memberOfCandidateGroup': false
        }
    ]
};


export let completedTaskDetailsWithOutProcessDefMock = new TaskDetailsModel({
    'id': '91',
    'name': 'Request translation',
    'description': 'fake description',
    'category': null,
    'assignee': fakeUser3,
    'created': '2016-11-03T15:25:42.749+0000',
    'dueDate': '2016-11-03T15:25:42.749+0000',
    'endDate': '2016-12-03T15:25:42.749+0000',
    'duration': null,
    'priority': 50,
    'parentTaskId': null,
    'parentTaskName': null,
    'processInstanceId': '86',
    'processInstanceName': null,
    'processDefinitionId': null,
    'processDefinitionName': 'Translation Process',
    'processDefinitionDescription': null,
    'processDefinitionKey': 'TranslationProcess',
    'processDefinitionCategory': 'http://www.activiti.org/processdef',
    'processDefinitionVersion': 2,
    'processDefinitionDeploymentId': '5',
    'formKey': null,
    'processInstanceStartUserId': '1001',
    'initiatorCanCompleteTask': false,
    'adhocTaskCanBeReassigned': false,
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'executionId': '86',
    'involvedPeople': [fakeUser2, fakeUser3],
    'memberOfCandidateUsers': false,
    'managerOfCandidateGroup': false,
    'memberOfCandidateGroup': false
});

export let taskDetailsWithOutProcessDefIdMock = new TaskDetailsModel({
    'id': '91',
    'name': 'Request translation',
    'description': 'fake description',
    'category': null,
    'assignee': fakeUser3,
    'created': '2016-11-03T15:25:42.749+0000',
    'dueDate': '2016-11-03T15:25:42.749+0000',
    'endDate': null,
    'duration': null,
    'priority': 50,
    'parentTaskId': null,
    'parentTaskName': null,
    'processInstanceId': '86',
    'processInstanceName': null,
    'processDefinitionId': null,
    'processDefinitionName': 'Translation Process',
    'processDefinitionDescription': null,
    'processDefinitionKey': 'TranslationProcess',
    'processDefinitionCategory': 'http://www.activiti.org/processdef',
    'processDefinitionVersion': 2,
    'processDefinitionDeploymentId': '5',
    'formKey': null,
    'processInstanceStartUserId': '1001',
    'initiatorCanCompleteTask': true,
    'adhocTaskCanBeReassigned': false,
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'executionId': '86',
    'involvedPeople': [fakeUser2, fakeUser3],
    'memberOfCandidateUsers': false,
    'managerOfCandidateGroup': false,
    'memberOfCandidateGroup': false
});
