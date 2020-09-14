using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceManagementSystem.Models
{
    public class Supplier
    {
        [Key]
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string SupplierCode { get; set; }
        public string SupplierDisabled { get; set; }

 
        //public NominalAccount NominalAccount { get; set; }


        //One to Many [Purchase Order to Invoices]
        public ICollection<Invoice> Invoices { get; set; }
    }
}
