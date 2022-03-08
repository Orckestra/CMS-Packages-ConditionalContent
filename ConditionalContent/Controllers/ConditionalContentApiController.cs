using System.Linq;
using System.Web.Http;
using Composite.Core;
using Orckestra.Tools.ConditionalContent.Providers;
using Orckestra.Tools.ConditionalContent.Types.Config;

namespace Orckestra.Tools.ConditionalContent.Controllers
{
    [RoutePrefix("composite/api/conditionalcontent")]
    public class ConditionalContentApiController: ApiController
    {
        [Route("status")]
        [HttpGet]
        public IHttpActionResult Status()
        {
            return Ok(nameof(Ok));
        }

        [Route("fields")]
        [HttpGet]
        public IHttpActionResult GetFields()
        {
            var conditionProviders = ServiceLocator.GetServices<IConditionProvider>();

            return Ok(conditionProviders.ToDictionary(d => d.Name, d => new Field()
            {
                Label = d.Name,
                Type = "!struct",
                SubFields = d.GetFields()
            }));
        }

    }
}
