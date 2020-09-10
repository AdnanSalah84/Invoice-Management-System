using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InvoiceManagementSystem.Data;
using InvoiceManagementSystem.Models;

namespace InvoiceManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NominalAccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NominalAccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/NominalAccount
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NominalAccount>>> GetNominalAccount()
        {
            return await _context.NominalAccount.ToListAsync();
        }

        // GET: api/NominalAccount/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NominalAccount>> GetNominalAccount(int id)
        {
            var nominalAccount = await _context.NominalAccount.FindAsync(id);

            if (nominalAccount == null)
            {
                return NotFound();
            }

            return nominalAccount;
        }

        // PUT: api/NominalAccount/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNominalAccount(int id, NominalAccount nominalAccount)
        {
            if (id != nominalAccount.NominalAccountId)
            {
                return BadRequest();
            }

            _context.Entry(nominalAccount).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NominalAccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/NominalAccount
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NominalAccount>> PostNominalAccount(NominalAccount nominalAccount)
        {
            _context.NominalAccount.Add(nominalAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNominalAccount", new { id = nominalAccount.NominalAccountId }, nominalAccount);
        }

        // DELETE: api/NominalAccount/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NominalAccount>> DeleteNominalAccount(int id)
        {
            var nominalAccount = await _context.NominalAccount.FindAsync(id);
            if (nominalAccount == null)
            {
                return NotFound();
            }

            _context.NominalAccount.Remove(nominalAccount);
            await _context.SaveChangesAsync();

            return nominalAccount;
        }

        private bool NominalAccountExists(int id)
        {
            return _context.NominalAccount.Any(e => e.NominalAccountId == id);
        }
    }
}
