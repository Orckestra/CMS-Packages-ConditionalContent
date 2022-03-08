using System.Collections.Generic;
using Newtonsoft.Json;

namespace Orckestra.Tools.ConditionalContent.Types.Config
{
    /// <summary>
    /// See 
    /// </summary>
    public class Field
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("label")]
        public string Label { get; set; }

        [JsonProperty("subfields")]
        public Dictionary<string, Field> SubFields { get; set; }
    }
}
