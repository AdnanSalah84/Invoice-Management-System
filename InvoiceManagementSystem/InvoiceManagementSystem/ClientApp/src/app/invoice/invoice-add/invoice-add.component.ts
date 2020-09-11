import { Component, OnInit } from "@angular/core";
import { SupplierService } from "../../supplier/supplier.service";
import { PurchaseOrderService } from "../../purchase-order/purchase-order.service";
import { NominalAccountService } from "../../nominal-account/nominal-account.service";

@Component({
  selector: "app-invoice-add",
  templateUrl: "./invoice-add.component.html",
  styleUrls: ["./invoice-add.component.css"],
})
export class InvoiceAddComponent implements OnInit {
  constructor(private supplierService: SupplierService, private purchaseOrderService: PurchaseOrderService, private nominalAccountService: NominalAccountService) { }

  ngOnInit() {
    this.supplierService.getSuppliers().subscribe(data => {
      console.log(data)
    })

    this.purchaseOrderService.getPurchaseOrders().subscribe(data => {
      console.log(data)
    })

    this.nominalAccountService.getNominalAccounts().subscribe(data => {
      console.log(data)
    })
  }
}
