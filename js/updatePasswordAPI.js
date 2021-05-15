var urlDomain = window.localStorage.getItem("urlDomain"); 

function validateNewEmail(){
    var bt = document.getElementById('btnChangeEmail');
    var newE = $("#newEmail").val();
    var confirmE = $("#confirmNewEmail").val();
    // Validate email
    if (!isEmail(newE)){
        $("#divEmailErrorMsg").html("Invalid email address pattern");
        return;
    }
    if(newE != confirmE) {
        $("#divEmailErrorMsg").html("New Email Address does not match yet!");
    } else {
        $("#divEmailErrorMsg").html(" ");
        bt.disabled = false;
    }
  }


function validatePassword(){
    var bt = document.getElementById('btnChangePass');
    var password = $("#newPass").val();
    var confirm_password = $("#confirmNewPass").val();
    if(password != confirm_password) {
        $("#divCheckUpdatePWordMatch").html("You need to re-enter your new password to proceed.");
    } else {
        $("#divCheckUpdatePWordMatch").html(" ");
        bt.disabled = false;
    }
  }

  function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };

  function fillEditField(supplierId, receiverId){
    var mytext = document.getElementById(supplierId).innerHTML;   
    document.getElementById(receiverId).value = mytext;
  }

$(document).ready(function () {

    var bt = document.getElementById('btnChangePass');
    bt.disabled = true;
    $('#confirmNewPass').keyup(validatePassword);
    $('#confirmNewEmail').keyup(validateNewEmail);
    emailIsElligible = false;

    //Patient Change of password within the app
    $('#btnChangePass').on('click', function(event){
        event.preventDefault();
    
        var currentPass = document.getElementById("currentPass").value;
        var newPass = document.getElementById("newPass").value;
        var patEmail = window.localStorage.getItem("patientEmail");

        let authToken = window.localStorage.getItem("patientToken");
        let url = urlDomain + 'insomnia/v1/authentication/changepasswordinapp';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "code" : patEmail,
                "code1" : currentPass,
                "code2" : newPass
                }),
            success: function(result){
                console.log(result);
                swal({title: "Done!", text: "Your password has been change. You will be required to login again!", type: "success"},
                function(){ 
                    window.location.href = "index.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Change of password not successful!","Please ensure you typed your current password correctly","error");
            }
        });
    });


    //Check email validity
    $('#newEmail').on('blur', function(e) {
        var bt = document.getElementById('btnChangeEmail');
        var confEmail = document.getElementById('confirmNewEmail');
        confEmail.disabled = true;
        // Current email input
        var currentEmail = e.target.value,
            $emailNode = $(this),
            isValid = true;
        //alert('Here')
        // Validate email
        if (!isEmail(currentEmail)){
            $("#divEmailErrorMsg").html("Invalid email address pattern");
            return;
        }
         
        let url = urlDomain + 'insomnia/v1/patient/checkEmail';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'
            },
            data: JSON.stringify({"code": currentEmail}),
            success: function(result){
                console.log(result);
                // Finally update the state for the current field
                if (!result) {
                    emailIsElligible = true;
                    $("#divEmailErrorMsg").html("");
                    $emailNode.addClass('is-valid');
                    confEmail.disabled = false;
                } else{
                    emailIsElligible = false;
                    $("#divEmailErrorMsg").html("Email address already exist");
                    sweetAlert("Email address exist!","","error");
                    $emailNode.addClass('is-error');
                    bt.disabled = true;
                    confEmail.disabled = true;
                } 
                
            }, 
            error: function(msg){
                emailIsElligible = false;
                $("#divEmailErrorMsg").html("Email address already exist");
                sweetAlert("Email address exist!","","error");
                $emailNode.addClass('is-error');
                bt.disabled = true;
            }
        });
        
    });


    //Patient Change of Email within the app
    $('#btnChangeEmail').on('click', function(event){
        event.preventDefault();

        // Current email input
        var newEmail = document.getElementById("newEmail").value;
        
        // Validate email
        if (!isEmail(newEmail)){
            $("#divEmailErrorMsg").html("Invalid email address pattern");
            return;
        }

        let authToken = window.localStorage.getItem("patientToken");
        let url = urlDomain + 'insomnia/v1/patient/updateemail';

        if(emailIsElligible == true){
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*',
                    'Authorization': 'Bearer '+ authToken
                },
                data: JSON.stringify({
                    "code" : newEmail
                    }),
                success: function(result){
                    console.log(result);
                    swal({title: "Done!", text: "Your Email Address has been updated!", type: "success"},
                    function(){ 
                        window.location.href = "provider-dashboard.html";
                    }
                    );
                }, 
                error: function(msg){
                    $("#errorContainer").html("Unable to register");
                    sweetAlert("Failed to update Email Address!","Please try again shortly.","error");
                }
            });
        }else{
            sweetAlert("Email address exist!","Please use another email address","error");
        }
    });
    


});