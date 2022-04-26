using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IAGUSA.ENTITY;
using IagusaMedicals.Models;

namespace IagusaMedicals.Controllers
{
    public class HostSchoolController : Controller
    {
        private IAGEntities db = new IAGEntities();
        // GET: HostSchool
        public ActionResult Index()
        {
            return View();
        }


        //GET:  HostSchool/Create
        public ActionResult Create()
        {
            HostSchoolModels hostSchoolDatos = new HostSchoolModels();

            return View(hostSchoolDatos);
        }

        //POST> HostSchool/Create
        [HttpPost]
        public ActionResult Create(HostSchoolModels datos)
        {
            if (ModelState.IsValid)
            {
                
      
            
                db.SaveChanges();
                ViewBag.SuccessMsg = "successfully added, I apreciate it!";
                return RedirectToAction("Finalizacion");

            }
            else
            {
                return View();

            }
            
        }


        public ActionResult Finalizacion()
        {
            return View();
        }

    }
}