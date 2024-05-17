var block1 = document.getElementById("block1");
var block2 = document.getElementById("block2");
var block3 = document.getElementById("block3");
var block4 = document.getElementById("block4");
var block5 = document.getElementById("block5");
var block6 = document.getElementById("block6");

function animation() {
    const block1Top = block1.getBoundingClientRect().top;
    const block2Top = block2.getBoundingClientRect().top;
    const block3Top = block3.getBoundingClientRect().top;
    const block4Top = block4.getBoundingClientRect().top;
    const block5Top = block5.getBoundingClientRect().top;
    const block6Top = block6.getBoundingClientRect().top;
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

    if (block6Top < windowHeight) {
        block6.classList.add('visible_block');
    }
}

animation();

window.addEventListener('scroll', () => {
    animation();
});


const questionContainers = document.querySelectorAll('.question');

for (let i = 0; i < questionContainers.length; i++) {
  const question = questionContainers[i].querySelector('.question_container');
  const answerContainer = questionContainers[i].querySelector('.answer_container');

  question.addEventListener('click', () => {
    answerContainer.classList.add('active_answer');
    for (let j = 0; j < questionContainers.length; j++) {
      if (i != j) {
        questionContainers[j].querySelector('.answer_container').classList.remove('active_answer');
      }
    }
  });
}



$(document).ready(function() {

    $('input[type="file"]').change(function(){
        var value = $("input[type='file']").val().split("\\").at(-1);
        $('.file_name').text(value);
        if (value) {
            $('.info_file_text').text('');
        }
        else {
            $('.info_file_text').text('*Если у Вас более одного файла, поместите их все в один архив');
        }
    });
});

$(document).ready(function() {

    $('input[type="file"]').change(function(){
        var value = $("input[type='file']").val().split("\\").at(-1);
        $('.file_name2').text(value);
        if (value) {
            $('.info_file_text2').text('');
        }
        else {
            $('.info_file_text2').text('*Если у Вас более одного файла, поместите их все в один архив');
        }
    });
});