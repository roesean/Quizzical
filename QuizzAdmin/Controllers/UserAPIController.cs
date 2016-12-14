
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
    public class UserController : ApiController
    {
        private QuizLibrary.QuizModelContainer db = new QuizLibrary.QuizModelContainer();

        public IQueryable<User> GetUsers()
        {
          return db.Users;
        }

        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(string username, string password)
        {
            // Below is C# that will be converted into SQL with entity framework and LinqToSql 
            // u is a temp variable in the lambda expression
            User user = db.Users.Where(u => u.UserName == username && u.Password == password).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);

            /* 
             * example of query url that returns our user
             http://localhost:51275/api/users?username=test&password=test
            */
        }

        [ResponseType(typeof(UserDTO))]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            var model = await db.Users.Select(UserDTO.SELECT).FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        public async Task<IHttpActionResult> PutUser(int id, User model)
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
                if (!UserExists(id))
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

        [ResponseType(typeof(UserDTO))]
        //public async Task<IHttpActionResult> PostUser(User model)
        public IHttpActionResult PostUser(User model)
        {
            User user = db.Users.Where(u => u.UserName == model.UserName).FirstOrDefault();
            if (user == null)
            {
                //Does this username and password already exist
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Users.Add(model);
                db.SaveChanges();
                var ret = db.Users.Select(UserDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
                return CreatedAtRoute("DefaultApi", new { id = model.Id }, model);
            }

            return StatusCode(HttpStatusCode.NotAcceptable);
        }

        [ResponseType(typeof(UserDTO))]
        public async Task<IHttpActionResult> DeleteUser(int id)
        {
            User model = await db.Users.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            db.Users.Remove(model);
            await db.SaveChangesAsync();
            var ret = await db.Users.Select(UserDTO.SELECT).FirstOrDefaultAsync(x => x.Id == model.Id);
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

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}