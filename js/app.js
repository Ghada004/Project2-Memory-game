//Ghada

// list all needed content

let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards); // to check shuffle function

const deck = document.getElementById("card-deck");
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let matchedCard = document.getElementsByClassName("match");
let starsList = document.querySelectorAll(".stars li");

var openedCards = [];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


// shuffled cards when page is refresh
document.body.onload = startGame();


// start Game function
function startGame() {
	cards = shuffle(cards);
	// remove all classes from each card
	for (var i = 0; i < cards.length; i++) {
		deck.innerHTML = "";
		[].forEach.call(cards, function (item) {
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled");
	}
	// reset moves
	moves = 0;
	counter.innerHTML = moves;
	// reset rating
	for (var i = 0; i < stars.length; i++) {
		stars[i].style.color = "#FFD700";
		stars[i].style.visibility = "visible";
	}
	//reset timer
	second = 0;
	minute = 0;
	hour = 0;
	var timer = document.querySelector(".timer");
	timer.innerHTML = "0 mins 0 secs";
	clearInterval(interval);
}


//  toggles open and show class to display cards
var displayCard = function () {
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
};


//  add opened cards to OpenedCards list and check if cards are match or unmatched
function cardOpen() {
	openedCards.push(this);
	var len = openedCards.length;
	if (len === 2) {
		movesCounter();
		if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
			matched();
		} else {
			unmatched();
		}
	}
};


// cards Match
function matched() {
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show", "open", "no-event");
	openedCards[1].classList.remove("show", "open", "no-event");
	openedCards = [];
	checkAllMatch();
}


// cards unMatch
function unmatched() {
	openedCards[0].classList.add("unmatched");
	openedCards[1].classList.add("unmatched");
	disable();
	setTimeout(function () {
		openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
		openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
		enable();
		openedCards = [];
	}, 1000);
}

//  disable cards *temporarily*
function disable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.add('disabled');
	});
}


//  enable cards and disable matched cards
function enable() {
	Array.prototype.filter.call(cards, function (card) {
		card.classList.remove('disabled');
		for (var i = 0; i < matchedCard.length; i++) {
			matchedCard[i].classList.add("disabled");
		}
	});
}


//  count moves
function movesCounter() {
	moves++;
	counter.innerHTML = moves;
	//start timer on first click
	if (moves == 1) {
		second = 0;
		minute = 0;
		hour = 0;
		startTimer();
	}
	// setting rates based on moves
	if (moves > 5 && moves < 10) {
		for (i = 0; i < 3; i++) {
			if (i > 1) {
				stars[i].style.visibility = "collapse";
			}
		}
	} else if (moves > 11) {
		for (i = 0; i < 3; i++) {
			if (i > 0) {
				stars[i].style.visibility = "collapse";
			}
		}
	}
}


//  game timer
var second = 0,
	minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
	interval = setInterval(function () {
		timer.innerHTML = minute + "mins " + second + "secs";
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		}
		if (minute == 60) {
			hour++;
			minute = 0;
		}
	}, 1000);
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", cardOpen);
};


// loop all cards when all Matching
function checkAllMatch() {
	let all = true; // default case all matched
	$('.card').each(function () {
		return all = $(this).hasClass("match");
	});
	if (all) {
		allMatched();
		end = true;
	}
};


// Alert Function from https://sweetalert2.github.io
	function sweetalert() {
		swal({
			type: 'success',
			title: 'Congratulations! You Won!',
			text: 'With ' + moves + ' Moves , ' + minute +" Minutes and "+ second + ' Seconds.',
			footer: 'Refrsh To Play agin!',
		})

	};

	// show alert function
	function allMatched() {
		sweetalert();
	};

// The END. :)
