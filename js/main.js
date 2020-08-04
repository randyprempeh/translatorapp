// speech synthesis to set up a variable for our API

const synth = window.speechSynthesis;


// ALL RELATED DOM ELEMENTS

const pageForm = document.querySelector("form");
const formInput = document.querySelector("#input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate-slider");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch-slider");
const buttonSubnit = document.querySelector("#submit");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// Initiate voice Arrays
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // set up a Loop for voices and options for each

  voices.forEach((voice) => {
    // an option element by DOM
    const option = document.createElement("option");

    //After option is crated, fill with voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";

    // Attributes needed for option nad append options
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

/// Voice Speeches
const speak = () => {
  // lets do a conditional statement  to check for error if already translating

  if (synth.speaking) {
    console.error("Voice translation  already in progress");
    return;
  }
  if (formInput.value !== "") {
    // animation as voice translate is triggereed

    body.style.background = "#537895 url(img/waves.png)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";

    // Trigger the text speak
    const textSpeech = new SpeechSynthesisUtterance(formInput.value);

    // Speech End
    textSpeech.onend = (e) => {
      console.log("Voice translation is triggered"); // runs after speakinf is done
      body.style.background = "#537895";
      
    };

    // Error SPeech
    textSpeech.oneerror = (e) => {
      console.error("Voice error, this not be translated");
    };

    //  Select one particluar voice to speak, using the set variable data-naeme
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // Loop through all voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        textSpeech.voice = voice;
      }
    });

    // Set pitch and rate
    textSpeech.rate = rate.value;
    textSpeech.pitch = pitch.value;

    // activate speak
    synth.speak(textSpeech);
  }
};

// event listeners on submit form

pageForm.addEventListener("submit", (e) => {
  // in order to prevent it fro submitting to a file
  e.preventDefault();
  speak(); // call speak function
  formInput.blur();
});

// SLider for rate
rate.addEventListener("change", e => (rateValue.textContent = rate.value));

// SLider for pitch
pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// Automatic voice triggers when voice slected is chosen
voiceSelect.addEventListener("change", (e) => speak());

// And triggers after button is clicked
buttonSubnit.addEventListener("click", (e) => speak());

