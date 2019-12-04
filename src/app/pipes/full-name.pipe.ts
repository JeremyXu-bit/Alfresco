/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'fullName'})
export class FullNamePipe implements PipeTransform {
  transform(user: any): string {
    let fullName = '';
        if (user) {
            if (user.firstName) {
                fullName += user.firstName;
            }
            if (user.lastName) {
                fullName += fullName.length > 0 ? ' ' : '';
                fullName += user.lastName;
            }
        }
        return fullName;
  }
}
