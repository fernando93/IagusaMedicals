using System;
using System.Collections.Generic;
using System.IO;
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
            return View();
        }

        //POST> HostSchool/Create
        [HttpPost]
        public ActionResult Create(HostSchool host, HttpPostedFileBase file1, HttpPostedFileBase file2)
        {
            if (ModelState.IsValid)
            {
                string url_position = null;
                string url_medical = null;


                if (file1 != null && file1.ContentLength > 0)
                {
                    string FileName = Path.GetFileName(file1.FileName);
                    url_position = $"~/Content/Position/" + FileName;
                    string fullpath = Server.MapPath(url_position);
                    file1.SaveAs(fullpath);
                    host.PositionDescription = url_position;
                }

                if (file2 != null && file2.ContentLength > 0)
                {
                    string FileName = Path.GetFileName(file2.FileName);
                    url_medical = $"~/Content/Medical/" + FileName;
                    string fullpath = Server.MapPath(url_medical);
                    file2.SaveAs(fullpath);
                    host.MedicalInsurance = url_medical;
                }

                db.HostSchool.Add(host);            
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