const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in')

const setupUI = (user) => {
  if(user) {
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');  
  }
}

const setupGuides = (data) => {

  if(data.length) { 
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
      <li>
      <div class="collapsible-header grey lighten-4">${guide.game}</div>
      <div class="collapsible-body white">${guide.patch_note}</div>
      </li>
      `;
      
      html += li
    });
    
    guideList.innerHTML = html
    
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view content</h5>'
  }
} 

document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

