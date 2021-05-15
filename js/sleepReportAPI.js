var urlDomain = window.localStorage.getItem("urlDomain");

function formatTime(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return  rhours + " hour(s) and " + rminutes + " minute(s).";
}

function PrintReportDiv() {  
    var patName =  "Health enSuite Sleep Report - " + window.localStorage.getItem("newDStart") + ' -To- '+ window.localStorage.getItem("newDEnd");;
    var divContents = document.getElementById("printDivContentReport").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>');  
    printWindow.document.write(patName); 
    printWindow.document.write('</title>'); 
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 


$(document).ready(function () {

    var sleepReporttObj = '';

    //Patient SLeep Report Generation
    $('#btnGenReport').on('click', function(event){
        event.preventDefault();
    
        var reportDisplay = document.getElementById("reportDisplay");
        var dStart = document.getElementById("dStart").value;
        var dEnd = document.getElementById("dEnd").value;
        var newDStart = moment(dStart, "MM/DD/YYYY").format("YYYY-MM-DD")
        var newDEnd = moment(dEnd, "MM/DD/YYYY").format("YYYY-MM-DD")
        var tbID = document.getElementById("patReportTB");
        var tbPrintID = document.getElementById("patReportTBPrint");
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        if (dStart != '' && dEnd != '')  {
            let authToken = window.localStorage.getItem("patientToken");
            let url = urlDomain + 'insomnia/v1/dashboard/mysleepreport';
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
                    sleepReporttObj = JSON.stringify(result);
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

                    tbPrintID.rows[1].cells[1].innerHTML = result.averageBedtime;
                    tbPrintID.rows[2].cells[1].innerHTML = formatTime(result.sleeplatency);
                    tbPrintID.rows[3].cells[1].innerHTML = result.averagenumberofawakenings;
                    tbPrintID.rows[4].cells[1].innerHTML = formatTime(result.waso);
                    tbPrintID.rows[5].cells[1].innerHTML = formatTime(result.tib);
                    tbPrintID.rows[6].cells[1].innerHTML = formatTime(result.tst);
                    tbPrintID.rows[7].cells[1].innerHTML = result.se;

                    var pName = result.firstName + ' ' + result.lastName;
                    //window.localStorage.setItem("patientsN", pName);
                    window.localStorage.setItem("newDStart", newDStart);
                    window.localStorage.setItem("newDEnd", newDEnd);

                    document.getElementById('patiName').innerHTML  = pName;
                    document.getElementById('dateGen').innerHTML  = today;
                    document.getElementById('stDate').innerHTML  = newDStart;
                    document.getElementById('enDate').innerHTML  = newDEnd;

                }, 
                error: function(msg){
                    //alert(msg)
                    $("#errorContainer").html("Unable to generate");
                    sweetAlert("Sleep report generation failed!","Please try again shortly","error");
                }
            });
        }else{
            sweetAlert("Date Intervals Required!","Please enter date intervals to generate your sleep report","info");
        }
    });


    //Patient SLeep Clock Submission
    $('#btnConfirmClock').on('click', function(event){
        event.preventDefault();
    
        var revisedbedtime = document.getElementById("clockBedTime").value;
        var revisedrisetime = document.getElementById("clockRiseTime").value;
        var clockBedTime =  window.localStorage.getItem("yBedTime");
        var clockRiseTime = window.localStorage.getItem("yRiseTime");

        let authToken = window.localStorage.getItem("patientToken");
        let url = urlDomain + 'insomnia/v1/dashboard/saveleepwindow';
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


    //Patient SLeep Report Sharing Submission
    $('#btnShareReport').on('click', function(event){
        event.preventDefault();

        let authToken = window.localStorage.getItem("patientToken");
        let url = urlDomain + 'insomnia/v1/dashboard/sharereport';

        if(sleepReporttObj != null){
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*',
                    'Authorization': 'Bearer '+ authToken
                },
                data: sleepReporttObj,
                success: function(result){
                    console.log(result);
                    swal({title: "Done!", text: "Sleep report shared successfully with your health care provider.", type: "success"}
                    );
                }, 
                error: function(msg){
                    $("#errorContainer").html("Unable to set sleep clock");
                    sweetAlert("Unable to share your sleep report!","Please try again shortly","error");
                }
            });
        }else{
            sweetAlert("No sleep report to share!","Please try again shortly","error");
        }
        
    });


});