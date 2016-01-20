function makeTimer() {
      var endTime = new Date("Feburary 8, 2016 02:31 :00 GMT");     
      var endTime = (Date.parse(endTime)) / 1000;
      var now = new Date();
      var now = (Date.parse(now) / 1000);
      var timeLeft = endTime - now;
      var days = Math.floor(timeLeft / 86400); 
      var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
      var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
      var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
      if (hours < "10") { hours = "0" + hours; }
      if (minutes < "10") { minutes = "0" + minutes; }
      if (seconds < "10") { seconds = "0" + seconds; }
      if(timeLeft< "0")
      {
        $("#days").html("The ");
        $("#hours").html( "Vision");
        $("#minutes").html( "Leaps");
        $("#seconds").html( "Ahead");    
      }
      else
      {
        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");   
  
      }
        
}
setInterval(function() { makeTimer(); }, 1000);
