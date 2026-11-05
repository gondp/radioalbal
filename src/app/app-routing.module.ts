import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('./tab1/tab1.page').then(m => m.Tab1Page),
      },
      {
        path: 'directo',
        loadComponent: () => import('./directo/directo.page').then(m => m.DirectoPage),
      },
      {
        path: 'tab3',
        loadComponent: () => import('./tab3/tab3.page').then(m => m.Tab3Page),
      },
      { path: '', redirectTo: 'directo', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'directo', pathMatch: 'full' },
];
