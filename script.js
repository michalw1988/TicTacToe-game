// global variables
var gameType = ''; // pvc or pvp
var symbol = '' // X or O
var gameStarted = false;
var whoseTurn;
var p1Score;
var p2Score;
var gameMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];

									
									
$(document).ready(function () {

	// click player vs computer game
	$('#pvcButton').on('click', function(){
		gameType = 'pvc';
		$('#menuDiv').css('display', 'none');
		$('#symbolSelectionDiv').css('display', 'block');
		$('#symbolSelectionTitle').html('Select your side');
	});
	
	// clicking player vs player game
	$('#pvpButton').on('click', function(){
		gameType = 'pcp';
		$('#menuDiv').css('display', 'none');
		$('#symbolSelectionDiv').css('display', 'block');
		$('#symbolSelectionTitle').html('Select player 1 side');
	});
	
	// choosing X symbol
	$('#xButton').on('click', function(){
		symbol = 'x';
		$('#symbolSelectionDiv').css('display', 'none');
		$('#gameDiv').css('display', 'block');
		startGame();
	});
	
	// choosing O symbol
	$('#oButton').on('click', function(){
		symbol = 'o';
		$('#symbolSelectionDiv').css('display', 'none');
		$('#gameDiv').css('display', 'block');
		startGame();
	});

	// clicking '< back to menu'
	$('.backToMenuButton').on('click', function(){
		$('#symbolSelectionDiv').css('display', 'none');
		$('#gameDiv').css('display', 'none');
		$('#menuDiv').css('display', 'block');
	});
	
	// selecting one of the fields during the game
	$('#field1').on('click', function(){
		makeTurn(1);
	});
	$('#field2').on('click', function(){
		makeTurn(2);
	});
	$('#field3').on('click', function(){
		makeTurn(3);
	});
	$('#field4').on('click', function(){
		makeTurn(4);
	});
	$('#field5').on('click', function(){
		makeTurn(5);
	});
	$('#field6').on('click', function(){
		makeTurn(6);
	});
	$('#field7').on('click', function(){
		makeTurn(7);
	});
	$('#field8').on('click', function(){
		makeTurn(8);
	});
	$('#field9').on('click', function(){
		makeTurn(9);
	});
	
	// add hover effect only if a field is empty
	$('.field').hover( function() {
		var arr = this.id.split('');
		if (gameMatrix[arr[5]-1] === 0) {
			$(this).addClass('fieldHover');
		}
  }, function() {
    $(this).removeClass('fieldHover');
  }
);

});



// starting a game (reset all variables)
function startGame(){
	gameStarted = true;
	if (gameType === 'pvc'){
		whoseTurn = 'Your';
	} else {
		whoseTurn = 'Player 1';
	}
	p1Score = 0;
	p2Score = 0;
	gameMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	$('.field').html('');
	
	var infoText = p1Score + ':' + p2Score + ' | ' + whoseTurn + ' turn (' + symbol + ')';
	$('#infoPanel').html(infoText);
}



// making turns alternately
function makeTurn(field) {
	if (gameType === 'pvc'){ // PLAYER vs COMPUTER
		if (whoseTurn === 'Your' && gameMatrix[field-1] === 0){
			$('#field' + field).html(symbol);
			gameMatrix[field-1] = symbol;		
			
			// computer's turn only if a game is not over
			if (!checkResult(whoseTurn)) {
				if (symbol === 'x') {
					symbol = 'o';
				} else {
					symbol = 'x';
				}
				
				// computer makes its turn
				whoseTurn = 'Computer';
				var f = computersTurn();
				gameMatrix[f] = symbol;
				f++;
				$('#field' + f).html(symbol);
				
				// player's next turn only if a game is not over
				if (!checkResult(whoseTurn)) {
					if (symbol === 'x') {
						symbol = 'o';
					} else {
						symbol = 'x';
					}
					whoseTurn = 'Your';
				}	
			}
		}
	
	} else { // PLAYER vs PLAYER
		if (gameMatrix[field-1] === 0){
			$('#field' + field).html(symbol);
			gameMatrix[field-1] = symbol;
			
			// second player's turn only if a game is not over
			if (!checkResult(whoseTurn)) {
			
				if (symbol === 'x') {
					symbol = 'o';
				} else {
					symbol = 'x';
				}
				
				if (whoseTurn === 'Player 1') {
					whoseTurn = 'Player 2';
				} else {
					whoseTurn = 'Player 1';
				}
			
				var infoText = p1Score + ':' + p2Score + ' | ' + whoseTurn + ' turn (' + symbol + ')';
				$('#infoPanel').html(infoText);
				
			}
		}
	}
}



// checking if a game is not over
function checkResult(who) {
	var m = gameMatrix;
	var s = symbol;
	
	if ( m[0] === s && m[1] === s && m[2] === s ) {
		nextGame(who, symbol);
		$('#field1, #field2, #field3').addClass('fieldMarked');
		return true;
	} else if ( m[3] === s && m[4] === s && m[5] === s ) {
		nextGame(who, symbol);
		$('#field4, #field5, #field6').addClass('fieldMarked');
		return true;
	} else if ( m[6] === s && m[7] === s && m[8] === s ) {	
		nextGame(who, symbol);
		$('#field7, #field8, #field9').addClass('fieldMarked');
		return true;
	} else if ( m[0] === s && m[3] === s && m[6] === s ) {
		nextGame(who, symbol);
		$('#field1, #field4, #field7').addClass('fieldMarked');
		return true;
	} else if ( m[1] === s && m[4] === s && m[7] === s ) {
		nextGame(who, symbol);
		$('#field2, #field5, #field8').addClass('fieldMarked');
		return true;
	} else if ( m[2] === s && m[5] === s && m[8] === s ) {
		nextGame(who, symbol);
		$('#field3, #field6, #field9').addClass('fieldMarked');
		return true;
	} else if ( m[0] === s && m[4] === s && m[8] === s ) {
		nextGame(who, symbol);
		$('#field1, #field5, #field9').addClass('fieldMarked');
		return true;
	} else if ( m[2] === s && m[4] === s && m[6] === s ) {
		nextGame(who, symbol);
		$('#field3, #field5, #field7').addClass('fieldMarked');
		return true;
	} else if (
		m[0] !== 0 && m[1] !== 0 && m[2] !== 0 &&
		m[3] !== 0 && m[4] !== 0 && m[5] !== 0 &&
		m[6] !== 0 && m[7] !== 0 && m[8] !== 0
	) {
		nextGame('Draw.', null);
		return true;
	}
	return false;
}



// if a game is over, prepare next game
function nextGame(who, symb) {
	// enabling end screen
	$('#endScreen').css('display', 'block');
	
	// making it visible
	setTimeout(function(){
		$('#endScreen').css('opacity', '1');
		
		// showing proper text
		if (who === 'Player 1' || who === 'Player 2' || who === 'Computer'){
			$('#endScreenMessage').html(who + ' (' + symb + ') won!');
		}
		else if (who === 'Your') {
			$('#endScreenMessage').html('You (' + symb + ') won!');
		} else {
			$('#endScreenMessage').html('It was a draw.');
		}
		
		// resetting variables
		if (who === 'Player 2' || who === 'Computer') {
			p2Score++;
		} else if (who === 'Player 1' || who === 'Your') {
			p1Score++;
		}
		
		if(whoseTurn === 'Player 1') {
			whoseTurn = 'Player 2';
		} else if (whoseTurn === 'Player 2') {
			whoseTurn = 'Player 1';
		} else if (whoseTurn === 'Your') {
			whoseTurn = 'Computer';
		} else if (whoseTurn === 'Computer') {
			whoseTurn = 'Your';
		}
		
		if (symbol === 'x') {
			symbol = 'o';
		} else {
			symbol = 'x';
		}
	
		var infoText = p1Score + ':' + p2Score + ' | ' + whoseTurn + ' turn (' + symbol + ')';
		$('#infoPanel').html(infoText);
		
		// hiding the end screen
		setTimeout(function(){
			$('#endScreen').css('opacity', '0');
			
			// clearing game fields
			gameMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			$('.field').html('');
			$('.field').removeClass('fieldMarked');
			
			// if computer should start, it makes move now
			if (whoseTurn === 'Computer') {
				var f = computersTurn();
				gameMatrix[f] = symbol;
				f++;
				$('#field' + f).html(symbol);
				
				checkResult(whoseTurn);
				
				if (symbol === 'x') {
					symbol = 'o';
				} else {
					symbol = 'x';
				}
				
				whoseTurn = 'Your';
				var infoText = p1Score + ':' + p2Score + ' | ' + whoseTurn + ' turn (' + symbol + ')';
				$('#infoPanel').html(infoText);
			}
			
			// disabling end screen
			setTimeout(function(){
				$('#endScreen').css('display', 'none');
			}, 1000);
			
		}, 1500);

	}, 100);
}



// computer AI
function computersTurn(){
	var m = gameMatrix;
	var s = symbol; // computer symbol
	var es; // player symbol
	if (s === 'x') {
		es = 'o';
	} else {
		es = 'x';
	}
	
	// searching for winning moves
	if (
		(m[0] === 0 && m[1] === s && m[2] === s) ||
		(m[0] === 0 && m[3] === s && m[6] === s) ||
		(m[0] === 0 && m[4] === s && m[8] === s)
	) {
		return 0;
	}
	
	if (
		(m[0] === s && m[1] === 0 && m[2] === s) ||
		(m[1] === 0 && m[4] === s && m[7] === s)
	) {
		return 1;
	}
	
	if (
		(m[0] === s && m[1] === s && m[2] === 0) ||
		(m[2] === 0 && m[5] === s && m[8] === s) ||
		(m[2] === 0 && m[4] === s && m[6] === s)
	) {
		return 2;
	}
	
	if (
		(m[0] === s && m[3] === 0 && m[6] === s) ||
		(m[3] === 0 && m[4] === s && m[5] === s)
	) {
		return 3;
	}
	
	if (
		(m[1] === s && m[4] === 0 && m[7] === s) ||
		(m[3] === s && m[4] === 0 && m[5] === s) ||
		(m[0] === s && m[4] === 0 && m[8] === s) ||
		(m[2] === s && m[4] === 0 && m[6] === s)
	) {
		return 4;
	}
	
	if (
		(m[2] === s && m[5] === 0 && m[8] === s) ||
		(m[3] === s && m[4] === s && m[5] === 0)
	) {
		return 5;
	}
	
	if (
		(m[0] === s && m[3] === s && m[6] === 0) ||
		(m[6] === 0 && m[7] === s && m[8] === s) ||
		(m[2] === s && m[4] === s && m[6] === 0)
	) {
		return 6;
	}
	
	if (
		(m[1] === s && m[4] === s && m[7] === 0) ||
		(m[6] === s && m[7] === 0 && m[8] === s)
	) {
		return 7;
	}
	
	if (
		(m[2] === s && m[5] === s && m[8] === 0) ||
		(m[6] === s && m[7] === s && m[8] === 0) ||
		(m[0] === s && m[4] === s && m[8] === 0)
	) {
		return 8;
	}
	
	
	// searching for enemy winning moves and blocking
	if (
		(m[0] === 0 && m[1] === es && m[2] === es) ||
		(m[0] === 0 && m[3] === es && m[6] === es) ||
		(m[0] === 0 && m[4] === es && m[8] === es)
	) {
		return 0;
	}
	
	if (
		(m[0] === es && m[1] === 0 && m[2] === es) ||
		(m[1] === 0 && m[4] === es && m[7] === es)
	) {
		return 1;
	}
	
	if (
		(m[0] === es && m[1] === es && m[2] === 0) ||
		(m[2] === 0 && m[5] === es && m[8] === es) ||
		(m[2] === 0 && m[4] === es && m[6] === es)
	) {
		return 2;
	}
	
	if (
		(m[0] === es && m[3] === 0 && m[6] === es) ||
		(m[3] === 0 && m[4] === es && m[5] === es)
	) {
		return 3;
	}
	
	if (
		(m[1] === es && m[4] === 0 && m[7] === es) ||
		(m[3] === es && m[4] === 0 && m[5] === es) ||
		(m[0] === es && m[4] === 0 && m[8] === es) ||
		(m[2] === es && m[4] === 0 && m[6] === es)
	) {
		return 4;
	}
	
	if (
		(m[2] === es && m[5] === 0 && m[8] === es) ||
		(m[3] === es && m[4] === es && m[5] === 0)
	) {
		return 5;
	}
	
	if (
		(m[0] === es && m[3] === es && m[6] === 0) ||
		(m[6] === 0 && m[7] === es && m[8] === es) ||
		(m[2] === es && m[4] === es && m[6] === 0)
	) {
		return 6;
	}
	
	if (
		(m[1] === es && m[4] === es && m[7] === 0) ||
		(m[6] === es && m[7] === 0 && m[8] === es)
	) {
		return 7;
	}
	
	if (
		(m[2] === es && m[5] === es && m[8] === 0) ||
		(m[6] === es && m[7] === es && m[8] === 0) ||
		(m[0] === es && m[4] === es && m[8] === 0)
	) {
		return 8;
	}
	
	
	// preventing opponent to win in a second move
	if (JSON.stringify(m) === '[0,"'+es+'",0,0,"'+s+'",0,"'+es+'",0,0]'){
		return 0;
	}
	
	if (JSON.stringify(m) === '[0,"'+es+'",0,0,"'+s+'",0,0,0,"'+es+'"]'){
		return 2;
	}
	
	if (JSON.stringify(m) === '[0,0,"'+es+'","'+es+'","'+s+'",0,0,0,0]'){
		return 0;
	}
	
	if (JSON.stringify(m) === '[0,0,0,"'+es+'","'+s+'",0,0,0,"'+es+'"]'){
		return 6;
	}
	
	if (JSON.stringify(m) === '["'+es+'",0,0,0,"'+s+'","'+es+'",0,0,0]'){
		return 2;
	}
	
	if (JSON.stringify(m) === '[0,0,0,0,"'+s+'","'+es+'","'+es+'",0,0]'){
		return 8;
	}
	
	if (JSON.stringify(m) === '["'+es+'",0,0,0,"'+s+'",0,0,"'+es+'",0]'){
		return 6;
	}
	
	if (JSON.stringify(m) === '[0,0,"'+es+'",0,"'+s+'",0,0,"'+es+'",0]'){
		return 8;
	}
	
	
	if (JSON.stringify(m) === '["'+s+'",0,0,0,"'+es+'",0,0,0,"'+es+'"]'){
		return 2;
	}
	
	if (
		JSON.stringify(m) === '["'+es+'",0,0,0,"'+s+'",0,0,0,"'+es+'"]' ||
		JSON.stringify(m) === '[0,0,"'+es+'",0,"'+s+'",0,"'+es+'",0,0]'
	){
		return 1;
	}
	
	
	// starting
	if (JSON.stringify(m) === '[0,0,0,0,0,0,0,0,0]'){
		return 0;
	}
	
	// 2nd offensive move - trying diagonal win strategy
	if (JSON.stringify(m) === '["'+s+'",0,0,0,"'+es+'",0,0,0,0]'){
		return 8;
	}
	
	
	// 2nd move - search for other moves with potential (2 in a row and 3rd empty)
	if (
		(m[1] === 0 && m[4] === 0 && m[7] === s) ||
		(m[1] === s && m[4] === 0 && m[7] === 0) ||
		(m[3] === 0 && m[4] === 0 && m[5] === s) ||
		(m[3] === s && m[4] === 0 && m[5] === 0) ||
		(m[0] === 0 && m[4] === 0 && m[8] === s) ||
		(m[0] === s && m[4] === 0 && m[8] === 0) ||
		(m[2] === 0 && m[4] === 0 && m[6] === s) ||
		(m[2] === s && m[4] === 0 && m[6] === 0)
	) {
		return 4;
	}
	
	if (
		(m[0] === 0 && m[1] === s && m[2] === 0) ||
		(m[0] === 0 && m[1] === 0 && m[2] === s) ||
		(m[0] === 0 && m[3] === s && m[6] === 0) ||
		(m[0] === 0 && m[3] === 0 && m[6] === s) ||
		(m[0] === 0 && m[4] === s && m[8] === 0) ||
		(m[0] === 0 && m[4] === 0 && m[8] === s)
	) {
		return 0;
	}
	
	if (
		(m[0] === 0 && m[1] === s && m[2] === 0) ||
		(m[0] === s && m[1] === 0 && m[2] === 0) ||
		(m[2] === 0 && m[5] === 0 && m[8] === s) ||
		(m[2] === 0 && m[5] === s && m[8] === 0) ||
		(m[2] === 0 && m[4] === 0 && m[6] === s) ||
		(m[2] === 0 && m[4] === s && m[6] === 0)
	) {
		return 2;
	}
	
	if (
		(m[0] === 0 && m[3] === s && m[6] === 0) ||
		(m[0] === s && m[3] === 0 && m[6] === 0) ||
		(m[6] === 0 && m[7] === 0 && m[8] === s) ||
		(m[6] === 0 && m[7] === s && m[8] === 0) ||
		(m[2] === 0 && m[4] === s && m[6] === 0) ||
		(m[2] === s && m[4] === 0 && m[6] === 0)
	) {
		return 6;
	}
	
	if (
		(m[2] === 0 && m[5] === s && m[8] === 0) ||
		(m[2] === s && m[5] === 0 && m[8] === 0) ||
		(m[6] === 0 && m[7] === s && m[8] === 0) ||
		(m[6] === s && m[7] === 0 && m[8] === 0) ||
		(m[0] === 0 && m[4] === s && m[8] === 0) ||
		(m[0] === s && m[4] === 0 && m[8] === 0)
	) {
		return 8;
	}
	
	if (
		(m[0] === 0 && m[1] === 0 && m[2] === s) ||
		(m[0] === s && m[1] === 0 && m[2] === 0) ||
		(m[1] === 0 && m[4] === 0 && m[7] === s) ||
		(m[1] === 0 && m[4] === s && m[7] === 0)
	) {
		return 1;
	}
	
	if (
		(m[0] === 0 && m[3] === 0 && m[6] === s) ||
		(m[0] === s && m[3] === 0 && m[6] === 0) ||
		(m[3] === 0 && m[4] === 0 && m[5] === s) ||
		(m[3] === 0 && m[4] === s && m[5] === 0)
	) {
		return 3;
	}
	
	if (
		(m[2] === 0 && m[5] === 0 && m[8] === s) ||
		(m[2] === s && m[5] === 0 && m[8] === 0) ||
		(m[3] === 0 && m[4] === s && m[5] === 0) ||
		(m[3] === s && m[4] === 0 && m[5] === 0)
	) {
		return 5;
	}
	
	if (
		(m[1] === 0 && m[4] === s && m[7] === 0) ||
		(m[1] === s && m[4] === 0 && m[7] === 0) ||
		(m[6] === 0 && m[7] === 0 && m[8] === s) ||
		(m[6] === s && m[7] === 0 && m[8] === 0)
	) {
		return 7;
	}
	
	
	// go to any other field
	if (m[4] === 0) {
		return 4;
	}
	
	if (m[0] === 0) {
		return 0;
	}
	
	if (m[2] === 0) {
		return 2;
	}
	
	if (m[6] === 0) {
		return 6;
	}
	
	if (m[8] === 0) {
		return 8;
	}
	
	if (m[1] === 0) {
		return 1;
	}
	
	if (m[3] === 0) {
		return 3;
	}
	
	if (m[5] === 0) {
		return 5;
	}
	
	if (m[7] === 0) {
		return 7;
	}
}