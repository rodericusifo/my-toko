import { environment } from './../../environments/environment';
import { AuthGuardRoleService } from './../services/auth-guard-role.service';
import { PurchaseOrderSheetComponent } from './admin-root/purchase-order-sheet/purchase-order-sheet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './admin-root/user/user.component';
import { HomeComponent } from './admin-root/home/home.component';
import { BrandComponent } from './admin-root/brand/brand.component';
import { ProductComponent } from './admin-root/product/product.component';
import { ProfitLossComponent } from './admin-root/profit-loss/profit-loss.component';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { PurchaseOrderComponent } from './admin-root/purchase-order/purchase-order.component';
import { DeliveryOrderComponent } from './admin-root/delivery-order/delivery-order.component';
import { InvoiceComponent } from './admin-root/invoice/invoice.component';
import { PayableComponent } from './admin-root/payable/payable.component';
import { ReceivableComponent } from './admin-root/receivable/receivable.component';
import { OrderComponent } from './admin-root/order/order.component';
import { UomComponent } from './admin-root/uom/uom.component';
import { SupplierComponent } from './admin-root/supplier/supplier.component';
import { OrderSheetComponent } from './admin-root/order-sheet/order-sheet.component';
import { OrderReceiptComponent } from './admin-root/order-receipt/order-receipt.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRootComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      {
        path: 'user',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.O },
        component: UserComponent,
      },
      {
        path: 'profit-loss',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.O },
        component: ProfitLossComponent,
      },
      {
        path: 'brand',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OI },
        component: BrandComponent,
      },
      {
        path: 'product',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OI },
        component: ProductComponent,
      },
      {
        path: 'uom',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OI },
        component: UomComponent,
      },
      {
        path: 'supplier',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OI },
        component: SupplierComponent,
      },
      {
        path: 'purchase-order',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OI },
        component: PurchaseOrderComponent,
      },
      {
        path: 'purchase-order/:purchaseOrderID',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OI },
        component: PurchaseOrderSheetComponent,
      },
      {
        path: 'delivery-order',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OI },
        component: DeliveryOrderComponent,
      },
      {
        path: 'invoice',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OF },
        component: InvoiceComponent,
      },
      {
        path: 'payable',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OF },
        component: PayableComponent,
      },
      {
        path: 'receivable',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OF },
        component: ReceivableComponent,
      },
      {
        path: 'order',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OC },
        component: OrderComponent,
      },
      {
        path: 'order/:orderID',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OC },
        component: OrderSheetComponent,
      },
      {
        path: 'order/:orderID/receipt',
        canActivate: [AuthGuardRoleService],
        data: { roles: environment.AUTH_ROLES.OC },
        component: OrderReceiptComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
