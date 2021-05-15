var urlDomain = window.localStorage.getItem("urlDomain");

$(document).ready(function () {

    //Patient Voluntary Withdrawal
    $('#btnVolWithdrawal').on('click', function(event){
        event.preventDefault();
    
        var withNote = document.getElementById("withdrawNote").value;
        let authToken = window.localStorage.getItem("patientToken");
        let url = urlDomain + 'insomnia/v1/dashboard/withdraw';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "code" : withNote
                }),
            success: function(result){
                console.log(result);
                swal({title: "Done!", text: "You have voluntarily withdrawn yourself from the Health enSuite Insomnia study!", type: "success"},
                function(){ 
                    window.location.href = "index.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Your withdrawal attempt failed!","Please try again shortly","error");
            }
        });
    });

    
});

//Patient Feedback Submission
function submitFeedback(event, noteID){
    event.preventDefault();

    var theNote = document.getElementById(noteID).value;
    let authToken = window.localStorage.getItem("patientToken");
    let url = urlDomain + 'insomnia/v1/dashboard/feedback';
    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*',
            'Authorization': 'Bearer '+ authToken
        },
        data: JSON.stringify({
            "code" : theNote
            }),
        success: function(result){
            console.log(result);
            swal({title: "Thank you!", text: "Your feedback has been captured!", type: "success"},
            function(){ 
                window.location.href = "patient-dashboard.html";
            }
            );
        }, 
        error: function(msg){
            $("#errorContainer").html("Unable to register");
            sweetAlert("Feedback submission failed!","Please try again shortly","error");
        }
    });
};