document.getElementById('menu').addEventListener('click', e=> {
      document.getElementById('menu').classList.add('not-visible');
      document.getElementById('exit').classList.remove('not-visible');
})

document.getElementById('exit').addEventListener('click', e=> {
      document.getElementById('exit').classList.add('not-visible');
      document.getElementById('menu').classList.remove('not-visible');
})