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

app.MapGet("/box", () => {
    return Results.Redirect("https://www.reddit.com/r/Paperboat/comments/119b4l7/the_paperboat_projects_suggestion_box/");
});

app.MapGet("/discord", () => {
    return Results.Redirect("https://discord.gg/XvQzSBRGZY");
});

app.MapGet("/index", () => {
    return Results.Redirect("/");
});


// app.MapGet("/{language:regex(^[a-z]{2}-[A-Z]{2}$)}/{page:alpha}");
app.UseStaticFiles();
app.UseCookiePolicy();
// app.UseHttpsRedirection();
app.UseRouting();
app.MapRazorPages();
app.UseAuthorization();

app.Run();