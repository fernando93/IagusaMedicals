using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IagusaMedicals.Startup))]
namespace IagusaMedicals
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
