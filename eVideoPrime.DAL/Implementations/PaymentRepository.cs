using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace eVideoPrime.DAL.Implementations
{
    public class PaymentRepository : Repository<PaymentDetail>, IPaymentRepository
    {
        private AppDbContext dbContext
        {
            get
            {
                return _dbContext as AppDbContext;
            }
        }
        public PaymentRepository(DbContext dbContext) : base(dbContext)
        {

        }

      
        public IEnumerable<PaymentDetail> GetAllUsersPayment(int UserId)
        {
            IEnumerable<PaymentDetail> pay = dbContext.PaymentDetails.Where(x=>x.UserId==UserId).ToList();
            return pay;
        }

    }
}
