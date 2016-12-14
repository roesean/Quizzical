
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
	public class AnswerDTO
    {
		public System.Int32 Id { get; set; }
		public System.String Text { get; set; }
		public System.Int32 QuestionId { get; set; }
		public string Question_Text { get; set; }

        public static System.Linq.Expressions.Expression<Func< Answer,  AnswerDTO>> SELECT =
            x => new  AnswerDTO
            {
                Id = x.Id,
                Text = x.Text,
                QuestionId = x.QuestionId,
                Question_Text = x.Question.Text,
            };

	}
}