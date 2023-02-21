
    //Zenék listája 
    //sources
    musiclist = JSON.parse(localStorage.getItem('musiclist')) || [];


    
    console.log(musiclist);
    
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
    szerzo.innerHTML = musiclist[el]?.szerzo;
    title.innerHTML = musiclist[el]?.name;
    zene.src = musiclist[el]?.hang;
    
    
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
                    refreshmusic()
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
        pause();
    });
    new_music_input.addEventListener('change', () => {
        let splited_musicname = new_music_input.files[0].name.split('-');
        let new_Music_elem = {};
        if (splited_musicname.length == 2){
            new_Music_elem = {
            name: splited_musicname[1],
            szerzo: splited_musicname[0],
            hang: 'media/musics/' + new_music_input.files[0].name
        }
        }else {
        new_Music_elem = {
            name: new_music_input.files[0].name,
            szerzo: 'Ismeretlen',
            hang: 'media/musics/' + new_music_input.files[0].name
            }
        }
        musiclist.push(new_Music_elem);
        console.log(musiclist);
        refreshmusic()
        zeneelem()
        localStorage.setItem('musiclist', JSON.stringify(musiclist));
        document.querySelector('.submit').click();

    
    });
    function refreshmusic() {
    const zenek = document.querySelector('.zenek');
    zenek.innerHTML = "";
    if (musiclist.length == 0) {
        zenek.innerHTML = "<h6>Nem adtál hozzá még egy zenét sem<h6>";
        document.querySelector('.actions').style.display = 'none';
        document.querySelector('.content').style.display = 'none';
        document.querySelector('.wrapper .div').innerHTML = `<h6>Adj hozzá új zenét!<h6>`
        const new_music_2 = document.createElement('div');
        new_music_2.classList.add('new-music-2');
        new_music_2.innerHTML =`<button><span>Zene Hozzáadás  </span><i class="bi bi-cloud-plus"></i></button>`
        document.querySelector('.wrapper .div').appendChild(new_music_2);
        new_music_2.addEventListener('click', () => {
        new_music_input.click();
        });
        
    }else{
        document.querySelector('.actions').style.display = 'block';
        document.querySelector('.content').style.display = 'block';
        document.querySelector('.wrapper .div').innerHTML = "";
        szerzo.innerHTML = musiclist[el].szerzo;
        title.innerHTML = musiclist[el].name;
    
    }
    
    
    
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
        //morebutton
        const morebutton = document.createElement('button');
        morebutton.setAttribute('id', 'more');
        const morebuttondots = document.createElement('i');
        morebuttondots.classList.add('bi','bi-three-dots');
        morebutton.appendChild(morebuttondots);
    
        music_actions.appendChild(music_playbutton);
        music_actions.appendChild(morebutton);
        zene_elem.appendChild(music_actions);
    
        //menu-zene-elem-edit
        const menu_zene_elem_edit = document.createElement('div');
        menu_zene_elem_edit.classList.add('menu-zene-elem-edit');

        const menu_zene_elem_edit_display = document.createElement('div');
        menu_zene_elem_edit_display.classList.add('menu-zene-elem-edit-display');


        const deleteicon = document.createElement('i');
        deleteicon.classList.add('bi','bi-trash');
        const deletespan = document.createElement('span');
        deletespan.innerHTML = 'Törlés';

        const editicon = document.createElement('i');
        editicon.classList.add('bi','bi-pen');
        const editspan = document.createElement('span');
        editspan.innerHTML = 'Szerkesztés';

        const likeicon = document.createElement('i');
        likeicon.classList.add('bi','bi-suit-heart');
        const likespan = document.createElement('span');
        likespan.innerHTML = 'Tetszik';
        
        const dragicon = document.createElement('i');
        dragicon.classList.add('bi','bi-arrows-collapse');
        

        deleteicon.appendChild(document.createElement('br'));
        editicon.appendChild(document.createElement('br'));
        likeicon.appendChild(document.createElement('br'));

        deleteicon.appendChild(deletespan);
        editicon.appendChild(editspan);
        likeicon.appendChild(likespan);

        menu_zene_elem_edit_display.appendChild(deleteicon)
        menu_zene_elem_edit_display.appendChild(editicon)
        menu_zene_elem_edit_display.appendChild(likeicon)
        menu_zene_elem_edit_display.appendChild(dragicon)

        menu_zene_elem_edit.appendChild(menu_zene_elem_edit_display)
        zene_elem.appendChild(menu_zene_elem_edit);
        

        //current music
        
        if (musiclist.indexOf(element) == el) {
            zene_elem.classList.add('currentzene');
        }
    
        //play button1*****************************************************
        music_display.addEventListener('click', () => {
    
        pause();
        el = musiclist.indexOf(element);
        musiclist.indexOf(element) == el;
            
        if (music_playbutton.innerHTML == `<i class="bi bi-play-fill"></i>` && !zene_elem.classList.contains('currentzene')) {
        zeneelem();
        resume();
        music_playbutton.innerHTML = `<i class="bi bi-pause-fill"></i>`;
        }
        else if (music_playbutton.innerHTML == `<i class="bi bi-play-fill"></i>` && zene_elem.classList.contains('currentzene')) {
        resume();
        }
        else {
        pause();
        
        music_playbutton.innerHTML = `<i class="bi bi-play-fill"></i>`;
        }
    
        refreshmusic();
        });


        //play button2*****************************************************

        music_playbutton.addEventListener('click', () => {
    
            pause();
            el = musiclist.indexOf(element);
            musiclist.indexOf(element) == el;
                
            if (music_playbutton.innerHTML == `<i class="bi bi-play-fill"></i>` && !zene_elem.classList.contains('currentzene')) {
            zeneelem();
            resume();
            music_playbutton.innerHTML = `<i class="bi bi-pause-fill"></i>`;
            }
            else if (music_playbutton.innerHTML == `<i class="bi bi-play-fill"></i>` && zene_elem.classList.contains('currentzene')) {
            resume();
            }
            else {
            pause();
            
            music_playbutton.innerHTML = `<i class="bi bi-play-fill"></i>`;
            }
        
            refreshmusic();
            });

        //more button*****************************************************

        morebutton.addEventListener('click', (e) => {
        
        if (!menu_zene_elem_edit.classList.contains('menu-zene-elem-edit-open'))
        {

            menu_zene_elem_edit.classList.add('menu-zene-elem-edit-open');
            music_actions.classList.add('menu-action-open');
            music_display.classList.add('menu-display-open');
    
            morebuttondots.classList.add('rotate-dots');
    


        }else {
            menu_zene_elem_edit.classList.remove('menu-zene-elem-edit-open');
            music_actions.classList.remove('menu-action-open');
            music_display.classList.remove('menu-display-open');
    
            morebuttondots.classList.remove('rotate-dots');


        }
    
        
        
        
        });
        //************************************************************ */
});
    }
    refreshmusic()
    
    //downmenu eazy
    document.querySelector('.div').addEventListener('click', () => {
    downmenu()});
    document.querySelector('.content').addEventListener('click', () => {
    downmenu()});
    function downmenu(){
        if (menu.classList.contains('menu-open'))
        {
        menu.classList.remove('menu-open');
        menu.classList.add('menu-closed');
        menuZeneLista.classList.remove('menu-open');
        menuZeneLista.classList.add('menu-closed');
        }
    }


