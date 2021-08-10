console.log("running");

const message = new SpeechSynthesisUtterance();
let voices = [] ; //will contain the voices 
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakBtn = document.querySelector('.speak');
const stopBtn = document.querySelector('.stop');

message.text = document.querySelector('[name="text"]').value;
//functions 
function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .map ( voice => `<option value="${voice.name}"> ${voice.name} (${voice.lang})</option>` )
        .join('');

}

function setVoice() {
    message.voice = voices.find(voice => voice.name === this.value );
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if( startOver ) {
        speechSynthesis.speak(message);
    }
    
}

function setOption() {
    message[this.name] = this.value ;
    toggle();
}

function startSpeak() {
    toggle();
}

function stopSpeak() {
    toggle(false);
}
//event listeners 
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakBtn.addEventListener('click', startSpeak);
stopBtn.addEventListener('click', stopSpeak);