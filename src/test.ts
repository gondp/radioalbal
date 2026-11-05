// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { addIcons } from 'ionicons';
import { pauseOutline, playOutline, radio } from 'ionicons/icons';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
platformBrowserDynamicTesting(),
);

addIcons({ pauseOutline, playOutline, radio });
