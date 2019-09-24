$(document).ready(function() {

    var herbs = ["calendula", "arnica,", "motherwort", "eucalyptus", "passionflower", 
    "purpulecone", "tulsi", "meadowsweet", "ginseng", "spilanthes", "wildbergamot", "euphoria" ];


    const maxGuess = 10
    var pauseGame = false

    var guessedLetters = []
    var guessingWord = []
    var wordToMatch
    var numGuess
    var wins = 0
    var losses= 0

    resetGame()

    //Press to start function
    document.onkeypress = function(event) {
        // Some error fixed
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }

    // Game Functions
    // Check if letter is in word & process
    function checkForLetter(letter) {
        var foundLetter = false
        var correctS = document.createElement("audio")
        var incorrectS = document.createElement("audio")
        correctS.setAttribute("src", "assets/sounds/stairs.mp3")
        incorrectS.setAttribute("src","assets/sounds/croak.mp3")

        // Search string for letter
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctS.play()
                // If guessing word matches random word
                if (guessingWord.join("") === wordToMatch) {
                    // Increment # of wins
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame,5000)
                }
            }
        }

        if (!foundLetter) {
            incorrectS.play()
            // Check if inccorrect guess is already on the list
            if (!guessedLetters.includes(letter)) {
                // Add incorrect letter to guessed letter list
                guessedLetters.push(letter)
                // Decrement the number of remaining guesses
                numGuess--
            }
            if (numGuess === 0) {
                // Display word before reseting game
                guessingWord = wordToMatch.split()
                // Increment # of losses
                losses++
                pauseGame = true
                updateDisplay()
                setTimeout(resetGame, 5000)
            }
        }

        updateDisplay()

    }
    //  keypressed is between A-Z or a-z Upercase?
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        // Get a new word
        wordToMatch = herbs[Math.floor(Math.random() * herbs.length)].toUpperCase()
        console.log(wordToMatch)

        // Reset word arrays
        guessedLetters = []
        guessingWord = []

        // Reset the guessed word
        for (var i=0, j=wordToMatch.length; i < j; i++){
            //space between 
            if (wordToMatch[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push("_")
            }
        }

        // Update the Display
        updateDisplay()
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins
        document.getElementById("totalLosses").innerText = losses
        document.getElementById("currentWord").innerText = guessingWord.join("")
        document.getElementById("remainingGuesses").innerText = numGuess
        document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
    }
})