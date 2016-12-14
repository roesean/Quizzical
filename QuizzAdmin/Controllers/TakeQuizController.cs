using System.Web.Mvc;

namespace BasicScaffolder
{
    public class takeQuizController: Controller
    {
        protected override void HandleUnknownAction(string actionName)
        {
            this.View(actionName).ExecuteResult(this.ControllerContext);
        }
    }
}