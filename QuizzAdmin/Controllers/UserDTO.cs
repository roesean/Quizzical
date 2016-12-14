
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
	public class UserDTO
    {
		public System.Int32 Id { get; set; }
		public System.String UserName { get; set; }
		public System.String Password { get; set; }
		public System.Decimal AvgScore { get; set; }
		public System.Int16 TotalQuizzes { get; set; }
		public int QuizRuns_Count { get; set; }

        public static System.Linq.Expressions.Expression<Func< User,  UserDTO>> SELECT =
            x => new  UserDTO
            {
                Id = x.Id,
                UserName = x.UserName,
                Password = x.Password,
                AvgScore = x.AvgScore,
                TotalQuizzes = x.TotalQuizzes,
                QuizRuns_Count = x.QuizRuns.Count(),
            };

	}
}