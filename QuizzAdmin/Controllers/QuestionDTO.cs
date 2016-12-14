
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
	public class QuestionDTO
    {
		public System.Int32 Id { get; set; }
		public System.String CorrectAnswer { get; set; }
		public System.String Text { get; set; }
		public System.Int32 QuizId { get; set; }
		public string Quiz_Name { get; set; }
		public int Answers_Count { get; set; }

        public static System.Linq.Expressions.Expression<Func< Question,  QuestionDTO>> SELECT =
            x => new  QuestionDTO
            {
                Id = x.Id,
                CorrectAnswer = x.CorrectAnswer,
                Text = x.Text,
                QuizId = x.QuizId,
                Quiz_Name = x.Quiz.Name,
                Answers_Count = x.Answers.Count(),
            };

	}
}