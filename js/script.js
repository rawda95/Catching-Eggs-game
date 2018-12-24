//class for player 
function Player(name) {
    this.name = name;
    this.score = 0;
    $("#UserName").text(name);

}


function Leval(target, type, player) {
    this.target = target;
    this.type = type;
    this.player = player;
    this.timer = "";
    $("#life").text(target);

    //Interval
    white = "";
    goold = "";
    black = "";
    idOfEgge = 0; // for img id


    this.DrowEgg = function(color, anmationSpped) {

        e1 = new Egge(color, idOfEgge);
        e1.drow();
        e1.anmation(anmationSpped, this.player);
        idOfEgge++;


    }; //end of drow egg

    // check for win or not 
    this.end = function() {

        $("#statius1").css("display", "block");
        //$("#basket").css("z-index", "-1");
        $("#popUp").css("display", "block");
        $("body").off("mousemove");

        divText = $(".WL");
        scoreDiv = $("#ws");
        //if targer == player.score  show div win
        // player win
        if (this.target <= player.score) {
            // show win div
            //play win sound 
            scoreDiv.text("Your Score is :" + this.player.score);
            if (soundflag) {

                var win = new Audio("/Audio/winn.mp3");
                win.play();
            }
        } else {
            //else 
            // show div lose 
            // play audio for lose
            //   $("#back").css("display", "none");
            // $("#WinLoseDiv").css("display", "none");
            divText.text("Sorry try again");
            scoreDiv.text("Your Score is :" + this.player.score);


            if (soundflag) {
                var loser = new Audio("/Audio/loser.mp3");
                loser.play();
            }
        }


    };


    // setInterval for all type of eggs
    this.DrowEggs = function() {
        obj = this;
        //Interval if level is easy just play the white one 

        white = setInterval(function() {
            obj.DrowEgg('white', 1500);

        }, 1500);

        //else  play all 
        if (obj.type == "Normal") {
            goold = setInterval(function() {
                obj.DrowEgg('goold', 2000);
            }, 2000);
            black = setInterval(function() {
                obj.DrowEgg('black', 1500);
            }, 2300);
        }
    };

    //start the level 
    this.start = function() {

        this.DrowEggs();
        min = 1;
        sec = 0;

        //timer for level 
        this.timer = new Timer(function() {
            clearInterval(white);
            clearInterval(goold);
            clearInterval(black);
            clearInterval(inter);

            // the function to check if he win
            obj.end();
        }, 61900);





    };

    //pouse the game 
    this.pouse = function() {

        // stop all anmtion for eggs
        $(".eggs").stop();
        // stop basket move
        $("body").off("mousemove");

        //stop all interval 
        clearInterval(white);
        clearInterval(goold);
        clearInterval(black);
        obj = this;
        obj.timer.pause();

    };

    //resume after pouse 
    this.resume = function() {
        // start anmtion  for egge in screen
        Anmation(1500, this.player, $(".eggs"), 1);
        obj = this;
        obj.timer.resume(); // start level
        this.DrowEggs();
        // make basket move 
        BasketMove();


    };




} // end level class






//class for egge
function Egge(color, id) {

    this.color = color;
    this.id = id;
    this.image = document.createElement("img");

    // check for color of egg to set url 
    if (color == "white") {
        this.image.src = "/Images/egg-icon8.png";

    } else if (color == "goold") {
        this.image.src = "/Images/easter-egg-3-icon3.png";
    } else if (color == "black") {
        this.image.src = "/Images/black1.png";
    }

    // randow postion on div 
    this.posx = (Math.random() * ($("#container").width())).toFixed();
    flag = true;
    // if posx in width of container
    while (flag) {
        if (this.posx > 958) {
            this.posx = (Math.random() * ($("#container").width())).toFixed();
        } else {
            flag = false;
        }
    }


    // drow the egg

    this.drow = function() {

        // 
        this.image.id = id;
        this.image.className = "eggs";
        this.image.style.width = 50 + "px";
        this.image.style.height = 50 + "px";
        this.image.style.position = 'absolute';
        this.image.style.marginRight = "30px";
        this.image.style.marginLeft = "30px";
        //this.image.style.marginTop = "30px";
        this.image.style.left = this.posx + "px";



        // add audio 
        if (soundflag) {

            var btn = document.getElementById('btn');
            duck = new Audio("/Audio/duck.mp3");
            duck.play();

            //document.addEventListener(btn, function() {
            //  duck = new Audio("/Audio/duck.mp3");
            //playPromise = duck.play();

            //if (playPromise !== null) {
            //  playPromise.catch(() => {
            //    duck.play();
            //});
            // }

            //}, false);
            // btn.click();
        }


        // image.hight = "100px";
        $("#container").append(this.image);


    };
    // var audio = new Audio("/Audio/EggCracking.wav");

    this.anmation = function(speed, player) {

        incScore = 0;
        if (color == "white") {
            incScore = 1;

        } else if (color == "goold") {
            incScore = 3;
        } else if (color == "black") {
            incScore = -2;
        }

        Anmation(speed, player, $(this.image), incScore);

    };




}



//add anmtion to egg
function Anmation(speed, player, img, incScore) {


    mov = parseFloat($("#basket").css("top"));
    basket = $("#basket");
    //mov += 40;
    img.animate({
        // "margin-top": "370px",
        "top": 530 + 'px',

    }, {
        duration: speed,
        step: function() {
            // console.log(this);
            eggTop = parseInt($(this).css("top"));
            basketTop = parseInt(basket.css("top")) + 60;
            eggLeft = parseInt($(this).css("left"));
            basketLeft = parseInt(basket.css("left"));
            eggHeight = parseInt($(this).css("height"));
            eggWidth = parseInt($(this).css("width"));
            basketWidth = parseInt(basket.css("width"));

            if (basketTop <= (eggTop + eggHeight) && (eggLeft >= basketLeft &&
                    eggLeft <= (basketWidth + basketLeft))) {

                $(this).remove();
                player.score += incScore;
                incScore = 0;
                $("#s").text("Score:" + player.score);


                // alert("a");
            }


        },

        complete: function() {

            this.src = "/Images/chicken-egg-shell-icon5.png";
            // audio.play();
            Egge.destroy(this.id);
            //   }



        }
    });
}

//remove egg after break 
Egge.destroy = function(id) {
    setTimeout(function() {

        img = $("#" + id);
        $(img).remove();
    }, 2000);


};









function screenTimer() {

    inter = setInterval(function() {
        console.log(min + ":" + sec);
        if (sec == 0) {
            min--;
            sec = 60;
        }
        sec--;
    }, 1000);
}




//move basket
function BasketMove() {
    basket = $("#basket");

    basket.css({
        width: "200",
        height: "200",
        position: "absolute",
        left: "5"
    }); //css for basket

    //    divbasket = $("#basket");

    $("body").on("mousemove", function(event) {
        x = event.pageX;
        y = event.pageY;
        if (x >= 100 && x <= 1245) {
            basket.css("left", x - 100 + 'px');
        }
    }); //move basket
}


//timer function 
function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        clearInterval(inter);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
        screenTimer();

    };

    this.resume();
}
//end timer 


// ppouse all sound 
function pouseSound() {

    soundflag = false;
    var sounds = document.getElementsByTagName('audio');
    for (i = 0; i < sounds.length; i++) sounds[i].pause();


}
//end pouse all sound 

// ppouse all sound 
function resumeSound() {

    soundflag = true;
    var sounds = document.getElementsByTagName('audio');
    for (i = 0; i < sounds.length; i++) sounds[i].resume();


}
//end pouse all sound 




//Move Basket Using Arrows <- -> [New Update]
$(document).on("keydown", function(event) {
    //event.which property returns which keyboard key or mouse button was pressed for the event.
    switch (event.which) {
        case 37:
            if (parseInt($("#basket").css("left")) > 80) {
                $("#basket").css("left", parseInt($("#basket").css("left")) - 90);
            }
            break;
        case 39:
            if (parseInt($("#basket").css("left")) < 1080) {
                $("#basket").css("left", parseInt($("#basket").css("left")) + 90);
            }
            break;
    }
});

//end move using keyboard


// SELECT LEVEL AND START LEVEL 
function selectLevel() {
    if (localStorage.getItem("LevelType") == "Normal") {
        div = $("#container");
        div.css("background", " url('../Images/14.jpg')");
        div.css("background-size", "cover");
        div.css("background-repeat", "round");
    } else {
        div = $("#container");
        div.css("background", " url('../Images/Dog-House-Cartoon-1920x1200.jpg')");
        div.css("background-size", "cover");
        div.css("background-repeat", "round");
    }
    soundflag = true;
    player = new Player(localStorage.getItem("PlayerName"));
    level = new Leval(20, localStorage.getItem("LevelType"), player);

    level.start();
    BasketMove();

}
//main function
$(function() {
    min = 1;
    sec = 0;

    inter = "";
    // change background for normal level
    setTimeout(function() {

        $("#readyTitle").css("display", "none");
        $("#readyDiv").css("display", "none");
        selectLevel();


    }, 1000);




    //Pause [New Update]
    $("#Pause").on("click", function() {
        $("#PauseDiv").css("display", "block");
        level.pouse();
    });
    //resume [New Update]
    $("#Resume").on("click", function() {
        level.resume();
        $("#PauseDiv").css("display", "none");
    });
    //Play Again  [New Update]
    $("#btnStart").on("click", function() {
        $("#easy").css("display", "initial");
        $("#hard").css("display", "initial");
    });


    $("#easy").click(function() {

        localStorage.setItem("LevelType", "easy");
        $("#statius1").css("display", "none");
        $("#popUp").css("display", "none");
        selectLevel();
    });



    $("#hard").click(function() {

        localStorage.setItem("LevelType", "Normal");
        $("#statius1").css("display", "none");
        $("#popUp").css("display", "none");
        selectLevel();
    });
    //Easy Mode (btn in modal)  [New Update]
    $("#btnstarteasy").on("click", function() {

        /*
                window.location.href = "Game.html";
                //same previous name
                var userName = document.getElementById('txtUserNameEasy').value;
                var player = new Player(userName);
                var lev1 = new Leval(20, "easy", player);
                window.location.href = "Game.html";
                lev1.start();
                */

        localStorage.setItem("LevelType", "Normal");
        $("#statius1").css("display", "none");
        $("#popUp").css("display", "none");
        selectLevel();

    });


    //Hard Mode (btn in modal)  [New Update]
    $("#btnstarthard").on("click", function() {

        /*
        window.location.href = "Game.html";
        //same previous name
        var userName = document.getElementById('txtUserNameHard').value;
        var player = new Player(userName);
        var lev1 = new Leval(20, "hard", player);
        window.location.href = "Game.html";
        lev1.start();
        */

        localStorage.setItem("LevelType", "Normal");
        $("#statius1").css("display", "none");
        $("#popUp").css("display", "none");
        selectLevel();

    });


    //home btn in div 
    $("#hm").click(function() {
        window.location.href = "home.html";


    });
    //Exit  [New Update]
    $("#btnExit").on("click", function() {
        //open(location, '_self').close();  
        //window.open('', '_self', '');
        //window.close();
        window.top.close();
    });

});