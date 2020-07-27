(function () {
    console.log("insanity check", $);

    var currentPlayer = "player1";
    var circle = "circle1";
    var results = $(".slot");

    // var displayPlayer = $(".currentplayer");
    var newGame = $("#button");
    // var music;
    var audio2 = new Audio();
    audio2.src = "cheers.mp3";
    var diagWin = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [15, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38],
    ];

    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        var slotsInColumn = col.find(".slot"); // col.children();
        var slotsInRow;
        var i;
        for (i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);

                slotsInRow = $(".row" + i);
                break;
            }
            // playAudio();
        }
        if (i < 0) {
            return;
        }

        if (checkForVictory(slotsInColumn)) {
            mostrarVitoria();
            console.log("i win");
            return;
        } else if (checkForVictory(slotsInRow)) {
            mostrarVitoria();
            console.log("i win");
            return;
        } else if (diagVictory()) {
            mostrarVitoria();
            // window.alert("i win");
            return;
        } else {
            switchPlayer();
        }
    });

    function checkForVictory(slotsToCheck) {
        var count = 0;
        for (var i = 0; i < slotsToCheck.length; i++) {
            if (slotsToCheck.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }
    // This was hard. Got some help from Vanilla's fellows.

    function diagVictory() {
        var count = 0;
        var look = $(".board").children().children();
        for (var x = 0; x < diagWin.length; x++) {
            count = 0;
            for (var y = 0; y < diagWin[x].length; y++) {
                if (look.eq(diagWin[x][y]).hasClass(currentPlayer)) {
                    count++;
                    if (count == 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
    }

    function switchPlayer() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    $(".column").on("mouseover", function (e) {
        $(e.target).addClass("shadow");
        $(".column").removeClass("shadow");
    });
    $(".column").on("mouseout", function (e) {
        $(e.target).removeClass("shadow");
    });

    $(".column").on("click", function () {
        var audio1 = new Audio();
        audio1.src = "blip.mp3";
        audio1.play();
    });

    // $(".popup").ready(function () {
    //     var audio2 = new Audio();
    //     audio2.src = "cheers.mp3";
    //     audio2.autoplay;

    // });

    // function popUp() {
    //     alert("Bloody Hell!", currentPlayer, "has WON the game!");
    // }

    function mostrarVitoria() {
        $(".popup").css({ visibility: "visible" });

        if (results.hasClass("player1")) {
            $(".text h1").text("Bloody Hell! Player 1 is the best");
        } else {
            results.hasClass("player2");
            $(".text h1").text("Bloody Hell! Player 2 is on fire!");
        }

        audio2.play();
    }

    newGame.on("click", function (e) {
        e.stopPropagation();
        $(".popup").css({ visibility: "hidden" });
        results.removeClass("player1 player2");

        audio2.pause();
    });

    // function playAudio() {
    //     audio.play();
    // }
})();
