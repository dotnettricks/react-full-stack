using eVideoPrime.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eVideoPrime.DAL.Interfaces
{
    public interface IMovieRepository : IRepository<Movie>
    {
        void UpdateImages(Movie model);
    }
}
