using System.Collections.Generic;
using Orckestra.Tools.ConditionalContent.Types.Config;

namespace Orckestra.Tools.ConditionalContent.Providers
{
    public interface IConditionProvider
    {
        Dictionary<string, Field> GetFields();
        object GetData();

        string Name { get; }
    }
}
