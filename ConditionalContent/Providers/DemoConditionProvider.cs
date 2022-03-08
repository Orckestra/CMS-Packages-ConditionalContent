using System.Collections.Generic;
using Orckestra.Tools.ConditionalContent.Types.Config;

namespace Orckestra.Tools.ConditionalContent.Providers
{
    public class DemoConditionProvider : IConditionProvider
    {
        public object GetData()
        {
            return new
            {
                IsGuest = true
            };
        }

        public Dictionary<string, Field> GetFields()
        {
            return new Dictionary<string, Field>()
            {
                {
                    "IsGuest",
                    new Field()
                    {
                        Label = "Is Guest",
                        Type = "boolean"
                    }
                }
            };
        }

        public string Name => "Demo";
    }
}
