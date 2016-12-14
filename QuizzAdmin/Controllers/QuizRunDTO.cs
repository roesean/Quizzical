
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
	public class QuizRunDTO
    {
		public System.Int32 Id { get; set; }
		public System.Decimal Score { get; set; }
		public System.DateTime DateTaken { get; set; }
		public System.Int32 UserId { get; set; }
		public string User_UserName { get; set; }
		public string Quiz_Name { get; set; }

        public static System.Linq.Expressions.Expression<Func< QuizRun,  QuizRunDTO>> SELECT =
            x => new  QuizRunDTO
            {
                Id = x.Id,
                Score = x.Score,
                DateTaken = x.DateTaken,
                UserId = x.UserId,
                User_UserName = x.User.UserName,
                Quiz_Name = x.Quiz.Name,
            };

	}
}