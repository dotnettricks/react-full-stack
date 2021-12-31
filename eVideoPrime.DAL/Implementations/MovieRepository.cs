using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace eVideoPrime.DAL.Implementations
{
    public class MovieRepository : Repository<Movie>, IMovieRepository
    {
        private AppDbContext dbContext
        {
            get
            {
                return _dbContext as AppDbContext;
            }
        }
        public MovieRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public void UpdateImages(Movie model)
        {
            var data = dbContext.Movies.Find(model.Id);
            if(data != null)
            {
                data.Thumbnail = model.Thumbnail;
                data.Banner = model.Banner;
                dbContext.SaveChanges();
            }
        }
    }
}
