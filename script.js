
// **************************** Elements
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const likeButton = document.getElementById('like');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


// **************************** Objects
const starwayToHeaven = {
    id: '0',
    songName: "Starway To Heaven",
    artist: "Led Zeppelin",
    file: "Led-Zeppelin-IV",
    liked: false
};

const U2withOrWithoutYou = {
    id: '1',
    songName: "With or Without You",
    artist: "U2",
    file: "U2-With-Or-Without-You",
    liked: false
}     

const aHaTakeOnMe = {
    id: '2',
    songName: "Take on Me",
    artist: "A Ha",
    file: "A-Ha-Take-On-Me",
    liked: false
}  

const depecheModeEnjoyTheSilence = {
    id: '3',
    songName: "Enjoy The Silence",
    artist: "Depeche Mode",
    file: "Depeche-Mode-Enjoy-The-Silence",
    liked: false
}  

const REMLosingMyReligion = {
    id: '4',
    songName: "Losing My Religion",
    artist: "R.E.M.",
    file: "REM-Losing-My-Religion",
    liked: false
}  

const direStraitsMoneyForNothing = {
    id: '5',
    songName: "Money for Nothing",
    artist: "Dire Straits",
    file: "Dire-Straits-Money-For-Nothing",
    liked: false
}  


/* const originalPlaylist = [U2withOrWithoutYou, aHaTakeOnMe, depecheModeEnjoyTheSilence, REMLosingMyReligion, direStraitsMoneyForNothing]; */
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [U2withOrWithoutYou, aHaTakeOnMe, depecheModeEnjoyTheSilence, REMLosingMyReligion, direStraitsMoneyForNothing]; // ?? operador de coalecência nula


// **************************** Variables
let sortedPlaylist = [...originalPlaylist]; // ... spread operator

let index = 0;

let isplay = false;

let isShuffled = false;

let isRepeatOn = false;

// **************************** Functions
function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isplay = true;
}


function pauseSong(){
    play.querySelector('.bi').classList.remove('bi-play-pause-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isplay = false;
}

function playPauseDecider(){
    if(isplay === true){
        pauseSong();
    } else {
        playSong()
    }
}

function initializaSong(){
    cover.src = `images/${sortedPlaylist[index].file}.jpg`;
    song.src = `musicas/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
    } else {
        index--;
    } 
    initializaSong();
    playSong();
}

function nextSong(){
    if(index === (sortedPlaylist.length - 1)){
        index = 0;
    } else {
        index++;
    } 
    initializaSong();
    playSong();
}

function updateProgress(){
    song.currentTime;
    song.duration;
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', barWidth+'%');
    updateCurrentTime();
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size -1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()*size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex--;
    }
}

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicked(){
    if(isRepeatOn === false){
        isRepeatOn = true;
        repeatButton.classList.add('button-active');
    } else {
        isRepeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat(){
    if(isRepeatOn === false){
        nextSong();
    } else {
        playSong();
    }
}

function updateCurrentTime(){
    songTime.innerText = toHHMMSS(song.currentTime); // dados em segundos
}

function  updateTotalTime(){
    totalTime.innerText = toHHMMSS(song.duration); // dados em segundos
}

function toHHMMSS(originalNumber){
    const hh = Math.floor(originalNumber / 3600);
    const mm = Math.floor((originalNumber - hh * 3600) / 60);
    const ss = Math.floor(originalNumber-hh * 3600 - mm * 60);
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;

}

function likeButtonRender(){
    if(sortedPlaylist[index].liked === false){
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.classList.remove('heartButtonColor');
    } else {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('heartButtonColor');
    }
}

function likeButtonclicked(){
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}


// **************************** Calls

initializaSong();


// **************************** Events

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime)
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonclicked);




