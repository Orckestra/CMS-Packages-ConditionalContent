using System;
using System.Configuration;
using Composite.Core;
using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;
using Orckestra.ExperienceManagement.PersonalizedContent;
using Orckestra.ExperienceManagement.WebComponentsV1;
using Orckestra.Tools.ConditionalContent.Providers;
using Orckestra.Tools.ConditionalContent.Services;

namespace Orckestra.Tools.ConditionalContent
{
    [ApplicationStartup]
    public class StartupHandler
    {
        public static void OnBeforeInitialize()
        {
        }

        public static void OnInitialized(IServiceProvider serviceProvider)
        {
            var service = (IWebComponentsManager)serviceProvider.GetService(typeof(IWebComponentsManager));

            service.RegisterCustomCallEditor(
                new CustomCallEditorParameters()
                {
                    FunctionName = "Orckestra.Tools.ConditionalContent",
                    WebComponentName = "oe-conditional-content",
                    Width = 1760,
                    Height = 990
                });

            var debugHost = ConfigurationManager.AppSettings["Orckestra.Tools.ConditionalContent.Debug.Host"];
            var debugPort = ConfigurationManager.AppSettings["Orckestra.Tools.ConditionalContent.Debug.Port"];

            if (debugHost != null && debugPort != null)
            {
                var debugPath = $"https://{debugHost}:{debugPort}";
                service.RegisterWebComponent(
                    new WebComponentParameters()
                    {
                        WebComponentName = "oe-conditional-content",
                        Scripts = new[]
                        {
                          $"{debugPath}/static/js/conditional-content.js",
                        },
                        Styles = new[]
                        {
                            "/Composite/InstalledPackages/Orckestra.Tools.C1CMSConsoleCss/index.css?v=1.0.1"
                        }
                    });
            }
            else
            {
                service.RegisterWebComponent(new WebComponentParameters
                {
                    WebComponentName = "oe-conditional-content",
                    Scripts = new[]
                    {
                        "/Composite/InstalledPackages/Orckestra.Tools.ConditionalContent/js/conditional-content.js"
                    },
                    Styles = new[]
                    {
                        "/Composite/InstalledPackages/Orckestra.Tools.C1CMSConsoleCss/index.css?v=1.0.1",
                        "/Composite/InstalledPackages/Orckestra.Tools.ConditionalContent/css/conditional-content.css",
                    }
                });
            }


        }

        public static void ConfigureServices(IServiceCollection collection)
        {
            Log.LogInformation(nameof(ConditionalContentService), $"Register {nameof(ConditionalContentService)}");
            collection.AddTransient<IConditionalContentService, ConditionalContentService>();


            var debugHost = ConfigurationManager.AppSettings["Orckestra.Tools.ConditionalContent.Debug.Host"];
            var debugPort = ConfigurationManager.AppSettings["Orckestra.Tools.ConditionalContent.Debug.Port"];

            if (debugHost != null && debugPort != null)
            {
                collection.AddTransient<IConditionProvider, DemoConditionProvider>();
            }
        }
    }
}
