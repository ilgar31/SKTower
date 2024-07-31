var block1 = document.getElementById("block1");

function animation() {
    const block1Top = block1.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (block1Top < windowHeight) {
        block1.classList.add('visible_block');
    }
}

animation();

window.addEventListener('scroll', () => {
    animation();
});



document.getElementById("layout_1").classList.add('layout_active_count_block');
document.getElementById("layout_image_1").classList.add('layout_active');


function new_layout(id) {
    var i = 1;

    while (i < 7) {
        try {
            document.getElementById(`layout_${i}`).classList.remove('layout_active_count_block');
            document.getElementById(`layout_image_${i}`).classList.remove('layout_active');
        }
        catch {break;}
        i +=1;
    }

    document.getElementById(`layout_${id}`).classList.add('layout_active_count_block');
    document.getElementById(`layout_image_${id}`).classList.add('layout_active');
}