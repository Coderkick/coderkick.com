using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace coderkickcom.Pages;

public class UsModel : PageModel
{
    private readonly ILogger<PrivacyModel> _logger;

    public UsModel(ILogger<PrivacyModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
    }
}

