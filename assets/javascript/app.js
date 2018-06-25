$(document).ready(function(){
  
//on click events to start game...  need to assign a value or something to buttons
    $("#remaining-time").hide();
    $("#start").on('click', startGame);
    $(document).on('click' , '.playButton', guessChecker);
    $(document).on('click' , '.playButton', function() {
    $('.playButton').prop("disabled",true);
    });
  
});

//************************************************************************************************


// use key-value pairs... find an easier way to reference them to each other 
//put all vars in here
var trivia = {
  
    
  timerId : '',  
  timer: 10,
  timerOn: false,
    
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentIndex: 0,
  
//KVP questions, guess options, and correct answers. 
//give them the same keys?
   questions: {
    q1: 'What is the Raj park number?',
    q2: 'What is the name of the computer that stores all of the hosts memories?',
    q3: 'From which play is the line “These violent delights have violent ends”?',
    q4: 'Who plays “the Man in Black?”',
    q5: 'What was the real-world location backdrop in the photograph found by Peter Abernathy?',
    q6: 'What are the names of the two Delos technicians who assist Maeve in season one?',
    q7: 'What was the breed of Robert Ford’s childhood dog?',
    q8: 'Whose catchphrase was “Not much of a rind on you.”?', 
    q9: 'What is the name of the saloon and hotel in Sweetwater?', 
    q10: 'What is the title of Ford’s final narrative?', 
  },
  options: {
    q1: ['3', '6', '2', '5'],
    q2: ['The Hive', 'Joshua', 'The Cradle', 'Vault 111'],
    q3: ['Hamelet', 'Romeo and Juliet', 'Macbeth', 'Midsummers Night Dream'],
    q4: ['Tom Hanks', 'Bill Paxton', 'Gary Busey', 'Ed Harris'],
    q5: ['Sydney Opera House', 'Time Square', 'Arches', 'The Space Needle'],
    q6: ['Felix and Sylvester', 'Tom and Jerry', 'Rick and Morty', 'Darryl and Darryl'],
    q7: ['Boxer', 'Catahoula', 'Greyhound', 'Husky'],
    q8: ['Meave', 'Clementine', 'Teddy', 'Ryan'],
    q9: ['The Palace', 'The Wrangler', 'The Mariposa', 'The Tipsy Cow'],
    q10: ['The Way We Were', 'The Maze', 'Journey Into Night', 'The Deathbringer'],
  },
  answers: {
    q1: '6',
    q2: 'The Cradle',
    q3: 'Romeo and Juliet',
    q4: 'Ed Harris',
    q5: 'Time Square',
    q6: 'Felix and Sylvester',
    q7: 'Greyhound',
    q8: 'Clementine', 
    q9: 'The Mariposa',   
    q10: 'Journey Into Night',   
  }
};
    
//************************************************************************************************
//************************************************************************************************
  
//set var values to 0, clear timer, toggle screens, start game by asking a question.
//will need to use trivia. to access the keys

function startGame(){
    
    clearInterval(trivia.timerId); 
    
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    trivia.currentIndex = 0;
     
//toggle html   
    $('#timer').text(trivia.timer);
    $('#game').show();
    $('#start').hide();
    $('#results').html('');
    $('#remaining-time').show();
    
    nextQuestion();
    
  };
//************************************************************************************************
//************************************************************************************************

//function to reset html and timer.
//loop through and compare guess to answer?  for loop? look for a fancy Jquery loop or something
//go back to the stopwatch lesson to figure out way the timer speeds up.....  set it to true/false?
function nextQuestion(){
    
    
    trivia.timer = 10;
     $('#timer').removeClass('fcolor');
     $('#question').removeClass('fcolor');
     $('#timer').text(trivia.timer);
//VERY IMPORTANT!  WILL CRASH WITHOUT THIS   
    if(!trivia.timerOn){
      trivia.timerId = setInterval(timerRunning, 1000);
    }
    
    
//array for questions... push to html   
    var questionContent = Object.values(trivia.questions)[trivia.currentIndex];
     $('#question').text(questionContent);
                                                                                                     console.log("question content = " + questionContent);
//array for guess options
    var questionOptions = Object.values(trivia.options)[trivia.currentIndex];
                                                                                                     console.log("guess options " + questionOptions);
//loop through the array and push it to html .append?  bootstrap button
     $.each(questionOptions, function(index, key){
     $('#options').append($('<button class="playButton btn btn-secondary btn-lg">'+key+'</button>'));
    })
      
                                                                                                 console.log("question index = " + trivia.currentIndex);
  };
    
//************************************************************************************************
//************************************************************************************************ 
  
function timerRunning(){
    
    
    if(trivia.timer > -1 && trivia.currentIndex < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        
//change the color of the timer when time is low.... CSS class?       
        
        if(trivia.timer === 3){
          $('#timer').addClass('fcolor');
          $('#question').addClass('fcolor');
        }
    }
    
//counter    
    
    else if(trivia.timer === -1){
      trivia.unanswered++;
      clearInterval(trivia.timerId);
      setTimeout(guessResult, 2400);
      $('#results').html('<h3>Times up! The correct answer was '+ Object.values(trivia.answers)[trivia.currentIndex] +'</h3>');
    }
//end game
    else if(trivia.currentIndex === Object.keys(trivia.questions).length){
      
//results      
      $('#results2')
        .html(
        '<p class="end">Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p >Please play again!</p>');
      
//toggle html     
      $('#game').hide();
      $('#start').show();
    }
    
  };
    
//************************************************************************************************
//************************************************************************************************
  
function guessChecker() {
    
//array of current answer
    var currentAnswer = Object.values(trivia.answers)[trivia.currentIndex];
                                                                                                        console.log("correct answer = " + currentAnswer);   
//right counter
    if($(this).text() === currentAnswer){
//turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-secondary');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      setTimeout(guessResult, 2400);
      $('#results').html('<h3>Great Job!</h3>');
    }
//wrong counter
    else{
//button red for incorrect... fader?
      $(this).addClass('btn-danger').removeClass('btn-secondary');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      setTimeout(guessResult, 2400);
      $('#results').html('<h3>Incorrect! '+ currentAnswer +' is the answer</h3>');
    }
    
  };

//************************************************************************************************
//************************************************************************************************
  // method to remove previous question results and options
function guessResult(){
    
//increment index
    trivia.currentIndex++;
    
//clear
    $('.playButton').remove();
    $('#results h3').remove();
    
//loop back
    nextQuestion();
     
  };

