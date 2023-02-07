//Zenék listája 
const musiclist = [
{
    name: 'Numb',
    szerzo: 'Linking-park',
    hang: 'media/musics/Numb.mp3',
},
{
    name: 'In the End',
    szerzo: 'Linking-park',
    hang: 'media/musics/in-the-end.mp3',
},
{
    name: 'MIDDLE OF THE NIGHT',
    szerzo: 'Loveless',
    hang: 'media/musics/Loveless - MIDDLE OF THE NIGHT.mp3',
},

];
//sources
const szerzo = document.querySelector('.content h2');
const title = document.querySelector('.content h1');
const zene = document.querySelector('.zene');
const slider = document.querySelector('.slider');
const pausebutton = document.querySelector('.pause');
const pic = document.querySelector('.pic');
const currentido = document.querySelector('.currentido');

const back = document.querySelector('.back');
const forward = document.querySelector('.forward');
let el = 0
//current zene load
zene.onloadedmetadata = function () {
    slider.max = zene.duration;
    slider.value = zene.currentTime;
    durationMinutes = Math.floor(zene.duration / 60);
    durationSeconds = Math.floor(zene.duration - durationMinutes * 60);
    if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    
    document.querySelector('.maxido').innerHTML = durationMinutes + ":" + durationSeconds;
    currentido.innerHTML= `0:00`;
}




//lépkedés + maxduration

let durationMinutes = 0;
let durationSeconds = 0;

function zeneelem(){
szerzo.innerHTML = musiclist[el].szerzo;
title.innerHTML = musiclist[el].name;
zene.src = musiclist[el].hang;


if (el == musiclist.length - 1) {
forward.classList.remove('available')
}
else{
    forward.classList.add('available')
}
if (el == 0) {
    back.classList.remove('available')
    }
    else {
        back.classList.add('available')
    }
}
zeneelem()
back.addEventListener('click', () => {
if (el > 0) {
    el--;
    zeneelem()
    pause();
    resume();
    currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
}
});
forward.addEventListener('click', () => {
    if (el < musiclist.length - 1) {
        el++;
        zeneelem();
        pause();
        resume();
        currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
    }
    });



//megállitás + ido
let currentSeconds = 0;
let currentMinutes = 0;
var sor


function pause(){
    zene.pause();
    pausebutton.innerHTML = `<i class="bi bi-play-fill"></i>`;
    pic.src = 'media/music.jpg';
    if (sor >= 1) {
    clearInterval(sor);
    }
}
function resume(){
    zene.play();
    pausebutton.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    pic.src = 'media/music.gif';
        sor = setInterval(() => {
        slider.value = zene.currentTime;
        //console.log(Math.floor(zene.currentTime));
        //timer
        currentMinutes = Math.floor(zene.currentTime / 60);
        currentSeconds = Math.floor(zene.currentTime - currentMinutes * 60);
        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
        
        if (Math.floor(zene.currentTime) == Math.floor(zene.duration)) {
            if (el < musiclist.length - 1) {
                el++;
                zeneelem();
                pause();
                resume();
                currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
            }else {
                pause();
            }
        }
    }, 1000);
}

pausebutton.addEventListener('click', function () {
    if (!zene.paused) {
        pause()
    }
    else {
        resume();
    }
});


//slider
slider.addEventListener('change', function () {
    currentMinutes = Math.floor(slider.value / 60);
    currentSeconds = Math.floor(slider.value - currentMinutes * 60);
    if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
    currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
    zene.currentTime = slider.value;
});





//menu
const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu button');
const menuZeneLista = document.querySelector('.menu-zenelista');

menuButton.addEventListener('click', () => {
if (menu.classList.contains('menu-open'))
{
menu.classList.remove('menu-open');
menu.classList.add('menu-closed');
menuZeneLista.classList.remove('menu-open');
menuZeneLista.classList.add('menu-closed');
}else {
    menu.classList.add('menu-open');
    menu.classList.remove('menu-closed');
    menuZeneLista.classList.add('menu-open')
    menuZeneLista.classList.remove('menu-closed');
    refreshmusic();
}
});

const new_music = document.querySelector('.new-music button');
const new_music_input = document.querySelector('.new-music input');

new_music.addEventListener('click', () => {
    new_music_input.click();
});
new_music_input.addEventListener('change', () => {
    let reader = new FileReader();
    //console.log(new_music_input.files[0].name);
    let splited_musicname = new_music_input.files[0].name.split('-');
    reader.readAsDataURL(new_music_input.files[0]);
    let new_Music_elem = {};
    reader.addEventListener('load', () => {
        if (splited_musicname.length == 2){
            new_Music_elem = {
            hang: reader.result,
            name: splited_musicname[1],
            szerzo: splited_musicname[0],
        }}else {
            new_Music_elem = {
            hang: reader.result,
            name: new_music_input.files[0].name,
            szerzo: 'Ismeretlen',
        }
        }
        musiclist.push(new_Music_elem);
        console.log(musiclist);
        refreshmusic()
    });


    
});
function refreshmusic() {


const zenek = document.querySelector('.zenek');
zenek.innerHTML = "";

musiclist.forEach(element => {

    
    //alapja az elemnek
    const zene_elem = document.createElement('div');
    zene_elem.classList.add('menu-zene-elem');
    zenek.appendChild(zene_elem);

    //display
    const music_display = document.createElement('div');
    music_display.classList.add('music-display');

    const szerzo_elem = document.createElement('h2');
    const zenecim_elem = document.createElement('h2');
    szerzo_elem.innerHTML = element.szerzo +'&nbsp - &nbsp';
    zenecim_elem.innerHTML = element.name;
    szerzo_elem.setAttribute('id', 'szerzo');
    zenecim_elem.setAttribute('id', 'zene-cim');
    music_display.appendChild(szerzo_elem);
    music_display.appendChild(zenecim_elem);
    zene_elem.appendChild(music_display);
    
    //actions
    const music_actions = document.createElement('div');
    music_actions.classList.add('music-actions');
    
    const music_playbutton = document.createElement('button');
    music_playbutton.setAttribute('id', 'play');
    if (musiclist.indexOf(element) == el && !zene.paused) {
    music_playbutton.innerHTML = `<i class="bi bi-pause-fill"></i>`
    }else if (musiclist.indexOf(element) == el && zene.paused)
    {
        music_playbutton.innerHTML = `<i class="bi bi-play-fill"></i>`
    }else {
        music_playbutton.innerHTML = `<i class="bi bi-play-fill"></i>`
    }

    const morebutton = document.createElement('button');
    morebutton.setAttribute('id', 'more');


    morebutton.innerHTML = `<i class="bi bi-three-dots"></i>`

    music_actions.appendChild(music_playbutton);
    music_actions.appendChild(morebutton);
    zene_elem.appendChild(music_actions);

    //current music

    if (musiclist.indexOf(element) == el) {
        zene_elem.classList.add('currentzene');
    }

    //play button


    music_playbutton.addEventListener('click', () => {

    pause();
    el = musiclist.indexOf(element);
    
    musiclist.indexOf(element) == el;
        
    if (music_playbutton.innerHTML == `<i class="bi bi-play-fill"></i>`) {
    zeneelem();
    resume();
    music_playbutton.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    }
    else {
    pause();
    music_playbutton.innerHTML = `<i class="bi bi-play-fill"></i>`;
    }

    refreshmusic();
    });

});
}
refreshmusic()


