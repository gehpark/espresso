/**
 * automatic function to represent a slot machine
 */
var slotMachine = (function() {
  
  var totalSpinTime = 4000, // in milliseconds
      imageHeight = 150, // in pixels
      totalHeight = imageHeight * 3,
      speeds = [],
      finalPositions = [],
      startTime = null,
      options = ['espresso', 'tea', 'coffee'];

  function clickHandler() {
    $('#readyLever').click(setupAndSpin);
  }

  // choose random positions for each reel and start animations
  function setupAndSpin() {
    for (var i = 0; i < 3; ++i) {
      speeds[i] = Math.random() + 1;  
      finalPositions[i] = Math.floor(Math.random() * 3) * imageHeight;
    }
    spin();
    leverTrigger();
  }

  /**
   * This function uses the time elapsed to gradually slow down the spin speed
   * @param currentTime: in milliseconds
   */
  function spin(currentTime) {
    $('#message').html("drum roll, please...");
    if (!startTime) {
      startTime = currentTime;
    }
    var elapsedTime = currentTime - startTime || 0;
    // drag factor will approach zero to slow down animation
    var dragFactor = (totalSpinTime - elapsedTime) * 
                     (totalSpinTime - elapsedTime) / totalSpinTime;
    for (var i = 0; i < 3; ++i) {
      $('#reel' + i).scrollTop(
        (speeds[i] * dragFactor + finalPositions[i]) % totalHeight);
    }
    if (elapsedTime < totalSpinTime) {
      requestAnimationFrame(spin);
    } else {
      startTime = null;
      check();
    }
  }
  
  // toggle trigger for "pulled" animation
  function leverTrigger() {
    $("#readyLever").toggle();
    $("#spinningLever").toggle();
  }

  // check results to see if they match up
  function check() {
    if (finalPositions[0] === finalPositions[1] && 
        finalPositions[1] === finalPositions[2]) {
      $('#message').html("you won! Enjoy your " + 
        // final positions are mutiples of image heights
        options[finalPositions[0] / imageHeight]); 
    } else {
      $('#message').html("try again!");
    }
    leverTrigger();
  }
  return {clickHandler: clickHandler}
})();

$(slotMachine.clickHandler);