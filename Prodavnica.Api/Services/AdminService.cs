using Prodavnica.Api.Dto;
using Prodavnica.Api.Interfaces;
using System.Net;
using System.Net.Mail;

namespace Prodavnica.Api.Services
{
    public class AdminService : IAdminService
    {
        private readonly IRepository _repository;
        private readonly IConfiguration _configuration;

        public AdminService(IRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        public List<OrederDto> GetAllOrders()
        {
            return _repository.GetAllOrders();
        }

        public List<UserDto> GetAllUnverified()
        {
            return _repository.GetAllUnverified();
        }

        public bool Verify(string username, bool verify)
        {
            string poruka = "";
            if (verify)
            {
                poruka = "approved";
            }
            else
            {
                poruka = "denied";
            }
            //Email message
            string message = $"Dear {username},\n\nYou have been {poruka}.\n\nBest Regards,\nBackend Server\n";

            try
            {
                SendEmail("aleksamiskin@gmail.com", message);
            }
            catch (Exception ex)
            {
                //Do nothing :(
            }
            return _repository.Verify(username, verify);
        }
        private void SendEmail(string recepient, string message)
        {
            string sender = _configuration["EmailService:SenderEmail"];
            var smtpClient = new SmtpClient(_configuration["EmailService:SMTPClient"])
            {
                Port = 587,
                Credentials = new NetworkCredential(sender, _configuration["EmailService:SenderPass"]),
                EnableSsl = true,
            };

            smtpClient.Send(sender, recepient, "[Web2] Verification status", message);

        }

    }
}
