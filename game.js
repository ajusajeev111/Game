document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const introScreen = document.getElementById("intro-screen");
    const gameScreen = document.getElementById("game-screen");

    startButton.addEventListener("click", function () {
        introScreen.style.display = "none";
        gameScreen.style.display = "block";
    });
});


let timeLeft = 3600;
const timerElement = document.getElementById("timer");

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;


    if (timeLeft > 0) {
        timeLeft--;
        setTimeout(updateTimer, 1000);
    } else {
        gameOver("Time's up! You failed to save your child.");
    }
}


updateTimer();

const notes = document.getElementById("notes");

function updateNotes(text) {
    notes.textContent = text; 
}

const chatBox = document.querySelector(".chat");

// Function to type out messages
function typeWriterEffect(element, text, index = 0, speed = 100) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        setTimeout(() => typeWriterEffect(element, text, index + 1, speed), speed);
    }
}



// Append message to chat with typing effect for kidnapper
function addMessage( sender, message, imageUrl = null ) {

    
        if (message === "Ignore" ) {
            return;
        }
        if (message === "Tracing the call") {
            return;
        }
        if (message === "Calling kidnapper") {
            return;
        }
        if (message === "Inform Police") {
            return;
        }
        if (message === "Call friend") {
            return;
        }
        if (message === "Go Alone") {
            return;
        }
        if (message === "Wait for friend") {
            return;
        }
        if (message === "Wait for police") {
            return;
        }
        if (message === "Attack guards") {
            return;
        }
        if (message === "Attack kidnapper") {
            return;
        }
        if (message === "Pick the lock") {
            return;
        }
        if (message === "Sneak in") {
            return;
        }

        

    const chatRow = document.createElement("div");
    chatRow.classList.add(sender === "player" ? "row-right" : "row-left");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "player" ? "right-chat" : "left-chat");

    if (imageUrl){
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Details";
        messageDiv.appendChild(imgElement);
    }

    chatRow.appendChild(messageDiv);
    chatBox.appendChild(chatRow);

    if (sender === "kidnapper") {
        typeWriterEffect(messageDiv, message);
    } else {
        messageDiv.textContent = message;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}



function updateOptions(options) {
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('clue');
        optionElement.textContent = option.text;
        optionElement.onclick = () => handleChoice(option.value);
        optionsContainer.appendChild(optionElement);
    });
}

function startGame() {
    addMessage("kidnapper", "We have your child. You have 60 MINUTES. No police. Any tricks, and your child suffers.");
    
    updateNotes("");
    let delay = "We have your child. You have 60 MINUTES. No police. No calls back. Any tricks, and your child suffers.".length * 80;
    setTimeout(() => {
        updateOptions([
            { text: "Who are you ?", value: "Who are you ?"},
            { text: "Please, don't hurt my child", value: "Please, don't hurt my child" },
            { text: "Ignore", value: "Ignore"}
        ]);
    }, delay + 2000);
    setTimeout(() => {
        addMessage("kidnapper", "DONOT CALL BACK");
    }, delay + 1500);
}

let currentState = 'start';

function handleChoice(choice) {
    chooseResponse(choice);
    console.log(choice)

}

startGame();

function chooseResponse(choice) {
    addMessage("player", choice);

    setTimeout(() => {
            if (choice === "Who are you ?") {
                addMessage("kidnapper", "That's not important.");
                updateNotes("-1 min");
                setTimeout(() => {
                    updateNotes("");
                }, 1500);

                let delay = "That's not important.".length * 50;
                setTimeout(() => {
                    addMessage("kidnapper", "What matters is your time. SAVE YOUR CHILD !!!");
                }, delay + 1500);
                        if (timeLeft - 60 >= 0) {
                            timeLeft -= 60; 
                        } else {
                            timeLeft = 0; 
                        }
                    updateOptions([
                        { text: "Reply 'Please, don't hurt my child'", value: "Please, don't hurt my child" },
                        { text: "Trace the call ( -5min )", value: "Tracing the call" },
                        { text: "Callback the number ", value: "Calling kidnapper" }
                    ]);
                
                
            } else if (choice === "Please, don't hurt my child") {
                if (timeLeft - 60 >= 0) {
                    timeLeft -= 60; 
                } else {
                    timeLeft = 0; 
                }
                addMessage("kidnapper", "Do as we say, and he won't be harmed.");
                updateNotes("-1 min");
                setTimeout(() => {
                    updateNotes("");
                }, 1500);
                updateOptions([
                    { text: "Reply 'What do you want?!'", value: "What do you want?"},
                    { text: "Trace the call", value: "Tracing the call" },
                    { text: "Call the number back", value: "Calling kidnapper" }
                ]);
            } else if (choice === "What do you want?") {
                if (timeLeft - 60 >= 0) {
                    timeLeft -= 60; 
                } else {
                    timeLeft = 0; 
                }
                addMessage("kidnapper", "We want $50,000 in cash. No police, no tricks or your child dies.");
                updateNotes("-1 min");
                setTimeout(() => {
                    updateNotes("");
                }, 1500);
                let delay = "We want $50,000 in cash. No police, no tricks or your child dies.".length * 80;
                setTimeout(() => {
                    addMessage("kidnapper", "Bring it to 📍[Warehouse Address].");
                }, delay + 1500);
                    if (timeLeft - 60 >= 0) {
                        timeLeft -= 60; 
                    } else {
                        timeLeft = 0; 
                    }
                    updateOptions([
                        { text: "Accept", value: "Accepted" },
                        { text: "Inform Police( -15min )", value: "Inform Police" },
                        { text: "Go Alone", value: "Go Alone"}
                    ]);
                

                
            }else if (choice === "Tracing the call") {
          
                    updateNotes("Tracking the call details...");
                    setTimeout(() => {
                    updateNotes("-5min");
                    }, 1500);
                    
                    setTimeout(() => {
                        const result = Math.random() * 100; 
                        if (Math.floor(result) % 2 === 0) {
                            updateNotes("Got Kidnapper's Location");
                            addMessage("kidnapper", "You think I'm joking? Your time just dropped by 5 minutes.");
                            setTimeout(() => {
                                addMessage("kidnapper", "Dont try to contact police...");
                            },5000);
                            if (timeLeft - 300 >= 0) {
                                timeLeft -= 300; 
                            } else {
                                timeLeft = 0; 
                            }
                            updateOptions([
                            { text: "Go Alone", value: "Go Alone"},
                            { text: "Call a friend for backup ( -10min )", value: "Call friend" },
                            { text: "Inform Police( -15min )", value: "Inform Police" }
                        ]);
                        } else {
                            updateNotes("Failed to track");
                            addMessage("kidnapper", "Dont do anything stupid we have EYES everywhere......");
                            updateOptions([
                            { text: "Retry", value: "Tracing the call"},
                            { text: "Inform Police ( -15min )", value: "Inform Police" }
                        ]);
                        }
                    }, 1500);
                    if (timeLeft - 300 >= 0) {
                        timeLeft -= 300; 
                    } else {
                        timeLeft = 0; 
                    }
                    
                
            }else if (choice === "Calling kidnapper") {
                updateNotes("-5min");
                setTimeout(() => {
                    updateNotes("");
                }, 1500);
                if (timeLeft - 300 >= 0) {
                    timeLeft -= 300; 
                } else {
                    timeLeft = 0; 
                }
                addMessage("kidnapper", "Oops..Your time got decreased 5 minutes..I warned you not to call back..!");
                updateOptions([
                { text: "Trace the call", value: "Tracing the call" },
                { text: "I need to see to my son", value: "I need to see to my son"}
                ]);
       
            
            }else if (choice === "I need to see to my son"){

                updateNotes("-5 min");
                setTimeout(() => {
                    updateNotes("");
                }, 1500);

                addMessage("kidnapper", "Looks like you don't believe us...");
                let delay = "Looks like you don't believe us..".length * 100;
                setTimeout(() => {
                    addMessage("kidnapper", "", "./assets/child.jpg");
                }, delay + 1500);
                    if (timeLeft - 300 >= 0) {
                        timeLeft -= 300; 
                    } else {
                        timeLeft = 0; 
                    }
                    updateOptions([
                        { text: "Trace the call", value: "Tracing the call" },
                        { text: "Reply 'What do you want?!'", value: "What do you want?"},
                    ]);
                
                setTimeout(() => {
                    addMessage("kidnapper", "Your time got decreased 5 minutes..HURRY UP");
                }, delay + 1500);


            }else if (choice === "Go Alone"){


                    if (timeLeft - 600 >= 0) {
                        timeLeft -= 600; 
                    } else {
                        timeLeft = 0; 
                    }
                updateNotes("-10 min");
                setTimeout(() => {
                    updateNotes("Brave choice... But is it the right one?");
                }, 1500);
                setTimeout(() => {
                    updateNotes("You reach the warehouse but find it heavily guarded.");
                }, 3000);

                addMessage("kidnapper", "One wrong move and you'll never see them again.");
                setTimeout(() => {
                    addMessage("kidnapper", "So you're here now... HAND OVER THE MONEY.");
                }, 3000);
                updateOptions([
                    { text: "Sneak in through the back", value: "Sneak in" },
                    { text: "Attack the guards", value: "Attack guards" },
                    { text: "Where is my child?", value: "Where is my child?" },
                ]);


            }else if (choice === "Where is my child?"){
            setTimeout(() => {
                updateNotes("The guards will bring the child to the front of the player as the kidnapper demands the ransom.");
            }, 1500);

            setTimeout(() => {
                updateNotes("The kidnapper orders the player to drop the ransom and walk away, taking the child with them.");
            }, 3000);

            updateOptions([
                { text: "Leave", value: "Leave" },
                { text: "Attack Kidnapper", value: "Attack Kidnapper" },
            ]);


            }else if (choice === "Attack Kidnapper"){
                setTimeout(() => {
                    updateNotes("The player charges at the kidnapper, fists clenched, ready to confront the villain face-to-face and take control of the situation.");
                }, 1500);


                const result = Math.random() * 100; 
                        if (Math.floor(result) % 2 === 0) {
                            
                            
                            if (timeLeft - 300 >= 0) {
                                timeLeft -= 300; 
                            } else {
                                timeLeft = 0; 
                            }
                            updateNotes("Player Defeats the Kidnapper");
                            gameOver("Mission Successfull");
                        } else {
                            updateNotes("Failed to defeat Kidnapper");
                            setTimeout(() => {
                                gameOver(" You failed to save your child.");
                            }, 1500);
                            
                        }
    
    
            }else if (choice === "Sneak in"){
                setTimeout(() => {
                    updateNotes("You sneak in and hear your child crying in a locked room.");
                }, 1500);
    
                addMessage("kidnapper", "If I sense anything suspicious, you'll regret it forever.");
                updateOptions([
                    { text: "Pick the lock", value: "Pick the lock" },
                    { text: "Look for another entrance", value: "Attack guards" },
                ]);
    
    
            }else if (choice === "Pick the lock"){
                setTimeout(() => {
                    updateNotes("The gruard ambushes yoyr plan");
                }, 1500);
    
                addMessage("kidnapper", "I have got you...");
                setTimeout(() => {
                    gameOver("Mission failed");
                }, 3000);
               
    
    
            }else if (choice === "Attack guards"){
                setTimeout(() => {
                    updateNotes("The guards block your way.");
                }, 2000);
                
                    const result = Math.random() * 100; 
                        if (Math.floor(result) % 2 === 0) {
                            updateNotes("The guards have been defeated, and the key to the room has been retrieved.");
                            setTimeout(() => {
                                updateNotes("Runs to the room and opens it");
                            }, 4000);
                            updateOptions([
                            { text: "Untie the child quickly and find an escape route", value: "Untie the child"},
                            { text: "Attack the kidnapper and try to negotiate", value: "Attack kidnapper" }
                        ]);
                        } else {
                            updateNotes("Failed to defeat the guards");
                            if (timeLeft - 300 >= 0) {
                                timeLeft -= 300; 
                            } else {
                                timeLeft = 0; 
                            }
                            addMessage("kidnapper", "Dont do anything stupid we have EYES everywhere......");
                            updateOptions([
                            { text: "Retry", value: "Tracing the call"},
                            { text: "Inform Police ( -15min )", value: "Inform Police" }
                        ]);
                        }
    
            }else if (choice === "Call friend"){
                setTimeout(() => {
                    updateNotes("Your friend agrees to help but will take 10 minutes to arrive.");
                }, 1500);
    
                addMessage("kidnapper", "If I sense anything suspicious, you'll regret it forever.");
                updateOptions([
                    { text: "Wait for friend ( -10min )", value: "Wait for friend" },
                    { text: "Take Matters to your hand", value: "Go Alone" },
                ]);
    
    
            }else if (choice === "Wait for friend"){
                updateNotes("-10 min");
                    if (timeLeft - 600 >= 0) {
                        timeLeft -= 600; 
                    } else {
                        timeLeft = 0; 
                    }

                setTimeout(() => {
                    updateNotes("Friend Arrives");
                }, 1000);
    
                addMessage("kidnapper", "You get only one chance.");

                setTimeout(() => {
                    addMessage("player", "I am coming...");
                }, 5000);
                
                updateOptions([
                    { text: "Go to Warehouse Location", value: "Go Alone" },
                    { text: "Inform Police", value: "Inform Police" },
                ]);
    
    
            }else if (choice === "Inform Police"){

            setTimeout(() => {
                updateNotes("The police take time to respond. You lose valuable minutes.");
            }, 1500);

            addMessage("kidnapper", "If you even think about calling the police, you'll be making a mistake you can never undo.");
            updateOptions([
                { text: "Wait for the police", value: "Wait for police" },
                { text: "Take matters into your own hands", value: "Go Alone" },
            ]);


            }else if (choice === "Wait for police"){
                updateNotes("-15 min");
                    if (timeLeft - 900 >= 0) {
                        timeLeft -= 900; 
                    } else {
                        timeLeft = 0; 
                    }

                setTimeout(() => {
                    updateNotes("Police Arrives");
                }, 1000);
    
                addMessage("kidnapper", "You get only one chance.");

                setTimeout(() => {
                    addMessage("player", "I am coming...");
                }, 5000);
                
                updateOptions([
                    { text: "Go to Warehouse Location", value: "Go Alone" },
                ]);
    
    
            }else if (choice === "Ignore"){

                updateNotes("-5 min");
                setTimeout(() => {
                    updateNotes("");
                }, 1500);

                addMessage("kidnapper", "Looks like you don't believe us.. How about now?");
                let delay = "Looks like you don't believe us.. How about now?".length * 100;
                setTimeout(() => {
                    addMessage("kidnapper", "", "./assets/child-photo.jpg");
                }, delay + 1500);
                    if (timeLeft - 300 >= 0) {
                        timeLeft -= 300; 
                    } else {
                        timeLeft = 0; 
                    }
                    updateOptions([
                        { text: "Trace the call", value: "Tracing the call" },
                        { text: "Callback the number ", value: "Calling kidnapper" },
                        { text: "Reply 'What do you want?!'", value: "What do you want?"},
                    ]);
                
                setTimeout(() => {
                    addMessage("kidnapper", "Your time got decreased 5 minutes..HURRY UP");
                }, delay + 1500);
            }
            
            setTimeout(() => {
                currentState = choice;  
                console.log("The Current State is " + currentState);
            }, 1000);
    }, 1000);
}


function sendMessage() {
    const userInput = document.getElementById("user-message");
    const message = userInput.value.trim();

    if (message !== "") {
        addMessage("player", message);
        userInput.value = "";

        setTimeout(() => {
            addMessage("kidnapper", "We don't have time for small talk.");
        }, 1000);
    }
}

// Game Over Function
function gameOver(message) {
    setTimeout(() => {
        alert(message);
        location.reload(); 
    }, 500);
}


