/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaQueryService } from '../src/app/services/media-query.service';

import {
  CoreModule,
  AppConfigService,
  AppConfigServiceMock,
  TranslationService,
  TranslationMock
} from '@alfresco/adf-core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AlfrescoApiService } from '@alfresco/adf-core';

import {
  MaterialModule
} from '../src/app/material.module';
import { MockAPWRoutes, DummyComponent } from '../src/app/test-mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

beforeEach(() => {
  getTestBed().configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        CommonModule,
        MaterialModule,
        RouterTestingModule.withRoutes(MockAPWRoutes),
        FlexLayoutModule,
        BrowserAnimationsModule
      ],
      declarations: [
        DummyComponent
      ],
      providers: [
        MediaQueryService,
        AlfrescoApiService,
          {provide: AppConfigService, useClass: AppConfigServiceMock},
          {provide: TranslationService, useClass: TranslationMock}
      ]
  });
});

afterEach(() => {
  getTestBed().resetTestingModule();
});
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
