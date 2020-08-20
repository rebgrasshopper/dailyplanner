'use strict'
/*global moment, $, localStorage*/
/*eslint no-undef: "error"*/

//VARIABLES

let workHour = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"];
let workHour24 = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
let now = moment().format("dddd, MMMM D, YYYY");
let localDate = "agendas" + moment(now).format("DDMMMMYYYY");
let agendasInitialValue = {
    "9AM":" ",
    "10AM":" ",
    "11AM":" ",
    "12PM":" ",
    "1PM":" ",
    "2PM":" ",
    "3PM":" ",
    "4PM":" ",
    "5PM":" ",
    "6PM":" ",
    "7PM":" ",
    "8PM":" ",
    "9PM":" "};
let agendas = getLocalStorageOrDefault();
let hoursArray;



//FUNCTIONS

function changeDateForward() {
    now = moment(now).add(1, "days").format("dddd, MMMM D, YYYY");
    writeDate();
}

function changeDateBack() {
    now = moment(now).add(-1, "days").format("dddd, MMMM D, YYYY");
    writeDate();
}

function writeDate () {
    console.log(`WD: Writing Date`);
    console.log(`WD: setting localDate to ${"agendas" + moment(now).format("DDMMMMYYYY")}`);
    localDate = "agendas" + moment(now).format("DDMMMMYYYY");
    $("#currentDay").text(now);
    console.log(`WD: calling WH`);
    console.log(`WD: back from WH`);
    fillText();
}

function saveAgenda() {
    console.log("SA: start Save Agenda, then run GL");
    getLocalStorageOrDefault();
    console.log(`SA: pushing ${$(this).siblings("textarea").val()} to ${agendas}:${this.value}`);
    agendas[this.value] = $(this).siblings("textarea").val()
    saveToLocal();
}

function autoSaveAgenda() {
    console.log(this.value);
    getLocalStorageOrDefault();
    console.log(`SA: pushing ${$(this).siblings("textarea").val()} to ${agendas}:${this.value}`);
    agendas[this.id] = this.value;
    saveToLocal();
}

function writeHours() {
    // agendas = getLocalStorageOrDefault();
    $(".container").empty();
    for (let hour of workHour) {
        //create blocks
        const hourDiv = $(`<div id="${hour}-row" class="row time-block"><div id="${hour}-div" class="hour col-2 col-md-1">${hour}</div><textarea id="${hour}" class="col-2 col-sm-10 col-md-11"></textarea></div>`);

        
        //assign past/present/future
        if (moment().hour() == workHour24[workHour.indexOf(hour)]) {
            hourDiv.children(`#${hour}`).addClass("present");
        } else if (moment().hour() > workHour24[workHour.indexOf(hour)]) {
            hourDiv.children(`#${hour}`).addClass("past");
        } else if (moment().hour() < workHour24[workHour.indexOf(hour)]) {
            hourDiv.children(`#${hour}`).addClass("future");
        }

        $(".container").append(hourDiv);
    }
}

function fillText() {
    hoursArray = $("textarea").toArray();
    agendas = getLocalStorageOrDefault();
    for (let i=0; i<hoursArray.length; i++){
        hoursArray[i].value = agendas[hoursArray[i].id];
    }
}





//FUNCTIONS FOR LOCAL STORAGE

function saveToLocal() {
    console.log(`SL: saving ${JSON.stringify(agendas)} to ${localDate}`);
    localStorage.setItem(localDate, JSON.stringify(agendas));
}


function getLocalStorageOrDefault(){
    if (localStorage.getItem(localDate) === null) {
        localStorage.setItem(localDate, JSON.stringify(agendasInitialValue));
        return JSON.parse(localStorage.getItem(localDate));
    } else {
        return JSON.parse(localStorage.getItem(localDate));
    }
}




//PAGE INIT

writeHours();
writeDate();



//EVENT LISTENERS

$(".saveBtn").on("click", saveAgenda);
$("#back").on("click", changeDateBack);
$("#forward").on("click", changeDateForward);
$("textarea").on("input", autoSaveAgenda);


// document.addEventListener("click", function(e){
//     if (e.target.matches(".saveBtn")) {
//         console.log(e.target.value);
//     }
// })