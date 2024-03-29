var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.CheckConsentNeeded = context => true;

    options.MinimumSameSitePolicy = SameSiteMode.None;
    options.ConsentCookie.Name = "ConsentCookie";
    options.ConsentCookie.Domain = "coderkick.com";
    options.ConsentCookie.SameSite = SameSiteMode.None;
    options.Secure = CookieSecurePolicy.Always;
});

builder.Services.AddPortableObjectLocalization();

builder.Services.AddRazorPages().AddViewLocalization();

var app = builder.Build();
if (app.Environment.IsProduction())
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}


app.MapGet("/discord", () => {
    return Results.Redirect("https://discord.gg/XvQzSBRGZY");
});

app.MapGet("/revolt", () => {
    return Results.Redirect("https://rvlt.gg/Afd5wA4B");
});

app.MapGet("/api/internal/debug.list", () => {
    string response = "";
    foreach(var dir in Directory.GetDirectories("./wwwroot/DebugExtensions"))
    {
        response += dir.Replace("./wwwroot/DebugExtensions/", "") + "\n";
    }
    return Results.Text(response[..^1]);
});

app.MapGet("/index", () => {
    return Results.Redirect("/");
});

app.MapGet("/donate", () => {
    return Results.Redirect("https://www.patreon.com/CoderkickDevs");
});

app.UseStaticFiles();
app.UseCookiePolicy();
app.UseRouting();
app.MapRazorPages();
app.UseAuthorization();

app.Run();