document.getElementById('logo').style.marginTop = 0;

document.getElementById('menu').addEventListener('click', e=> {
    document.getElementById('exit').classList.remove('not-visible');
    document.getElementById('menu_block').style.left = "0";
})

document.getElementById('exit').addEventListener('click', e=> {
    document.getElementById('exit').classList.add('not-visible');
    document.getElementById('menu_block').style.left = "100%";
})