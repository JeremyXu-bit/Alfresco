/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { FormFieldModel, FormModel } from '@alfresco/adf-core';

export let sameFakeFormValue = {
    'values': {
        'clientname': 'New Task',
        'policyno': 1235,
        'billamount': 998,
        'hospitalname': 'General Hospital'
    }
};

export let fakeForm = {
    id: 1001,
    name: 'ISSUE_FORM',
    values: {
        'clientname': 'New Task',
        'policyno': 1235,
        'billamount': 1000,
        'hospitalname': 'General Hospital'
    }
};

export let changedformModelMock = {
    'field': new FormFieldModel(new FormModel()),
    'form': fakeForm,
    'isDefaultPrevented': false
};

export let changedFakeFormValue = {
    'values': {
        'clientname': 'New Task',
        'policyno': 1235,
        'billamount': 1000,
        'hospitalname': 'General Hospital'
    }
};
