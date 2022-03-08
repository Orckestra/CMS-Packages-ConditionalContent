using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core;
using JsonLogic.Net;
using Newtonsoft.Json.Linq;
using Orckestra.Tools.ConditionalContent.Providers;
using Orckestra.Tools.ConditionalContent.Services;

namespace Orckestra.ExperienceManagement.PersonalizedContent
{
    public class ConditionalContentService : IConditionalContentService
    {
        public string GetContent(string parameters)
        {
            var parameterJObject = JObject.Parse(parameters);
            var evaluator = new JsonLogicEvaluator(EvaluateOperators.Default);

            //TODO: call Lazy only on ask
            var conditionProviders = ServiceLocator.GetServices<IConditionProvider>();


            var dataToApply = conditionProviders.ToDictionary(d => d.Name, d => d.GetData());

            foreach (var group in parameterJObject["groups"])
            {
                var result = evaluator.Apply(group["query"], dataToApply);
                if (result is bool b && b)
                {
                    return (string)group["content"];
                }
            }

            return (string)parameterJObject["defaultContent"];
        }
    }
}
