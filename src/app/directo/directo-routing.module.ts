import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectoPage } from './directo.page';

const routes: Routes = [
  {
    path: '',
    component: DirectoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoPageRoutingModule {}
