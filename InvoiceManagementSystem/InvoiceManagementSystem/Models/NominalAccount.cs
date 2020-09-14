using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceManagementSystem.Models
{
    public class NominalAccount
    {
        [Key]
        public int NominalAccountId { get; set; }
        public string NominalAccountCode { get; set; }
        public string NominalAccountDisabled { get; set; }

        //One to Many [Nominal Account to Invoices]
        public ICollection<Invoice> Invoices { get; set; }

        //public Supplier Supplier { get; set; }
    }
}
