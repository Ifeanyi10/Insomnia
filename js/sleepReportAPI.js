

$(document).ready(function () {

    //Patient SLeep Report Generation
    $('#btnGenReport').on('click', function(event){
        event.preventDefault();
    
        var reportDisplay = document.getElementById("reportDisplay");
        var dStart = document.getElementById("dStart").value;
        var dEnd = document.getElementById("dEnd").value;
        var newDStart = moment(dStart, "MM/DD/YYYY").format("YYYY-MM-DD")
        var newDEnd = moment(dEnd, "MM/DD/YYYY").format("YYYY-MM-DD")

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
                document.getElementById('repAvBedTime').innerHTML  = result.averageBedtime;
                document.getElementById('repAvSleepLat').innerHTML  = result.sleeplatency;
                document.getElementById('repAvAwakes').innerHTML  = result.averagenumberofawakenings;
                document.getElementById('repAvDurationAwakes').innerHTML  = result.waso;
                document.getElementById('repAvTib').innerHTML  = result.tib;
                document.getElementById('repTotSpTime').innerHTML  = result.tst;
                document.getElementById('repSpEfficiency').innerHTML  = result.se;
                reportDisplay.style.display = 'block';
            }, 
            error: function(msg){
                //alert(msg)
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Sleep report generation failed! Please try again shortly","error");
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
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Unable to set your sleep clock for next week! Please try again shortly","error");
            }
        });
    });


});