var images = ["bird1.jpg", "bird2.jpg", "bird3.jpg", "bird4.jpg", "dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg"
				, "bird1.jpg", "bird2.jpg", "bird3.jpg", "bird4.jpg", "dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg"];
var $board = $('.game');

var game_started = false;
var image_clicked_one = false;
var image_clicked_two = false;
var number_of_moves = 0;
var total_successful_swaps = 0;

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
    var cards = shuffle(images);
    $board.empty();
    //$moveNum.text('0');
    for (var i = 0; i < cards.length; i++) {
        var image_name = cards[i].split('.');
        var image_id = image_name[0] + '-' + i.toString();
        $board.append($('<span class="img-box" id=' + image_id + '><li class="img-box-front" id=' + image_id + 
        	'><img src="images/' + cards[i] + '"></li> <li class="img-box-back"></li></span>'));
        addOnclickEvent(image_id);
    }

    $(".time-played").text('0:0:00');
};


function addOnclickEvent(id) {
    $('span#' + id).click(function () {
        $('#' + id).addClass('switch-side');
        if (!image_clicked_one) {
            image_clicked_one = id;
            if (!game_started) {
                game_started = true;
                GameTimer();
            }
        } else {
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
                    alert('game is over');
                }
            } else {
                number_of_moves += 1;
                $(".moves-played").text(number_of_moves);

                if (number_of_moves == 10) {
                    $('.star3').hide();
                } else if (number_of_moves == 14) {
                    $('.star3').hide();
                    $('.star2').hide();
                }

                setTimeout(function () {
                    $('span#' + image_clicked_one).removeClass('switch-side');
                    $('span#' + image_clicked_two).removeClass('switch-side');
                    image_clicked_one = false;
                    image_clicked_two = false;
                }, 800);
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

        if (secs < 10) {
            secs = '0' + secs;
        }

        current_time_played = hrs + ':' + mins + ':' + secs;
        $(".time-played").text(current_time_played);
    }, 750);

};

MemoryGame();