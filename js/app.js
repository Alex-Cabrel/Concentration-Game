var images = ["bird1.jpg", "bird2.jpg", "bird3.jpg", "bird4.jpg", "dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg",
			 "bird1.jpg", "bird2.jpg", "bird3.jpg", "bird4.jpg", "dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg"];
const $board = $('.game');

let image_clicked_one;
let image_clicked_two;
let number_of_moves;
let total_successful_swaps;
let game_started;
let timer;
let time_value;
let hidden_stars;


/**
* @description Closes the congratulation modal by hiding.
*/
function closeModal() {
    $('.modal').css({"display":"none"});
}


/**
* @description Shuffles and array using the random function
* @param {array} array
* @returns {array} array
*/
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/**
* @description This is the main game function, it adds cards to the board and initializes most variables
*/
function MemoryGame() {
    // Initialising variables
    hidden_stars = 0;
    number_of_moves = 0;
    game_started = false;
    image_clicked_one = false;
    image_clicked_two = false;
    total_successful_swaps = 0;

    //Initialise stars to 3 stars in case the game had already began
    $('.star3').show();
    $('.star2').show();

    // Ensure modal is closed especially when user chooses to play again.
    closeModal();

    const cards = shuffle(images); // shuffle images

    //empties the gameboard. this is very essential when player refreshes
    $board.empty();

    // loop over the images and add them to the game board.
    for (var i = 0; i < cards.length; i++) {
        var image_name = cards[i].split('.');
        var image_id = image_name[0] + '-' + i.toString();
        $board.append($('<span class="img-box" id=' + image_id + '><li class="img-box-front" id=' + image_id +
        	'><img src="images/' + cards[i] + '"></li> <li class="img-box-back"></li></span>'));

        // Binds onclick event to each board card
        addOnclickEvent(image_id);
    }

    // Initializes game timer to zero
    clearInterval(timer);
    $(".time-played").text('0:0:00');

    //Initialize moves output
    $(".moves-played").text(number_of_moves);
};


/**
* @description This function binds an onclick event to each card handles all the game logic
* @param {string} id
*/
function addOnclickEvent(id) {
    // adds onclick event to a card
    $('span#' + id).click(function () {
        if(!image_clicked_two){
            $('#' + id).addClass('switch-side'); // if a card is clicked, adds switch-side class to switch the card

            // Test if the image clicked is the first image in a new move
            if (!image_clicked_one) {
                image_clicked_one = id;
                // start timer if this is the very first image clicked in the game.
                if (!game_started) {
                    game_started = true;
                    GameTimer();
                }

            // Test if the image clicked in the second image in the current move
            } else{
                if (image_clicked_one){
                    // This ensure that an image clicked twice should not be considered as a match.                
                    if (id == image_clicked_one)
                    {
                        return;
                    }
                }

                image_clicked_two = id;

                // if both image names are equal, the switch off the click even for that image.
                if (image_clicked_two.split('-')[0] == image_clicked_one.split('-')[0]) {
                    $('span#'+image_clicked_one).off('click');
                    $('span#'+image_clicked_two).off('click');
                    $('li#'+image_clicked_one).addClass('img_box-found');
                    $('li#'+image_clicked_two).addClass('img_box-found')
                    total_successful_swaps += 1;
                    image_clicked_one = false;
                    image_clicked_two = false;

                    if (total_successful_swaps == images.length / 2) { // this detects if all the match has been acheived

                        clearInterval(timer);
                        $('.modal').css({"display":"block"}); // display modal if gave is over
                        $('.moves_stats').text(number_of_moves + total_successful_swaps);
                        $('.num_of_stars').text(3-hidden_stars);
                        $('.time_stats').text(time_value);


                    }

                // if two cards are not same, the cards are switched back by removing the switch-side class
                } else{
                    number_of_moves += 1;
                    setTimeout(function () {
                        $('span#' + image_clicked_one).removeClass('switch-side');
                        $('span#' + image_clicked_two).removeClass('switch-side');
                        image_clicked_one = false;
                        image_clicked_two = false;
                    }, 500);
                }

                // update moves and reduce stars accordingly
                const moves = number_of_moves + total_successful_swaps;
                $(".moves-played").text(moves);

                if (moves == 11) {
                    hidden_stars += 1
                    $('.star3').hide();
                }
                else if (moves == 15) {
                    hidden_stars += 1;
                    $('.star3').hide();
                    $('.star2').hide();
                }
            }
        }
    });
}


/**
* @description calculate time taken to complete a game
*/
const GameTimer = () => {

    const game_start_time = new Date().getTime(); // get the current time when user clicked the first card

    timer = setInterval(function () {

        let current_time = new Date().getTime();
        let current_time_played = current_time - game_start_time; // calculate time elapsed
        let hrs = Math.floor((current_time_played % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((current_time_played % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((current_time_played % (1000 * 60)) / 1000);

        time_value = hrs + ' hours  ' + mins +' mins  ' + secs + ' secs  '; // this is to display in the stats modal

        if (secs < 10) {
            secs = '0' + secs;
        }

        current_time_played = hrs + ':' + mins + ':' + secs;
        $(".time-played").text(current_time_played);
    }, 500);

};

MemoryGame(); // Initialise game boad when am is opened.