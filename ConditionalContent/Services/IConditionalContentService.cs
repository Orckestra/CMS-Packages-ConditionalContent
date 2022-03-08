using System;
using System.Collections.Generic;

namespace Orckestra.Tools.ConditionalContent.Services
{
    public interface IConditionalContentService
    {
        string GetContent(string parameters);
    }
}