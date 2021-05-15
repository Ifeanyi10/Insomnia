var urlDomain = 'http://health001-env.eba-v5mudubf.us-east-2.elasticbeanstalk.com/';
//var urlDomain = 'http://192.168.6.15:8083/';

function validatePassword(){
    var bt = document.getElementById('btnSubmit');
    var password = $("#pass").val();
    var confirm_password = $("#confirmPass").val();
    if(password != confirm_password) {
        $("#divCheckPasswordMatch").html("Passwords do not match!");
    } else {
        $("#divCheckPasswordMatch").html(" ");
        bt.disabled = false;
    }
  }

  function validateUsername(){
    var email = $("#email").val();
    var usName = $("#usName").val();
    if(email != usName) {
        $("#divCheckUsernameMatch").html("Email and Username provided do not match!");
    } else {
        $("#divCheckUsernameMatch").html(" ");
    }
  }

  function fillAllFields(){
        var bt = document.getElementById('btnSubmit');
        var conPass = document.getElementById('confirmPass');
        var fName = $("#firstN").val();
        var lName = $("#lastN").val();
        var timeZ = $("#inputTimeZone").val();
        var em = $("#email").val();
        var usN = $("#usName").val();
        var ps = $("#pass").val();
        if (fName != '' && lName != '' && timeZ != '' && em != '' && usN != '' && ps != '')  {
            conPass.disabled = false;
            $("#confirmPass").keyup(validatePassword);
        } else {
            conPass.disabled = true;
            bt.disabled = true;
        }
    }

  $(document).ready(function () {
    var bt = document.getElementById('btnSubmit');
    bt.disabled = true;
    $('#firstN, #lastN, #inputTimeZone, #email, #phone, #usName, #pass').keyup(fillAllFields);
    
 });

 

function getCommunicationMode(elementPosition) {
    var abouts = document.forms['regForm'].elements['abt'];
    var aboutInfos = false; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[elementPosition].checked == true){        
            aboutInfos = true;               
        } 
    }
    return aboutInfos;
}


function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };


$(document).ready(function () {

    document.getElementById("firstN").readOnly = true;
    document.getElementById("lastN").readOnly = true;
    document.getElementById("email").readOnly = true;
    document.getElementById("phone").readOnly = true;
    document.getElementById("usName").readOnly = true;

    

    $("#usName").keyup(validateUsername);
        //validate provider email
    // $('#email').on('blur', function(e) {
    //     var bt = document.getElementById('btnSubmit');
    //     // Current email input
    //     var currentEmail = e.target.value,
    //         $emailNode = $(this),
    //         isValid = true;
        
    //     // Validate email
    //     if (!isEmail(currentEmail)){
    //         $("#errorEmailContainer").html("Invalid email address pattern");
    //         return;
    //     }
         
    //     let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/provider/checkEmail';
    //     $.ajax({
    //         url: url,
    //         type: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json', 
    //             'Accept': '*/*'
    //         },
    //         data: JSON.stringify({"code": currentEmail}),
    //         success: function(result){
    //             console.log(result);
    //             // Finally update the state for the current field
    //             if (!result) {
    //                 $("#errorEmailContainer").html("");
    //                 $emailNode.addClass('is-valid');
    //             } else{
    //                 $("#errorEmailContainer").html("Email address exist");
    //                 sweetAlert("ALERT","Email address exist!","error");
    //                 $emailNode.addClass('is-error');
    //                 bt.disabled = true;
    //             } 
                
    //         }, 
    //         error: function(msg){
    //             $("#errorEmailContainer").html("Email address exist");
    //             sweetAlert("ALERT","Email address exist!","error");
    //             $emailNode.addClass('is-error');
    //             bt.disabled = true;
    //         }
    //     });
        
    // });


    //Register Patient
    $('#btnSubmit').on('click', function(event){
        event.preventDefault();
    
        var email = document.getElementById("email").value;
        var mailAddress = document.getElementById("mailAdd").value;
        var timeZone = document.getElementById("inputTimeZone").value;
        var password = document.getElementById("pass").value;
        var emailAccepted = getCommunicationMode(0);
        var smsAccepted = getCommunicationMode(1);
        //alert(smsAccepted);
        var inAppAccepted = getCommunicationMode(2);
        var noNotification = false;
        var token =window.localStorage.getItem("patRegToken");
        let url = urlDomain + 'insomnia/v1/patient/create-dailyNotification';
    
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ token
            },
            data: JSON.stringify({ "emailAccepted" : emailAccepted,
            "smsAccepted" : smsAccepted,
            "noNotification" : noNotification,
            "mailingAddress": mailAddress,
            "password" : password,
            "emailAddress": email,
            "timeZoneID": timeZone}),
            success: function(result){
                console.log(result);
                swal({title: "Health enSuite welcomes you to the study!", text: "Your account has been created updated. Please login and start filling your sleep diary.", type: "success"},
                function(){ 
                    window.location.href = "index.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Account creation failed!","Please try again shortly,","error");
            }
        });
    });

});
