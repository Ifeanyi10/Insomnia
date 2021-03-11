
function formatTime(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return  rhours + " hour(s) and " + rminutes + " minute(s).";
}

$(document).ready(function () {

    //Patient SLeep Report Generation
    $('#btnGenReport').on('click', function(event){
        event.preventDefault();
    
        var reportDisplay = document.getElementById("reportDisplay");
        var dStart = document.getElementById("dStart").value;
        var dEnd = document.getElementById("dEnd").value;
        var newDStart = moment(dStart, "MM/DD/YYYY").format("YYYY-MM-DD")
        var newDEnd = moment(dEnd, "MM/DD/YYYY").format("YYYY-MM-DD")
        var tbID = document.getElementById("patReportTB");

        // alert(JSON.stringify({
        //     "startDate" : newDStart,
        //     "endDate" : newDEnd
        //     }))
        let authToken = window.localStorage.getItem("patientToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/dashboard/mysleepreport';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "startDate" : newDStart,
                "endDate" : newDEnd
                }),
            success: function(result){
                console.log(result);
                // document.getElementById('repAvBedTime').innerHTML  = result.averageBedtime;
                // document.getElementById('repAvSleepLat').innerHTML  = formatTime(result.sleeplatency);
                // document.getElementById('repAvAwakes').innerHTML  = result.averagenumberofawakenings;
                // document.getElementById('repAvDurationAwakes').innerHTML  = formatTime(result.waso);
                // document.getElementById('repAvTib').innerHTML  = formatTime(result.tib);
                // document.getElementById('repTotSpTime').innerHTML  = formatTime(result.tst);
                // document.getElementById('repSpEfficiency').innerHTML  = result.se;
                reportDisplay.style.display = 'block';
                
                tbID.rows[1].cells[1].innerHTML = result.averageBedtime;
                tbID.rows[2].cells[1].innerHTML = formatTime(result.sleeplatency);
                tbID.rows[3].cells[1].innerHTML = result.averagenumberofawakenings;
                tbID.rows[4].cells[1].innerHTML = formatTime(result.waso);
                tbID.rows[5].cells[1].innerHTML = formatTime(result.tib);
                tbID.rows[6].cells[1].innerHTML = formatTime(result.tst);
                tbID.rows[7].cells[1].innerHTML = result.se;
            }, 
            error: function(msg){
                //alert(msg)
                $("#errorContainer").html("Unable to generate");
                sweetAlert("Sleep report generation failed!","Please try again shortly","error");
            }
        });
    });


    //Patient SLeep Clock Submission
    $('#btnConfirmClock').on('click', function(event){
        event.preventDefault();
    
        var revisedbedtime = document.getElementById("clockBedTime").value;
        var revisedrisetime = document.getElementById("clockRiseTime").value;
        var clockBedTime =  window.localStorage.getItem("yBedTime");
        var clockRiseTime = window.localStorage.getItem("yRiseTime");

        let authToken = window.localStorage.getItem("patientToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/dashboard/saveleepwindow';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "bedtime" : clockBedTime,
                "risetime" : clockRiseTime,
                "revisedbedtime" : revisedbedtime,
                "revisedrisetime" : revisedrisetime
                }),
            success: function(result){
                console.log(result);
                swal({title: "Good!", text: "Your Next Week Sleep Clock Has Been Set", type: "success"},
                function(){ 
                    window.location.href = "patient-dashboard.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to set sleep clock");
                sweetAlert("Unable to set your sleep clock for next week!","Please try again shortly","error");
            }
        });
    });


});