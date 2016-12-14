
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
    public class QuizDTO
    {
        public System.Int32 Id { get; set; }
        public System.String Name { get; set; }
        public int Questions_Count { get; set; }
        public int QuizRuns_Count { get; set; }
        public ICollection<Question> Questions { get; set; }

        public static System.Linq.Expressions.Expression<Func<Quiz, QuizDTO>> SELECT =
            x => new QuizDTO
            {
                Id = x.Id,
                Name = x.Name,
                Questions_Count = x.Questions.Count(),
                QuizRuns_Count = x.QuizRuns.Count(),
                Questions = x.Questions,
            };

    }
}