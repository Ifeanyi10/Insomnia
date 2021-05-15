var urlDomain = window.localStorage.getItem("urlDomain"); 

function getAllLinks(dayValue){

    var dayNumber1 = 0; var dayNumber2 = 0; 
    var galLinks = document.getElementById('sleepLink');
    var anchors = galLinks.getElementsByTagName('a');
    for (i = 0; i < anchors.length; i++) {  
        var thisLink = anchors[i];
        
        if(dayValue == 1){
            thisLink.style.display = 'block';
            thisLink.innerHTML = window.localStorage.getItem("currentDate");
            return;
        }
        
        dayNumber1 += 1;
        if(dayNumber1 == (dayValue - 1)){
            thisLink.style.display = 'block';
            thisLink.innerHTML = window.localStorage.getItem("currentDate");
        }
        
        if(dayNumber1 == dayValue){
            thisLink.style.display = 'block';
            thisLink.innerHTML = window.localStorage.getItem("prevDate");
            return;
        }
    }
}

$(document).ready(function () {
    var theArrayLength = window.localStorage.getItem("arrayLength");
    getAllLinks(theArrayLength); 

    let authTokenProvider = '';

    $(window).focus(function () {
        //do something
        let authToken = window.localStorage.getItem("patientToken");
        authTokenProvider = window.localStorage.getItem("token");
        console.log("You are in this tab and the token is Provider: "+authTokenProvider);
        console.log("You are in this tab and the token is Patients: "+authToken);
        if(authToken == null){
            //urlDomain = 'http://health.us-east-2.elasticbeanstalk.com/';
            //urlDomain = 'http://192.168.6.15:8083/';
            urlDomain = 'http://health001-env.eba-v5mudubf.us-east-2.elasticbeanstalk.com/';
            window.localStorage.setItem("urlDomain", urlDomain);
            $('#loginModal').modal('show');
        }
    });

    //Quick Patient Login
    $('#btnQuickLogin').on('click', function(event){
        event.preventDefault();
        window.localStorage.clear();
        var username = document.getElementById('quickUsername').value;
        var password = document.getElementById('quickPass').value;
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
                    window.localStorage.setItem("patientToken", result.token);
                    window.localStorage.setItem("token", authTokenProvider);
                    $('#loginModal').modal('hide');
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    sweetAlert("Incorrect username or password!","Please confirm your login credentials and try again.","error");
                }
            });
        }else{
            sweetAlert("Attention!","Please fill the fields properly and login","info");
        }
        
    });//end of quick login
});