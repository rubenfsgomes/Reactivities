using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpPut]
        public async Task<IActionResult> EditProfile(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetActivities(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query { Predicate = predicate, Username = username }));
        }
    }
}
