/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogEvent } from '../../../models';

@Component({
  selector: 'apw-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss']
})
export class TaskFormDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onCancel(): void {
    this.dialogRef.close(new DialogEvent(DialogEvent.ACTION_NO));
  }

  onSuccess(): void {
        this.dialogRef.close(new DialogEvent(DialogEvent.ACTION_YES));
  }

  onError() {
    this.dialogRef.close(new DialogEvent(DialogEvent.ERROR));
  }
}

