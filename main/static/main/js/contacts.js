var block1 = document.getElementById("block1");
var block2 = document.getElementById("block2");

function animation() {
    const block1Top = block1.getBoundingClientRect().top;
    const block2Top = block2.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (block1Top < windowHeight) {
        block1.classList.add('visible_block');
    }

    if (block2Top < windowHeight) {
        block2.classList.add('visible_block');
    }
}

animation();

window.addEventListener('scroll', () => {
    animation();
});
