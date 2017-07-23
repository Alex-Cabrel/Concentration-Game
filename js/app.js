var images = ["bird1.jpg", "bird2.jpg", "bird3.jpg", "bird4.jpg", "dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg"
				, "bird1.jpg", "bird2.jpg", "bird3.jpg", "bird4.jpg", "dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg"];
var $board = $('.game');

var image_clicked_one;
var image_clicked_two;
var number_of_moves;
var total_successful_swaps;
var game_started;
var timer;
var time_value;

// Used to close modal
function closeModal() {
    $('.modal').css({"display":"none"});
}

function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function MemoryGame() {
    /* Main Game function, this function gets shuffled images (cards)
        and look over them to add on the game board.
        */

    // Initialising variables
    game_started = false;
    image_clicked_one = false;
    image_clicked_two = false;
    number_of_moves = 0;
    total_successful_swaps = 0;

    //Initialise starts to 3
    $('.star3').show();
    $('.star2').show();

    // Ensure modal is closed especially when user chooses to play again.
    closeModal();

    var cards = shuffle(images); // shuffle images

    //empties the gameboard. this is very essential when player refreshes
    $board.empty();

    // loop over the images and add them to the game board.
    for (var i = 0; i < cards.length; i++) {
        var image_name = cards[i].split('.');
        var image_id = image_name[0] + '-' + i.toString();
        $board.append($('<span class="img-box" id=' + image_id + '><li class="img-box-front" id=' + image_id + 
        	'><img src="images/' + cards[i] + '"></li> <li class="img-box-back"></li></span>'));

        // Binds onclick event to each card
        addOnclickEvent(image_id);
    }

    // Initializes game timer to zero
    clearInterval(timer);
    $(".time-played").text('0:0:00');

    //Initialize moves output
    $(".moves-played").text(number_of_moves);
};


function addOnclickEvent(id) {
    /* This function binds an the click even to
        each card to enable swapping
        */
    $('span#' + id).click(function () {
        if(!image_clicked_two){
            $('#' + id).addClass('switch-side');
            if (!image_clicked_one) {
                image_clicked_one = id;
                if (!game_started) {
                    game_started = true;
                    GameTimer();
                }
            } else{
                image_clicked_two = id;
                if (image_clicked_two.split('-')[0] == image_clicked_one.split('-')[0]) {
                    $('span#'+image_clicked_one).off('click');
                    $('span#'+image_clicked_two).off('click');
                    $('li#'+image_clicked_one).addClass('img_box-found');
                    $('li#'+image_clicked_two).addClass('img_box-found')
                    total_successful_swaps += 1;
                    image_clicked_one = false;
                    image_clicked_two = false;

                    if (total_successful_swaps == images.length / 2) {

                        clearInterval(timer);
                        $('.modal').css({"display":"block"});
                        $('.moves_stats').text(number_of_moves + total_successful_swaps);

                        $('.time_stats').text(time_value);


                    }
                } else{
                    number_of_moves += 1;
                    setTimeout(function () {
                        $('span#' + image_clicked_one).removeClass('switch-side');
                        $('span#' + image_clicked_two).removeClass('switch-side');
                        image_clicked_one = false;
                        image_clicked_two = false;
                    }, 500);
                }

                // update moves
                var moves = number_of_moves + total_successful_swaps;
                $(".moves-played").text(moves);
                if (moves == 10) {
                    $('.star3').hide();
                } else if (moves == 14) {
                    $('.star3').hide();
                    $('.star2').hide();
                }
            }
        }
    });
}

const GameTimer = () => {

    var game_start_time = new Date().getTime();

    timer = setInterval(function () {

        var current_time = new Date().getTime();
        var current_time_played = current_time - game_start_time;
        var hrs = Math.floor((current_time_played % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((current_time_played % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((current_time_played % (1000 * 60)) / 1000);

        time_value = hrs + ' hours  ' + mins +' mins  ' + secs + ' secs  ';

        if (secs < 10) {
            secs = '0' + secs;
        }

        current_time_played = hrs + ':' + mins + ':' + secs;
        $(".time-played").text(current_time_played);
    }, 750);

};

MemoryGame();