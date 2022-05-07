using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IagusaMedicals.Models
{
    public class MedicalDetailsModel
    {
        public int id { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string bloodGroup { get; set; }
        public Nullable<bool> bloodtransfusion { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public bool medicalClearance { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public bool allergies { get; set; }
        public string allergiesList { get; set; }
        public string medicalConditionsList { get; set; }
        public string regularMedications { get; set; }
    }
}