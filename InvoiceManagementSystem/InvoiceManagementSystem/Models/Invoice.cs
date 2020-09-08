using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceManagementSystem.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public string ProductDescription { get; set; }
        public float UnitPrice { get; set; }
        public int Quantity { get; set; }
    }
}
