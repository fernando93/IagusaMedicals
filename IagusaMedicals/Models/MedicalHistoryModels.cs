using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using IAGUSA.ENTITY;

namespace IagusaMedicals.Models
{
    public class MedicalHistoryModels
    {
        public MedicalHistoryModels()
        {
        }

        public PersonalInformation personal { get; set; }
        public EmergencyContact emergencyContact { get; set; }
        public EmergencyContactUS emergencyContactUS { get; set; }
        public MedicalDetails medicalDetails { get; set; }
        public string firstDoseCovidVaccine { get; set; }
        public Nullable<System.DateTime> firstDoseDate { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string address { set; get; }
        [Required(ErrorMessage = "This value is required")]
        public string city { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string state { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string zipcode {get; set;}

    }
}