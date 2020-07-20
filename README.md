# Dicelab

Repo for an interactive lab for exploration competitive dice design

## Project Log

### Friday, 7/17/2020

10:37: Setting up project. Cloning from my clicker game (https://github.com/aherbez/clicker/) in order to re-use the basic UI framework I built for it (based on my open-source JS mini-engine, Stirling.js)

10:53: Set up new project based on Clicker- removed a bunch of clicker-specific stuff, but kept the skeleton (UI framework, util for drawing rounded rect, button class, etc). Starting on the dice panel (element #2 in the proposal)

11:11: Set up some basic data management for dice- one class to hold pip values and another to hold N instances of the first

11:37: First pass at rendering dice (numbers for now). Switching over to rendering pips and adding click detection

12:08: Finished setting up proper rendering of pips (supporting values 0-9 for now), adding click handling to pips. Moving on to actually changing the value of faces

12:31: Added ability to click on faces to add and remove pips. Moving to display of outcomes

1:10: Finished rendering results grid.

1:19: Clicking on pips is a bit buggy, changing to simpler approach (for now)- clicking on the top 40% of a face increments, clicking on the bottom 40% decrements

1:26: Fixed a bug in propagating dice values. Moving on to percent display

1:39: Moved logic for calculating comparisons between dice into DiceManager in order to only do it when needed (in a single place and not in render loops)

2:01: Ended up leaving the comparison in the render function for the grid display, since the values are re-ordered, and the comparison is cheap. Fixing that could be a later optimization. Added more to the results calculation for win percentages. Will still be good to not calculate the outcome every render in the percent display panel

2:46: Finished panel for displaying total outcomes and percentages. Moving onto implementing challenges

2:55: Added in display of total pips to dice panels

3:31: Refactored DiceManager a bit to make it easy to have different numbers of faces on each die, and also to make challenges easier to implement

4:30: Lots of work to setup proper challenge flow. Added a few challenges and the ability to switch between freeplay mode (with 6 sided dice) and a random challenge

4:44: Added icon to indicate that the player cannot alter die A during a challenge. Going to add challenge text next

5:12: Fixed a bug that prevented the percent display from updating when switching to a challenge, added challenge text display (with word-wrapping), and added code to make sure that the same challenge is never randomly selected twice in a row

5:33: Added buttons below freeplay to allow the player to experiment with 4, 6, and 8-sided dice.

5:52: Played around with the colors a bit to (hopefully) make things look a bit better. Going to call it a wrap and use the remaining 30min or so on a writeup

### Sunday 7/19/2020

5:57: Wanted to make sure that all the challenges are actually solvable, so changing the data in challenge_data.js. Not changing anything else about the game though, to respect the 8 hour time limit

