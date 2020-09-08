using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvoiceManagementSystem.Models;

namespace InvoiceManagementSystem.DatabaseContext
{
    public class InvoiceManagementDbContext : DbContext
    {
        public InvoiceManagementDbContext(DbContextOptions<InvoiceManagementDbContext> options) : base(options)
        {

        }
        public DbSet<PersonTest> PersonTest { get; set; }
    }
}
