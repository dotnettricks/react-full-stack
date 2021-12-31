using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eVideoPrime.Models
{
    public class PaymentModel
    {
        //for razor pay
        public string PaymentId { get; set; }
        public string Signature { get; set; }
        public string OrderId { get; set; }

        public decimal Price { get; set; }
        public string Currency { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public string Email { get; set; }
        public int PlanId { get; set; }
        public string PlanName { get; set; }
        public int UserId { get; set; }
    }
}
