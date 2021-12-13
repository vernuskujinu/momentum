

const showTime = () => {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString()
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    const option = { hour: 'numeric', minute: 'numeric', second: 'numeric' }
    let midNight = date.toLocaleTimeString('en-US', option)
    if ('12:00:00 AM' === midNight) {
        showDate();
    }

    if ('12:00:00 AM' === midNight || '5:00:00 AM' === midNight || '12:00:00 PM' === midNight || '5:00:00 PM' === midNight) {
        showGreeting()
    }
}

showTime();

const showDate = () => {
    const dateSel = document.querySelector(".date");
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString('en-US', options);
    dateSel.textContent = currentDate;
}

showDate();

const getTimeOfDay = (hour) => {
    if (5 <= hour && hour <= 11) {
        return "Morning"
    } else if (12 <= hour && hour <= 16) {
        return "Afternoon"
    } else if (17 <= hour && hour <= 23) {
        return "Evening"
    } else {
        return "Night"
    }
}

const showGreeting = () => {
    const greeting = document.querySelector(".greeting")
    const date = new Date();
    const hours = date.getHours();

    const timeOfDay = getTimeOfDay(hours)
    greeting.textContent = `Good ${timeOfDay},`

}

showGreeting()

const setLocalStorage = () => {
    const name = document.querySelector(".name")
    localStorage.setItem('name', name.value);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    const name = document.querySelector(".name")
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    } else {
        name.placeholder = "[Enter Name]"
    }
}
window.addEventListener('load', getLocalStorage)

// SLIDER

const getRandomNum = () => {
    let min = Math.ceil(10);
    let max = Math.floor(20);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setBg = (timeOfDay, bgNum) => {
    const body = document.body;
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
    }
}

let randomNum;
randomNum = getRandomNum()
const date = new Date();
const hours = date.getHours();
const timeOfDay = getTimeOfDay(hours).toLowerCase();
setBg(timeOfDay, randomNum);

const getSlideNext = () => {
    const date = new Date();
    const hours = date.getHours();
    randomNum = getRandomNum()
    const timeOfDay = getTimeOfDay(hours).toLowerCase();
    if (randomNum < 21) {
        randomNum++
    } else {
        randomNum = 1
    }
    setBg(timeOfDay, randomNum)
}

const getSlidePrev = () => {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours).toLowerCase();
    randomNum = getRandomNum()
    if (randomNum > 1) {
        randomNum--
    } else {
        randomNum = 20
    }
    setBg(timeOfDay, randomNum)
}

const slideNext = document.querySelector(".slide-next")
slideNext.addEventListener("click", getSlideNext)

const slidePrev = document.querySelector(".slide-prev")
slidePrev.addEventListener("click", getSlidePrev)

// WETHER

async function getWeather() {
    const city = document.querySelector(".city")
    if (!city.value) {
        city.value = "Minsk"
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const weatherWind = document.querySelector('.wind');
    const weatherHumidity = document.querySelector('.humidity');
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherWind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    weatherHumidity.textContent = `Humidity: ${data.main.humidity}% `;
}
getWeather()
const city = document.querySelector(".city")
city.addEventListener("change", getWeather)

// PLAY LIST

const playList = [
    {
        title: 'Aqua Caelestis',
        src: '../assets/sounds/Aqua Caelestis.mp3',
        duration: '00:58'
    },
    {
        title: 'Ennio Morricone',
        src: '../assets/sounds/Ennio Morricone.mp3',
        duration: '03:50'
    },
    {
        title: 'River Flows In You',
        src: '../assets/sounds/River Flows In You.mp3',
        duration: '00:58'
    },
    {
        title: 'Summer Wind',
        src: '../assets/sounds/Summer Wind.mp3',
        duration: '00:58'
    }
]

const playListItem = document.querySelector(".play-list")

for (let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    playListItem.append(li)
    li.textContent = playList[i].title
    // li.style.listStyleType = "none"
    li.classList.add('play-item')

}


// PLAYER
let isPlay = false;
const audio = new Audio();
let choosedItem = 0;
const playBtn = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const items = document.querySelectorAll('.play-item')

// async function getSong() {
//     const song = `${playList[choosedItem].src}`;
//     const res = await fetch(song, {
//         method: 'GET',
//         headers: { 'Access-Control-Allow-Origin': '*' }
//     });

//     audio.src = res.url
//     console.log(audio.src)
// }

function getSong() {
        const song = `${playList[choosedItem].src}`;
        audio.src = song
        console.log(audio.src)
    }


getSong()

const playPause = () => {
    if (isPlay) {
        pauseAudio()
    } else if (!isPlay) {
        playAudio()
    }
}

function playAudio() {
    isPlay = true;
    audio.play();
    playBtn.classList.add('pause')
}
function pauseAudio() {
    isPlay = false
    audio.pause();
    playBtn.classList.remove('pause')
}

async function playAudioPrev() {
    if (choosedItem === 0) {
        choosedItem = playList.length - 1
    } else {
        choosedItem -= 1
    }
    addClassToPlayListItem(choosedItem)
    await getSong()
    playAudio()
}
async function playAudioNext() {
    if (choosedItem === playList.length - 1) {
        choosedItem = 0
    } else {
        choosedItem += 1
    }
    addClassToPlayListItem(choosedItem)
    await getSong()
    playAudio()
}

const addClassToPlayListItem = (item = 0) => {
    if (items.length === 0) {
    } else {
        for (let index = 0; index < items.length; index++) {
            items[index].classList.remove('item-active')
        }
    }
    items[item].classList.add('item-active')
}

addClassToPlayListItem(choosedItem)

playPrev.addEventListener("click", playAudioPrev)
playNext.addEventListener("click", playAudioNext)
playBtn.addEventListener("click", playPause)

// CUSTOM AUDIO PLAYER

const audioPlayer = document.querySelector(".audio-player");
const timeline = audioPlayer.querySelector(".timeline");
const progressBar = audioPlayer.querySelector(".progress");
const volume = audioPlayer.querySelector(".volume");
const songTime = audioPlayer.querySelector(".song-time");



timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    console.log(audio.duration)
    audio.currentTime = timeToSeek;
}, false);

// check audio percentage and update time accordingly
setInterval(() => {
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    songTime.textContent = getTimeCodeFromNum(audio.currentTime);

}, 500);

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}

// QUOTE OF THE DAY
let qouateNumber = 0;
async function getQuotes() {
    const quotes = 'js/data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const quoteText = document.querySelector(".quote")
    if (qouateNumber > data.length - 1) {
        qouateNumber = 0
    }
    quoteText.textContent = await data[qouateNumber].text
    qouateNumber++
}
getQuotes()
const changeQuote = document.querySelector(".change-quote")
changeQuote.addEventListener("click", getQuotes)







