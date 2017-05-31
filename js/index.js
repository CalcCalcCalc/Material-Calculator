$(document).ready(function() {
  var stage = [];
  var answer = [];
  var isAnswer = false;
  var operatorActive = false;
  var decimalFlag = false;

  function ResetCalc() {
    stage = [];
    answer = [];
    $("#stage").html("<p> </p>");
    $("#answer").html("<p> </p>");
    isAnswer = false;
    operatorActive = true;
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
        //$("#stage").html("<p>" + stage + "</p>");
        if (operatorActive) operatorActive = false;
        break;
      case '=': // replaces stage with answer, then clears answer
        stage = [answer];
        answer = [];
        //var splitStage = stage[0].split("");
        //if (splitStage.length > 12){
          //stage = [parseFloat(splitStage.join("")).toPrecision(8)];
          //stage = [num];
        //}
        $("#answer").html("<p> </p>");
        $("#stage").html("<p>" + stage + "</p>");
        operatorActive = false;
        isAnswer = true;
        decimalFlag = false;
        return;
      default: // an evaluable button is pressed
        // if operator active, replace operator
        if (this.value == "+" || this.value == "-" || this.value == "*" || this.value == "/") {
          if (operatorActive) {
            var splitStage = stage[0].split("");
            splitStage.pop();
            stage = [splitStage.join("")];
          }
          operatorActive = true;
          isAnswer = false;
        } else {
          operatorActive = false;
          if (isAnswer) {
            stage = [];
            isAnswer = false;
          }
        }

        if (operatorActive) {
          decimalFlag = false;
        }

        if (this.value == ".") { // todo: no decimal point allowed after operator
          if (decimalFlag) {
            return;
          }
          decimalFlag = true;
        }
        stage.push(this.value);
        stage = [stage.join("")];
    }


    if (!operatorActive) {
      answer = eval(stage.join(""));
      if (stage != answer) {
        $("#answer").html("<p>" + answer + "</p>");
      }
    }

    $("#stage").html("<p>" + stage + "</p>");

    function OperatorActive(){ // This replaces the operator active boolean
      var splitStage = stage[0].split("");
      if ((splitStage[splitStage.length-1] == "+") ||
        (splitStage[splitStage.length-1] == "-") ||
        (splitStage[splitStage.length-1] == "*") ||
        (splitStage[splitStage.length-1] == "/")){
        return true
      }
      return false;
    }
  });
});

// Todo: after truncating for precision, last number sometimes gets erased
// Todo: Make stage contents overflow into a scrolling text area, and only limit precision after evaluation.
// Todo: Wake ".3" or ".43" etc show up on stage before number is pressed.
// Todo: add keypad control.
// Todo: answer only shows when a number following an operator is present
