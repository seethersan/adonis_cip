$(document).ready(function(){
  var iframes = document.getElementsByTagName("iframe");
  var buttons = document.getElementsByClassName("btn");
  var initial_srcs = [];
  var initial_hrefs = [];

  var category = $('#category option:selected').val();
  var objeto = $('#objeto option:selected').val();
  getAlarmEvents(category, objeto);
  getEvents(category, objeto);

  $("#category").change(function(){
    var category = $('#category option:selected').val();
    var objeto = $('#objeto option:selected').val();
    getAlarmEvents(category, objeto);
    getEvents(category, objeto);
  });

  $("#objeto").change(function(){
    var category = $('#category option:selected').val();
    var objeto = $('#objeto option:selected').val();
    getAlarmEvents(category, objeto);
    getEvents(category, objeto);
  });

  $('#event').change(function(){
    var event = $('#event option:selected').val();

    $.ajax({
      type: "POST",
      url: "/api/getdates",
      contentType: "application/json",
      dataType: 'json',
      data: JSON.stringify({
        "event": event
      }),
      success: function(result){
        $('#time-period').empty();
        $('#time-period').append('<option disabled selected value> -- select an option -- </option>');
        result.forEach(period => {
          var start_date = new Date(period.AlarmDateTime);
          var end_date = new Date(period.ClearedDateTime);
          $('#time-period').append('<option value="'+ start_date + ',' + end_date + '">'+ start_date.toString().replace(/GMT.+/,"")  + '</option>');
        });
      }
    });
  });

  for (i=0; i < iframes.length; i++){
    var iframe = iframes[i];
    var button = buttons[i];
    initial_srcs.push(iframe.src);
    initial_hrefs.push(button.href.replace("-solo", ""));
  }
  $('#time-period').change(function() {
    time_period = $("#time-period option:selected").val().split(',');
    var start_date = new Date(time_period[0]);
    var end_date = new Date(time_period[1]);
    for (i=0; i < iframes.length; i++){
      iframes[i].src = initial_srcs[i] + "&from=" + start_date.getTime() + "&to=" + end_date.getTime();
      buttons[i].href = initial_hrefs[i] + "&from=" + start_date.getTime() + "&to=" + end_date.getTime();
    }
  });
});

function getAlarmEvents(category, objeto){
  $.ajax({
    type: "POST",
    url: "/api/getalarmevents",
    contentType: "application/json",
    dataType: 'json',
    data: JSON.stringify({
      "category": category,
      "objeto": objeto ? objeto : ""
    }),
    success: function(result){
      $('#almevnt').empty();
      var almevnt = $('#alarmevent').val();
      if (result != undefined){
        result.forEach(event => {        
            var event_name = event.AlarmText;
            $('#almevnt').append('<option value="'+ event_name + '"' + (event_name == almevnt ? ' selected' : '') + '>'+ event_name  + '</option>');    
        });
      }
    }
  });
}

function getEvents(category, objeto){
  $.ajax({
    type: "POST",
    url: "/api/getevents",
    contentType: "application/json",
    dataType: 'json',
    data: JSON.stringify({
      "category": category,
      "objeto": objeto ? objeto : ""
    }),
    success: function(result){
      $('#event').empty();
      $('#event').append('<option disabled selected value> -- select an option -- </option>');
      if (result != undefined){
        result.forEach(event => {
          var event_name = event.title;
          $('#event').append('<option value="'+ event_name + '">'+ event_name  + '</option>');
        });
      }
    }
  });
}