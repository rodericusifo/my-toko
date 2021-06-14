import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { HomeComponent } from './admin-root/home/home.component';
import { UserComponent } from './admin-root/user/user.component';
import { BrandComponent } from './admin-root/brand/brand.component';
import { ProductComponent } from './admin-root/product/product.component';
import { ProfitLossComponent } from './admin-root/profit-loss/profit-loss.component';
import { PurchaseOrderComponent } from './admin-root/purchase-order/purchase-order.component';
import { DeliveryOrderComponent } from './admin-root/delivery-order/delivery-order.component';
import { InvoiceComponent } from './admin-root/invoice/invoice.component';
import { PayableComponent } from './admin-root/payable/payable.component';
import { ReceivableComponent } from './admin-root/receivable/receivable.component';
import { OrderComponent } from './admin-root/order/order.component';
import { JumbotronComponent } from './admin-root/home/jumbotron/jumbotron.component';
import { CardComponent } from './admin-root/home/card/card.component';
import { UserFormComponent } from './admin-root/user/user-form/user-form.component';
import { ShowUserComponent } from './admin-root/user/show-user/show-user.component';
import { ProductListComponent } from './admin-root/product/product-list/product-list.component';
import { UomComponent } from './admin-root/uom/uom.component';
import { ProductFormComponent } from './admin-root/product/product-form/product-form.component';
import { UomFormComponent } from './admin-root/uom/uom-form/uom-form.component';
import { BrandFormComponent } from './admin-root/brand/brand-form/brand-form.component';
import { BrandListComponent } from './admin-root/brand/brand-list/brand-list.component';
import { UomListComponent } from './admin-root/uom/uom-list/uom-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoFormComponent } from './admin-root/purchase-order/po-form/po-form.component';
import { SupplierComponent } from './admin-root/supplier/supplier.component';
import { SupplierFormComponent } from './admin-root/supplier/supplier-form/supplier-form.component';
import { SupplierListComponent } from './admin-root/supplier/supplier-list/supplier-list.component';
import { PoListComponent } from './admin-root/purchase-order/po-list/po-list.component';
import { PurchaseOrderSheetComponent } from './admin-root/purchase-order-sheet/purchase-order-sheet.component';
import { PoSheetFormComponent } from './admin-root/purchase-order-sheet/po-sheet-form/po-sheet-form.component';
import { DoFormComponent } from './admin-root/delivery-order/do-form/do-form.component';
import { DoListComponent } from './admin-root/delivery-order/do-list/do-list.component';
import { InvoiceFormComponent } from './admin-root/invoice/invoice-form/invoice-form.component';
import { InvoiceListComponent } from './admin-root/invoice/invoice-list/invoice-list.component';
import { OrderFormComponent } from './admin-root/order/order-form/order-form.component';
import { OrderListComponent } from './admin-root/order/order-list/order-list.component';
import { OrderSheetComponent } from './admin-root/order-sheet/order-sheet.component';
import { OrderSheetCardComponent } from './admin-root/order-sheet/order-sheet-card/order-sheet-card.component';
import { OrderReceiptComponent } from './admin-root/order-receipt/order-receipt.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AdminRootComponent,
    HomeComponent,
    UserComponent,
    BrandComponent,
    ProductComponent,
    ProfitLossComponent,
    PurchaseOrderComponent,
    DeliveryOrderComponent,
    InvoiceComponent,
    PayableComponent,
    ReceivableComponent,
    OrderComponent,
    JumbotronComponent,
    CardComponent,
    UserFormComponent,
    ShowUserComponent,
    ProductListComponent,
    UomComponent,
    ProductFormComponent,
    UomFormComponent,
    BrandFormComponent,
    BrandListComponent,
    UomListComponent,
    PoFormComponent,
    SupplierComponent,
    SupplierFormComponent,
    SupplierListComponent,
    PoListComponent,
    PurchaseOrderSheetComponent,
    PoSheetFormComponent,
    DoFormComponent,
    DoListComponent,
    InvoiceFormComponent,
    InvoiceListComponent,
    OrderFormComponent,
    OrderListComponent,
    OrderSheetComponent,
    OrderSheetCardComponent,
    OrderReceiptComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
})
export class AdminModule {}
