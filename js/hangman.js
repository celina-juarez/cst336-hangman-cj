var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                
            var hints = [{word: "snake", hint: "It's a reptile"},
                         {word: "monkey", hint: "It's a mammal"},
                         {word: "beetle", hint: "It's an insect"}];
            var selectedWord = "";
            var selectedHint = "";
            var board = [];
            var remainingGuesses = 6;
            var wordsGuessed = new Array();

            //different ways to debug program using console
            //alert("First word: " + words[0]);
            
            //console.log("First word: " + words[0]);
            
            //EVENTS
             
            $("#letters").on("click", ".letter", function(){
            checkLetter($(this).attr("id")); 
                                            disableButton($(this));})
            
            $(".replayBtn").click(function()
            { 
                //window.location.reload(); 
                document.getElementById("hint").innerHTML = "";
                document.getElementById("letters").innerHTML = "";
                document.getElementById("man").innerHTML = "<img src = \"img/stick_0.png\" id = \"hangImg\">";
                selectedWord = "";
                selectedHint = "";
                board = [];
                remainingGuesses = 6;
                $("#letters").show();
                $("#btn_hint").show();
                $("#hint").show();
                $("#man").show();
                startGame();
                
            });
            $("#btn_hint").on("click",function(){ 
                    $("#hint").append("<span class='hint'>Hint: " + selectedHint + "</span>"); 
                    remainingGuesses-=1;
                    updateMan();
                    $("#btn_hint").hide();
                });
            startGame();
            
            function createLetters()
            {
                for(var letter of alphabet)
                {
                    $("#letters").append("<button class = 'letter' id = '" + letter + "'>" + letter + "</button>");
                }
            }
            function pickWord()
            {
                var randomInt = Math.floor(Math.random() * hints.length);
                selectedWord = hints[randomInt].word.toUpperCase();
                console.log(selectedWord);
                selectedHint = hints[randomInt].hint;
            
                console.log(selectedHint);
            }

            function startGame()
            {
                $('#won').hide();
                $('#lost').hide();
                pickWord();
                initBoard();
                createLetters();
                updateBoard();
                
            }

            function updateBoard()
            {
                $("#word").empty();
                
                for(var i = 0; i < board.length; i++)
                {
                    $("#word").append(board[i]+" ");
                }
                $("#word").append("<br />");
                
                
                
            }

            function initBoard()
            {
                for(var i = 0; i < selectedWord.length;i++)
                {
                    board.push("_");
                }
                console.log(board);
            }
            function checkLetter(letter)
            {
                
                console.log(letter);
                console.log("hi");
                var positions = new Array();
                
                for(var i = 0; i < selectedWord.length;i++)
                {
                    console.log(selectedWord);

                    if(letter == selectedWord[i])
                    {
                        positions.push(i);
                    }
                }
                if(positions.length > 0)
                {
                    updateWord(positions, letter);
                    if(!board.includes('_'))
                    {
                        wordsGuessed.push(selectedWord);
                        //wordsGuessed.toString();
                        $("#guessed").html(wordsGuessed);
                        wordsGuessed.toString();
                        document.getElementById("guessed").innerHTML = wordsGuessed;
                        console.log("Pushed to Array: " + selectedWord);
                        endGame(true);
                        
                    }
                    
                }
                else
                {
                    remainingGuesses -=1;
                    updateMan();
                }
                if(remainingGuesses <= 0)
                {
                    endGame(false);
                }
                
            }
            function updateWord(positions, letter)
            {
                console.log(positions);
                for(var pos of positions)
                {
                    board[pos] = letter;
                }
                updateBoard();
            }
            function updateMan()
            {
                $("#hangImg").attr("src", "img/stick_" + (6-remainingGuesses) + ".png");
            }
            function endGame(win)
            {
                console.log(win);
                $("#letters").hide();
                
                if(win)
                {
                    $('#won').show();
                    $('#lost').hide();
                }
                else
                {
                    $('#lost').show();
                    $('#won').hide();
                }
            }
            function disableButton(btn)
            {
                btn.prop("disabled", true);
                btn.attr("class", "btn btn-danger");
            }
            //initialize each div hint body letters