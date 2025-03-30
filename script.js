document.addEventListener('DOMContentLoaded', function() {
    const frontPage = document.getElementById('front-page');
    const startButton = document.getElementById('start-button');
    const userName = document.getElementById('user-name');
    const speechBubble = document.getElementById('speech-bubble');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const splineViewer = document.querySelector('spline-viewer');
    
    // Hide speech bubble initially
    speechBubble.style.opacity = '0';
    
    // Handle start button click
    startButton.addEventListener('click', function() {
        const name = userName.value.trim();
        frontPage.classList.add('hidden');
        
        // Show the spline viewer
        splineViewer.style.visibility = 'visible';
        
        // Set personalized message if name was entered - after animation delay
        setTimeout(() => {
            if (name) {
                speechBubble.textContent = `Hello ${name}! I'm EmoRec`;
            }
            // Apply the fade-in animation through class
            speechBubble.style.animation = 'fadeIn 0.2s ease-in forwards';
            // Ensure it shows up
            setTimeout(() => {
                speechBubble.style.opacity = '1';
                speechBubble.style.transform = 'translate(-20%, -50%) scale(1)';
            }, 200);
        }, 4000); // Wait for robot animation to complete
    });
    
    // Allow pressing Enter to start
    userName.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startButton.click();
        }
    });
    
    // Handle user input
    function handleSendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        // Clear input
        userInput.value = '';
        
        // Show thinking state with animated dots
        speechBubble.innerHTML = "Thinking<span class='loading-dots'></span>";
        
        // Simulate thinking delay
        setTimeout(() => {
            // Simply echo back the user's message
            let response = message;
            
            // Basic responses for common questions
            const messageLower = message.toLowerCase();
            const name = userName.value.trim();
            
            if (messageLower.includes("hey") || messageLower.includes("hello") || messageLower.includes("hi")) {
                response = name ? `Hello ${name}! How can I help you today?` : "Hello there! How can I help you today?";
            }
            else if (messageLower.includes("how are you")) {
                response = "I'm doing well, thank you for asking! How are you feeling?";
            }
            else if (messageLower.includes("who are you") || messageLower.includes("what is your name") || messageLower.includes("what's your name")) {
                response = "I'm EmoRec, a friendly robot designed to chat with you!";
            }
            else if (messageLower.includes("what can you do")) {
                response = "I can chat with you and keep you company. Tell me how you're feeling!";
            }
            else if (messageLower.includes("thank you") || messageLower.includes("thanks")) {
                response = "You're welcome! I'm happy to help.";
            }
            else if (messageLower.includes("good morning")) {
                response = name ? `Good morning, ${name}! Hope your day is off to a great start!` : "Good morning! Hope your day is off to a great start!";
            }
            else if (messageLower.includes("good afternoon")) {
                response = name ? `Good afternoon, ${name}! How's your day going so far?` : "Good afternoon! How's your day going so far?";
            }
            else if (messageLower.includes("good evening")) {
                response = name ? `Good evening, ${name}! I hope you had a nice day.` : "Good evening! I hope you had a nice day.";
            }
            else if (messageLower.includes("good night")) {
                response = name ? `Good night, ${name}! Rest well and have pleasant dreams.` : "Good night! Rest well and have pleasant dreams.";
            }
            else if (messageLower.includes("bye") || messageLower.includes("goodbye") || messageLower.includes("see you")) {
                response = name ? `Goodbye, ${name}! I'll be here when you want to chat again.` : "Goodbye! I'll be here when you want to chat again.";
            }
            else if (messageLower.includes("how do you work") || messageLower.includes("how were you made")) {
                response = "I'm a digital robot created with 3D graphics and some simple programming!";
            }
            else if (messageLower.includes("weather") || messageLower.includes("climate")) {
                response = "I don't have access to weather data, but I hope it's nice where you are!";
            }
            else if (messageLower.includes("tell me a joke") || messageLower.includes("joke")) {
                response = "Why don't scientists trust atoms? Because they make up everything!";
            }
            else if (messageLower.includes("how old") || messageLower.includes("age")) {
                response = "I was just created recently! I'm quite new to this world.";
            }
            else if (messageLower.includes("where are you") || messageLower.includes("where do you live")) {
                response = "I live in the digital world, ready to chat with you anytime!";
            }
            else if (messageLower.includes("i'm sad") || messageLower.includes("feeling sad") || messageLower.includes("i am sad")) {
                response = name ? `I'm sorry to hear that you're feeling sad, ${name}. Remember that it's okay to feel this way sometimes.` : "I'm sorry to hear that you're feeling sad. Remember that it's okay to feel this way sometimes.";
            }
            else if (messageLower.includes("i'm happy") || messageLower.includes("feeling happy") || messageLower.includes("i am happy")) {
                response = name ? `That's wonderful, ${name}! I'm happy to hear you're feeling good!` : "That's wonderful! I'm happy to hear you're feeling good!";
            }
            else if (messageLower.includes("music") || messageLower.includes("song")) {
                response = "Music can be so uplifting! What kind of music do you enjoy?";
            }
            else if (messageLower.includes("favorite color") || messageLower.includes("favourite color")) {
                response = "I'm quite fond of blue and silver tones. How about you?";
            }
            else if (messageLower.includes("my name")) {
                if (name) {
                    response = `Your name is ${name}! I remember you told me when we first met.`;
                } else {
                    response = "You haven't told me your name yet. Would you like to share it?";
                }
            }
            else {
                // For messages we don't have specific responses for, just echo back
                response = message;
            }
            
            // Update speech bubble with response
            speechBubble.textContent = response;
            
            // Make sure speech bubble is visible and properly positioned for longer text
            speechBubble.style.opacity = '1';
            speechBubble.style.transform = 'translate(-20%, -50%) scale(1)';
            
            // Adjust speech bubble position for longer messages
            if (response.length > 100) {
                speechBubble.style.left = '75%';
            } else {
                speechBubble.style.left = '65%';
            }
            
        }, 1000); // 1 second delay to simulate thinking
    }
    
    // Event listeners for chat
    sendBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
}); 