let numBonesNeeded = 5;
let numBonesHidden = 0;
let numBonesFound = 0;
let randomDanger = Math.floor(Math.random()) + 15 + '%';

$("span#bones").text(5);

$(document).ready(function() {
    let numRowsNeeded = 5;
    let numRowsCreated = 0;


    while(numRowsCreated < numRowsNeeded)
    {
        // begin creating a row of 5 squares
        let numSquaresNeeded = 5;
        let numSquaresCreated = 0;

        while (numSquaresCreated < numSquaresNeeded) {
            createSquare();
            numSquaresCreated++;
        }
        // end creating the row

        // insert a break to drop down to new line
        let breakTag = $("<br>");
        $("div#board").append(breakTag);

        // add one to number of rows so far
        numRowsCreated++;


    }

    // while number of surprises successfully hidden < 5

    while (numBonesHidden < numBonesNeeded) {
        // pick a random square
        // pick a random number between 0 and 24
        let randomNumber = Math.floor(Math.random() * 25);

        let randomSquare = $("span.square").eq(randomNumber);

        // if the square does not already have a surprise
        if (!randomSquare.hasClass("surprise")) {

            // hide a surprise

            randomSquare.addClass("surprise");
            // add to number of surprises hidden

            numBonesHidden++;
        }


    }
});

function playerGuess() {
    // find what span was clicked exactly
    let clickedSpan = $(this);

    let isSurprise = clickedSpan.hasClass("surprise");

    // generate randomDanger between 5-10

    // use jQuery to get div#danger add randomDanger width
    let startWidth = $("div#danger").css("width", randomDanger);

    // if the clickedSpan is clicked, add randomDanger


    // if div#danger fills to 100% output text "LOSE"
    if (startWidth === 100) {
        $("p#loser").text("YOU LOSE!");
    }

    if (isSurprise === true) {

        numBonesFound++;
        clickedSpan.css("background-image", "url('bone3.png')");
        clickedSpan.css("background-color", "brown");
        clickedSpan.css("background-position", "center");
        clickedSpan.css("background-repeat", "no-repeat");

        $(clickedSpan).off("click");

        if (numBonesFound === 5) {
            $("p#winner").text("YOU WIN!");
        }

        $("span#bones").text(numBonesHidden - numBonesFound);
    }
    if (isSurprise === false) {
        clickedSpan.css("background-color", "brown");
        clickedSpan.css("background-position", "center");
        clickedSpan.css("background-repeat", "no-repeat");
    }

}

function createSquare() {
    let board = $("div#board");

    let square = $("<span>");
    square.height(110);
    square.width(110);
    square.addClass("square");

    square.click(playerGuess);

    board.append(square);
}

