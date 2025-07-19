let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice"); // assuming you have a voice element

let isRecognizing = false;

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = "en-IN";
recognition.interimResults = false;

// Updated speak function with male-sounding Indian accent
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.9;
    text_speak.pitch = 1.2;
    text_speak.volume = 1;
    text_speak.lang = "en-IN"; // Indian accent
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Ma'am");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Ma'am");
    } else {
        speak("Good Evening Ma'am");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

recognition.onstart = () => {
    isRecognizing = true;
};

recognition.onend = () => {
    isRecognizing = false;
};

recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    if (!isRecognizing) {
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block";
    } else {
        console.log("Speech recognition is already running.");
    }
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
        speak("Hello Ma'am, how can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Aparna Singh.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube.");
        window.open("https://www.youtube.com");
    } else if (message.includes("open google")) {
        speak("Opening Google.");
        window.open("https://www.google.com");
    } else if (message.includes("open chatgpt")) {
        speak("Opening ChatGPT.");
        window.open("https://www.chatgpt.com");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator.");
        window.open("Calculator://");
    } else if (message.includes("time")) {
    let time = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric"
    });
    speak("The time is " + time);
} else if (message.includes("date")) {
    let date = new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    speak("Today's date is " + date);
} else {
    let cleanMessage = message.toLowerCase().replace("chitti", "").replace("chitty", "").trim();
    speak(`Here is what I found on the internet about ${cleanMessage}`);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(cleanMessage)}`);
}
}

