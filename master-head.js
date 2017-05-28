//graph
      // onload callback
      function drawChart() {

        var public_key = 'wpg0w3lvXMU76nYQxqgr';

        // JSONP request
        var jsonData = $.ajax({
          url: 'https://data.sparkfun.com/output/' + public_key + '.json',
          data: {page: 1},
          dataType: 'jsonp',
        }).done(function (results) {
document.getElementById("load").style.display = "none";
          var data = new google.visualization.DataTable();

          data.addColumn('datetime', 'Time');
          data.addColumn('number', 'humidity');
          data.addColumn('number', 'temperature');

          $.each(results, function (i, row) {
            data.addRow([
              (new Date(row.timestamp)),
              parseFloat(row.humidity),
              parseFloat(row.temperature)
            ]);
          });

          var chart = new google.visualization.LineChart($('#chart').get(0));

          chart.draw(data, {
            title: 'DHT11 Logger'
          });

        });

      }

      // load chart lib
      google.load('visualization', '1', {
        packages: ['corechart']
      });

      // call drawChart once google charts is loaded
      google.setOnLoadCallback(drawChart);











//Personal Counter- by Jaafar Bin Yusof, Singapore (jaafar66@yahoo.com)
//Modified by JavaScript Kit (http://javascriptkit.com)
//Visit http://javascriptkit.com for this script

expireDate = new Date
expireDate.setMonth(expireDate.getMonth()+6)
jcount = eval(cookieVal("jaafarCounter"))
jcount++
document.cookie = "jaafarCounter="+jcount+";expires=" + expireDate.toGMTString()

function cookieVal(cookieName) {
thisCookie = document.cookie.split("; ")
for (i=0; i<thisCookie.length; i++){
	if (cookieName == thisCookie[i].split("=")[0]){
		return thisCookie[i].split("=")[1]
	}
}
return 0
}

function page_counter(){
for (i=0;i<(7-jcount.toString().length);i++)
document.write('<span class="counter">0</span>')
for (y=0;y<(jcount.toString().length);y++)
document.write('<span class="counter">'+jcount.toString().charAt(y)+'</span>')
}