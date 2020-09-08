using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InvoiceManagementSystem.DatabaseContext;
using InvoiceManagementSystem.Models;

namespace InvoiceManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonTestController : ControllerBase
    {
        private readonly InvoiceManagementDbContext _context;

        public PersonTestController(InvoiceManagementDbContext context)
        {
            _context = context;
        }

        // GET: api/PersonTest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonTest>>> GetPersonTest()
        {
            return await _context.PersonTest.ToListAsync();
        }

        // GET: api/PersonTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonTest>> GetPersonTest(int id)
        {
            var personTest = await _context.PersonTest.FindAsync(id);

            if (personTest == null)
            {
                return NotFound();
            }

            return personTest;
        }

        // PUT: api/PersonTest/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonTest(int id, PersonTest personTest)
        {
            if (id != personTest.PersonTestId)
            {
                return BadRequest();
            }

            _context.Entry(personTest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonTestExists(id))
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

        // POST: api/PersonTest
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PersonTest>> PostPersonTest(PersonTest personTest)
        {
            _context.PersonTest.Add(personTest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonTest", new { id = personTest.PersonTestId }, personTest);
        }

        // DELETE: api/PersonTest/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PersonTest>> DeletePersonTest(int id)
        {
            var personTest = await _context.PersonTest.FindAsync(id);
            if (personTest == null)
            {
                return NotFound();
            }

            _context.PersonTest.Remove(personTest);
            await _context.SaveChangesAsync();

            return personTest;
        }

        private bool PersonTestExists(int id)
        {
            return _context.PersonTest.Any(e => e.PersonTestId == id);
        }
    }
}
