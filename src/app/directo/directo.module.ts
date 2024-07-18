import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectoPage } from './directo.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DirectoPageRoutingModule } from './directo-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DirectoPageRoutingModule
  ],
  declarations: [DirectoPage]
})
export class DirectoPageModule {}
