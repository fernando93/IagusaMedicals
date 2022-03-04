

$(function () {
    var dAction;
    var aView;
    var url;
    
    if ($('.dataTable').length > 0) {
        dTable = $('.dataTable').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            responsive:true,
            select: true,
            buttons: [

                {
                    extend: 'excelHtml5',
                    
                    text: '<i class="fa fa-file-excel"></i>',
                    titleAttr: 'Clic para Exportar tabla a Excel'
                },
                {
                    extend: 'pdfHtml5',
                    text: '<i class="fa fa-file-pdf"></i>',
                    titleAttr: 'Clic para Exportar tabla a PDF'
                },
                {
                    extend: 'print',
                    text: '<i class="fa fa-print"></i>',
                    titleAttr: 'Clic para imprmir Tabla'
                }
            ],
            columnDefs: [{
                className: 'control',
                orderable: false,
                targets: 0
            },
            ],
            dom: '<"col-sm-12"<"col-sm-6"f><"col-sm-6"B>><"col-sm-12"rt><"col-sm-12"<"col-sm-6"i><"col-sm-6"p>>',
            responsive: {
                details: {
                    type: 'column'
                }
            }
        });



    }
});

