using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceManagementSystem.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public string InvoiceReference { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime DueDate { get; set; }
        public float AmountNet { get; set; }
        public float AmountTax { get; set; }
        public float AmountGross { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string FilePath { get; set; }
        public string FileBody { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

        public int PurchaseOrderId { get; set; }
        public PurchaseOrder PurchaseOrder { get; set; }

        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
    }

}
