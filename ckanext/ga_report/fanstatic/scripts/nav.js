var count = 0;
var last_div;
function openTab(evt, cityName, chartId) {
    last_div = chartId;
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabcontent_info = document.getElementsByClassName("tabcontent_info");
    for(i=0; i<tabcontent_info.length; i++){
	tabcontent_info[i].style.color = "black";
        tabcontent_info[i].style.fontWeight = "400";
        tabcontent_info[i].style.backgroundColor = "white";
    }

    document.getElementById(cityName).style.display = "block";
    document.getElementById(cityName + "_info").style.color = "rgb(70, 121, 178)";
    document.getElementById(cityName + "_info").style.fontWeight = "700";
    document.getElementById(cityName + "_info").style.backgroundColor = "rgb(255, 236, 96)";
//    document.getElementById(cityName + "_info").style.display = "block";

  //if(count != 0) {
  //  $('html,body').animate({
  //      scrollTop: $("#" + chartId).offset().top - 100},
  //      'fast')
  //}
  //count = 1;
}

document.getElementById("chart0_click").click();

$(function() {
    $('a').tooltip({placement: 'right'});
});
