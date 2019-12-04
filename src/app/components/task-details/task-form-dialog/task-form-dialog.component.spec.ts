/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormDialogComponent } from './task-form-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('TaskFormDialogComponent', () => {
  let component: TaskFormDialogComponent;
  let fixture: ComponentFixture<TaskFormDialogComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close'),
    open: jasmine.createSpy('open')
  };

  const mockDialogData = { taskId: 'mock-id', formKey: 'form-Key' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TaskFormDialogComponent', () => {
    expect(component instanceof TaskFormDialogComponent).toBeTruthy();
  });

  it('should get data from MAT_DIALOG_DATA as an input to the dialog', () => {
    const data = component.data;
    expect(data).toEqual(mockDialogData);
  });
});
