function validatePassword(){
    var bt = document.getElementById('btnChangePass');
    var password = $("#newPass").val();
    var confirm_password = $("#confirmNewPass").val();
    if(password != confirm_password) {
        $("#divCheckUpdatePWordMatch").html("Passwords does not match yet!");
    } else {
        $("#divCheckUpdatePWordMatch").html(" ");
        bt.disabled = false;
    }
  }

$(document).ready(function () {

    var bt = document.getElementById('btnChangePass');
    bt.disabled = true;
    $('#confirmNewPass').keyup(validatePassword);

    //Patient Change of password within the app
    $('#btnChangePass').on('click', function(event){
        event.preventDefault();
    
        var currentPass = document.getElementById("currentPass").value;
        var newPass = document.getElementById("newPass").value;
        var patEmail = window.localStorage.getItem("patientEmail");

        let authToken = window.localStorage.getItem("patientToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/authentication/changepasswordinapp';
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
                sweetAlert("Oops...","Password change unseccessful! Please eensure you type your current password correctly","error");
            }
        });
    });


});