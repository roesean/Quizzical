
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


    public class QuizController : ApiController
    {
        private QuizLibrary.QuizModelContainer db = new QuizLibrary.QuizModelContainer();

        public IQueryable<QuizDTO> GetQuizs()
        {
            var model = db.Quizs.AsQueryable();
                        
            return model.Select(QuizDTO.SELECT);
        }

        [ResponseType(typeof(QuizDTO))]
        public async Task<IHttpActionResult> GetQuiz(int id)
        {
            var model = await db.Quizs.Select(QuizDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public async Task<IHttpActionResult> PutQuiz(int id, Quiz model)
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
                if (!QuizExists(id))
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

        [ResponseType(typeof(QuizDTO))]
        public async Task<IHttpActionResult> PostQuiz(Quiz model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Quizs.Add(model);
            await db.SaveChangesAsync();
            var ret = await db.Quizs.Select(QuizDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
            return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
        }

        [ResponseType(typeof(QuizDTO))]
        public async Task<IHttpActionResult> DeleteQuiz(int id)
        {
            Quiz model = await db.Quizs.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Quizs.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Quizs.Select(QuizDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool QuizExists(int id)
        {
            return db.Quizs.Count(e => e.Id == id) > 0;
        }
    }
}