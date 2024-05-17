document.getElementById('logo').style.marginTop = 0;

document.getElementById('menu').addEventListener('click', e=> {
    document.getElementById('exit').classList.remove('not-visible');
    document.getElementById('menu_block').style.left = "0";
})

document.getElementById('exit').addEventListener('click', e=> {
    document.getElementById('exit').classList.add('not-visible');
    document.getElementById('menu_block').style.left = "100%";
})

document.getElementById("block_buttons").style.opacity = 1;
document.getElementById("block_info").style.marginLeft = '50px';

document.getElementById("mobile_block_buttons").style.opacity = 1;
document.getElementById("mobile_block_info").style.marginLeft = '5%';