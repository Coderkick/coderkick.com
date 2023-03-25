using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace coderkickcom.Pages;

public class UsModel : PageModel
{
    private readonly ILogger<UsModel> _logger;

    public UsModel(ILogger<UsModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
    }
}

