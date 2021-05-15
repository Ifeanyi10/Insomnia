
function logout(){
    window.localStorage.clear();
    //sessionStorage.clear();
}


$(document).ready(function () {

    var enableSpClock = window.localStorage.getItem("enableSpClock");

    console.log('Sleep Clock is: '+ enableSpClock)
    if(enableSpClock == "true"){
        $(".spClock").css('display', 'block'); 
        console.log('Sleep Clock Enabled')
    }else{
        $(".spClock").css('display', 'none'); 
        console.log('Sleep Clock disabled')
    }

    var enableProgress = window.localStorage.getItem("enableProgress");
    console.log('Progress is: '+ enableProgress)
    if(enableProgress == "true"){
        var randomGroupID = window.localStorage.getItem("randomGroupID");
        if(parseInt(randomGroupID) == 0){
            $(".progs").css('display', 'block'); 
            $(".psyc").css('display', 'none');
            console.log('Progress Enabled')
        }else if(parseInt(randomGroupID) == 1){
            $(".psyc").css('display', 'block'); 
            $(".progs").css('display', 'none');
            console.log('Psychoeducation Enabled')
        }
        
    }else{
        $(".progs").css('display', 'none'); 
        $(".psyc").css('display', 'none');
        console.log('No content yet')
    }

    var notallowed = window.localStorage.getItem("notallowed");
    if(notallowed == "false"){
        $(".spRep").css('display', 'block'); 
        $(".spDiary").css('display', 'block'); 
    }else{
        $(".spRep").css('display', 'none'); 
        $(".spDiary").css('display', 'none'); 
    }

    $('#sleepLink a').click(function(e) {
        var submitDate = '';
        var txt = $(e.target).text();
        window.localStorage.setItem("linkText", txt);

        var date1 = window.localStorage.getItem("currentDate");

        if(txt == date1){
            submitDate = window.localStorage.getItem("currentDateUnformatted");
            window.localStorage.setItem("submitDate", submitDate);
            var submitID = window.localStorage.getItem("currentID");
            window.localStorage.setItem("submitID", submitID);
            
        }else{
            submitDate = window.localStorage.getItem("prevDateUnformatted");
            window.localStorage.setItem("submitDate", submitDate);
            var submitID = window.localStorage.getItem("prevID");
            window.localStorage.setItem("submitID", submitID);
        }
    });

    $('#todayLink a').click(function(e) {
        var txt = window.localStorage.getItem("currentDate");
        window.localStorage.setItem("linkText", txt);
        var submitDate = window.localStorage.getItem("currentDateUnformatted");
        window.localStorage.setItem("submitDate", submitDate);
        var submitID = window.localStorage.getItem("currentID");
        window.localStorage.setItem("submitID", submitID);
    });

    $('#prevLink a').click(function(e) {
        var arrayL =  window.localStorage.getItem("arrayLength");
        if(parseInt(arrayL) != 1){
            var txt = window.localStorage.getItem("prevDate");
            window.localStorage.setItem("linkText", txt);
            var submitDate = window.localStorage.getItem("prevDateUnformatted");
            window.localStorage.setItem("submitDate", submitDate);
            var submitID = window.localStorage.getItem("prevID");
            window.localStorage.setItem("submitID", submitID);
        }else{
            var txt = window.localStorage.getItem("currentDate");
            window.localStorage.setItem("linkText", txt);
            var submitDate = window.localStorage.getItem("currentDateUnformatted");
            window.localStorage.setItem("submitDate", submitDate);
            var submitID = window.localStorage.getItem("currentID");
            window.localStorage.setItem("submitID", submitID);
        }
        console.log('Date'+txt);
        console.log('Leng'+arrayL)
    });

    $("#sympID").click(function() {  
        $("#symps").css('display', 'block');     
   });  

});


function hideDisplay(firstDisplay, secondDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    x.style.display = 'none';
    y.style.display = 'block';
}


function fillModalValue(){
    let averageValue = parseInt(document.getElementById('avSleepEff').innerHTML);
    var modalTitle = document.getElementById('modalTitle');
    var modalBody = document.getElementById('modalBd');
    modalTitle.innerHTML = 'Sleep Efficiency Message';

    if(averageValue < 85){
        modalBody.innerHTML = 'Your sleep efficiency is less than 85%. This means there is room for improvement.  To increase your sleep efficiency the length of sleep window should be reduced by 15 minutes.  We recommend moving your bed time 15 minutes later. ';
        return;
    }

    if(averageValue >= 85 && averageValue < 90){
        modalBody.innerHTML = 'Your sleep efficiency is between 85%-89%. This means you are right on track. Your sleep window should stay the same.';
        return;
    }

    if(averageValue >= 90 && averageValue < 95){
        modalBody.innerHTML = 'Your sleep efficiency is between 90%-94%. This is a great result! At this point, you can extend your sleep window by 15 minutes. We recommend moving your bed time 15 minutes earlier.';
        return;
    }

    if(averageValue >= 95 && averageValue < 101){
        modalBody.innerHTML = 'Your sleep efficiency is over 95%. With a result like this, your sleep window can be increased by 30 minutes.';
        return;
    }

    if(averageValue >100){
        modalTitle.innerHTML = 'Error!!!';
        modalBody.innerHTML = 'Check that you have entered your sleep times accurately. Sleep efficiency cannot be over 100%.';
        return;
    }
}

function showNote(itemName){
    var item = document.getElementById(itemName);

    if (item.style.display === 'block'){
        if(itemName == 'content4-2'){document.getElementById('btnContSleepPill').value = 'Continue...';}
        return item.style.display = 'none';
    }else{
        if(itemName == 'content4-2'){document.getElementById('btnContSleepPill').value = 'Revert...';}
        return item.style.display = 'block';
    }


}

function fillModalContentValue(checkID, btnId){
    var modalTitle = document.getElementById('modalContentTitle');
    var modalBody = document.getElementById('modalContentBd');
    var btnMed = document.getElementById(btnId);

    if(checkID == 'confident'){
        modalTitle.innerHTML = 'Great!';
        modalBody.innerHTML = 'You can track your progress in the Medication Log.';
        btnMed.disabled = false;
    }

    else if(checkID == 'difficult'){
        modalTitle.innerHTML = 'Change can be difficult!';
        modalBody.innerHTML = 'This app provides tools that should help make it easier for you. If you need to modify the plan please consult your health care provider.';
        btnMed.disabled = false;
    }

    else if(checkID == 'unknown'){
        modalTitle.innerHTML = 'Attention!';
        modalBody.innerHTML = 'Use the medications tab on the dashboard to view your tapering schedule.';
        btnMed.disabled = false;
    }else{
        btnMed.disabled = true;
    }
}

function showQuestion(divName1, divName2, divName3, supportDiv){
    var x = document.getElementById(divName1);
    var y = document.getElementById(divName2);
    var z = document.getElementById(divName3);
    var sp = document.getElementById(supportDiv);

    x.style.display = 'block';
    y.style.display = 'none';
    z.style.display = 'none';
    sp.style.display = 'none';
}

function showSupport(diSupport){
    var sp = document.getElementById(diSupport);
    sp.style.display = 'block';
}

function removeSupport(diSupport){
    var sp = document.getElementById(diSupport);
    sp.style.display = 'none';
}

function adjustTimeDisplay(elemID){
    var elemVal = document.getElementById(elemID).value;
    if(elemVal == '00:00'){
        document.getElementById(elemID).value = '12:00';
    }
}

function displayNav(firstnave, secondNav){
    var f = document.getElementById(firstnave);
    var s = document.getElementById(secondNav);
    f.classList.remove('active');
    s.classList.add('active');
    s.classList.add('show');
}


// $(document).ready(function(){ swal("Hey, Good job !!", "You clicked the button !!", "success") });

// document.querySelector(".sweet-wrong").onclick = function () { sweetAlert("Oops...", "Something went wrong !!", "error") }, 
// document.querySelector(".sweet-message").onclick = function () { swal("Hey, Here's a message !!") }, 
// document.querySelector(".sweet-text").onclick = function () { swal("Hey, Here's a message !!", "It's pretty, isn't it?") }, 
// document.querySelector(".sweet-success").onclick = function () { swal("Hey, Good job !!", "You clicked the button !!", "success") }, 
// document.querySelector(".sweet-confirm").onclick = function () { swal({ title: "Are you sure to delete ?", text: "You will not be able to recover this imaginary file !!", type: "warning", showCancelButton: !0, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it !!", closeOnConfirm: !1 }, function () { swal("Deleted !!", "Hey, your imaginary file has been deleted !!", "success") }) }, document.querySelector(".sweet-success-cancel").onclick = function () { swal({ title: "Are you sure to delete ?", text: "You will not be able to recover this imaginary file !!", type: "warning", showCancelButton: !0, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it !!", cancelButtonText: "No, cancel it !!", closeOnConfirm: !1, closeOnCancel: !1 }, function (e) { e ? swal("Deleted !!", "Hey, your imaginary file has been deleted !!", "success") : swal("Cancelled !!", "Hey, your imaginary file is safe !!", "error") }) }, document.querySelector(".sweet-image-message").onclick = function () { swal({ title: "Sweet !!", text: "Hey, Here's a custom image !!", imageUrl: "../assets/images/hand.jpg" }) }, document.querySelector(".sweet-html").onclick = function () { swal({ title: "Sweet !!", text: "<span style='color:#ff0000'>Hey, you are using HTML !!<span>", html: !0 }) }, document.querySelector(".sweet-auto").onclick = function () { swal({ title: "Sweet auto close alert !!", text: "Hey, i will close in 2 seconds !!", timer: 2e3, showConfirmButton: !1 }) }, document.querySelector(".sweet-prompt").onclick = function () { swal({ title: "Enter an input !!", text: "Write something interesting !!", type: "input", showCancelButton: !0, closeOnConfirm: !1, animation: "slide-from-top", inputPlaceholder: "Write something" }, function (e) { return !1 !== e && ("" === e ? (swal.showInputError("You need to write something!"), !1) : void swal("Hey !!", "You wrote: " + e, "success")) }) }, document.querySelector(".sweet-ajax").onclick = function () { swal({ title: "Sweet ajax request !!", text: "Submit to run ajax request !!", type: "info", showCancelButton: !0, closeOnConfirm: !1, showLoaderOnConfirm: !0 }, function () { setTimeout(function () { swal("Hey, your ajax request finished !!") }, 2e3) }) };
