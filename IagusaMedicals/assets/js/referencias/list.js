function openNewEncuesta() {
    var modal = $('#modalReferencias');
    modal.find('form')[0].reset();
    modal.modal('show');
}


function SaveForm(url) {
    Swal.fire({
        title: 'Procesando!',
        html: '',
        onBeforeOpen: () => {
            Swal.showLoading();
            return new Promise((resolve) => {
                var formData = new FormData($('form#frmReferencias')[0]);

                $.ajax({
                    type: "POST",
                    url: url,
                    data: formData,
                    dataType: 'json',
                    contentType: false,// "multipart/form-data",
                    processData: false,
                    success: function (result) {
                        if (result.accion) {
                            Swal.fire({
                                title: 'Realizado!',
                                text: 'Se ha agregado correctamente',
                                type: 'success',
                                onClose: () => {
                                    window.location.reload();
                                }
                            });
                        }
                        else
                            Swal.fire('Ops!', result.Msg, 'error');
                    },
                    error: function (error) {
                        Swal.fire('Ops!', 'No se pudo completar la operación.', 'error');
                    }
                });

            });
        },
    }).then((result) => {

        if (result.value) {
            Swal.fire({
                title: 'Realizado!',
                text: 'Se ha agregado correctamente',
                type: 'success',
                onClose: () => {
                    window.location.reload();
                }
            });
        }
    });
}

function deleteRow(id, url) {
    Swal.fire({
        title: "¿Esta seguro?",
        text: "Este proceso es irreversible.",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, hacerlo!",
        showLoaderOnConfirm: true,
        preConfirm: () => {

            return new Promise((resolve) => {
                $.post(url, { id: id }, function (result) {
                    if (result.accion)
                        resolve();
                    else
                        Swal.fire('Ops!', result.msg, 'error');
                })
                    .fail(function () {
                        Swal.fire('Ops!', 'No se pudo completar la operación.', 'error');
                    });
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        console.log(result);
        if (result.value) {
            Swal.fire({
                title: 'Completado!',
                text: 'El registro ha sido eliminado.',
                type: 'success',
                onClose: () => {
                    window.location.reload();
                }
            });
        }
    });
}

