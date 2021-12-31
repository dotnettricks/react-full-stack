using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using eVideoPrime.Services.Interfaces;


namespace eVideoPrime.Services.Implementations
{
    public class MovieService: Service<Movie>, IMovieService
    {
        IMovieRepository _movieRepo;
        public MovieService(IMovieRepository movieRepo): base(movieRepo)
        {
            _movieRepo = movieRepo;
        }
        public int AddMovie(Movie model)
        {
            _movieRepo.Add(model);
            _movieRepo.SaveChanges();
            return model.Id;
        }
        public void UpdateImages(Movie model)
        {
            _movieRepo.UpdateImages(model);
        }
    }
}
