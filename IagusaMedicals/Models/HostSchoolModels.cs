using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using IAGUSA.ENTITY;

namespace IagusaMedicals.Models
{
    public class HostSchoolModels
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string HostSchoolName { get; set; }
        public string HostSchoolAdress { get; set; }
        public string HostSchoolCity { get; set; }
        public string HostSchoolState { get; set; }
        public string HostSchoolZip { get; set; }
        public string HostSchoolWebsite { get; set; }
        [DataType(DataType.MultilineText)]
        public string HostSchoolDescription { get; set; }
        [DataType(DataType.MultilineText)]
        public string HostSchoolExchangeTeachers { get; set; }
        public int HostSchoolNumbersPositions { get; set; }
        [DataType(DataType.MultilineText)]
        public string DescriptionTeachingPositions { get; set; }
        [DataType(DataType.MultilineText)]
        public string RequirementsTeachingPositions { get; set; }
        public System.DateTime StartDate { get; set; }
        [DataType(DataType.MultilineText)]
        public string WorksHours { get; set; }
        public string AnnualSalary { get; set; }
        [DataType(DataType.MultilineText)]
        public string ComensationBenefits { get; set; }
        [DataType(DataType.MultilineText)]
        public string WageDeductions { get; set; }
        public string PositionDescription { get; set; }
        public string MedicalInsurance { get; set; }
        [DataType(DataType.MultilineText)]
        public string HousingRecomendations { get; set; }
        [DataType(DataType.MultilineText)]
        public string HousingCostEstimate { get; set; }
        [DataType(DataType.MultilineText)]
        public string TransportationRecommendations { get; set; }
        [DataType(DataType.MultilineText)]
        public string TransportationCostEstimate { get; set; }
        [DataType(DataType.MultilineText)]
        public string AvailableHealthCare { get; set; }
        [DataType(DataType.MultilineText)]
        public string CulturalActivities { get; set; }
        [DataType(DataType.MultilineText)]
        public string Library { get; set; }
        [DataType(DataType.MultilineText)]
        public string Schools { get; set; }
        [DataType(DataType.MultilineText)]
        public string Banks { get; set; }
    }

}