import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './admin-root/user/user.component';
import { HomeComponent } from './admin-root/home/home.component';
import { BrandComponent } from './admin-root/brand/brand.component';
import { ProductComponent } from './admin-root/product/product.component';
import { ProfitLossComponent } from './admin-root/profit-loss/profit-loss.component';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { ProductEffectivenessComponent } from './admin-root/product-effectiveness/product-effectiveness.component';
import { PurchaseOrderComponent } from './admin-root/purchase-order/purchase-order.component';
import { DeliveryOrderComponent } from './admin-root/delivery-order/delivery-order.component';
import { InvoiceComponent } from './admin-root/invoice/invoice.component';
import { PayableComponent } from './admin-root/payable/payable.component';
import { ReceivableComponent } from './admin-root/receivable/receivable.component';
import { OrderReceiptComponent } from './admin-root/order-receipt/order-receipt.component';
import { OrderComponent } from './admin-root/order/order.component';
import { UomComponent } from './admin-root/uom/uom.component';
import { SupplierComponent } from './admin-root/supplier/supplier.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRootComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'user', component: UserComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'product', component: ProductComponent },
      { path: 'supplier', component: SupplierComponent},
      { path: 'profit-loss', component: ProfitLossComponent},
      { path: 'product-effectiveness', component: ProductEffectivenessComponent},
      { path: 'purchase-order', component: PurchaseOrderComponent},
      { path: 'delivery-order', component: DeliveryOrderComponent},
      { path: 'invoice', component: InvoiceComponent},
      { path: 'payable', component: PayableComponent},
      { path: 'receivable', component: ReceivableComponent},
      { path: 'order', component: OrderComponent},
      { path: 'order-receipt', component: OrderReceiptComponent},
      { path: 'uom', component: UomComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
