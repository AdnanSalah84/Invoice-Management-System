using InvoiceManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceManagementSystem.Data
{
    public static class SeedData
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Supplier>().HasData(
                new Supplier { SupplierId = 1, SupplierName = "Hardware", SupplierCode = "9023tg", SupplierDisabled = "N" },
                new Supplier { SupplierId = 2, SupplierName = "Software", SupplierCode = "97tg", SupplierDisabled = "N" },
                new Supplier { SupplierId = 3, SupplierName = "Table", SupplierCode = "543tg", SupplierDisabled = "N" }
           );

            modelBuilder.Entity<NominalAccount>().HasData(
                new NominalAccount { NominalAccountId = 1, NominalAccountCode = "9887nc", NominalAccountDisabled = "N" },
                new NominalAccount { NominalAccountId = 2, NominalAccountCode = "87nc", NominalAccountDisabled = "N" },
                new NominalAccount { NominalAccountId = 3, NominalAccountCode = "80nc", NominalAccountDisabled = "N" }
           );

            modelBuilder.Entity<PurchaseOrder>().HasData(
                new PurchaseOrder { PurchaseOrderId = 1, PurchaseOrderNumber = "97po", PurchaseOrderAmountNet = 43.98f, PurchaseOrderAmountTax = 33.09f, PurchaseOrderAmountGross = 76.33f, PurchaseOrderDisabled = "N" },
                new PurchaseOrder { PurchaseOrderId = 2, PurchaseOrderNumber = "67po", PurchaseOrderAmountNet = 4.33f, PurchaseOrderAmountTax = 78.69f, PurchaseOrderAmountGross = 65.33f, PurchaseOrderDisabled = "N" },
                new PurchaseOrder { PurchaseOrderId = 3, PurchaseOrderNumber = "22po", PurchaseOrderAmountNet = 22.98f, PurchaseOrderAmountTax = 99.09f, PurchaseOrderAmountGross = 11.33f, PurchaseOrderDisabled = "N" }
            );

            modelBuilder.Entity<Invoice>().HasData(
                new Invoice { InvoiceId = 1, SupplierId = 1, NominalAccountId = 1, PurchaseOrderId = 1, InvoiceReference = "test3333", Description = "test 1234", Status = "Pending", AmountNet = 89.09f, AmountTax = 34.97f, AmountGross = 77.33f, IssueDate = DateTime.ParseExact("15/06/2015 13:45:00", "dd/MM/yyyy HH:mm:ss", null), DueDate = DateTime.ParseExact("15/06/2015 13:45:00", "dd/MM/yyyy HH:mm:ss", null), ModifiedBy = "John", ModifiedDate = DateTime.ParseExact("15/06/2015 13:45:00", "dd/MM/yyyy HH:mm:ss", null) }
            );
        }
    }
}
