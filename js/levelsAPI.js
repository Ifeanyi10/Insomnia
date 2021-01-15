
function getCheckedValues(formID, elementName) {
    var abouts = document.forms[formID].elements[elementName];
    var aboutInfos = ""; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[i].checked == true){        
            aboutInfos +=  abouts[i].value + ", ";               
        } 
    }
    return aboutInfos;
}

function getCheckedStatus(formID, elementName, objPosition) {
    var abouts = document.forms[formID].elements[elementName];
    var isChecked = false; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[objPosition].checked == true){        
            isChecked = true; 
            return isChecked;             
        }
    }
    return isChecked;
}


function calculateBedTime(firstDisplay, secondDisplay)
{
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    var ad1 = document.getElementById('less5');
    var ad2 = document.getElementById('more5');
    var avHour = 4;
    var newBedTime = "";
    var riseTime = document.getElementById("clockRiseTime").value;
    if(avHour < 5){
        newBedTime = moment(riseTime, 'HH:mm').subtract('hours', 5).format('HH:mm')
        ad1.style.display = 'block';
    }else{
        newBedTime = moment(riseTime, 'HH:mm').subtract('hours', avHour).format('HH:mm')
        ad2.style.display = 'block';
    }
    document.getElementById('contYBedTime').innerHTML  = newBedTime;
    document.getElementById('contYRiseTime').innerHTML  = riseTime;
    x.style.display = 'none';
    y.style.display = 'block';

}


$(document).ready(function () {

    //Submit Level 1
    $('#btnSubmitLV1').on('click', function(event){
        event.preventDefault();
    
        var descSituation = getCheckedValues('formSituation', 'sit');
        var soFar = getCheckedValues('formFeeling', 'feel');
        var spAlone = getCheckedValues('fromDescribe', 'abt');
        var supName = document.getElementById("supName").value;
        var supEmail = document.getElementById("supEmail").value;
        var supRelation = document.getElementById("supRelation").value;

        let authToken = window.localStorage.getItem("patientToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/intervention/savelevelone';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "whichBestdescribesYoursituation" : descSituation,
                "howIsitgoingSofar" : soFar,
                "sleepalone" : spAlone,
                "supportPersonname" : supName,
                "supportPersonemail" : supEmail,
                "supportPersonrelationshipt": supRelation
                }),
            success: function(result){
                console.log(result);
                swal({title: "Congratulations!", text: "You have finished level 1!!!", type: "success"},
                function(){ 
                    window.location.href = "program-content.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Unable to submit level 1 responses! Please try again shortly","error");
            }
        });
    });


    //Submit Level 1 Anyway
    $('#btnSubmitLV1Anyway').on('click', function(event){
        event.preventDefault();
    
        var descSituation = getCheckedValues('formSituation', 'sit');
        var soFar = getCheckedValues('formFeeling', 'feel');
        var spAlone = getCheckedValues('fromDescribe', 'abt');
        var supName = "";
        var supEmail = "";
        var supRelation = "";

        let authToken = window.localStorage.getItem("patientToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/intervention/savelevelone';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "whichBestdescribesYoursituation" : descSituation,
                "howIsitgoingSofar" : soFar,
                "sleepalone" : spAlone,
                "supportPersonname" : supName,
                "supportPersonemail" : supEmail,
                "supportPersonrelationshipt": supRelation
                }),
            success: function(result){
                console.log(result);
                swal({title: "Congratulations!", text: "You have finished level 1!!!", type: "success"},
                function(){ 
                    window.location.href = "program-content.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Unable to submit level 1 responses! Please try again shortly","error");
            }
        });
    });


    //Submit Level 2
    $('#btnSubmitLV2').on('click', function(event){
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
                swal({title: "Congratulations!", text: "You have finished level 2!!!", type: "success"},
                function(){ 
                    window.location.href = "program-content.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Unable to submit level 2 responses! Please try again shortly","error");
            }
        });
    });


    //Submit Level 3
    $('#btnSubmitLV3').on('click', function(event){
        event.preventDefault();
    
        var bedforsleepingonly = getCheckedStatus('formDoneToday', 'done', 0);
        var sleep20minutes = getCheckedStatus('formDoneToday', 'done', 1);
        var dontTakenaps = getCheckedStatus('formDoneToday', 'done', 2);
        var excersiseNotbeforeBed = getCheckedStatus('formDoneToday', 'done', 3);
        var eatRiht = getCheckedStatus('formDoneToday', 'done', 4);
        var avoidStimulant = getCheckedStatus('formDoneToday', 'done', 5);
        var avoidAlcohol = getCheckedStatus('formDoneToday', 'done', 6);
        var createComfortablespace = getCheckedStatus('formDoneToday', 'done', 7);
        var limitScreentimeBeforebed = getCheckedStatus('formDoneToday', 'done', 8);
        var createUnwindrouting = getCheckedStatus('formDoneToday', 'done', 9);
        var contAddNote = document.getElementById("contAddNote").value;

        let authToken = window.localStorage.getItem("patientToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/intervention/savelevelthree';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "bedforsleepingonly": bedforsleepingonly,
                "sleep20minutes" : sleep20minutes,
                "dontTakenaps" : dontTakenaps,
                "excersiseNotbeforeBed" : excersiseNotbeforeBed,
                "eatRiht": eatRiht,
                "avoidStimulant": avoidStimulant,
                "avoidAlcohol" : avoidAlcohol,
                "createComfortablespace" : createComfortablespace,
                "limitScreentimeBeforebed" : limitScreentimeBeforebed,
                "createUnwindrouting" : createUnwindrouting,
                "additionalNote" : contAddNote
                }),
            success: function(result){
                console.log(result);
                swal({title: "Congratulations!", text: "You have finished level 3!", type: "success"},
                function(){ 
                    window.location.href = "program-content.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Unable to submit level 3 responses! Please try again shortly","error");
            }
        });
    });


    //Submit Level 4
    $('#btnSubmitLV4').on('click', function(event){
        event.preventDefault();

        let authToken = window.localStorage.getItem("patientToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/intervention/savelevelfour';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "successful" : true
                }),
            success: function(result){
                console.log(result);
                swal({title: "Congratulations!", text: "You have finished level 4!", type: "success"},
                function(){ 
                    window.location.href = "program-content.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Unable to submit level 4 responses! Please try again shortly","error");
            }
        });
    });

    //Submit Level 5
    $('#btnSubmitLV5').on('click', function(event){
        event.preventDefault();

        var realExpect1 = document.getElementById("realExpect1").value;
        var realExpect2 = document.getElementById("realExpect2").value;
        var realExpect3 = document.getElementById("realExpect3").value;
        var otherReason4 = document.getElementById("otherReason4").value;
        var otherWays = document.getElementById("otherWays").value;

        let authToken = window.localStorage.getItem("patientToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/intervention/savelevelfive';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "hoursofsleepeachnight" : realExpect1,
                "fullofenergyeachday" : realExpect2,
                "fallasleepfast" : realExpect3,
                "didnotsleepwelllastnight" : otherReason4,
                "cancelsocialmedia" : otherWays
                }),
            success: function(result){
                console.log(result);
                swal({title: "Congratulations!", text: "You have finished level 5!", type: "success"},
                function(){ 
                    window.location.href = "program-content.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Unable to submit level 5 responses! Please try again shortly","error");
            }
        });
    });

    //Submit Level 6
    $('#btnSubmitLV6').on('click', function(event){
        event.preventDefault();

        var worriedTxt = document.getElementById("worriedTxt").value;
        var strategyTxt = document.getElementById("strategyTxt").value;

        let authToken = window.localStorage.getItem("patientToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/intervention/savelevelsix';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "fears" : worriedTxt,
                "strategy" : strategyTxt
                }),
            success: function(result){
                console.log(result);
                swal({title: "Congratulations!", text: "You have finished level 6!", type: "success"},
                function(){ 
                    window.location.href = "program-content.html";
                }
                );
            }, 
            error: function(msg){
                sweetAlert("Oops...","Unable to submit level 6 responses! Please try again shortly","error");
            }
        });
    });

    
});
