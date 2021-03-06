//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace IAGUSA.ENTITY
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class EmergencyContactUS
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EmergencyContactUS()
        {
            this.PersonalInformation = new HashSet<PersonalInformation>();
        }

        public int id { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string firstName { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string lastName { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string address { get; set; }
        [Required(ErrorMessage = "This value is required")]
        public string mobilePhone { get; set; }
        public string whatsapp { get; set; }
        public string relationship { get; set; }
        public string email { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonalInformation> PersonalInformation { get; set; }
    }
}
