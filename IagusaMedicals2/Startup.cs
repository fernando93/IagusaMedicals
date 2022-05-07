using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IagusaMedicals2.Startup))]
namespace IagusaMedicals2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
