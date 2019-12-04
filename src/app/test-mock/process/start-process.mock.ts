/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { ProcessInstance,
    ProcessDefinitionRepresentation } from '@alfresco/adf-process-services';

export let newProcess = new ProcessInstance({
    id: '32323',
    name: 'Process'
});

export let fakeProcessDefs = [new ProcessDefinitionRepresentation({
    id: 'my:process1',
    name: 'My Process 1',
    hasStartForm: false
}), new ProcessDefinitionRepresentation({
    id: 'my:process2',
    name: 'My Process 2',
    hasStartForm: false
})];

export let fakeProcessDefWithForm = [new ProcessDefinitionRepresentation({
    id: 'my:process1',
    name: 'My Process 1',
    hasStartForm: true
})];

export let taskFormMock = {
    'id': 4,
    'name': 'Translation request',
    'processDefinitionId': 'TranslationProcess:2:8',
    'processDefinitionName': 'Translation Process',
    'processDefinitionKey': 'TranslationProcess',
    'taskId': '91',
    'taskName': 'Request translation',
    'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
    'tabs': [],
    'fields': [{
        'fieldType': 'ContainerRepresentation',
        'id': '1478093984155',
        'name': 'Label',
        'type': 'container',
        'value': null,
        'required': false,
        'readOnly': false,
        'overrideId': false,
        'colspan': 1,
        'placeholder': null,
        'minLength': 0,
        'maxLength': 0,
        'minValue': null,
        'maxValue': null,
        'regexPattern': null,
        'optionType': null,
        'hasEmptyValue': null,
        'options': null,
        'restUrl': null,
        'restResponsePath': null,
        'restIdProperty': null,
        'restLabelProperty': null,
        'tab': null,
        'className': null,
        'dateDisplayFormat': null,
        'layout': null,
        'sizeX': 2,
        'sizeY': 1,
        'row': -1,
        'col': -1,
        'visibilityCondition': null,
        'numberOfColumns': 2,
        'fields': {
            '1': [{
                'fieldType': 'AttachFileFieldRepresentation',
                'id': 'originalcontent',
                'name': 'Original content',
                'type': 'upload',
                'value': [],
                'required': true,
                'readOnly': false,
                'overrideId': false,
                'colspan': 1,
                'placeholder': null,
                'minLength': 0,
                'maxLength': 0,
                'minValue': null,
                'maxValue': null,
                'regexPattern': null,
                'optionType': null,
                'hasEmptyValue': null,
                'options': null,
                'restUrl': null,
                'restResponsePath': null,
                'restIdProperty': null,
                'restLabelProperty': null,
                'tab': null,
                'className': null,
                'params': {
                },
                'dateDisplayFormat': null,
                'layout': {'row': -1, 'column': -1, 'colspan': 1},
                'sizeX': 1,
                'sizeY': 1,
                'row': -1,
                'col': -1,
                'visibilityCondition': null,
                'metaDataColumnDefinitions': []
            }],
            '2': [{
                'fieldType': 'RestFieldRepresentation',
                'id': 'language',
                'name': 'Language',
                'type': 'dropdown',
                'value': 'Choose one...',
                'required': true,
                'readOnly': false,
                'overrideId': false,
                'colspan': 1,
                'placeholder': null,
                'minLength': 0,
                'maxLength': 0,
                'minValue': null,
                'maxValue': null,
                'regexPattern': null,
                'optionType': null,
                'hasEmptyValue': true,
                'options': [{'id': 'empty', 'name': 'Choose one...'}, {'id': 'fr', 'name': 'French'}, {
                    'id': 'de',
                    'name': 'German'
                }, {'id': 'es', 'name': 'Spanish'}],
                'restUrl': null,
                'restResponsePath': null,
                'restIdProperty': null,
                'restLabelProperty': null,
                'tab': null,
                'className': null,
                'params': {'existingColspan': 1, 'maxColspan': 1},
                'dateDisplayFormat': null,
                'layout': {'row': -1, 'column': -1, 'colspan': 1},
                'sizeX': 1,
                'sizeY': 1,
                'row': -1,
                'col': -1,
                'visibilityCondition': null,
                'endpoint': null,
                'requestHeaders': null
            }]
        }
    }],
    'outcomes': [],
    'javascriptEvents': [],
    'className': '',
    'style': '',
    'customFieldTemplates': {},
    'metadata': {},
    'variables': [],
    'gridsterForm': false,
    'globalDateFormat': 'D-M-YYYY'
};
