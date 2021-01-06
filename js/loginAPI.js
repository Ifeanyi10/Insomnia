$(document).ready(function () {

    //Login Provider
    $('#btnSignin').on('click', function(event){
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('pass').value;
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/login';

        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'            
              },
            data: JSON.stringify({"password": password, "username": username}),
            success: function(result){
                //alert(result);
                //console.log(result);
                //set timeer (30 minutes) to disable the token 
                window.localStorage.setItem("patientToken", result);
                alert(window.localStorage.getItem("patientToken"));
                window.location.href = "patient-dashboard.html";
            }, 
            error: function(msg){
                //$("#errorContainer").html("Incorrect Username or Password");
                sweetAlert("Oops...","Invalid username or password!!","error");
            }
        });
    });

    //Confirm Provider Email
    $('#btnSubmitEmail').on('click', function(event){
        event.preventDefault();
        var username = document.getElementById('recovUsername').value;
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/authentication/confirmusername';

        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'            
              },
            data: JSON.stringify({"code": username}),
            success: function(result){
                console.log(result);
                swal({title: "Username Confirmed!!", text: "A reset password link has been sent to your email address!!", type: "success"},
                function(){ 
                    window.location.href = "index.html";
                }
                );
            }, 
            error: function(msg){
                console.log(msg);
                if(msg){
                    swal({title: "Username Confirmed!!", text: "A reset password link has been sent to your email address!!", type: "success"},
                        function(){ 
                            window.location.href = "index.html";
                        }
                    );
                }else{
                    sweetAlert("Oops...","Username does not exist!!","error");
                }
                
            }
        });
    });

 });