function fillSleepDiaryFields(){
    var bt = document.getElementById('btnSubmitDairy');
    var bedTime = $("#bedTime").val();
    var trySleepTime = $("#trySleepTime").val();
    var sleepTime = $("#sleepTime").val();
    var wakeUpCount = $("#wakeUpCount").val();
    var finalAwakeTime = $("#finalAwakeTime").val();
    var outOfBedTime = $("#outOfBedTime").val();
    var awakeLast = $("#awakeLast").val();
    if (bedTime != '' && trySleepTime != '' && sleepTime != '' && wakeUpCount != '' && finalAwakeTime != '' && outOfBedTime != '' && awakeLast != '')  {
        bt.disabled = false;
    } else {
        bt.disabled = true;
    }
}

function getQuality(){
    //var divbox = document.getElementById('qtyBox');
    var radios = document.getElementsByTagName('input');
    var sleepQty = '';
        
    for (i = 0; i < radios.length; i++) {  
        if (radios[i].type == 'radio' && radios[i].checked) {
            sleepQty = radios[i].value;
        }
    }

    return sleepQty;
}


$(document).ready(function () {

    var bt = document.getElementById('btnSubmitDairy');
    bt.disabled = true;

    $('#bedTime, #trySleepTime, #sleepTime, #wakeUpCount, #finalAwakeTime, #outOfBedTime, #awakeLast').keyup(fillSleepDiaryFields);

    document.getElementById('diaryHeader').innerHTML = window.localStorage.getItem("linkText");
    //alert(window.localStorage.getItem("linkText"));

    //Go back to dashboard
    $('#btnBackMain').on('click', function(event){
        window.location.href = "patient-dashboard.html";
    });


    //Submit Sleep diary
    $('#btnSubmitDairy').on('click', function(event){
        event.preventDefault();
    
        var bedTime = document.getElementById("bedTime").value;
        let bedTimeMins = parseInt(bedTime.split(":").pop());
        let bedTimeHrs = parseInt(bedTime.split(":", 1));

        var trySleepTime = document.getElementById("trySleepTime").value;
        let trySleepTimeMins = parseInt(trySleepTime.split(":").pop());
        let trySleepTimeHrs = parseInt(trySleepTime.split(":", 1));

        var fallSleepTime = document.getElementById("sleepTime").value;
        let fallSleepTimeMins = parseInt(fallSleepTime.split(":").pop());
        let fallSleepTimeHrs = parseInt(fallSleepTime.split(":", 1));

        var finalAwakeTime = document.getElementById("finalAwakeTime").value;
        let finalAwakeTimeMins = parseInt(finalAwakeTime.split(":").pop());
        let finalAwakeTimeHrs = parseInt(finalAwakeTime.split(":", 1));

        var outOfBedTime = document.getElementById("outOfBedTime").value;
        let outOfBedTimeMins = parseInt(outOfBedTime.split(":").pop());
        let outOfBedTimeHrs = parseInt(outOfBedTime.split(":", 1));

        var awakeLast = document.getElementById("awakeLast").value;
        let awakeLastMins = parseInt(awakeLast.split(":").pop());
        let awakeLastHrs = parseInt(awakeLast.split(":", 1));

        var wakeUpCount = document.getElementById("wakeUpCount").value;
        let wakeUpCountInt = parseInt(wakeUpCount);

        let pID = parseInt(window.localStorage.getItem("patientsID"));
        var otherNote = document.getElementById("otherNote").value;
        var sleepQty = getQuality();
        var sleepDate =  window.localStorage.getItem("submitDate");
        let authToken = window.localStorage.getItem("patientToken");


        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/submit-sleepdiary';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "bedTime": {
                  "hour": bedTimeHrs,
                  "minute": bedTimeMins,
                  "nano": 0,
                  "second": 0
                },
                "date_Created": sleepDate,
                "finalWakeupTime": {
                  "hour": finalAwakeTimeHrs,
                  "minute": finalAwakeTimeMins,
                  "nano": 0,
                  "second": 0
                },
                "id": 0,
                "otherThings": otherNote,
                "patientID": pID,
                "sleepQuality": sleepQty,
                "timeLeftbed": {
                  "hour": outOfBedTimeHrs,
                  "minute": outOfBedTimeMins,
                  "nano": 0,
                  "second": 0
                },
                "timeSleptoff": {
                  "hour": fallSleepTimeHrs,
                  "minute": fallSleepTimeMins,
                  "nano": 0,
                  "second": 0
                },
                "totalWakeUpduration": {
                  "hour": awakeLastHrs,
                  "minute": awakeLastMins,
                  "nano": 0,
                  "second": 0
                },
                "tryTosleepTime": {
                  "hour": trySleepTimeHrs,
                  "minute": trySleepTimeMins,
                  "nano": 0,
                  "second": 0
                },
                "wakeUptimeCount": wakeUpCountInt
                
              }),
            success: function(result){
                console.log(result);
                swal({title: "Bravo!!", text: "Your day sleep diary has been submitted!!", type: "success"},
                function(){ 
                    window.location.href = "patient-dashboard.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Sleep diary submission failed!! Please try again shortly","error");
            }
        });
    });

    
 });