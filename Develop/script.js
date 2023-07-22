// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  var currentDayEl = $("#currentDay");
  var currentDayTime = dayjs().format("dddd, MMMM D");
  //        native java: document.querySelectorAll(""); this "all" is implied in jQuery
  var saveBtn = $(".saveBtn");


  console.log(currentDayTime);
  currentDayEl.text(currentDayTime);

  //current hour is in military time (24hr period)
  var currentHour = dayjs().hour();
  console.log(currentHour);

  /* 
  
  1. Create a loop to get all time block ids, starting from 9am
  2. compare the i with current hour

  */
  for (let i = 9; i < 18; i++) {
    var timeBlock = $("#hour-" + i);

    if (i === currentHour) {
      timeBlock.addClass("present");
    }
    else if (currentHour > i) {
      timeBlock.addClass("past")
    }
    else {
      timeBlock.addClass("future")
    }
  }

  var textArea = document.getElementsByClassName("description");
  for (var i = 0; i < textArea.length; i++) {
      var hour = $(textArea[i]).parent().attr("id")
      // how to retrieve local storage:
      var event = localStorage.getItem(hour);

      console.log(event); 
      textArea[i].textContent=event;
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  function saveEvent(event) {
    var currentButton = $(event.target);
    var textArea = currentButton.siblings("textarea");
    var parentId = currentButton.parent().attr("id");

    //used this to check that what i am adding is working
    alert(textArea.val()+" " + parentId);
    localStorage.setItem(parentId, textArea.val());

  }

  saveBtn.on("click", saveEvent)
});

