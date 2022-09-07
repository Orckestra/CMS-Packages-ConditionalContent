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
        private IEnumerable<IConditionProvider> ConditionProviders { get; set; }

        public ConditionalContentService(IEnumerable<IConditionProvider> conditionProviders)
        {
            ConditionProviders = conditionProviders ?? throw new ArgumentNullException(nameof(conditionProviders));
        }

        public string GetContent(string parameters)
        {
            var parameterJObject = JObject.Parse(parameters);
            var evaluator = new JsonLogicEvaluator(EvaluateOperators.Default);

            var usedProviders = GetUsedProviders(parameterJObject["groups"]);

            var dataToApply = ConditionProviders
                .Where(provider => usedProviders.Contains(provider.Name))
                .ToDictionary(provider => provider.Name, d => d.GetData());

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

        private HashSet<string> GetUsedProviders(JToken data)
        {
            var providers = new HashSet<string>();

            void CrawlProviders(JToken j)
            {
                if (j is JProperty property && property.Name == "var")
                {
                    try
                    {
                        var providerName = ((JValue)property.Value).Value.ToString().Split('.').First();
                        providers.Add(providerName);
                    }
                    catch
                    {
                        // ignored
                    }
                }
                else
                {
                    foreach (var child in j.Children())
                    {
                        CrawlProviders(child);
                    }
                }
            }

            CrawlProviders(data);
            return providers;
        }
    }
}
