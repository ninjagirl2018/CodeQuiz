# CodeQuiz
CodeQuiz

This assignment for Lesson 4 requires the building of a multiple choice quiz with an HTML file, CSS file, and 2 Javascript files.  The rationale behind 2 .js files is to separate out the mulltiple choice questions from the javacript functions.  This would allow users to continually update and change the questions being delivered on the application without interfering with the integrity of the javascript functions.

The assignment required the use of JS to run a timer limiting the amount of time to answer the questions.  The user answers questions and the application will prompt with a correct/incorrect evaluation of the answer.  Additionally, an incorrect response will cause a 10 second penalty against the timer.

The developer designed the application to have a series of divs (windows) which will alternately be displayed and hidden depending on the progress of play allowing the application to be one html document.  

The game ends when either all the questions are answered or when the timer runs down to zero.  The application will then prompt for the player to input a name and display their score, which is calculated based on a percentage.

The developer designed the scoring to display as a percentage to allow for flexibility should questions be added or taken away from the question array.

Most challenging aspects of the project:

1.  Timer Function
2.  The Evaluate function to cause a 10 second penalty
