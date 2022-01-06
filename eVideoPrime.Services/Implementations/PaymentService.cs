using eVideoPrime.DAL.Entities;
using eVideoPrime.DAL.Interfaces;
using eVideoPrime.Models;
using eVideoPrime.Services.Interfaces;
using Microsoft.Extensions.Options;
using Razorpay.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace eVideoPrime.Services.Implementations
{
    //https://razorpay.com/integrations/
    //https://razorpay.com/docs/payment-gateway/web-integration/standard/
    public class PaymentService : Service<PaymentDetail>, IPaymentService
    {
        private readonly IOptions<RazorPayConfig> _razorPayConfig;
        private readonly RazorpayClient _client;
        IRepository<PaymentDetail> _paymentRepos; 
        private readonly IPaymentRepository _PaymentRepo;
       
        public PaymentService(IOptions<RazorPayConfig> razorPayConfig,  IPaymentRepository PaymentRepo,IRepository<PaymentDetail> paymentRepo) : base(paymentRepo)
        {
            _razorPayConfig = razorPayConfig;
            _PaymentRepo = PaymentRepo;
            if (_client == null)
            {
                _client = new RazorpayClient(_razorPayConfig.Value.Key, _razorPayConfig.Value.Secret);
            }
        }
        public string CreateOrder(decimal amount, string currency, string receipt)
        {
            try
            {
                Dictionary<string, object> options = new Dictionary<string, object>();

                options.Add("amount", amount);
                options.Add("currency", currency);
                options.Add("receipt", receipt);
                options.Add("payment_capture", 1);
                Razorpay.Api.Order orderResponse = _client.Order.Create(options);
                return orderResponse["id"].ToString();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public Payment GetPaymentDetails(string paymentId)
        {
            if (!String.IsNullOrWhiteSpace(paymentId))
            {
                return _client.Payment.Fetch(paymentId);
            }
            return null;
        }

        public bool VerifySignature(string signature, string orderId, string paymentId)
        {
            string payload = string.Format("{0}|{1}", orderId, paymentId);
            string secret = RazorpayClient.Secret;
            string actualSignature = getActualSignature(payload, secret);
            return actualSignature.Equals(signature);
        }

        private static string getActualSignature(string payload, string secret)
        {
            byte[] secretBytes = StringEncode(secret);
            HMACSHA256 hashHmac = new HMACSHA256(secretBytes);
            var bytes = StringEncode(payload);

            return HashEncode(hashHmac.ComputeHash(bytes));
        }

        private static byte[] StringEncode(string text)
        {
            var encoding = new ASCIIEncoding();
            return encoding.GetBytes(text);
        }

        private static string HashEncode(byte[] hash)
        {
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
        public int SavePaymentDetails(PaymentDetail model)
        {
            _paymentRepos.Add(model);
            return _paymentRepos.SaveChanges();
        }

        public IEnumerable<PaymentDetail> GetAllUsersPayment(int UserId) {
            IEnumerable<PaymentDetail> Payment = _PaymentRepo.GetAllUsersPayment(UserId);
            return Payment;
        }
    }
}
