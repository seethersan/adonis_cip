$(document).ready(function(){
  var iframes = document.getElementsByTagName("iframe");
  var initial_srcs = [];

  $('#event').change(function(){
    var event = $('#event option:selected').val();

    $.ajax({
      url: "http://127.0.0.1:3333/api/getdates/" + event,
      contentType: "application/json",
      dataType: 'json',
      success: function(result){
        $('#time-period').empty();
        result.forEach(period => {
          var start_date = new Date(period.AlarmDateTime);
          var end_date = new Date(period.ClearedDateTime);
          $('#time-period').append('<option value="'+ start_date + ',' + end_date + '">'+ start_date  + '</option>');
        });
      }
    });
  });

  for (i=0; i < iframes.length; i++){
    var iframe = iframes[i];
    initial_srcs.push(iframe.src);
  }
  $('#time-period').change(function() {
    time_period = $("#time-period option:selected").val().split(',');
    var start_date = new Date(time_period[0]);
    var end_date = new Date(time_period[1]);
    for (i=0; i < iframes.length; i++){
      iframes[i].src = initial_srcs[i] + "&from=" + start_date.getTime() + "&to=" + end_date.getTime();
    }
  });
});