
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace QuizLibrary
{
    public class QuizRunController : ApiController
    {
        private QuizLibrary.QuizModelContainer db = new QuizLibrary.QuizModelContainer();

        public IQueryable<QuizRunDTO> GetQuizRuns(int pageSize = 10
                        ,System.Int32? UserId = null
                )
        {
            var model = db.QuizRuns.AsQueryable();
                                if(UserId != null){
                        model = model.Where(m=> m.UserId == UserId.Value);
                    }
                        
            return model.Select(QuizRunDTO.SELECT).Take(pageSize);
        }

        [ResponseType(typeof(QuizRunDTO))]
        public async Task<IHttpActionResult> GetQuizRun(int id)
        {
            var model = await db.QuizRuns.Select(QuizRunDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public async Task<IHttpActionResult> PutQuizRun(int id, QuizRun model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model.Id)
            {
                return BadRequest();
            }

            db.Entry(model).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizRunExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [ResponseType(typeof(QuizRunDTO))]
        public async Task<IHttpActionResult> PostQuizRun(QuizRun model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.QuizRuns.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.QuizRuns.Select(QuizRunDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(QuizRunDTO))]
        public async Task<IHttpActionResult> DeleteQuizRun(int id)
        {
            QuizRun model = await db.QuizRuns.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.QuizRuns.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.QuizRuns.Select(QuizRunDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return Ok(ret);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool QuizRunExists(int id)
        {
            return db.QuizRuns.Count(e => e.Id == id) > 0;
        }
    }
}