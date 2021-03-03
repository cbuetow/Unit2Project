const NUMBONES = 7;
let numBonesHidden = 0;
let numBonesFound = 0;
let dangerPercent = 0;

$("span#bones").text(NUMBONES);

$(document).ready(function() {
    let numRowsCreated = 0;


    while(numRowsCreated < NUMBONES)
    {
        // begin creating a row of 5 squares
        let numSquaresCreated = 0;

        while (numSquaresCreated < NUMBONES) {
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

    while (numBonesHidden < NUMBONES) {
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

    // generate randomDanger between 15-25%
    let randomDanger = Math.floor(Math.random() * 10) + 15;
    (dangerPercent += randomDanger);
    dangerPercent = Math.min(dangerPercent, 100);
    let addWidth =  dangerPercent + '%';


    // use jQuery to get div#danger add randomDanger width
    $("div#danger").css("width", addWidth);


    // if div#danger fills to 100% output text "LOSE"
    if (dangerPercent >= 100) {
        $("p#loser").text("YOU LOSE!");
        $("span").off("click");
    }

    if (isSurprise === true) {

        numBonesFound++;
        clickedSpan.css("background-image", "url('bone3.png')");
        clickedSpan.css("background-color", "brown");
        clickedSpan.css("background-position", "center");
        clickedSpan.css("background-repeat", "no-repeat");

        $(clickedSpan).off("click");

        if (numBonesFound === NUMBONES) {
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

