function fillSleepDiaryFields(){
    var bt = document.getElementById('btnSDNext');
    var bedTime = $("#bedTime").val();
    var trySleepTime = $("#trySleepTime").val();
    var sleepTime = $("#sleepTime").val();
    var wakeUpCount = document.getElementById('wakeUpCount').innerHTML;
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

function displaySleepMed(div1, div2){
    let trialNo = window.localStorage.getItem("trialNo");
    var x = document.getElementById(div1);
    var y = document.getElementById(div2);
    
    x.style.display = 'none';
    y.style.display = 'block';

    if(trialNo == 1){
        document.getElementById('trial1Med').style.display = 'block';
    }else if(trialNo == 2){
        document.getElementById('trial2Med').style.display = 'block';
    }
     
}


$(document).ready(function () {

     var bt = document.getElementById('btnSDNext');
     bt.disabled = true;

    $('#bedTime, #trySleepTime, #sleepTime, #wakeUpCount, #finalAwakeTime, #outOfBedTime, #awakeLast').keyup(fillSleepDiaryFields);

    $("#wakeUpCount, #medName1Val, #medName2Val, #otherAmTaken, #anyAmTaken").keypress(function(e) {
        if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
    });

    document.getElementById('diaryHeader').innerHTML = window.localStorage.getItem("linkText");
    //alert(window.localStorage.getItem("linkText"));

    //Go back to dashboard
    $('#btnBackMain').on('click', function(event){
        window.location.href = "patient-dashboard.html";
    });

    var minuteOpt = document.getElementById("minuteOpt");
    var minContents;
    for (let i = 0; i <= 59; i++) {
        minContents += "<option value='"+ i +"'>" + i + "</option>";
    }
    minuteOpt.innerHTML = minContents;

    var hourOpt = document.getElementById("hourOpt");
    var contents;
    for (let i = 1; i <= 24; i++) {
        contents += "<option value='"+ i +"'>" + i + "</option>";
    }
    hourOpt.innerHTML = contents;


    //Submit Sleep diary
    $('#btnSubSleepDiary').on('click', function(event){
        event.preventDefault();
    
        var bedTime = document.getElementById("bedTime").value;
        // let bedTimeMins = parseInt(bedTime.split(":").pop());
        // let bedTimeHrs = parseInt(bedTime.split(":", 1));
        //window.localStorage.setItem("bedTime", bedTime);

        var trySleepTime = document.getElementById("trySleepTime").value;
        // let trySleepTimeMins = parseInt(trySleepTime.split(":").pop());
        // let trySleepTimeHrs = parseInt(trySleepTime.split(":", 1));
        //window.localStorage.setItem("trySleepTime", trySleepTime);

        var fallSleepTime = document.getElementById("sleepTime").value;
        // let fallSleepTimeMins = parseInt(fallSleepTime.split(":").pop());
        // let fallSleepTimeHrs = parseInt(fallSleepTime.split(":", 1));
        //window.localStorage.setItem("fallSleepTime", fallSleepTime);

        var finalAwakeTime = document.getElementById("finalAwakeTime").value;
        // let finalAwakeTimeMins = parseInt(finalAwakeTime.split(":").pop());
        // let finalAwakeTimeHrs = parseInt(finalAwakeTime.split(":", 1));
        //window.localStorage.setItem("finalAwakeTime", finalAwakeTime);

        var outOfBedTime = document.getElementById("outOfBedTime").value;
        // let outOfBedTimeMins = parseInt(outOfBedTime.split(":").pop());
        // let outOfBedTimeHrs = parseInt(outOfBedTime.split(":", 1));
        //window.localStorage.setItem("outOfBedTime", outOfBedTime);

        //var awakeLast = document.getElementById("awakeLast").value;
        // let awakeLastMins = parseInt(awakeLast.split(":").pop());
        // let awakeLastHrs = parseInt(awakeLast.split(":", 1));
        //window.localStorage.setItem("awakeLast", awakeLast);

        var wakeUpCount = document.getElementById('wakeUpCount').innerHTML;
        const value = 2
        let wakeUpCountInt = 1;
        if (typeof value === wakeUpCount) {
            wakeUpCountInt = parseInt(wakeUpCount);
        }
        //window.localStorage.setItem("wakeUpCountInt", wakeUpCountInt);

        var otherNote = document.getElementById("otherNote").value;
        //window.localStorage.setItem("otherNote", otherNote);

        var sleepQty = getQuality();
        if(sleepQty == ''){
            sleepQty = 'Fair';
        }
        //window.localStorage.setItem("sleepQty", sleepQty);

        var wakeUpCount = document.getElementById('wakeUpCount').innerHTML;
        var hourOpt  = document.getElementById('hourOpt').value;
        var minuteOpt  = document.getElementById('minuteOpt').value;
        var awakeLast = hourOpt+"."+minuteOpt;

        var medName1Name = document.getElementById('medName1').innerHTML;
        var medName2Name = document.getElementById('medName2').innerHTML;
        var medName1Val = document.getElementById('medName1Val').innerHTML;
        var medName2Val = document.getElementById('medName2Val').innerHTML;

        let trialNo = window.localStorage.getItem("trialNo");
        if(trialNo == 1){
            var otherMedName = document.getElementById('anyMedName').innerHTML;
            var otherAmTaken = document.getElementById('anyAmTaken').innerHTML;
        }else if(trialNo == 2){
            var otherMedName = document.getElementById('otherMedName').innerHTML;
            var otherAmTaken = document.getElementById('otherAmTaken').innerHTML;
        }

        var sleepDate =  window.localStorage.getItem("submitDate");
        let pID = window.localStorage.getItem("submitID");
        var med1Date = window.localStorage.getItem("medDate1"); 
        let med1ID = window.localStorage.getItem("medID1"); 
        var med2Date = window.localStorage.getItem("medDate2"); 
        let med2ID = window.localStorage.getItem("medID2"); 
        let authToken = window.localStorage.getItem("patientToken");

        //window.location.href = "sleep-medication.html";

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
                // "bedTime": bedTime,
                // "date_Created": sleepDate,
                // "finalWakeupTime": finalAwakeTime,
                // "otherThings": otherNote,
                // "sleepQuality": sleepQty,
                // "timeLeftbed": outOfBedTime,
                // "timeSleptoff": fallSleepTime,
                // "totalWakeUpduration": awakeLast,
                // "tryTosleepTime": trySleepTime,
                // "wakeUptimeCount": wakeUpCountInt,
                // "id": pID

                "id":pID,
                "bedTime": bedTime,
                "tryTosleepTime": trySleepTime,
                "timeSleptoff": fallSleepTime,
                "wakeUptimeCount": wakeUpCountInt,
                "totalWakeUpduration": awakeLast,
                "finalWakeupTime": finalAwakeTime,
                "timeLeftbed": outOfBedTime,
                "sleepQuality": sleepQty,
                "otherThings": otherNote,
                    "medications" : [
                        {
                "id": med1ID,
                "medicationName": medName1Name,
                "amount": medName1Val,
                "date_Created": med1Date
                },
                        {
                "id": med2ID,
                "medicationName": medName2Name,
                "amount": medName2Val,
                "date_Created": med2Date
                },
                {
                "medicationName": otherMedName,
                "amount": otherAmTaken,
                "date_Created": "2021-01-20T19:55:12.763"
                }
                        ],
                "date_Created": sleepDate

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