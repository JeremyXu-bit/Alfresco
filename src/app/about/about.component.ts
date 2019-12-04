/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { name, version, dependencies, commit } from '../../../package.json';

@Component({
  selector: 'apw-about',
  templateUrl: './about.component.html',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'apa-about' }
})
export class AboutComponent implements OnInit {
  releaseVersion = version;
  githubUrlCommitSha = `https://github.com/Alfresco/${name}/commits/${commit}`;
  dependencyEntries: Array<{ name: string; version: string }>;
  constructor() {
  }

  ngOnInit() {
    this.dependencyEntries = Object.keys(dependencies).map( (key) => {
      return {
        name: key,
        version: dependencies[key]
      };
    });
  }
}
