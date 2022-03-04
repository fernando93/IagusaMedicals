using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IAGUSA.ENTITY;
using IagusaMedicals.Models;

namespace IagusaMedicals.Controllers
{
    public class FormMedicalHistoryController : Controller
    {
        private IAGEntities db = new IAGEntities();
        // GET: FormMedicalHistory
        public ActionResult Index()
        {
            return View();
        }

        // GET: FormMedicalHistory/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: FormMedicalHistory/Create
        public ActionResult Create()
        {
            MedicalHistoryModels medicalHistory = new MedicalHistoryModels();

            return View(medicalHistory);
        }

        // POST: FormMedicalHistory/Create
        [HttpPost]
        public ActionResult Create(MedicalHistoryModels medical, ICollection<VaccineViewModels> vaccines)
        {
            if (ModelState.IsValid)
            {
                CovidVaccineRecord covid = new CovidVaccineRecord();
                if(vaccines.Count() == 1)
                {
                    covid.firstDoseCovidVaccine = vaccines.ElementAt(0).firstDoseCovidVaccine;
                    covid.firstDoseDate = vaccines.ElementAt(0).firstDoseDate;
                }
                else if (vaccines.Count() == 2)
                {
                    covid.firstDoseCovidVaccine = vaccines.ElementAt(0).firstDoseCovidVaccine;
                    covid.firstDoseDate = vaccines.ElementAt(0).firstDoseDate;
                    covid.SecondDoseCovidVaccine = vaccines.ElementAt(1).firstDoseCovidVaccine;
                    covid.secondDoseDate = vaccines.ElementAt(1).firstDoseDate;
                }
                else if (vaccines.Count() == 3)
                {
                    covid.firstDoseCovidVaccine = vaccines.ElementAt(0).firstDoseCovidVaccine;
                    covid.firstDoseDate = vaccines.ElementAt(0).firstDoseDate;
                    covid.SecondDoseCovidVaccine = vaccines.ElementAt(1).firstDoseCovidVaccine;
                    covid.secondDoseDate = vaccines.ElementAt(1).firstDoseDate;
                    covid.otherFirstDoseCovidVaccine = vaccines.ElementAt(2).firstDoseCovidVaccine;
                    covid.otherFirstDoseDate = vaccines.ElementAt(2).firstDoseDate;
                }
                else if (vaccines.Count() >= 4)
                {
                    covid.firstDoseCovidVaccine = vaccines.ElementAt(0).firstDoseCovidVaccine;
                    covid.firstDoseDate = vaccines.ElementAt(0).firstDoseDate;
                    covid.SecondDoseCovidVaccine = vaccines.ElementAt(1).firstDoseCovidVaccine;
                    covid.secondDoseDate = vaccines.ElementAt(1).firstDoseDate;
                    covid.otherFirstDoseCovidVaccine = vaccines.ElementAt(2).firstDoseCovidVaccine;
                    covid.otherFirstDoseDate = vaccines.ElementAt(2).firstDoseDate;
                    covid.otherSecondDoseCovidVaccine = vaccines.ElementAt(3).firstDoseCovidVaccine ;
                    covid.otherSecondDoseDate = vaccines.ElementAt(3).firstDoseDate;
                }
                if (vaccines.Count() >= 1)
                {
                    db.CovidVaccineRecord.Add(covid);
                    medical.personal.covidVaccineFK = covid.id;
                }

                    medical.medicalDetails.allergies = Convert.ToBoolean(medical.medicalDetails.allergies);
                medical.medicalDetails.allergies = Convert.ToBoolean(medical.medicalDetails.allergies);
                medical.medicalDetails.allergies = Convert.ToBoolean(medical.medicalDetails.allergies);
                db.EmergencyContact.Add(medical.emergencyContact);
                db.EmergencyContactUS.Add(medical.emergencyContactUS);
                db.MedicalDetails.Add(medical.medicalDetails);
                medical.personal.emergencyContactCountryFk = medical.emergencyContact.id;
                medical.personal.emergencyContactUSFk = medical.emergencyContactUS.id;
                medical.personal.medicalDetailsFK = medical.medicalDetails.id;
                medical.personal.recordDate = DateTime.Now;
                db.PersonalInformation.Add(medical.personal);
                db.SaveChanges();
                ViewBag.SuccessMsg = "successfully added, I apreciate it!";
                return RedirectToAction("Finalizacion");
            }else
            {
                return View();
            }
        }

        // GET: FormMedicalHistory/Edit/5
        public ActionResult Finalizacion()
        {
            return View();
        }

        // GET: FormMedicalHistory/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: FormMedicalHistory/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: FormMedicalHistory/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: FormMedicalHistory/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
