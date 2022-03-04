


var calendarInit = function () {
    if ($('#kt_calendare').length === 0) {
        return;
    }

    var todayDate = moment().startOf('day');
    var TODAY = todayDate.format('YYYY-MM-DD');


    $('#kt_calendare').fullCalendar({
        isRTL: KTUtil.isRTL(),
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        navLinks: true,
        defaultDate: TODAY,
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        buttonText: {
            prev: "Ant",
            next: "Sig",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            list: "Agenda"
        },
        weekLabel: "Sm",
        allDayHtml: "Todo<br/>el día",
        eventLimitText: "más",
        noEventsMessage: "No hay eventos para mostrar",
        events: EVALUACIONES,
        eventRender: function (event, element) {
            if (element.hasClass('fc-day-grid-event')) {
                element.data('content', event.description);
                element.data('placement', 'top');
                KTApp.initPopover(element);
            } else if (element.hasClass('fc-time-grid-event')) {
                element.find('.fc-title').append('<div class="fc-description">' + event.description + '</div>');
            } else if (element.find('.fc-list-item-title').lenght !== 0) {
                element.find('.fc-list-item-title').append('<div class="fc-description">' + event.description + '</div>');
            }
        }
    });
}

var calendarUpdate = function (response) {
    var todayDate = moment().startOf('day');
    var TODAY = todayDate.format('YYYY-MM-DD');
    var EVALUACIONES1 = [];
    $.each(response, function (index, value) {
        EVALUACIONES1.push({
            title: value.Evaluado,
            start: moment(value.FechaEvaluacion + ' ' + value.Hora),
            description: value.AreaEvaluacion + ' - ' + value.Evaluador,
            className: "fc-event-light fc-event-solid-primary"
        });
    });
    $('#kt_calendare').fullCalendar('removeEvents', event);
    $("#kt_calendare").fullCalendar('renderEvents', EVALUACIONES1, true);
}

jQuery(document).ready(function () {
    calendarInit();
});