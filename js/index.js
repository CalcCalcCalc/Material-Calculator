$(document).ready(function() {
  var stage = [];
  var answer = [];
  var isAnswer = false;
  var decimalFlag = false;

  function ResetCalc() {
    stage = [];
    answer = [];
    $("#stage").html("<p> </p>");
    $("#answer").html("<p> </p>");
    isAnswer = false;
    decimalFlag = false;
  }

  $("button").click(function() {
    switch (this.value) {
      case "C": // clears all variables and arrays
        ResetCalc();
        return;
      case "backspace":
        var splitStage = stage[0].split("");
        splitStage.pop("");
        stage = [splitStage.join("")];
        break;
      case '=': // replaces stage with answer, then clears answer
        stage = [String(answer)];
        answer = [];
        var splitStage = stage[0].split("");
        if (splitStage.length > 15){
          /*ResetCalc();
          $("#stage").html("<p>Character limit exceeded </p>");
          return;*/
          stage = [parseFloat(stage[0]).toPrecision(8)]; // this is the real solution, but needs more work
        }
        $("#answer").html("<p> </p>");
        $("#stage").html("<p>" + stage + "</p>");
        operatorActive = false;
        isAnswer = true;
        decimalFlag = false;
        return;
      default: // an evaluable button is pressed
        // if operator active, replace operator
        if (this.value == "+" || this.value == "-" || this.value == "*" || this.value == "/") { // depricated
          if (OperatorActive()) {
            var splitStage = stage[0].split("");
            splitStage.pop();
            stage = [splitStage.join("")];
          }
          isAnswer = false;
        } else {
          if (isAnswer) {
            stage = [];
            isAnswer = false;
          }
        }
        // utilises decimalFlag
        if (this.value == ".") {
          if (decimalFlag) {
            return;
          }
          decimalFlag = true;
        }
        // pushes value of button on to stage
        stage.push(this.value);
        stage = [stage.join("")];
        console.log(stage);
    }

    if (!OperatorActive()) {
      var splitStage = stage[0].split("");
      if (splitStage[splitStage.length-1] == ".") return;
      answer = eval(stage.join(""));
      if (stage != answer) {
        $("#answer").html("<p>" + answer + "</p>");
      }
    }

    var splitStage = stage[0].split("");
    if (splitStage.length > 15){
      ResetCalc();
      $("#stage").html("<p>Character limit exceeded </p>");
      return;
      //stage = [parseFloat(stage[0]).toPrecision(8)]; // this is the real solution, but needs more work
    }
    $("#stage").html("<p>" + stage + "</p>");

    function OperatorActive(){ // This replaces the operator active boolean
      var splitStage = stage[0].split("");
      if ((splitStage[splitStage.length-1] == "+") ||
        (splitStage[splitStage.length-1] == "-") ||
        (splitStage[splitStage.length-1] == "*") ||
        (splitStage[splitStage.length-1] == "/")){
        decimalFlag = false;
        return true
      }
      return false;
    }
  });
});

// Todo: after truncating for precision, last number sometimes gets erased
// Todo: Make stage contents overflow into a scrolling text area, and only limit precision after evaluation.
// Todo: add keypad control.
// Todo: answer only shows when a number following an operator is present
