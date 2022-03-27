//  GIVEN I am using a daily planner to create a schedule
//  WHEN I open the planner
var startOfDay = 9

// Number of time blocks per day
var divisions = 9

//  THEN the current day is displayed at the top of the calendar
var $today = moment().format("MMM Do YYYY"); // using id currentDay
$('#currentDay').text($today);


//  WHEN I scroll down
//  WHEN I click into a time block
//  THEN I can enter an event
//  THEN I am presented with time blocks for standard business hours
//Attach HTML element to newly created time blocks in JS
var tempTime = moment().startOf('day');
tempTime = moment(tempTime).add(startOfDay,'hours');
//  WHEN I view the time blocks for that day
//  THEN each time block is color-coded to indicate whether it is in the past, present, or future
var currentTime = moment();
var blockColor = '';

for (i = 0; i < divisions; i++) {
    var storedItem = "";

    if (currentTime.hour()=== tempTime.hour()){
        blockColor= 'present';
    } else if (tempTime.isBefore(currentTime)){
        blockColor= 'past'; 
    } else if ( tempTime.isAfter(currentTime)){
        blockColor= 'future';
    }    

    if(localStorage.getItem(moment(tempTime).hour()) != null){
        storedItem = localStorage.getItem(moment(tempTime).hour());
    }

    var block =` 
    <div class="row time-block">
        <div class="hour" id="${moment(tempTime).hour()}"> ${moment(tempTime).format("LT")}</div>
        <div class="description ${blockColor}"> <textarea rows="2" cols="100">${storedItem}</textarea></div>
        <button class="saveBtn"> <i class="fas fa-save"></i> </button>
    </div>`;
    $( "#planner" ).append(block);
    tempTime = moment(tempTime).add(1,'hour');
} 
//  WHEN I click the save button for that time block
//  THEN the text for that event is saved in local storage
$('.saveBtn').on('click', function(){
    var text = $(this).parent().children().find('textarea').val()
    var hour = $(this).parent().children('.hour').attr('id')
    localStorage.setItem(hour, text);
    alert('Saved your item!')
});
//  WHEN I refresh the page
//  THEN the saved events persist