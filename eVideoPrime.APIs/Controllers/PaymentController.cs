using eVideoPrime.DAL.Entities;
using eVideoPrime.Models;
using eVideoPrime.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace eVideoPrime.APIs.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        IPaymentService _paymentService;
        ISubscriptionService _subscriptionService;
        public PaymentController(IPaymentService paymentService, ISubscriptionService subscriptionService)
        {
            _paymentService = paymentService;
            _subscriptionService = subscriptionService;
        }

        [HttpPost]
        public IActionResult CreateOrder(RazorPayOrderModel razorPayOrder)
        {
            string orderId = _paymentService.CreateOrder(razorPayOrder.Total * 100, razorPayOrder.Currency, razorPayOrder.Receipt);
            if (string.IsNullOrEmpty(orderId))
                return StatusCode(StatusCodes.Status500InternalServerError);
            else
                return Ok(new { orderId = orderId });
        }

        [HttpPost]
        public IActionResult SavePaymentDetails(PaymentModel model)
        {
            bool IsSignVerified = _paymentService.VerifySignature(model.Signature, model.OrderId, model.PaymentId);
            var paymentDetails = _paymentService.GetPaymentDetails(model.PaymentId);
            if (IsSignVerified && paymentDetails != null)
            {
                PaymentDetail payment = new PaymentDetail();

                payment.Price = model.Price;
                payment.PlanId = model.PlanId;
                payment.PlanName = model.PlanName;
                payment.Total = model.Total;
                payment.Tax = model.Tax;
                payment.CreatedDate = DateTime.Now;

                payment.Status = paymentDetails.Attributes["status"]; //captured
                payment.Currency = model.Currency;
                payment.Email = model.Email;
                payment.Id = model.PaymentId;
                payment.UserId = model.UserId;

                int status = _paymentService.SavePaymentDetails(payment);
                if (status > 0)
                {
                    Subscription subscription = new Subscription
                    {
                        PlanId = model.PlanId,
                        SubscribedOn = DateTime.Now,
                        UserId = model.UserId,
                        ExpiryOn = DateTime.Now.AddYears(1)
                    };
                    _subscriptionService.Add(subscription);

                    ReceiptModel receipt = new ReceiptModel { PaymentId = model.PaymentId, Currency = model.Currency, Total = model.Total, Email = model.Email, Status = payment.Status };
                    return Ok(receipt);
                }
                else
                {
                    return Ok();
                }
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
