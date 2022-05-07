using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IagusaMedicals.Models
{
    public class EmergencyModel
    {

        public int id { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string firstName { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string lastName { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string addressCountry { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string mobilePhone { get; set; }
        public string whatsapp { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string relationship { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string email { get; set; }
    }
}