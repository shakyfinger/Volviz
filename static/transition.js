console.log('transition linked correctly')

window.onload = () => {
  const trans_el = document.querySelector('.transition');
  const search = document.querySelector('form');

  setTimeout(() => {
    trans_el.classList.remove('is-active');
  }, 100); 

  search.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.children[0].value == "") {return false;}
    trans_el.classList.add('is-active');

    setTimeout(() => {
      search.submit();
    }, 100)

  });
}


// templates/index.html
// templates/dashboard.html
// static/test.js
// volviz.py
// aux.py
