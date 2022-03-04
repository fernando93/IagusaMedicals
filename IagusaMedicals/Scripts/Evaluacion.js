var evaluacion = {};
var dSections = [];
var dEvaluacion = [];
var x = -1;
Spanglish = "<span data-lang='en'>{0}</span><span data-lang='es'>{1}</span>";
/// <summary>
/// 
/// </summary>
String.prototype.format = function () {
    var s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

const ToastMessage = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function CreateSections(Data) {
    var div = $('#divSection');
    div.empty();
    $.each(Data, function (index, item) {
        div.append($("<div class='checkbox'><label><input type='checkbox' class='switch switch-yesno' value='" + item.id + "'><span class='lbl'>&nbsp;<span data-lang='en'>" + item.text + "</span><span data-lang='es'>" + item.textEs + "</span></span></label></div>"));
    });
}

function ShowSection(cont) {
    x = x + cont;
    $('div.data-section').hide();
    $('div.data-section[data-count=' + x + ']').show();
    if (x == 0) {
        if (evaluacion.SECCIONES.length == 1) {
            $('#btnBack').hide();
            $('#btnFinish').show();
            $('#btnNext').hide();
        }
        else {
            $('#btnBack').hide();
            $('#btnFinish').hide();
            $('#btnNext').show();
        }
    }
    else if (x == dEvaluacion.length - 1) {
        $('#btnBack').show();
        $('#btnFinish').show();
        $('#btnNext').hide();
    }
    else {
        $('#btnBack').show();
        $('#btnFinish').hide();
        $('#btnNext').show();
    }
    $('body,html').animate({
        scrollTop: 0
    }, 800);
}

function ShowEvaluacion() {
    $('#divSurveyPanel').show();
    $('#divContaactInfo').hide();
    $('#divButtons').show();
    dEvaluacion = [];
    var count = 0;
    $.each(evaluacion.SECCIONES, function (index, value) {
        var ds = doSection(value, count);
        dEvaluacion.push(ds);
        $('#divSurveyPanel').append(ds);
        count++;
    });
    ShowSection(1);
}
function doSection(s, count) {
    section = [];
    //Section-Header
    var head =
        section.push(
            "<div class='section-full-width-inner data-section' id='section-{0}' data-id='{0}' data-count='{1}'>".format(s.ID_SECCION, count),
            "<div class='page-header'><h1>{0}".format(s.SECCION_NOMBRE)
        );    
    section.push("</h1></div>");
    //Section-Questions-Answers
    var indexQ = 0;
    $.each(s.PREGUNTAS, function (index, squestion) {
        var question = squestion;
        indexQ = index + 1;
        var isEditable = !s.EsEditable ? 'd-none' : '';
        section.push(
            "<div class='survey form-group'>",
            "<label id='qlabel-{2}' class='question' data-id='{2}' data-type='{3}'><span data-lang='es'>{0}.- {1}</span>  <span class='fa fa-edit {4}' onclick='editQuestion({2})'></span></label>".format((index + 1), question.PREGUNTA_DESC, question.ID_PREGUNTA, question.ID_TIPO_PREGUNTA, isEditable),
            "<div id='container-q{0}' class='form-group row d-none'>".format(question.ID_PREGUNTA),
                "<div class='col-sm-10'>",
                    "<input type='text' id='qedit-{0}' class='form-control' value='{1}' data-id='{0}' />".format(question.ID_PREGUNTA, question.PREGUNTA_DESC),
                "</div>",
                "<label class='col-sm-2 col-form-label'>",
            "<a href='javascript:;' onclick='saveChangesQuestion({0}, {1})' class='text-success fa fa-lg fa-check-circle'></a>".format(question.ID_PREGUNTA, indexQ),
            "<a href='javascript:;' onclick='cancelEditQuestion({0}, \"{1}\")' class='text-danger fa fa-lg fa-times-circle'></a>".format(question.ID_PREGUNTA, question.PREGUNTA_DESC),
                "</label>",
            "</div>",
            "<div class='answers'>"
        );
        switch (question.ID_TIPO_PREGUNTA) {
            case 1:
                temp = "<textarea class='form-control q-open' type='text' data-question={0} >{1}</textarea>";
                section.push(temp.format(question.ID_PREGUNTA, question.RESPUESTA));
                break;
            case 2:
                temp = "<div class='form-group'><label class='radio-inline answer'><input type='radio' id='answer-{0}' data-answer='{0}' data-surveyanswer='{4}' data-sent='{1}' data-question='{2}' name='question-{2}' {5}><div class='lbl'><span> {3}</span></div></label></div>";
                comments = "<div class='comments form-horizontal'><div class='form-group'><label class='col-sm-2 control-label'>{2}</label><div class='col-sm-10'><input type='text' class='form-control comments' data-question='{0}' value='{1}'></div></div></div>";
                $.each(question.Respuestas, function (index, ranswer) {
                    var answer = ranswer;
                    var checked = answer.ID_RESPUESTA === parseInt(question.RESPUESTA) ? 'checked' : '';
                    section.push(temp.format(answer.ID_RESPUESTA, evaluacion.ID_PRUEBA, question.ID_PREGUNTA, answer.RESPUESTA_DESC, answer.ID_RESPUESTA, checked));
                });
                if (question.PREGUNTA_COMENTARIOS)
                    section.push(comments.format(question.ID_PREGUNTA, question.COMENTARIOS, question.PREGUNTA_COMENTARIOS_DESC));

                break;
            case 3:
                temp = "<div class='form-group'><label class='radio-inline answer'><input type='checkbox' id='answer-{0}' data-answer='{0}' data-surveyanswer='{4}' data-sent='{1}' data-question='{2}' name='question-{2}' {5}><div class='lbl'><span> {3}</span></div></label></div>";
                comments = "<div class='comments form-horizontal'><div class='form-group'><label class='col-sm-2 control-label' data-lang='en'>Comments</label><label class='col-sm-2 control-label' data-lang='es'>Comentarios</label><div class='col-sm-10'><input type='text' class='form-control comments' data-question='{0}' value='{1}'></div></div></div>";
                $.each(question.Respuestas, function (index, ranswer) {
                    var answer = ranswer;
                    var checked = '';// answer.Answered == true ? 'checked' : '';
                    section.push(temp.format(answer.ID_RESPUESTA, evaluacion.ID_PRUEBA, question.ID_PREGUNTA, answer.RESPUESTA_DESC, answer.ID_RESPUESTA, checked));
                });
                if (question.PREGUNTA_COMENTARIOS)
                    section.push(comments.format(question.ID_PREGUNTA, question.COMENTARIOS));                
                break;
            case 4:
                temp = "<input class='form-control' type='date' data-question={0}></input> <input type='hidden' name='country' value=''  data-question='{0}'>";
                section.push(temp.format(question.ID_PREGUNTA));
                break;
            case 5:
                temp = "<input class='form-control' type='number' data-question={0}></input> <input type='hidden' name='country' value=''  data-question='{0}'>";
                section.push(temp.format(question.ID_PREGUNTA));
                break;
            case 6:
                if (s.ID_SECCION === 10 && question.PREGUNTA_DESC === "Estadísticas") {
                    temp = "<select class='form-control' data-question='{0}' data-surveyanswer='{1}' onchange='setChangeResultado({0}, this)'>".format(question.ID_PREGUNTA, s.ID_SECCION);

                } else {
                    temp = "<select class='form-control' data-question='{0}' data-surveyanswer='{1}' onchange='setChange({0}, this)'>".format(question.ID_PREGUNTA, s.ID_SECCION);
                }
                
                temp += "<option value=''></option>";
                $.each(question.Respuestas, function (index, ranswer) {
                    var answer = ranswer;
                    var checked = parseInt(answer.ID_RESPUESTA) === parseInt(question.RESPUESTA) ? 'selected' : '';
                    temp += "<option value='{0}' {2} data-default='{3}'>{1}</option>".format(answer.ID_RESPUESTA, answer.RESPUESTA_DESC, checked, answer.TEXTO_COMPLETE);
                    //section.push(temp.format(answer.ID_RESPUESTA, evaluacion.ID_PRUEBA, question.ID_PREGUNTA, answer.RESPUESTA_DESC, answer.ID_RESPUESTA, checked));
                });
                temp += "</select>";
                section.push(temp);
                break;
        }
        section.push('</div></div>');
        if (s.ID_SECCION === 10 && question.PREGUNTA_DESC === "Estadísticas") {
            section.push('<div class="text-informativo">');
            section.push('<label>Valor P: </label><span id="valorp"></span><br />');
            section.push('<label>Margen de error: </label><span id="margenerror"></span><br />');
            section.push('<label>Precisión: </label><span id="probabilidad"></span><br />');
            section.push('</div>');
        }
    });
    if (s.ID_TIPO_SECCION === 4 || s.ID_TIPO_SECCION === 1) {        
        section.push("<a class='btnNewQuestion btn btn-warning' href='#' data-section='{0}' data-index='{1}' data-tipopregunta={2} data-tiposeccion='{3}'><span>Add Question</span></a>".format(s.ID_SECCION, indexQ, s.ID_TIPO_PREGUNTA, s.ID_TIPO_SECCION));
    }
    section.push("</div>");
    return section.join('');
}

function newQuestion(indexQ, ID_SECCION, tipopregunta, tiposeccion) {
    var sQuestion = [];
    seccion = $('div.data-section[data-id=' + ID_SECCION + ']');

    //para las secciones diferentes a antecedentes laborales
    if (parseInt(tiposeccion) === 1) {
        sQuestion.push(
            "<div class='survey form-group newLaboral'>",
            "<label class='question' ><span data-lang='es'>{0}.- Nombre de la empresa</span></label>".format((indexQ + 1)),
            "<div class='answers'>",
            "<input class='form-control q-open newAnswerTextLaboral newQuestionOrden-{1}' type='text' data-question={0} data-order='{1}' data-title='Nombre de la empresa' />".format(0, indexQ + 1),
            "</div>"
        );

        sQuestion.push(
            "<div class='survey form-group newLaboral'>",
            "<label class='question' ><span data-lang='es'>{0}.- Puesto</span></label>".format((indexQ + 2)),
            "<div class='answers'>",
            "<input class='form-control q-open newAnswerTextLaboral newQuestionOrden-{1}' type='text' data-question={0} data-order='{1}' data-title='Puesto' />".format(0, indexQ + 2),
            "</div>"
        );

        sQuestion.push(
            "<div class='survey form-group newLaboral'>",
            "<label class='question' ><span data-lang='es'>{0}.- Periodo</span></label>".format(indexQ + 3),
            "<div class='answers'>",
            "<input class='form-control q-open newAnswerTextLaboral newQuestionOrden-{1}' type='text' data-question={0} data-order='{1}' data-title='Periodo' />".format(0, indexQ + 3),
            "</div>"
        );

        sQuestion.push(
            "<div class='survey form-group newLaboral'>",
            "<label class='question' ><span data-lang='es'>{0}.- Sueldo</span></label>".format(indexQ + 4),
            "<div class='answers'>",
            "<input class='form-control q-open newAnswerTextLaboral newQuestionOrden-{1}' type='text' data-question={0} data-order='{1}' data-title='Sueldo' />".format(0, indexQ + 4),
            "</div>"
        );

        sQuestion.push(
            "<div class='survey form-group newLaboral'>",
            "<label class='question' ><span data-lang='es'>{0}.- Motivo de separación</span></label>".format(indexQ + 5),
            "<div class='answers'>",
            "<input class='form-control q-open newAnswerTextLaboral newQuestionOrden-{1}' type='text' data-question={0} data-order='{1}' data-title='Motivo de separación' />".format(0, indexQ + 5),
            "</div>"
        );

        sQuestion.push('</div>');
    }
    else {
        sQuestion.push(
            "<div class='survey form-group'>",
            "<label class='question' ><span data-lang='es'>{0}.-</span></label><div class='col-sm-10'><input class='form-control newQuestion newQuestionOrden-{0}' type='text' data-question='{0}'></input></div>".format((indexQ + 1)),
            "<div class='answers'>"
        );
        var radioYes = "<div class='form-group'><label class='radio-inline answer'><input type='radio' class='newQuestionAnswer newQuestionOrden-{6}' id='answer-{0}' data-answer='{0}' data-surveyanswer='{4}' data-sent='{1}' data-question='{2}' name='question-{2}' {5}><div class='lbl'><span> {3}</span></div></label></div>";
        var radioNo = "<div class='form-group'><label class='radio-inline answer'><input type='radio' class='newQuestionAnswer newQuestionOrden-{6}' id='answer-{0}' data-answer='{0}' data-surveyanswer='{4}' data-sent='{1}' data-question='{2}' name='question-{2}' {5}><div class='lbl'><span> {3}</span></div></label></div>";
        comments = "<div class='comments form-horizontal'><div class='form-group'><label class='col-sm-2 control-label'>{2}</label><div class='col-sm-10'><input type='text' class='form-control comments newQuestionComments newQuestionOrden-{3}' data-question='{0}' value='{1}'></div></div></div>";
        var inputText = "<textarea class='form-control q-open newAnswerText newQuestionOrden-{1}' type='text' data-question={0} /><input type='hidden' class='newQuestionOrden-{1}' name='country' value=''  data-question='{0}'>";

        switch (tipopregunta) {
            case 1:
                sQuestion.push(inputText.format(0, indexQ + 1));
                break;
            case 2:
                sQuestion.push(radioYes.format(1, evaluacion.ID_PRUEBA, 0, 'SI', 1, '', indexQ + 1));
                sQuestion.push(radioNo.format(2, evaluacion.ID_PRUEBA, 0, 'NO', 2, '', indexQ + 1));
                sQuestion.push(comments.format(0, '', 'Reaccion', indexQ + 1));
                break;
        }

        sQuestion.push('</div></div>');
    }

    $($('div.data-section[data-id=' + ID_SECCION + ']').find('.btnNewQuestion')[0]).remove();

    sQuestion.push("<a class='btnAddQuestion btn btn-primary' href='#' data-section='{0}' data-index='{1}' data-tipopregunta='{2}' data-tiposeccion='{3}'><span>Save Question</span></a>".format(ID_SECCION, indexQ + 1, tipopregunta, tiposeccion));
    sQuestion.push("<a class='btnCancelQuestion btn btn-danger' href='#' data-section='{0}' data-index='{1}' data-tipopregunta='{2}' data-tiposeccion='{3}'><span>Cancel Question</span></a>".format(ID_SECCION, indexQ + 1, tipopregunta, tiposeccion));
    seccion.append(sQuestion.join(''));
}

function editQuestion(idPregunta) {
    $('#container-q' + idPregunta).removeClass('d-none');
    $('#qlabel-' + idPregunta).addClass('d-none');
}

function cancelEditQuestion(idPregunta, texto) {
    $('#container-q' + idPregunta).addClass('d-none');
    $('input#qedit-' + idPregunta).val(texto);
    $('#qlabel-' + idPregunta).removeClass('d-none');
}

function saveChangesQuestion(idPregunta, indexQ) {
    var pregunta = {};
    pregunta["ID_PREGUNTA"] = idPregunta;
    pregunta["PREGUNTA_DESC"] = $('input#qedit-' + idPregunta).val();
    var url = $('#UrlEditQuestion').val();

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: "{Data:" + JSON.stringify(pregunta) + "}",
        success: function (response) {
            var data = response;
            if (data.accion) {
                $('#qlabel-' + idPregunta+' > span:first').text("{0}.- {1}".format(indexQ, pregunta["PREGUNTA_DESC"] ));
                cancelEditQuestion(idPregunta, pregunta["PREGUNTA_DESC"]);
            }
        },
        error: function (response) { }
    });  
}

function setChange(question, elem) {
    var respdefault = $(elem).find(':selected').data('default');
    var id = parseInt(question) + 1;
    var input = $("textarea[data-question='" + id + "']");
    if (input.length > 0) {
        input.val(respdefault);
    }
}

function setChangeResultado(question, elem) {
    var id = parseInt(question) + 1;
    var select = $("select[data-question='" + (parseInt(question) - 2) + "']");
    var input = $("textarea[data-question='" + id + "']");

    var resultado = $(select).val();
    var estadistica = $(elem).val();


    if (input.length > 0) {
        setValoresEstadistica(resultado, estadistica, input);
    }
}

function setValoresEstadistica(resultado, estadistica, input) {
    var valorP;
    var margenError;
    var probabilidad;
    var presicion;
    



    if (estadistica === "-10" || estadistica === "-9" || estadistica === "-8" || estadistica === "-7") {
        $('#valorp').text(0.001);
        $('#margenerror').text(0.1);
        $('#probabilidad').text(99.99);
        valorP = "0.001";
        margenError = "0.1";
        probabilidad = "99.99%";
    
        
    }

    if (estadistica === "-6") {
        $('#valorp').text(0.004);
        $('#margenerror').text(0.4);
        $('#probabilidad').text(99.6);
        valorP = "0.004";
        margenError = "0.4";
        probabilidad = "99.6%";
        

    }
    if (estadistica === "-5") {
        valorP = $('#valorp').text(0.010);
        $('#margenerror').text(1);
        valorP = "0.010";
        $('#probabilidad').text(99);
        margenError = "";
        probabilidad = "99%";

    }
    if (estadistica === "-4") {
        $('#valorp').text(0.023);
        $('#margenerror').text(2.3);
        $('#probabilidad').text(97.7);
        valorP = "0.023";
        margenError = "2.3";
        probabilidad = "97.7%";
    }
    if (estadistica === "-3") {
        $('#valorp').text(0.048);
        $('#margenerror').text(4.8);
        $('#probabilidad').text(95.2);
        valorP = "0.048";
        margenError = "4.8";
        probabilidad = "95.2%";

    }
    if (estadistica === "-2") {
        $('#valorp').text(0.091);
        $('#margenerror').text(9.1);
        $('#probabilidad').text(99.9);
        valorP = "0.091";
        margenError = "9.1";
        probabilidad = "90.9%";

    }
    if (estadistica === "-1") {
        $('#valorp').text(0.159);
        $('#margenerror').text(15.9);
        valorP = "0.159";
        margenError = "15.9";
        probabilidad = "84.1%";
    }
    if (estadistica === "0") {
        $('#valorp').text(0.070);
        $('#margenerror').text("");
        $('#probabilidad').text(93);
        valorP = "0.070";
        margenError = "";
        probabilidad = "93%";
    }
    if (estadistica === "1") {
        $('#valorp').text(0.042);
        $('#margenerror').text(4.2);
        $('#probabilidad').text(95.8);
        valorP = "0.042";
        margenError = "4.2";
        probabilidad = "95.8%";
    }
    if (estadistica === "2") {
        $('#valorp').text(0.024);
        $('#margenerror').text(2.4);
        $('#probabilidad').text(97.7);
        valorP = "0.024";
        margenError = "2.4";
        probabilidad = "97.6%";
    }
    if (estadistica === "3") {
        $('#valorp').text(0.012);
        $('#margenerror').text(1.2);
        $('#probabilidad').text(98.8);
        valorP = "0.012";
        margenError = "1.2";
        probabilidad = "98.8%";
    }
    if (estadistica === "4") {
        $('#valorp').text(0.006);
        $('#margenerror').text(0.6);
        $('#probabilidad').text(99.4);
        valorP = "0.006";
        margenError = "0.6";
        probabilidad = "99.4%";
    }
    if (estadistica === "5") {
        $('#valorp').text(0.002);
        $('#margenerror').text(0.2);
        $('#probabilidad').text(99.8);
        valorP = "0.002";
        margenError = "0.2";
        probabilidad = "99.8%";
    }
    if (estadistica === "6" || estadistica === "7" || estadistica === "8" || estadistica === "9" || estadistica === "10") {
        $('#valorp').text(0.001);
        $('#margenerror').text(0.1);
        $('#probabilidad').text(99.9);
        valorP = "0.001";
        margenError = "0.1";
        probabilidad = "99.9%";
    }

    if (resultado == "1") {
        input.val("Durante la evaluación se abordaron los siguientes temas: DROGAS ILEGALES, DELITOS, INFORMACIÓN CONFIDENCIAL, BENEFICIOS ILÍCITOS, Y GRUPOS DELITOS, cabe mencionar que el evaluado(a) no proporcionó información descalificante en ninguna de las áreas, aunado a que técnicamente no se registraron indicadores de falta de veracidad, por lo tanto, se considera CONFIABLE.");
    }

    if (resultado == "2") {
        input.val("UsDurante la evaluación se abordaron los siguientes temas: DROGAS ILEGALES, DELITOS, INFORMACIÓN CONFIDENCIAL, BENEFICIOS ILÍCITOS, Y GRUPOS DELITOS, cabe mencionar que el evaluado(a) no tuvo reacciones de falta de veracidad en la parte técnica del examen, no obstante, proporcionó información descalificante en el(las) área(s) de: _______, lo cual es criterio institucional de riesgo, por lo tanto, se considera NO CONFIABLE.");
    }
  
    if (resultado == "5") {
        input.val("Durante la evaluación se abordaron los siguientes temas: DROGAS ILEGALES, DELITOS, INFORMACIÓN CONFIDENCIAL, BENEFICIOS ILÍCITOS, Y GRUPOS DELITOS, el evaluado(a) no proporcionó información descalificante en ninguno de estos, aunado a que tampoco se registraron indicadores de veracidad, ni de falta de veracidad, para poder emitir un resultado técnico concluyente, lo cual puede deberse a múltiples factores, por lo tanto, el resultado es INCONCLUSO, se recomienda REEXAMINAR al candidato.");
    }
    
  //  $('#precision').text(estadistica);

}

function guardadoParcial() {
    var qAnswersRadio = $('#divSurveyPanel > .data-section:visible').find('input[type=radio]:checked');
    var qAnswersChbx = $('#divSurveyPanel > .data-section:visible').find('input[type=checkbox]:checked');
    var qAnswersOpen = $('#divSurveyPanel > .data-section:visible').find('textarea[type=text].q-open');
    var qAnswersSelect = $('#divSurveyPanel > .data-section:visible').find('select');

    var questionsAnswers = [];
    var aId = '0';
    var qId = '0';
    var saId = '0';
    var aComments = '';
    $.each(qAnswersRadio, function (index, input) {
        qId = $(input).attr('data-question');
        aId = $(input).attr('data-answer');
        saId = $(input).attr('data-section');
        aComments = '';
        if ($('input[type=text][data-question=' + $(input).attr('data-question') + ']')) {
            aComments = $('input[type=text][data-question=' + $(input).attr('data-question') + ']').val();
        }
        questionsAnswers.push({ ID_RESPUESTA: aId, ID_EVALUACION: evaluacion.ID, ID_PREGUNTA: qId, ID_SECCION: saId, RESPUESTA: aId, COMENTARIOS: aComments });
    });
    qId = '0';
    aId = '0';
    saId = '0';

    $.each(qAnswersChbx, function (index, input) {
        qId = $(input).attr('data-question');
        aId = $(input).attr('data-answer');
        saId = $(input).attr('data-surveyanswer');
        aComments = '';
        if ($('input[type=text][data-question=' + $(input).attr('data-question') + ']')) {
            aComments = $('input[type=text][data-question=' + $(input).attr('data-question') + ']').val();
        }
        questionsAnswers.push({ ID_RESPUESTA: aId, ID_EVALUACION: evaluacion.ID, ID_PREGUNTA: qId, ID_SECCION: saId, RESPUESTA: aId, COMENTARIOS: aComments });
    });
    qId = '0';
    aId = '0';
    saId = '0';
    $.each(qAnswersOpen, function (index, input) {
        qId = $(input).attr('data-question');
        saId = $(input).attr('data-surveyanswer');
        aComments = '';
        //aComments = $('textarea[data-question=' + $(input).attr('data-question') + ']').val();
        questionsAnswers.push({ ID_RESPUESTA: aId, ID_EVALUACION: evaluacion.ID, ID_PREGUNTA: qId, ID_SECCION: saId, RESPUESTA: $(input).val(), COMENTARIOS: aComments });
    });
    $.each(qAnswersSelect, function (index, input) {
        qId = $(input).attr('data-question');
        saId = $(input).attr('data-surveyanswer');
        aComments = '';
        //aComments = $('textarea[data-question=' + $(input).attr('data-question') + ']').val();
        questionsAnswers.push({ ID_RESPUESTA: aId, ID_EVALUACION: evaluacion.ID, ID_PREGUNTA: qId, ID_SECCION: saId, RESPUESTA: $(input).val(), COMENTARIOS: aComments });
    });
    var url = $('#UrlSaveSurvey').val();
    Swal.fire({
        title: 'Guardando sección...',
        allowOutsideClick: false,
        html: '',
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        data: "{Data:" + JSON.stringify(questionsAnswers) + "}",
        success: function (response) {
            Swal.close();
            if (response.accion) {
                ToastMessage.fire('Guardado!', 'La sección se ha guardado correctamente', 'success');
            }
            else {
                ToastMessage.fire('Error!', 'No se pudo completar la operación', 'error');
            }
            ShowSection(1);
        },
        error: function (response) {
            Swal.close();
            ToastMessage.fire('Error!', 'No se pudo completar la operación', 'error');
            console.log("Something went wrong call the police");
        }
    });
}


$(document).ready(function () {
    
   
    $('#btnStart').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('div.has-error').removeClass('has-error');
        Swal.fire({
            title: 'Obteniendo cuestionario...',
            allowOutsideClick: false,
            html: '',
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
        var url = $('#UrlPrueba').val();
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            dataType: "JSON",
            data: "{ID:" + $('#PruebaID').val() + "}",
            success: function (response) {
                Swal.close();
                var data = response;
                if (data.isError === false && data.DataItem !== null) {
                    evaluacion = data.DataItem;
                    ShowEvaluacion();
                }
            },
            error: function (response) { Swal.close(); }
        });
    });

    $('#btnBack').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        ShowSection(-1);
    });

    $('#btnNext').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        guardadoParcial();
    });


    $('#btnFinish').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        var qAnswersRadio = $('#divSurveyPanel > .data-section:visible').find('input[type=radio]:checked');
        var qAnswersChbx = $('#divSurveyPanel > .data-section:visible').find('input[type=checkbox]:checked');
        var qAnswersOpen = $('#divSurveyPanel > .data-section:visible').find('textarea[type=text].q-open');
        var qAnswersSelect = $('#divSurveyPanel > .data-section:visible').find('select');

        var questionsAnswers = [];
        var aId = '0';
        var qId = '0';        
        var saId = '0';
        var aComments = '';
        $.each(qAnswersRadio, function (index, input) {
            qId = $(input).attr('data-question');
            aId = $(input).attr('data-answer');
            saId = $(input).attr('data-section');
            aComments = '';
            if ($('input[type=text][data-question=' + $(input).attr('data-question') + ']')) {
                aComments = $('input[type=text][data-question=' + $(input).attr('data-question') + ']').val();
            }
            questionsAnswers.push({ ID_RESPUESTA: aId, ID_EVALUACION: evaluacion.ID, ID_PREGUNTA: qId, ID_SECCION: saId, RESPUESTA: aId, COMENTARIOS: aComments });
        });
        qId = '0';
        aId = '0';
        saId = '0';

        $.each(qAnswersChbx, function (index, input) {
            qId = $(input).attr('data-question');
            aId = $(input).attr('data-answer');
            saId = $(input).attr('data-surveyanswer');
            aComments = '';
            if ($('input[type=text][data-question=' + $(input).attr('data-question') + ']')) {
                aComments = $('input[type=text][data-question=' + $(input).attr('data-question') + ']').val();
            }
            questionsAnswers.push({ ID_RESPUESTA: aId, ID_EVALUACION: evaluacion.ID, ID_PREGUNTA: qId, ID_SECCION: saId, RESPUESTA: aId, COMENTARIOS: aComments });
        });
        qId = '0';
        aId = '0';
        saId = '0';
        $.each(qAnswersOpen, function (index, input) {
            qId = $(input).attr('data-question');
            saId = $(input).attr('data-surveyanswer');
            aComments = '';
            //aComments = $('textarea[data-question=' + $(input).attr('data-question') + ']').val();
            questionsAnswers.push({ ID_RESPUESTA: aId, ID_EVALUACION: evaluacion.ID, ID_PREGUNTA: qId, ID_SECCION: saId, RESPUESTA: $(input).val(), COMENTARIOS: aComments });
        });
        $.each(qAnswersSelect, function (index, input) {
            qId = $(input).attr('data-question');
            saId = $(input).attr('data-surveyanswer');
            aComments = '';
            //aComments = $('textarea[data-question=' + $(input).attr('data-question') + ']').val();
            questionsAnswers.push({ ID_RESPUESTA: aId, ID_EVALUACION: evaluacion.ID, ID_PREGUNTA: qId, ID_SECCION: saId, RESPUESTA: $(input).val(), COMENTARIOS: aComments });
        });
        var url = $('#UrlSaveSurvey').val();
        Swal.fire({
            title: 'Procesando!',
            allowOutsideClick: false,
            html: '',
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        console.log(questionsAnswers);
        debugger;

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            dataType: "JSON",
            data: "{Data:" + JSON.stringify(questionsAnswers) + "}",
            success: function (response) {
                Swal.close();
                if (response.accion) {
                    Swal.fire('Guardado!', 'La evaluación se ha guardado correctamente', 'success');
                    $('#divSurveyPanel').hide();
                    $('#divContaactInfo').hide();
                    $('#divButtons').hide();
                    $('#divThanks').show();
                }
                else {
                    Swal.fire('Error!', 'No se pudo completar la operación', 'error');
                    $('#divSurveyPanel').show();
                    $('#divContaactInfo').show();
                    $('#divButtons').show();
                    $('#divThanks').hide();
                }
            },
            error: function (response) {
                Swal.close();
                Swal.fire('Error!', 'No se pudo completar la operación', 'error');
                console.log("Something went wrong call the police");
            }
        });
    });

    // scroll body to 0px on click
    $('#back-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $('#btnNoConfirm').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        ClearContact();
        $('#inEmail').val('');
        $('#mConfirmation').modal('hide');
        $('#divSection input[type=checkbox]').prop('checked', false);
    });

    $('#btnYesConfirm').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#mConfirmation').modal('hide');
        ShowEvaluacion();
    });
    
    $('body').on('click', '.btnNewQuestion', function (e) {
        var indexQ = parseInt($(this).attr('data-index'));
        $(this).attr('data-index', indexQ + 1);
        var ID_SECCION = parseInt($(this).attr('data-section'));
        var TIPO_PREGUNTA = parseInt($(this).attr('data-tipopregunta'));
        var TIPO_SECCION = parseInt($(this).attr('data-tiposeccion'));
        e.preventDefault();
        e.stopPropagation();       
        newQuestion(indexQ, ID_SECCION, TIPO_PREGUNTA, TIPO_SECCION);
    });

    $('body').on('click', '.btnAddQuestion', function (e) {
        var indexQ = parseInt($(this).attr('data-index'));
        $(this).attr('data-index', indexQ + 1);
        var ID_SECCION = parseInt($(this).attr('data-section'));
        var ID_TIPOPREGUNTA = parseInt($(this).attr('data-tipopregunta'));
        var ID_TIPOSECCION = parseInt($(this).attr('data-tiposeccion'));

        e.preventDefault();
        e.stopPropagation();
        var _PREGUNTAS = [];
        var url = $('#UrlAddQuestion').val();

        if (ID_TIPOSECCION === 1) {
            var preguntas = $('input.newAnswerTextLaboral');
            $.each(preguntas, function (index, input) {
                var nuevapregunta = {};
                nuevapregunta["ID_SECCION"] = ID_SECCION;
                nuevapregunta["PREGUNTA"] = $(input).data("title");
                nuevapregunta["RESPUESTA"] = $(input).val();
                nuevapregunta["ID_EVALUACION"] = evaluacion.ID;
                nuevapregunta["ORDEN"] = $(input).data("order");

                _PREGUNTAS.push(nuevapregunta);
            });

            
        }
        else {
            var PREGUNTA = $('input.newQuestion').val();
            var ID_RESPUESTA = $('input.newQuestionAnswer:checked').attr('data-answer');
            var RESPUESTA = ID_TIPOPREGUNTA === 1 ? $('input.newAnswerText').val() : ID_RESPUESTA;
            var REACCION = $('input.newQuestionComments').val();

            var nuevapregunta = {};
            nuevapregunta["ID_SECCION"] = ID_SECCION;
            nuevapregunta["PREGUNTA"] = PREGUNTA;
            nuevapregunta["ID_RESPUESTA"] = ID_RESPUESTA;
            nuevapregunta["RESPUESTA"] = RESPUESTA;
            nuevapregunta["REACCION"] = REACCION;
            nuevapregunta["ID_EVALUACION"] = evaluacion.ID;
            nuevapregunta["ORDEN"] = indexQ;

            _PREGUNTAS.push(nuevapregunta);
        }

        Swal.fire({
            title: 'Guardando preguntas...',
            allowOutsideClick: false,
            html: '',
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            dataType: "JSON",
            data: "{Data:" + JSON.stringify(_PREGUNTAS) + "}",
            success: function (response) {
                Swal.close();
                var data = response;
                if (data.isError === false) {

                    var divSection = $('div.data-section[data-id=' + ID_SECCION + ']');

                    if (ID_TIPOSECCION !== 1) {
                        var divQ = $('input.newQuestion').parent().parent();
                        $('input.newQuestion').parent().remove();
                        divQ.find('label.question > span').append(PREGUNTA);
                    }

                    $.each(data.Items, function (ind, resp) {
                        var elementos = $('.newQuestionOrden-' + resp.DataItem.ORDEN);
                        indexQ = resp.DataItem.ORDEN;

                        $.each(elementos, function (index, elem) {
                            $(elem).removeClass('newAnswerTextLaboral ').attr('data-question', resp.DataItem.ID);
                        });
                    });
                    

                    $($('div.data-section[data-id=' + ID_SECCION + ']').find('.btnAddQuestion')[0]).remove();
                    $($('div.data-section[data-id=' + ID_SECCION + ']').find('.btnCancelQuestion')[0]).remove();
                    divSection.append("<a class='btnNewQuestion btn btn-warning' href='#' class='btn btn-info' data-section='{0}' data-index='{1}' data-tipopregunta='{2}' data-tiposeccion='{3}'><span>Add Question</span></a>".format(ID_SECCION, indexQ, ID_TIPOPREGUNTA, ID_TIPOSECCION));

                }
            },
            error: function (response) { Swal.close(); }
        });        
    });

    $('body').on('click', '.btnCancelQuestion', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var indexQ = parseInt($(this).attr('data-index'));
        var sectionId = parseInt($(this).data('section'));
        var ID_TIPOPREGUNTA = parseInt($(this).attr('data-tipopregunta'));
        var ID_TIPOSECCION = parseInt($(this).attr('data-tiposeccion'));

        if (ID_TIPOSECCION === 1) {
            $('#section-' + sectionId + ' > div.newLaboral').remove();
        } else {
            $('#section-' + sectionId + ' > div.survey').last().remove();
        }

        var divSection = $('div.data-section[data-id=' + sectionId + ']');
        $($('div.data-section[data-id=' + sectionId + ']').find('.btnAddQuestion')[0]).remove();
        $($('div.data-section[data-id=' + sectionId + ']').find('.btnCancelQuestion')[0]).remove();
        divSection.append("<a class='btnNewQuestion btn btn-warning' href='#' class='btn btn-info' data-section='{0}' data-index='{1}' data-tipopregunta='{2}' data-tiposeccion='{3}'><span>Add Question</span></a>".format(sectionId, indexQ - 1, ID_TIPOPREGUNTA, ID_TIPOSECCION));
    });
});