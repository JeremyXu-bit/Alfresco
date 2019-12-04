/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DialogContentModel } from './models/dialog-content.model';
import { DialogEvent } from '../../../models';


@Component({
    selector: 'apw-dialog-event',
    templateUrl: 'dialog-confirmation.component.html',
    encapsulation: ViewEncapsulation.None
  })
export class DialogConfirmationComponent {

  static DIALOG_ACTION;
  dialogContent: DialogContentModel;
  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>) { }
  onClick(key: any) {
    switch (key) {
      case DialogEvent.ACTION_SAVE:
        this.dialogRef.close(new DialogEvent(DialogEvent.ACTION_SAVE));
        break;
      case DialogEvent.ACTION_DISCARD:
        this.dialogRef.close(new DialogEvent(DialogEvent.ACTION_DISCARD));
        break;
      case DialogEvent.ACTION_YES:
        this.dialogRef.close(new DialogEvent(DialogEvent.ACTION_YES));
        break;
      case DialogEvent.ACTION_NO:
        this.dialogRef.close(new DialogEvent(DialogEvent.ACTION_NO));
        break;
    }
  }
}
