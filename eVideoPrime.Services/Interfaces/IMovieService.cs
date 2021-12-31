using eVideoPrime.DAL.Entities;

namespace eVideoPrime.Services.Interfaces
{
    public interface IMovieService : IService<Movie>
    {
        int AddMovie(Movie model);
        void UpdateImages(Movie model);
    }
}
