// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter();
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter() {//This applies a filter to the image
  for (var r = 0; r < image.length; r++) {
    for (var c = 0; c < image[r].length; c++) {
      var rgbString = image[r][c];//This with the two for loops gets the current pixel on the image
      console.log(rgbString);
      var rgbNumbers = rgbStringToArray(rgbString);//This turns the specific pixel selected into a color from the image
      rgbNumbers[RED] = 255;//These values edit the coloration of the original image
      rgbNumbers[GREEN];
      rgbNumbers[BLUE];
      rgbString = rgbArrayToString(rgbNumbers);//This turns the edited color from RGBNumbers to a string
      image[r][c] = rgbString;//This sets the specified pixel to the coloration of the string
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function


// TODO 5: Create the keepInBounds function


// TODO 3: Create reddify function
function reddify(argArray) {
  argArray[RED] = 200; //When called it should change the coloration of the image to red [assumption]
}

// TODO 6: Create more filter functions


// CHALLENGE code goes below here
