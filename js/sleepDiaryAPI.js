var urlDomain = window.localStorage.getItem("urlDomain");

// function fillSleepDiaryFields(){
//     var bt = document.getElementById('btnSDNext');
//     var bedTime = $("#bedTime").val();
//     var trySleepTime = $("#trySleepTime").val();
//     var sleepTime = $("#sleepTime").val();
//     var wakeUpCount = document.getElementById('wakeUpCount').innerHTML;
//     var finalAwakeTime = $("#finalAwakeTime").val();
//     var outOfBedTime = $("#outOfBedTime").val();
//     var awakeLast = $("#awakeLast").val();
//     if (bedTime != '' && trySleepTime != '' && sleepTime != '' && wakeUpCount != '' && finalAwakeTime != '' && outOfBedTime != '' && awakeLast != '')  {
//         bt.disabled = false;
//     } else {
//         bt.disabled = true;
//     }
// }


function getQuality(){
    //var divbox = document.getElementById('qtyBox');
    var radios = document.forms['qtID'].elements['rate'];
    var sleepQty = '';
        
    for (i = 0; i < radios.length; i++) {  
        if (radios[i].checked) {
            sleepQty = radios[i].value;
        }
    }

    return sleepQty;
}

function validateSelect(elementId){
    var selectOpt = document.getElementById(elementId);
    if(selectOpt.value == ""){
        selectOpt.style.border = "1px solid red";
    }else{
        selectOpt.style.border = "1px solid #BCBCBC";
    }
}

function displaySleepMed(div1, div2, hds){
    let trialNo = window.localStorage.getItem("trialNo");
    var x = document.getElementById(div1);
    var y = document.getElementById(div2);
    var hds = document.getElementById(hds);
    var variableOk = true;

    var hourOpt = document.getElementById('hourOpt');
    var minuteOpt = document.getElementById('minuteOpt');
    var spHourOpt = document.getElementById('spHourOpt');
    var spMinuteOpt = document.getElementById('spMinuteOpt');

    if(hourOpt.value == ""){
        hourOpt.style.border = "1px solid red";
        variableOk = false;
    }else{
        hourOpt.style.border = "1px solid #BCBCBC";
    }

    if(minuteOpt.value == ""){
        minuteOpt.style.border = "1px solid red";
        variableOk = false;
    }else{
        minuteOpt.style.border = "1px solid #BCBCBC";
    }

    if(spHourOpt.value == ""){
        spHourOpt.style.border = "1px solid red";
        variableOk = false;
    }else{
        spHourOpt.style.border = "1px solid #BCBCBC";
    }

    if(spMinuteOpt.value == ""){
        spMinuteOpt.style.border = "1px solid red";
        variableOk = false;
    }else{
        spMinuteOpt.style.border = "1px solid #BCBCBC";
    }
    
    if(variableOk){
        x.style.display = 'none';
        hds.style.display = 'none';
        y.style.display = 'block';

        if(trialNo == 1){
            document.getElementById('trial1Med').style.display = 'block';
        }else if(trialNo == 2){
            document.getElementById('trial2Med').style.display = 'block';
    }
    }else{
        sweetAlert("Alert!","Please select the hour and minute properly.","error");
    }
}


function hideDisplayMed(firstDisplay, secondDisplay, hds){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    var hds = document.getElementById(hds);
    
    x.style.display = 'none';
    hds.style.display = 'block';
    y.style.display = 'block';
}


function fillSelectOption(elementId, startVal, endVal){
    var selectOpt = document.getElementById(elementId);
    var contents;
    for (let i = startVal; i <= endVal; i++) {
        contents += "<option value='"+ i +"'>" + i + "</option>";
    }
    selectOpt.innerHTML += contents;
}

function checkWakeUpCount(){
    var bt = document.getElementById('btnSDNext');
    var wakeUpCount = $('#wakeUpCount').text();
    var validNum = wakeUpCount.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
    if (wakeUpCount != "" && validNum != null)  {
        bt.disabled = false;
    } else {
        bt.disabled = true;
    }
}


$(document).ready(function () {

     var bt = document.getElementById('btnSDNext');
     bt.disabled = true;

    //$('#wakeUpCount').keyup(fillSleepDiaryFields);

    // $("#wakeUpCount, #medName1Val, #medName2Val, #otherAmTaken, #anyAmTaken").keyup(function(e) {
    //     if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
    //     var bt = document.getElementById('btnSDNext');
    //     var wakeUpCount = document.getElementById('wakeUpCount').innerHTML;
    //     var sleepQty = getQuality();
    //     if (wakeUpCount != '' && sleepQty != '')  {
    //         bt.disabled = false;
    //     } else {
    //         bt.disabled = true;
    //     }
    // });

    jQuery(".NumberDiv").on('click paste keydown keyup', function (e) {
        var text = jQuery(this).text();
        var fullID = text.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
        var bt = document.getElementById('btnSDNext');
        var sleepQty = getQuality();
        if (fullID != null){
            jQuery(this).css("color","black");
            jQuery(this).css("border","1px solid #BCBCBC");
            if(sleepQty != '')
                bt.disabled = false;
        } else {
            jQuery(this).css("color","red");
            jQuery(this).css("border","1px solid red");
            bt.disabled = true;
        }
      });

    document.getElementById('diaryHeader').innerHTML = window.localStorage.getItem("linkText");
    //alert(window.localStorage.getItem("linkText"));

    //Go back to dashboard
    $('#btnBackMain').on('click', function(event){
        window.location.href = "patient-dashboard.html";
    });

    fillSelectOption('hourOpt', 0, 23)
    fillSelectOption('minuteOpt', 0, 59)
    fillSelectOption('spHourOpt', 0, 23)
    fillSelectOption('spMinuteOpt', 0, 59)

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

        //var fallSleepTime = document.getElementById("sleepTime").value;
        var spHourOpt  = document.getElementById('spHourOpt').value;
        var spMinuteOpt  = document.getElementById('spMinuteOpt').value;
        var fallSleepTime = parseInt(60 * spHourOpt) + parseInt(spMinuteOpt);

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

        var otherNote = document.getElementById("otherNote").value;
        //window.localStorage.setItem("otherNote", otherNote);

        var sleepQty = getQuality();
        if(sleepQty == ''){
            sleepQty = 'Fair';
        }
        
        //window.localStorage.setItem("sleepQty", sleepQty);

        //var wakeUpCount = document.getElementById('wakeUpCount').innerHTML;
        var hourOpt  = document.getElementById('hourOpt').value;
        var minuteOpt  = document.getElementById('minuteOpt').value;
        var awakeLast = parseInt(60 * hourOpt) + parseInt(minuteOpt);

        var medName1Name = $('#medName1').text();
        var medName2Name = $('#medName2').text();
        var medName1Val = $('#medName1Val').text();
        var medName2Val = $('#medName2Val').text();

        let trialNo = window.localStorage.getItem("trialNo");
        var anyMedBlock = {};
        if(trialNo == 1){
            var otherMedName = $('#anyMedName').text();
            var otherAmTaken = $('#anyAmTaken').text();
            var otherMedID = window.localStorage.getItem("otherMedID");
            if(otherMedID != null){
                otherMedID = parseInt(otherMedID);
                anyMedBlock = {
                    "id": otherMedID,
                    "medicationName": otherMedName,
                    "amount": otherAmTaken
                }
            }else if(otherMedID == null && otherAmTaken != ''){
                anyMedBlock = {
                    "medicationName": otherMedName,
                    "amount": otherAmTaken
                }
            }else{anyMedBlock = {}}
        }else if(trialNo == 2){
            var otherMedName = $('#otherMedName').text();
            var otherAmTaken = $('#otherAmTaken').text();
            var anyMedID = window.localStorage.getItem("anyMedID");
            if(anyMedID != null){
                anyMedID = parseInt(anyMedID);
                anyMedBlock = {
                    "id": anyMedID,
                    "medicationName": otherMedName,
                    "amount": otherAmTaken
                }
            }else if(anyMedID == null && otherAmTaken != ''){
                anyMedBlock = {
                    "medicationName": otherMedName,
                    "amount": otherAmTaken
                }
            }else{anyMedBlock = {};}
        }

        var wakeUpCount = $('#wakeUpCount').text();
    
        var valueIsValid = true;
        if(medName1Val != ''){
            var validNum = medName1Val.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
            if (validNum == null) {
                valueIsValid = false;
            }
        }
        if(medName2Val != ''){
            var validNum = medName2Val.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
            if (validNum == null) {
                valueIsValid = false;
            }
        }
        if(otherAmTaken != ''){
            var validNum = otherAmTaken.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
            if (validNum == null) {
                valueIsValid = false;
            }
        }

        if(medName1Val == ''){medName1Val = parseInt(0)}else{medName1Val = parseInt(medName1Val)}
        if(medName2Val == ''){medName2Val = parseInt(0)}else{medName2Val = parseInt(medName2Val)}
        if(otherAmTaken == ''){otherAmTaken = parseInt(0)}else{otherAmTaken = parseInt(otherAmTaken)}

        var sleepDate =  window.localStorage.getItem("submitDate");
        let pID = window.localStorage.getItem("submitID");
        if(pID != ''){pID = parseInt(pID)}
        var med1Date = window.localStorage.getItem("medDate1"); 
        let med1ID = window.localStorage.getItem("medID1"); 
        if(med1ID != ''){med1ID = parseInt(med1ID)}
        var med2Date = window.localStorage.getItem("medDate2"); 
        let med2ID = window.localStorage.getItem("medID2"); 
        if(med2ID != ''){med2ID = parseInt(med2ID)}
        let drugTaper = window.localStorage.getItem("drugTaper");
        let authToken = window.localStorage.getItem("patientToken");
        
        console.log(authToken)

        //window.location.href = "sleep-medication.html";

        let url = urlDomain + 'insomnia/v1/patient/submit-sleepdiary';
        if(valueIsValid){
            if(trialNo == 1){
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({
                        "id":pID,
                        "bedTime": bedTime,
                        "tryTosleepTime": trySleepTime,
                        "durationBeforesleepoff": fallSleepTime,
                        "wakeUptimeCount": wakeUpCount,
                        "totalWakeUpduration": awakeLast,
                        "finalWakeupTime": finalAwakeTime,
                        "timeLeftbed": outOfBedTime,
                        "sleepQuality": sleepQty,
                        "otherThings": otherNote,
                        "othermedications" : [ anyMedBlock ],
                        "date_Created": sleepDate
        
                      }),
                    success: function(result){
                        console.log(result);
                        swal({title: "Bravo!", text: "Your sleep diary has been submitted!", type: "success"},
                        function(){ 
                            window.location.href = "patient-dashboard.html";
                        }
                        );
                    }, 
                    error: function(msg){
                        $("#errorContainer").html("Unable to submit");
                        sweetAlert("Sleep diary submission failed!","Please try again shortly.","error");
                    }
                });//For patients in Trial 1
            }else{
                if(drugTaper == 2){
                    $.ajax({
                        url: url,
                        type: 'POST',
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': '*/*',
                            'Authorization': 'Bearer '+ authToken
                        },
                        data: JSON.stringify({
                            "id":pID,
                            "bedTime": bedTime,
                            "tryTosleepTime": trySleepTime,
                            "durationBeforesleepoff": fallSleepTime,
                            "wakeUptimeCount": wakeUpCount,
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
                            } ],
                            "othermedications" : [ anyMedBlock ],
                            "date_Created": sleepDate
            
                          }),
                        success: function(result){
                            console.log(result);
                            swal({title: "Bravo!", text: "Your sleep diary has been submitted!", type: "success"},
                            function(){ 
                                window.location.href = "patient-dashboard.html";
                            }
                            );
                        }, 
                        error: function(msg){
                            $("#errorContainer").html("Unable to submit");
                            sweetAlert("Sleep diary submission failed!","Please try again shortly.","error");
                        }
                    }); //For patients in Trial 2 tapering 2 drugs
                }else{
                    $.ajax({
                        url: url,
                        type: 'POST',
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': '*/*',
                            'Authorization': 'Bearer '+ authToken
                        },
                        data: JSON.stringify({
                            "id":pID,
                            "bedTime": bedTime,
                            "tryTosleepTime": trySleepTime,
                            "durationBeforesleepoff": fallSleepTime,
                            "wakeUptimeCount": wakeUpCount,
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
                            }],
                            "othermedications" : [ anyMedBlock ],
                            "date_Created": sleepDate
            
                          }),
                        success: function(result){
                            console.log(result);
                            swal({title: "Bravo!", text: "Your sleep diary has been submitted!", type: "success"},
                            function(){ 
                                window.location.href = "patient-dashboard.html";
                            }
                            );
                        }, 
                        error: function(msg){
                            $("#errorContainer").html("Unable to submit");
                            sweetAlert("Sleep diary submission failed!","Please try again shortly.","error");
                        }
                    });//For patients in Trial 2 tapering 1 drug
                }
            }//end of diary taper submission
            
        }else{
            sweetAlert("Unable to submit!","Please ensure you entered only numbers where necessary.","error");
        }
        

    });

    
 });