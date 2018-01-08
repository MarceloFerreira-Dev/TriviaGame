
$(document).ready(function(){

        var url = "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";
        $.ajax({
            url: url,
            method: "GET"
          }).done(function(response,question) {
               var question = [];
               question = response;
               
               console.log(question);
               console.log(response);
     
              var quizzIndex = 0;
              var questions_max = 10;
              
              //  Variable that will hold our setInterval that runs the stopwatch
              var intervalId;
              
              //prevents the clock from being sped up unnecessarily
              var clockRunning = false;
              
              // Our stopwatch object
              var stopwatch = {
              
                time: 0,
                lap: 1,
              
                reset: function() {
              
                  stopwatch.time = 0;
              
                  // DONE: Change the "display" div to "00:00."
                  $("#display").text("00");
              
                  // DONE: Empty the "laps" div.
                  // $("#laps").text("");
                },
                start: function() {
              
                  // DONE: Use setInterval to start the count here and set the clock to running.
                  if (!clockRunning) {
                      intervalId = setInterval(stopwatch.count, 1000);
                      clockRunning = true;
                  }
                },
                stop: function() {
                
                    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
                    clearInterval(intervalId);
                    clockRunning = false;
                },
                count: function() {
              
                  // DONE: Decrement time by 1, remember we cant use "this" here.
                  stopwatch.time++;
              
                  // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
                  //       and save the result in a variable.
                  var converted = stopwatch.timeConverter(stopwatch.time);
                  console.log("Converted",converted);
        
                  // DONE: Use the variable we just created to show the converted time in the "display" div.
                  $("#display").text(converted);
                 control();
             
                },
                timeConverter: function(t) {
              
                var minutes = Math.floor(t / 60);
                var seconds = t - (minutes * 60);
              
                  if (seconds < 10) {
                    seconds = "0" + seconds;
                  }
              
                  if (seconds === 0) {
                    minutes = "00";
        
                  }
                  else if (minutes < 10) {
                    minutes = "0" + minutes;
                  }
              
                  return seconds;
                }
              };

            stopwatch.time = 00;

            var playerTotal = 0;
            // store summ of gems selected due $("xyz").on ('click', function(){.
            var playerWin = 0;
            // store number of player wins.
            var playerLosses = 0;
            // store number of player losses.

          function quizzgen(){
              console.log(playerWin);
              console.log(question);
                var movieDiv = $("<div>");
                var movie_name = question.results[quizzIndex].question;     
                var movieURL = $("<a>");
                    movieURL.append(movie_name);
                    movieURL.attr("href", movie_name);
                var p = $("<p>");
                movieDiv.append(movieURL);
                movieDiv.append(p);
                
                var arr = [1,2,3,4];
                arr = shuffle(arr);
                console.log(question);
        
                $("#question").html(movieDiv);
                $("#option"+arr[0]).text(question.results[quizzIndex].correct_answer);
                $("#option"+arr[1]).text(question.results[quizzIndex].incorrect_answers[0]);
                $("#option"+arr[2]).text(question.results[quizzIndex].incorrect_answers[1]);
                $("#option"+arr[3]).text(question.results[quizzIndex].incorrect_answers[2]);
            };



          
          
              function score(){
                  // Wins and losses function
              
                      playerWin++;
                      // increment winning score.
                      $("#number_of_Wins").text(playerWin);
                      // shows playerWin variable in <span id= "number_of_Wins"></span>.
                      jQuery.noConflict(); 
                      // If for some reason two versions of jQuery are loaded, calling $.noConflict( true ) from the second version will return the globally scoped jQuery variables to those of the first version.
                      $("#result").html("<p>"+"You won!!"+"</p>");
                      // change Html modal header to won.
                      $('#myModal').modal('show');
                      // show modal.   
              };
              $("#number_of_Wins").text(playerWin);
              // Show winning score.
              $("#number_of_Losses").text(playerLosses);
              // show lossing score.
          
              function resetgame(){
          
                  $("#myTotal").text(playerTotal);

              };
          
              $("#play-again").on ('click', function(){
                 // modal "play-again" id on click..
                 
                  quizzIndex++;
                  console.log(quizzIndex);
                  quizzgen(question);
                  stopwatch.reset(true);
                  stopwatch.start(true);
                  resetgame();
                  
          
                  // call resetgame function.
              });

             
                // modal "play-again" id on click..
            $("#opt1").on('click',function(){
                 
                  var x = document.getElementById("option1").innerText;

                  if(x === question.results[quizzIndex].correct_answer){
                      score();
                      quizzgen();  
                      stopwatch.start(true);

                  }

                  console.log(x);
               
                  console.log(question.results[quizzIndex].correct_answer);
                   quizzIndex++;
                   console.log(quizzIndex);
                   stopwatch.stop(true)
                   stopwatch.reset(true);
                  resetgame();

                 // call resetgame function.
             });

      
            
            function control(){

              console.log("regular",stopwatch.time);

              if(stopwatch.time === 10){
        
               playerLosses++;
               // increment losing score.
               $("#number_of_Losses").text(playerLosses);
               // shows playerLosses variable in <span id= "number_of_Losses"></span>
               jQuery.noConflict(); 
               // If for some reason two versions of jQuery are loaded, calling $.noConflict( true ) from the second version will return the globally scoped jQuery variables to those of the first version.
               $("#result").html("<p>"+"You lose!!"+"</p>");
               // change Html modal header to lose.
               $('#myModal').modal('show'); 
               // show modal.
               console.log(playerTotal);    
               stopwatch.stop(true);  
              }
           };
           function shuffle(array) {
               var currentIndex = array.length, temporaryValue, randomIndex;
             
               // While there remain elements to shuffle...
               while (0 !== currentIndex) {
             
                 // Pick a remaining element...
                 randomIndex = Math.floor(Math.random() * currentIndex);
                 currentIndex -= 1;
             
                 // And swap it with the current element.
                 temporaryValue = array[currentIndex];
                 array[currentIndex] = array[randomIndex];
                 array[randomIndex] = temporaryValue;
               }
             
               return array;
             }  
             quizzgen();  
             stopwatch.start(true);

          });




});       