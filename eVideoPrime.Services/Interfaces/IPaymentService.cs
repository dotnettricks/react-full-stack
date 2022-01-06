using eVideoPrime.DAL.Entities;
using Razorpay.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eVideoPrime.Services.Interfaces
{
    public interface IPaymentService
    {
        string CreateOrder(decimal amount, string currency, string receipt);
        int SavePaymentDetails(PaymentDetail model);
        Payment GetPaymentDetails(string paymentId);
        bool VerifySignature(string signature, string orderId, string paymentId);

        IEnumerable<PaymentDetail> GetAllUsersPayment(int UserId);
    }
}
