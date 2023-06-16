/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEYS = { //This stores each of the number values of the arrows buttons
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    //This stores each of the key name values of the WASD keys
    WKEY: "w",
    AKEY: "a",
    SKEY: "s",
    DKEY: "d",
  }
  var positionX = 100; // the x-coordinate location for the walker
  var speedX = 0; // the speed for the walker along the x-axis
  var positionY = 100; // the y-coordinate location for the walker
  var speedY = 0; // the speed for the walker along the y-axis

  var positionX2 = 200; // the x-coordinate location for the walker
  var speedX2 = 0; // the speed for the walker along the x-axis
  var positionY2 = 200; // the y-coordinate location for the walker
  var speedY2 = 0; // the speed for the walker along the y-axis

  var tagging = true; //This will be used for if they can tag or not

  var player1 = {
    //The two player objects here are the locations and box size this will be used for proper hitbox detection
  }

  var player2 = {
  }
  var wallLeft = 0;
  var wallTop = 0;
  var wallBottom = 390;
  var wallRight = 390;

  // Game Item Objects
  var walker = $("#walker");
  var tagged = 1;
  var walker2 = $("#walker2");
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) { //This function checks for keypresses and changes speed values retrospective to the keys
    if (event.which === KEYS.LEFT) {
      speedX = -5;
    }
    else if (event.which === KEYS.RIGHT) {
      speedX = 5;
    }
    else if (event.which === KEYS.UP) {
      speedY = -5;
    }
    else if (event.which === KEYS.DOWN) {
      speedY = 5;
    }
    else if (event.key === KEYS.AKEY) {
      speedX2 = -5;
    }
    else if (event.key === KEYS.DKEY) {
      speedX2 = 5;
    }
    else if (event.key === KEYS.WKEY) {
      speedY2 = -5;
    }
    else if (event.key === KEYS.SKEY) {
      speedY2 = 5;
    }
  }

  function handleKeyUp(event) { //This function sets any of the speed values back to zero so the players dont move forever
    if (event.which === KEYS.LEFT) {
      speedX = 0;
    }
    else if (event.which === KEYS.RIGHT) {
      speedX = 0;
    }
    else if (event.which === KEYS.UP) {
      speedY = 0;
    }
    else if (event.which === KEYS.DOWN) {
      speedY = 0;
    }
    else if (event.key === KEYS.AKEY) {
      speedX2 = 0;
    }
    else if (event.key === KEYS.DKEY) {
      speedX2 = 0;
    }
    else if (event.key === KEYS.WKEY) {
      speedY2 = 0;
    }
    else if (event.key === KEYS.SKEY) {
      speedY2 = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    if (positionX <= wallLeft) {
      //This section including the three other else ifs below check if it is past a wall and sets them back before it
      positionX = 1;
    }
    else if (positionY <= wallTop) {
      positionY = 1;
    }
    else if (positionX >= wallRight) {
      positionX = 389;
    }
    else if (positionY >= wallBottom) {
      positionY = 389;
    }
    else {
      /*
      This section moves the player when nothing else is true
      */
      positionX += speedX;
      positionY += speedY;
    }

    if (positionX2 <= wallLeft) {
      //This section including the three other else ifs below check if it is past a wall and sets them back before it
      positionX2 = 1;
    }
    else if (positionY2 <= wallTop) {
      positionY2 = 1;
    }
    else if (positionX2 >= wallRight) {
      positionX2 = 389;
    }
    else if (positionY2 >= wallBottom) {
      positionY2 = 389;
    }
    else {
      /*
      This section moves the player when nothing else is true
      */
      positionX2 += speedX2;
      positionY2 += speedY2;
    }

  }

  function redrawGameItem() {
    walker.css("left", positionX); //This function draws or puts the walkers [players] on the new positionX/Y
    walker.css("top", positionY);
    //This was placed here for the player objects so they are constantly updated and not 1 value
    player1.id = "#walker";
    player1.x = parseFloat(walker.css("left"));
    player1.y = parseFloat(walker.css("top"));
    player1.x2 = player1.x + walker.width();
    player1.y2 = player1.y + walker.height();
    //------------------------------------------------Felt cluttered
    walker2.css("left", positionX2);
    walker2.css("top", positionY2);
    //Same as player1
    player2.id = "#walker";
    player2.x = parseFloat(walker2.css("left"));
    player2.y = parseFloat(walker2.css("top"));
    player2.x2 = player2.x + walker2.width();
    player2.y2 = player2.y + walker2.height();
    //console.log(player1.x);
    if (player1.x < player2.x2 && player1.x2 > player2.x && player1.y < player2.y2 && player1.y2 > player2.y && tagging ===true) {
      //This utilizes the two player objects from the start to see if they are interacting with each other
      //Currently doing the same as beforehand will fix later.
      if (tagged === 1) {
        tagged = 2;
        tagging = false;
        setTimeout(() => {
          tagging = true;
        }, 1000);
      }
      else if (tagged === 2) {
        tagged = 1;
        tagging = false;
        setTimeout(() => {
          tagging = true;
        }, 1000);
      }
    }
    //console.log(tagged);
    if (tagged === 1) { //This funny section checks the tagged player number and sets the color to the proper values
      walker.css("background-color", "red");
      walker2.css("background-color", "navy");
    }
    else if (tagged === 2) {
      walker.css("background-color", "teal");
      walker2.css("background-color", "maroon");
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
