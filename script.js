console.log("Welcome to Spotify");

let SongIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));



let songs = [
    {songName: "GS TITLE", filePath: "songs/1.mp3",coverPath: "1.jpg"},
    {songName: "Huii", filePath: "songs/2.mp3",coverPath: "covers/2.jpg"},
    {songName: "GS TITLE", filePath: "songs/3.mp3",coverPath: "covers/3.jpg"},
    {songName: "GS TITLE", filePath: "songs/4.mp3",coverPath: "covers/4.jpg"},
]

songItems.forEach((element,i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();


masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seek bar
    progress =  parseInt((audioElement.currentTime/audioElement.duration)*100)
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = audioElement.duration * myProgressBar.value/100
})


const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{

        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,e)=>{

    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        SongIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${SongIndex+1}.mp3`;
        masterSongName.innerText = songs[SongIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
    })

})

document.getElementById('next').addEventListener('click', ()=>{
    if(SongIndex>=3){
        SongIndex = 0;
    }
    else{
        SongIndex +=1;
    }
    audioElement.src = `songs/${SongIndex+1}.mp3`;
    masterSongName.innerText = songs[SongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(SongIndex<=0){
        SongIndex = 3;
    }
    else{
        SongIndex -=1;
    }
    audioElement.src = `songs/${SongIndex+1}.mp3`;
    masterSongName.innerText = songs[SongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

