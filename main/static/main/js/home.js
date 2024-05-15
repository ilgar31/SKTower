document.getElementById("block_buttons").style.opacity = 1;
document.getElementById("block_info").style.marginLeft = '50px';

document.getElementById("mobile_block_buttons").style.opacity = 1;
document.getElementById("mobile_block_info").style.marginLeft = '5%';


var block1 = document.getElementById("block1");
var block2 = document.getElementById("block2");
var block3 = document.getElementById("block3");
var block4 = document.getElementById("block4");
var block5 = document.getElementById("block5");

function animation() {
    const block1Top = block1.getBoundingClientRect().top;
    const block2Top = block2.getBoundingClientRect().top;
    const block3Top = block3.getBoundingClientRect().top;
    const block4Top = block4.getBoundingClientRect().top;
    const block5Top = block5.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (block1Top < windowHeight) {
        block1.classList.add('visible_block');
    }

    if (block2Top < windowHeight) {
        block2.classList.add('visible_block');
    }

    if (block3Top < windowHeight) {
        block3.classList.add('visible_block');
    }

    if (block4Top < windowHeight) {
        block4.classList.add('visible_block');
    }

    if (block5Top < windowHeight) {
        block5.classList.add('visible_block');
    }
}

animation();

window.addEventListener('scroll', () => {
    animation();
});

