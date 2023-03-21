var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.CheckConsentNeeded = context => true;

    options.MinimumSameSitePolicy = SameSiteMode.None;
});

builder.Services.AddPortableObjectLocalization();

builder.Services
    .Configure<RequestLocalizationOptions>(options => options
        .AddSupportedCultures("fr", "cs")
        .AddSupportedUICultures("fr", "cs"));

builder.Services
    .AddRazorPages()
    .AddViewLocalization();

var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

/*app.MapGet("/redirect:{URL}", (URL) => {
    return URL;
});*/

app.MapGet("/discord", () => {
    return Results.Redirect("https://discord.gg/XvQzSBRGZY");
});

app.MapGet("/index", () => {
    return Results.Redirect("/");
});

app.UseStaticFiles();
app.UseCookiePolicy();
app.UseRouting();
app.MapRazorPages();
app.UseAuthorization();

app.Run();