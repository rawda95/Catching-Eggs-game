//home page code
$(".my_audio").trigger('load');

function play_audio(task) {
    if (task == 'play') {
        $(".my_audio").trigger('play');
    } // play audio
    if (task == 'stop') {
        $(".my_audio").trigger('pause');
        $(".my_audio").prop("currentTime", 0);
    } // stop audio
} // end function play and stop audio




$(function() {
    $(".playaudio").on("click", function() {
        play_audio('play');
        $(".stopaudio").css("display", "inherit");
        $(".playaudio").css("display", "none");
    }); //play audio button
    $(".stopaudio").on("click", function() {
        play_audio('stop');
        $(".playaudio").css("display", "inherit");
        $(".stopaudio").css("display", "none");
    }); //stop audio button
    //variables

    normalbtn = $(".normalbtn");
    easybtn = $(".easybtn");
    mainhead = $("h1");
    entername = $(".entername");
    eggmove = $(".eggmove");
    chicken_move = $(".chicken_move");
    chichencounter = 850;
    //end variables

    entername.addClass("textaddclass"); //add class for name textbox
    normalbtn.addClass("btnaddclass1"); //add class for normal button
    easybtn.addClass("btnaddclass1"); //add class for easy button
    // normalbtn.on("click",function(){
    //   window.location.href = 'testpage.html'
    // });//normal button on click
    normalbtn.on("mouseover", function() {
        normalbtn.removeClass("btnaddclass1");
        normalbtn.addClass("btnaddclass2");
    }); //normal button when mouse over
    normalbtn.on("mouseout", function() {
        normalbtn.removeClass("btnaddclass2");
        normalbtn.addClass("btnaddclass1");
    }); //normal button when mouse out
    //easybtn.on("click", function() {
    //  PlayerName = $(".entername").val();
    //LevelType = "easy";
    //window.location.href = 'Game.html';
    //}); // easy button on click
    easybtn.on("mouseover", function() {
        easybtn.removeClass("btnaddclass1");
        easybtn.addClass("btnaddclass2");
    }); //normal button when mouse over
    easybtn.on("mouseout", function() {
        easybtn.removeClass("btnaddclass2");
        easybtn.addClass("btnaddclass1");
    }); //normal button when mouse out

    function headanimate() {
        mainhead.animate({
                opacity: "0.3"
            }, 1000, "linear", function() {
                mainhead.addClass("headaddclass");
                mainhead.removeClass("headremoveclass");
                mainhead.animate({
                        opacity: "1"
                    }, 1000, "linear", function() {
                        mainhead.removeClass("headaddclass");
                        mainhead.addClass("headremoveclass");
                        headanimate()
                    }) //end animate 2
            }) //end animate 1   
    } //end function headanimate for head
    headanimate(); // call function headanimate

    function egganimate() {
        eggmove.animate({
                top: "-50"
            }, 900, "linear", function() {
                eggmove.animate({
                        top: "0"
                    }, 700, "linear", function() {
                        egganimate()
                    }) //end animate 2
            }) //end animate 1 
    } //end function egganimate to move egg
    egganimate(); // call function egganimate

    function chickenanimate() {
        chicken_move.animate({
            left: chichencounter = chichencounter - 30
        }, 2000, "linear", function() {
            chickenanimate();
        })
    } //end chicken animate
    chickenanimate(); // call function chickenanimate


});
//end home page code