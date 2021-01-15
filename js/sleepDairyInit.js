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
});