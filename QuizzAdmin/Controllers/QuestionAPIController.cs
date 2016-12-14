
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
    public class QuestionController : ApiController
    {
        private QuizLibrary.QuizModelContainer db = new QuizLibrary.QuizModelContainer();

        public IQueryable<QuestionDTO> GetQuestions(System.Int32? QuizId = null
                )
        {
            var model = db.Questions.AsQueryable();
                                if(QuizId != null){
                        model = model.Where(m=> m.QuizId == QuizId.Value);
                    }
                        
            return model.Select(QuestionDTO.SELECT);
        }

        [ResponseType(typeof(QuestionDTO))]
        public async Task<IHttpActionResult> GetQuestion(int id)
        {
            var model = await db.Questions.Select(QuestionDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public async Task<IHttpActionResult> PutQuestion(int id, Question model)
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
                if (!QuestionExists(id))
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

        [ResponseType(typeof(QuestionDTO))]
        public async Task<IHttpActionResult> PostQuestion(Question model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Questions.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.Questions.Select(QuestionDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(QuestionDTO))]
        public async Task<IHttpActionResult> DeleteQuestion(int id)
        {
            Question model = await db.Questions.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Questions.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Questions.Select(QuestionDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool QuestionExists(int id)
        {
            return db.Questions.Count(e => e.Id == id) > 0;
        }
    }
}