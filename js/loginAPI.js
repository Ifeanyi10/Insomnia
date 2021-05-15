var urlDomain = 'http://health001-env.eba-v5mudubf.us-east-2.elasticbeanstalk.com/';
//var urlDomain = 'http://192.168.6.15:8083/';

function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };

  function receiveEmail(username){
    console.log('here2');
    let url = urlDomain + 'insomnia/v1/authentication/confirmusername';

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
            swal({title: "Email Address Received!!", text: "A reset password link will be sent to this email address!", type: "success"},
            function(){ 
                window.location.href = "index.html";
            }
            );
        }, 
        error: function(msg){
            console.log(msg);
            if(msg){
                swal({title: "Email Address Received!!", text: "A reset password link will be sent to this email address!", type: "success"},
                    function(){ 
                        window.location.href = "index.html";
                    }
                );
            }else{
                sweetAlert("Username does not exist!.","","error");
            }
            
        }
    });
  }


$(document).ready(function () {

    var errorNote = window.localStorage.getItem("loginError");
    if(errorNote == "true"){
        sweetAlert("Failed To Load Account Details!!","Please check your network and login again","error");
    }

    //Login Patient
    $('#btnSignin').on('click', function(event){
        event.preventDefault();
        window.localStorage.clear();
        var username = document.getElementById('username').value;
        var password = document.getElementById('pass').value;
        //let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/login';
        let url = urlDomain + 'insomnia/v1/authentication/login';

        if(username != '' && password != ''){
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
                    console.log(result);
                    //set timeer (30 minutes) to disable the token 
                    window.localStorage.setItem("patientToken", result.token);
                    console.log(result.token);
                    //window.localStorage.setItem("enableSpClock", result.status.enableSleepClockbutton);
                    //window.localStorage.setItem("CBTLevel", result.status.interventionLevel);
                    //console.log(window.localStorage.getItem("enableSpClock"))
                    //console.log(window.localStorage.getItem("CBTLevel"))
                    window.localStorage.setItem("urlDomain", urlDomain);
                    window.localStorage.setItem("isNewLogin", true);
                    window.location.href = "patient-dashboard.html";
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    sweetAlert("Incorrect username or password!!","Please confirm your login credentials and try again","error");
                }
            });
        }else{
            sweetAlert("Attention!","Please fill the fields properly and login","info");
        }
        
    });

    //Confirm Patient Email
    $('#btnSubmitEmail').on('click', function(event){
        event.preventDefault();
        var username = document.getElementById('recovUsername').value;
        // Validate email
        if (!isEmail(username)){
            //$("#errorEmailContainer").html("Invalid email address. Enter a valid email address");
            sweetAlert("Invalid email address!","Enter a valid email address","error");
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
            data: JSON.stringify({"code": username}),
            success: function(result){
                console.log(result);
                // Finally update the state for the current field
                if (!result) {
                    sweetAlert("Username does not exist!","Please enter your current username and try again","error");
                } else{                   
                    receiveEmail(username)
                } 
                
            }, 
            error: function(msg){
                sweetAlert("Unable to confirm username!","Please try again shortly","error");
            }
        });

    });

 });