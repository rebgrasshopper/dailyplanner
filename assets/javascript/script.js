'use strict'
/*global moment, $, localStorage*/
/*eslint no-undef: "error"*/

//VARIABLES

let workHour = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"];
let workHour24 = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
let now = moment().format("dddd, MMMM D, YYYY");
let agendasInitialValue = {
    "9AM":"",
    "10AM":"",
    "11AM":"",
    "12PM":"",
    "1PM":"",
    "2PM":"",
    "3PM":"",
    "4PM":"",
    "5PM":"",
    "6PM":"",
    "7PM":"",
    "8PM":"",
    "9PM":""};
let agendas = getLocalStorageOrDefault("agendas");

//FUNCTIONS

function changeDate(num) {
    now = moment().add(num, "days").format("dddd, MMMM D, YYYY");
    writeDate();
}

function writeDate () {
    $("#currentDay").text(now);
}

function saveAgenda() {
    getLocalStorageOrDefault("agendas");
    agendas[this.value] = $(this).siblings(".col-10").val()
    saveToLocal();
}


//FUNCTIONS FOR LOCAL STORAGE

function saveToLocal() {
    localStorage.setItem("agendas", JSON.stringify(agendas));
}


function getLocalStorageOrDefault(key){
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(agendasInitialValue));
        return JSON.parse(localStorage.getItem(key));
    } else {
        return JSON.parse(localStorage.getItem(key));
    }
}


function writeHours() {
    for (let hour of workHour) {
        //create blocks
        const hourDiv = $(`<div id="${hour}-row" class="row time-block"><div id="${hour}-div" class="hour col-1">${hour}</div><textarea id="${hour}" class="col-10"></textarea><button id="${hour}-btn" value="${hour}" class="saveBtn btn col-1 icon-save"></button></div>`);

        //retrieve and assign text
        const hourText = hourDiv.children(`#${hour}`);
        hourText.val(agendas[`${hour}`]);
        
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




//PAGE INIT

writeDate();
writeHours();




//EVENT LISTENERS

$(".saveBtn").on("click", saveAgenda)