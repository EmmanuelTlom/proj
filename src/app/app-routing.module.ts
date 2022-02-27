import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './wow/address/address.component';
import { AppointmentComponent } from './wow/appointment/appointment.component';
import { BillingComponent } from './wow/billing/billing.component';
import { ConfirmationComponent } from './wow/confirmation/confirmation.component';
import { WowLoginComponent } from './wow/login/wow-login.component';
import { ProductsComponent } from './wow/products/products.component';
import { WowComponent } from './wow/wow.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: WowLoginComponent,
  // },
  {
    path: 'address',
    component: AddressComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
  },
  {
    path: 'billing',
    component: BillingComponent,
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
  },
  {
    path: 'wow',
    component: WowComponent,
  },
  {
    path: '**',
    redirectTo: '/address',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
