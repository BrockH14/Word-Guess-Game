var disneyCharactors = ["belle", "ariel", "moana", "cinderella", "snow white", "aurora", "rapunzel",
 "fa mulan", "anna", "ursala", "maleficent", "hades", "jafar", "gothel", "evil queen", "cruella de vil", 
 "shan yu", "flouder", "olaf", "mu shu", "gus gus", "lumiere", "pascal", "hei hei", "thumper", "meeko"];
var LettersGues = [];
var WordGues = [];   
var usedGuessingWords = [];
var selectedWord = [];
var Guesses = 10; 
var Wins = 0;


function StartGame() {
    selectedWord = disneyCharactors[Math.floor(Math.random() * disneyCharactors.length)].toUpperCase();
    console.log(selectedWord);
    for (var i = 0; i < selectedWord.length; i++) {  
        if (selectedWord[i] === " "){WordGues.push("");} 
        else {WordGues.push("_");} 
    }
updateDisplay();
};
document.onkeydown = function(event) {
    if (isLetter(event.key)){
        checkForLetter(event.key.toUpperCase());
    }
}; 
var isLetter = function(ch){
    return typeof ch === "string" && ch.length === 1 
    && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" );
};
function checkForLetter(letter) {
    var foundLetter = false;
    for (var i = 0; i < selectedWord.length; i++) {
        if (letter === selectedWord[i]){
            WordGues[i] = letter;
            foundLetter = true;
            if (WordGues.join("") === selectedWord) {
                Wins++ 
                usedGuessingWords.push(selectedWord)
                updateDisplay();
                setTimeout(resetGame, 1000);
            }
        }
    }
    if (foundLetter === false) {
        if (LettersGues.includes(letter) === false){
            LettersGues.push(letter)
            Guesses-- 
        }
        if (Guesses === 0) {
            usedGuessingWords.push(selectedWord);
            WordGues = selectedWord.split()
            setTimeout(resetGame, 1000);
        }
    }
    updateDisplay();
};
function resetGame() {
    if (usedGuessingWords.length === disneyCharactors.length){
        usedGuessingWords = [];
        wins = 0;
        setTimeout(resetGame, 2000);
    }
    else {
        pause = false;
        selectedWord = disneyCharactors[Math.floor(Math.random() * disneyCharactors.length)].toUpperCase();
        console.log(selectedWord)
        if (usedGuessingWords.includes(selectedWord) === true) {
          resetGame();
        }
        Guesses = 10
        LettersGues = [];
        WordGues = [];
        for (var i=0; i < selectedWord.length; i++){ 
          if (selectedWord[i] === " ") {WordGues.push(" ")} 
          else {WordGues.push("_");}
        }
        updateDisplay();
    }    
};
function updateDisplay () {
  document.getElementById("Wins").innerText = Wins;
  document.getElementById("Word").innerText = WordGues.join("");
  document.getElementById("Guesses").innerText = Guesses;
  document.getElementById("Letters").innerText =  LettersGues.join(" ");
};
StartGame();