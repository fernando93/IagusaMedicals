using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IAGUSA.ENTITY;

namespace IagusaMedicals.Models
{
    public class MedicalHistoryModels
    {
        public PersonalInformation personal { get; set; }
        public EmergencyContact emergencyContact { get; set; }
        public EmergencyContactUS emergencyContactUS { get; set; }
        public MedicalDetails medicalDetails { get; set; }
        public string firstDoseCovidVaccine { get; set; }
        public Nullable<System.DateTime> firstDoseDate { get; set; }
    }
}