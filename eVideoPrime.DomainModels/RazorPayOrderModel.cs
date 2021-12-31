using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eVideoPrime.Models
{
    public class RazorPayOrderModel
    {
        public decimal Total { get; set; }
        public string Currency { get; set; }
        public string Receipt { get; set; }
    }
}
