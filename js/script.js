//class for player 
function Player(name) {
    this.name = name;
    this.score = 0;


    this.incressScore = function() {
        score++;

    }
    this.descressScore = function() {
        score--;
    }
}


function Leval(target, type, player) {
    this.target = target;
    this.type = type;
    this.player = player;

    //Interval
    white = "";
    goold = "";
    black = "";

    this.DrowEgges = function(color, anmationSpped) {
            idOfEgge = 0; // for img id 
            e1 = new Egge(color, idOfEgge);
            e1.drow();
            e1.anmation(anmationSpped, this.player);
            idOfEgge++;


        }
        // check for win or not 
    this.end = function() {
        //if he lose 
        //if targer == player.score  show div win
        // play audio for win

        var audio = new Audio("/Audio/1.wav");
        audio.play();
        //else 
        // show div lose 
        // play audio for lose
    }

    //start the level 
    this.start = function() {
        obj = this;
        //Interval if level is easy just play the white one 

        white = setInterval(function() {
            obj.DrowEgges('white', 400);

        }, 1500);
        //else  play all 
        goold = setInterval(function() {
            obj.DrowEgges('goold', 2000);
        }, 2000);
        black = setInterval(function() {
            obj.DrowEgges('black', 1500);
        }, 2300);

        //timer for level 
        setTimeout(function() {

            //if level is easy clear the white only
            clearInterval(white);
            clearInterval(goold);
            clearInterval(black);

            // the function to check if he win
            obj.end();
        }, 10000);

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
    }

    //resume after pouse 
    this.resume = function() {
        // start anmtion  for egge in screen
        Anmation(1500, this.player, $(".eggs"));
        // start level 
        this.start();
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
            this.image.style.marginTop = "30px";

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

    img.animate({
        "margin-top": "450px",
    }, speed, function() {
        //Animation complete.

        //check nada 
        // if ege in basket 
        player.score += incScore;
        $("#s").text("Score:" + player.score);

        //else
        this.src = "/Images/chicken-egg-shell-icon5.png";
        // audio.play();
        Egge.destroy(this.id);



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
    divbasket = $("#basket");

    $("body").on("mousemove", function(event) {
        x = event.pageX;
        y = event.pageY;
        if (x >= 100 && x <= 1245) {
            basket.css("left", x - 100 + 'px');
        }
    }); //move basket
}

//main function
$(function() {
    BasketMove();
    p = new Player();
    l1 = new Leval(20, "normal", p);
    l1.start();
});