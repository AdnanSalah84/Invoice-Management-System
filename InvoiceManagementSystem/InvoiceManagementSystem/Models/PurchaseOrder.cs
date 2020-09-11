using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceManagementSystem.Models
{
    public class PurchaseOrder
    {
        [Key]
        public int PurchaseOrderId { get; set; }
        public string PurchaseOrderNumber { get; set; }
        public float PurchaseOrderAmountNet { get; set; }
        public float PurchaseOrderAmountTax { get; set; }
        public float PurchaseOrderAmountGross { get; set; }
        public string PurchaseOrderDisabled { get; set; }

        //One to Many [Purchase Order to Invoices]
        public ICollection<Invoice> Invoices { get; set; }
    }
}
