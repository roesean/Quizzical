
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
    public class AnswerController : ApiController
    {
        private QuizLibrary.QuizModelContainer db = new QuizLibrary.QuizModelContainer();

        public IQueryable<AnswerDTO> GetAnswers(System.Int32? QuestionId = null
                )
        {
            var model = db.Answers.AsQueryable();
                                if(QuestionId != null){
                        model = model.Where(m=> m.QuestionId == QuestionId.Value);
                    }
                        
            return model.Select(AnswerDTO.SELECT);
        }

        [ResponseType(typeof(AnswerDTO))]
        public async Task<IHttpActionResult> GetAnswer(int id)
        {
            var model = await db.Answers.Select(AnswerDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public async Task<IHttpActionResult> PutAnswer(int id, Answer model)
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
                if (!AnswerExists(id))
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

        [ResponseType(typeof(AnswerDTO))]
        public async Task<IHttpActionResult> PostAnswer(Answer model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Answers.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.Answers.Select(AnswerDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(AnswerDTO))]
        public async Task<IHttpActionResult> DeleteAnswer(int id)
        {
            Answer model = await db.Answers.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Answers.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Answers.Select(AnswerDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool AnswerExists(int id)
        {
            return db.Answers.Count(e => e.Id == id) > 0;
        }
    }
}