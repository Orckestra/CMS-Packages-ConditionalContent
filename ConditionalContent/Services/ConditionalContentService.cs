using JsonLogic.Net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Orckestra.Tools.ConditionalContent.Providers;
using Orckestra.Tools.ConditionalContent.Services;
using System;
using System.Collections.Generic;
using System.Linq;

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
            var parameterJObject = JToken.Parse(parameters);
            ChangeDateToIntNodeValues(parameterJObject);

            var evaluator = new JsonLogicEvaluator(EvaluateOperators.Default);

            var usedProviders = GetUsedProviders(parameterJObject["groups"]);

            var dataToApply = ConditionProviders
                .Where(provider => usedProviders.Contains(provider.Name))
                .ToDictionary(provider => provider.Name, d => ChangeDateToIntObjectValues(d.GetData()));

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
        
        private object ChangeDateToIntObjectValues(object data)
        {
            var node = JToken.Parse(JsonConvert.SerializeObject(data));
            ChangeDateToIntNodeValues(node);
            return node.ToObject(typeof(object));
        }
        
        private void ChangeDateToIntNodeValues(JToken node)
        {
            if (node.Type == JTokenType.Object)
            {
                foreach (JProperty child in node.Children<JProperty>())
                {
                    ChangeDateToIntNodeValues(child.Value);
                }
            }
            else if (node.Type == JTokenType.Date)
            {
                var value = node.Value<DateTime>();
                if (node is JValue prop)
                {
                    prop.Value = value.Ticks;
                    node.Value<long>();
                }
            }
            else if (node.Type == JTokenType.Array)
            {
                foreach (var child in node.Children())
                {
                    ChangeDateToIntNodeValues(child);
                }
            }
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
