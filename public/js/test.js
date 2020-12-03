const sythesisVar = window.speechSynthesis

//variable from DOM

const form = document.querySelector('form'),
    textArea = document.querySelector('#textToSpeech'),
    rate_value = document.querySelector('#rate-value'),
    rate = document.querySelector('#rate'),
    pitch_value = document.querySelector('#pitch-value'),
    pitch = document.querySelector('#pitch'),
    voicesSelect = document.querySelector('#voicesSelect'),
    start = document.querySelector('#startbtn'),
    pause = document.querySelector('#pausebtn'),
    stopsss = document.querySelector('#stopbtn')


let voices = []
const getVoices = () => {
    voices = sythesisVar.getVoices()

    voices.forEach(element => {
        const option = document.createElement('option')
        option.textContent = element.name

        option.setAttribute('data-lang', element.lang)
        option.setAttribute('data-name', element.name)

        voicesSelect.appendChild(option)
    })
}


getVoices();
if (sythesisVar.onvoiceschanged !== undefined)
    sythesisVar.onvoiceschanged = getVoices




const SpeakkkkIT = () => {
    if (sythesisVar.speaking) {
        console.error("Already Speaking")
        return
    }
    if (textArea.value !== '') {
        const speakTEXT = new SpeechSynthesisUtterance(textArea.value)

        speakTEXT.onend = e => {
            console.log("Done Speaking")
        }

        speakTEXT.onerror = e => {
            console.error('There is something wrong' + e.error)
        }

        const selectedVoice = voicesSelect.selectedOptions[0].getAttribute('data-name')

        console.log(selectedVoice)
        voices.forEach(element => {
            if (element.name === selectedVoice) {
                speakTEXT.voice = element
                console.log(element)
            }
        })


        speakTEXT.rate = rate.value
        speakTEXT.pitch = pitch.value


        sythesisVar.speak(speakTEXT)
    }
}





form.addEventListener('submit', ((e) => {
    e.preventDefault()
    SpeakkkkIT()
}))

//on change of the rate and pitch

rate.addEventListener('change', e => rate_value.textContent = rate.value)

pitch.addEventListener('change', e => pitch_value.textContent = pitch.value)



start.addEventListener('click', e => sythesisVar.resume())
pause.addEventListener('click', e => sythesisVar.pause())
stopsss.addEventListener('click', e => sythesisVar.cancel())