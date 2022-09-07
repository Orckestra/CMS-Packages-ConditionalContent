using System;
using System.Collections.Generic;
using FluentAssertions;
using Moq;
using Moq.AutoMock;
using NUnit.Framework;
using Orckestra.ExperienceManagement.PersonalizedContent;
using Orckestra.Tools.ConditionalContent.Providers;
using Orckestra.Tools.ConditionalContent.Types.Config;

namespace ConditionalContent.Tests.Services
{
    [TestFixture()]
    public class ConditionalContentServiceTests
    {
        public AutoMocker Container { get; set; }


        [SetUp]
        public void SetUp()
        {
            Container = new AutoMocker();

            //Container.CreateInstance()
        }

        public static string DefaultContent = "Default Content";
        public static string IsGuestContent = "Is Guest Content";

        public string GetQuery =  $@"{{
  ""groups"": [
    {{
      ""content"": ""{IsGuestContent}"",
      ""query"": {{
        ""and"": [
          {{
            ""=="": [
              {{
                ""var"": ""Test1.isGuest""
              }},
              true
            ]
          }}
        ]
      }}
    }}
  ],
  ""defaultContent"": ""{DefaultContent}""
}}";


        [Test()]
        public void WHEN_Providers_IS_NOT_used_in_query_THEN_SHOULD_get_data()
        {
            // Arrange
            var conditionProvider1 = new Mock<IConditionProvider>();
            conditionProvider1.Setup(d => d.Name).Returns("Test1");
            conditionProvider1.Setup(d => d.GetData()).Returns(new { isGuest = true});
            var conditionProvider2 = new Mock<IConditionProvider>();
            conditionProvider2.Setup(d => d.Name).Returns("Test2");
            conditionProvider2.Setup(d => d.GetData()).Returns(new { isGuest = false });

            var query = GetQuery;

            var sut = new ConditionalContentService(new List<IConditionProvider>() { conditionProvider1.Object, conditionProvider2.Object});

            // Act
            var result = sut.GetContent(query);

            // Assert

            result.Should().Be(IsGuestContent);
            conditionProvider1.Verify(d => d.GetData(), Times.Once(), "Used provider should be called");
            conditionProvider2.Verify(d => d.GetData(), Times.Never(), "Unused provider should not called");
        }
    }
}