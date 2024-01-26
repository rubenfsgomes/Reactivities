using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDTO>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<UserActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<UserActivityDTO> activities = [];

                switch (request.Predicate)
                {
                    case "past":
                        activities = await _context.ActivityAttendees
                                .OrderBy(d => d.Activity.Date)
                                .Where(x => x.AppUser.UserName == request.Username)
                                .ProjectTo<UserActivityDTO>(_mapper.ConfigurationProvider)
                                .Where(x => x.Date < DateTime.UtcNow)
                                .ToListAsync();
                        break;
                    case "hosting":
                        activities = await _context.ActivityAttendees
                                .OrderBy(d => d.Activity.Date)
                                .Where(x => x.AppUser.UserName == request.Username)
                                .ProjectTo<UserActivityDTO>(_mapper.ConfigurationProvider)
                                .Where(x => x.HostUsername == request.Username)
                                .ToListAsync();
                        break;
                    default:
                        activities = await _context.ActivityAttendees
                                .OrderBy(d => d.Activity.Date)
                                .Where(x => x.AppUser.UserName == request.Username)
                                .ProjectTo<UserActivityDTO>(_mapper.ConfigurationProvider)
                                .Where(x => x.Date >= DateTime.UtcNow)
                                .ToListAsync();
                        break;
                }

                return Result<List<UserActivityDTO>>.Success(activities);
            }
        }
    }
}
