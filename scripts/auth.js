//listen for auth status changes

auth.onAuthStateChanged(user =>{
  if(user) {
   db.collection('patchnotes').onSnapshot(snapshot => {
  setupGuides(snapshot.docs);
  setupUI(user);
}, err => {
  console.log(err.message)
});
} else {
    setupUI();
    setupGuides([]);
  }
});

//create new patches
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('patchnotes').add({
    game : createForm['title'].value ,
    patch_note : createForm.content.value, //2nd typo to add data
  }).then(() => {
    // close modal and reset
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message)
  })

})


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get use info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  //sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('user').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    }); 
  }).then(() => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() =>{
    
  });
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
     const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
