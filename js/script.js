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


        } //end of drow egg

    // check for win or not 
    this.end = function() {

        //if targer == player.score  show div win
        // player win
        if (target == player.score) {
            // show win div
            //play win sound 
        } else {
            //else 
            // show div lose 
            // play audio for lose
            var audio = new Audio("/Audio/1.wav");
            audio.play();
        }


    }


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
    }

    //start the level 
    this.start = function() {

        this.DrowEggs();
        //timer for level 
        this.timer = new Timer(function() {
            clearInterval(white);
            clearInterval(goold);
            clearInterval(black);

            // the function to check if he win
            obj.end();
        }, 30000);




    }

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

    }

    //resume after pouse 
    this.resume = function() {
        // start anmtion  for egge in screen
        Anmation(1500, this.player, $(".eggs"));
        obj = this;
        obj.timer.resume(); // start level
        this.DrowEggs();
        // make basket move 
        BasketMove();


    }




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
        this.image.src = "/Images/32390-egg-icon5.png";
    } else if (color == "black") {
        this.image.src = "/Images/easter-egg-1-icon4.png";
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

            // image.hight = "100px";
            $("#container").append(this.image);


        }
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

    }




}



//add anmtion to egg
function Anmation(speed, player, img, incScore) {
    mov = parseFloat($("#basket").css("top"));
    basket = $("#basket");


    //mov += 40;
    img.animate({
        // "margin-top": "370px",
        "top": 440 + 'px',

    }, {
        duration: speed,
        step: function() {
            console.log(this);
            eggTop = parseInt($(this).css("top"));
            basketTop = parseInt(basket.css("top")) + 60;
            eggLeft = parseInt($(this).css("left"));
            basketLeft = parseInt(basket.css("left"));
            eggHeight = parseInt($(this).css("height"));
            eggWidth = parseInt($(this).css("width"));
            basketWidth = parseInt(basket.css("width"));

            if (basketTop <= (eggTop + eggHeight) && (eggLeft >= basketLeft &&
                    eggLeft <= (basketWidth + basketLeft))) {

                $(this).hide();
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
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}
//end timer 

//main function
$(function() {

    player = new Player(localStorage.getItem("PlayerName"));
    level = new Leval(20, localStorage.getItem("LevelType"), player);
    BasketMove();
    level.start();

});