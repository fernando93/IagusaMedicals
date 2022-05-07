using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IagusaMedicals.Models
{
    public class MedicalHistoryModels
    {
        public MedicalHistoryModels()
        {
        }

        public PersonalModel personal { get; set; }
        public EmergencyModel emergencyContact { get; set; }
        public EmergencyUSModel emergencyContactUS { get; set; }
        public MedicalDetailsModel medicalDetails { get; set; }
        public string firstDoseCovidVaccine { get; set; }
        public Nullable<System.DateTime> firstDoseDate { get; set; }
    }
}