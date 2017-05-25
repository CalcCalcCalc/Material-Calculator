$(document).ready(function (){
	var stage = [];
	var answer = [];
	var isAnswer = false;
	var operatorActive = false;
	var decimalFlag = false;

	function ResetCalc(){
		stage = [];
		answer = [];
		$("#stage").html("<p> </p>");
		$("#answer").html("<p> </p>");
		isAnswer = false;
		operatorActive = true;
		decimalFlag = false;
	}

	$("button").click(function(){
		switch(this.value){
			case "C": // clears all variables and arrays
				ResetCalc();
				return;
			case '=': // replaces stage with answer, then clears answer
				stage = [answer];
				answer = [];
				$("#answer").html("<p> </p>");
				$("#stage").html("<p>" + stage + "</p>");
				operatorActive = false;
				isAnswer = true;
				decimalFlag = false;
				return;
			default: // an evaluable button is pressed
			// if operator active, replace operator
				if (this.value == "+" || this.value == "-"|| this.value == "*"|| this.value == "/"){
					if (operatorActive){
						var splitStage = stage[0].split("");
						splitStage.pop();
						stage = [splitStage.join("")];
					}
					operatorActive = true;
					isAnswer = false;
				}else{
					operatorActive = false;
					if (isAnswer){
						stage = [];
						isAnswer = false;
					}
				}

				if (operatorActive){
					decimalFlag = false;
				}

				if (this.value == "."){ // todo: no decimal point allowed after operator
					if (decimalFlag){
						return;
					}
					decimalFlag = true;
				}


				stage.push(this.value);
				stage = [stage.join("")];
			}
			if (!operatorActive){
				answer = eval(stage.join(""));
				$("#answer").html("<p>" + answer + "</p>");
			}

		$("#stage").html("<p>" + stage + "</p>");

	});
});
