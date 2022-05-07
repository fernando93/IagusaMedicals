using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IagusaMedicals.Models
{
    public class PersonalModel
    {
        public int id { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string firstName { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string lastName { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string addressCountry { get; set; }
        public string addressUS { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string mobilePhone { get; set; }
        public string whatsapp { get; set; }
        public int genderFk { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public System.DateTime dateBirth { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string countryNationality { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string PassportNumber { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string visaNumberType { get; set; }
        public int emergencyContactCountryFk { get; set; }
        public int emergencyContactUSFk { get; set; }
        public int medicalDetailsFK { get; set; }

        public Nullable<int> covidVaccineFK { get; set; }
        public Nullable<System.DateTime> recordDate { get; set; }
    }
}