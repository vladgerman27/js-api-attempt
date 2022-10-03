const quotesUrl = 'https://type.fit/api/quotes';

let city = document.getElementById('city');

let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=8994e6cb46263cfa3b7e4229e788eea1`;

emojis = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '⛆',
    Drizzle: '☔️',
    Thunderstorm: '⛈',
    Snow: '🌨',
    Mist: '🌫',
};

days_of_week = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
};

months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
};

let sounds = [
    {
        name: 'Aqua Caelestis',
        path: 'assets/sounds/AquaCaelestis.mp3',
    },
    {
        name: 'Ennio Morricone',
        path: 'assets/sounds/EnnioMorricone.mp3',
    },
    {
        name: 'River Flows In You',
        path: 'assets/sounds/RiverFlowsInYou.mp3',
    },
    {
        name: 'Summer Wind',
        path: 'assets/sounds/SummerWind.mp3',
    },
];

let slides = [
    {
        bgImg: 'assets/img/bg1.jpg',
    },
    {
        bgImg: 'assets/img/bg2.jpg',
    },
    {
        bgImg: 'assets/img/bg3.jpg',
    },
    {
        bgImg: 'assets/img/bg4.jpg',
    },
    {
        bgImg: 'assets/img/bg5.jpg',
    },
];

const getData = async () => {
    const res = await fetch(quotesUrl);
    const data = await res.json();

    let author = document.getElementById('author');
    let text = document.getElementById('quote');

    let i = Math.floor(Math.random() * 1642);

    author.textContent = data[i].author;
    text.textContent = data[i].text;
};

const getWeather = async () => {
    localStorage.setItem('cityInput', city.value);

    openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=8994e6cb46263cfa3b7e4229e788eea1`;

    const res = await fetch(openWeatherUrl);
    const data = await res.json();

    let tempIcon = document.getElementById('weather-icon');
    let temp = document.getElementById('temp');
    let tempDesc = document.getElementById('temp-desc');
    let wind = document.getElementById('wind');
    let humidity = document.getElementById('humidity');

    if (data['weather'][0]['main'] in emojis) {
        tempIcon.textContent = emojis[data['weather'][0]['main']];
    } else {
        tempIcon.textContent = 'null';
    }

    temp.textContent = `${Math.round(data['main'].temp - 273.15)}°C`;
    tempDesc.textContent = data['weather'][0].description;

    wind.textContent = ` Wind speed: ${data['wind'].speed} m/s`;
    humidity.textContent = `Humidity: ${data['main'].humidity}%`;
};

const cityInpValue = localStorage.getItem('cityInput');
city.value = cityInpValue;

const clock = () => {
    const today = new Date();

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let day = today.getDay();
    let month = today.getMonth();
    let date = today.getDate();

    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('time').textContent = h + ':' + m + ':' + s;
    document.getElementById('date').textContent = `${days_of_week[day]}, ${months[month]} ${date}`;

    if (h >= 4 && h <= 11) {
        document.getElementById('greeting').textContent = 'Good morning';
    } else if (h >= 12 && h <= 16) {
        document.getElementById('greeting').textContent = 'Good afternoon';
    } else if (h >= 17 && h <= 24) {
        document.getElementById('greeting').textContent = 'Good evening';
    } else {
        document.getElementById('greeting').textContent = 'Good night';
    }

    setTimeout(clock, 1000);
};

const checkTime = (i) => {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
};

let isPlaying = false;
let sound = document.createElement('audio');
let song_index = 0;

function playAudio() {
    sound.play();
    isPlaying = true;
}

function pauseAudio() {
    sound.pause();
    isPlaying = false;
}

function playSong() {
    let pause = document.getElementById('play');
    pause.style.backgroundImage = "url('assets/svg/play.svg')";

    sound.paused ? playAudio() : pauseAudio();
    sound.paused
        ? (pause.style.backgroundImage = "url('assets/svg/play.svg')")
        : (play.style.backgroundImage = "url('assets/svg/pause.svg')");
}

function nextSong() {
    if (song_index < sounds.length - 1) song_index += 1;
    else song_index = 0;
    selectSong(song_index);
    playAudio();
}

function previousSong() {
    if (song_index > 0) song_index -= 1;
    else song_index = sounds.length - 1;
    selectSong(song_index);
    playAudio();
}

let slide_index = 0;
let slide = document.body;
slide.style.background = 'url(' + slides[slide_index].bgImg + ') center/cover, rgba(0, 0, 0, 0.5)';

function nextSlide() {
    if (slide_index < slides.length - 1) slide_index += 1;
    else slide_index = 0;
    slide.style.background = 'url(' + slides[slide_index].bgImg + ') center/cover, rgba(0, 0, 0, 0.5)';
}

function prevSlide() {
    if (slide_index > 0) slide_index -= 1;
    else slide_index = slide.length - 1;
    slide.style.background = 'url(' + slides[slide_index].bgImg + ') center/cover, rgba(0, 0, 0, 0.5)';
}

let li_s = [];

let ul = document.getElementById('play-list');

sounds.forEach((element) => {
    let li = document.createElement('li');
    li.textContent = element.name;
    li.classList.add('play-item');

    ul.append(li);
    li_s.push(li);
});

function selectSong(song_index) {
    console.log(song_index);
    sound.src = sounds[song_index].path;
    sound.load();
    isPlaying = true;
    playAudio();
}

for (let j = 0; j < li_s.length; j++) {
    const element = li_s[j];
    $(element).attr('onclick', `selectSong(${j})`);
}

let input = document.getElementById('int');
input.value = '';

const localStorageFunc = () => {
    localStorage.setItem('input', input.value);
};

const inpValue = localStorage.getItem('input');
input.value = inpValue;

clock();
getWeather();
getData();
