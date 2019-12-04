/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@alfresco/adf-core';
import { MatTableModule } from '@angular/material';
import { AboutComponent } from './about.component';
import { PackageListComponent } from './package-list/package-list.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule.forChild(),
    RouterModule.forChild(routes),
    MatTableModule
  ],
  declarations: [
    AboutComponent,
    PackageListComponent
  ]
})
export class AboutModule {}
