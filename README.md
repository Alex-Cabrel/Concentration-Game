# Concentration-Game

## Purpose

This game is build for a Udacity Training project. This demostrate mastery of web technology such as html, css and javascript.

## Playing the Game

* Clone the repo and open index.html
* Or download the zip file, unzip it and open index.html

The game board consists of a grid of  sixteen cards arranged randomly in a grid.
The board is made up of 8 different pairs of cards, each with different animals (dog or bird) on a hidden side.

* Player flips a two cards is a move, one after the other
* If the cards matches, the cards border is turned to green and the fron of the card is then permanently visible to player.
* If the cards do not math, then cards are flipped back.

## Winning The Game
* To win the game the Player must successfully turn all the cards to match with its pairs.
* When that is done a dialog box appears to player with statistics about the previous round and the player can decide to continue or not.

## Implementation.
The project is made up of three folder and one file in the repository.
 * index.html -> This file defines html tags used to render the game on the browser. It links the jquery library, bootstrap font-awesome style shee, our local defined style shee (style.css) and our local javascript (app.js)
 * js -> This folder contains our java script file (app.js) This file has all client based functions defined in it.
  	* The MemoryGame function that initializes the game and creates a new game board.
  	* The GameTimer function which keeps track of time (counter) from the start of the game to the end.
  	* The shuffle function which is used to shuffle the deck of cards
  * css -> This folder contains the style sheet file used to decorate the html.

 ### Resources
 * https://www.w3schools.com/howto/howto_js_countdown.asp
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
