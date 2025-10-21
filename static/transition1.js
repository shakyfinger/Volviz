console.log('transition linked correctly')

window.onload = () => {
  const trans_el = document.querySelector('.transition');
  const search = document.querySelector('form');
  const b = document.querySelector('.back');

  setTimeout(() => {
    trans_el.classList.remove('is-active');
  }, 100); 

  b.addEventListener('click', e => {
    e.preventDefault();
    trans_el.classList.add('is-active');

  setTimeout(() => {
    window.location.href = b.href;
  }, 100); 
  });

  search.addEventListener('submit', e => {
    e.preventDefault();
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
