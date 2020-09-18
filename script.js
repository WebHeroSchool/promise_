const body = document.body;
const url = window.location.toString();
const date = new Date();
let requestFromPromise, dateFromPromise;

document.body.onload = function() {

  setTimeout(function() {
    let preloader = document.getElementById('preloader');

    if (!preloader.classList.contains('done')) {
    	preloader.classList.add('done');
    }
  }, 3000)

};

const getUsernameFromUrl = (url) => {
  let splitOfUrl = url.split('=');
  let stringOfUsername  = splitOfUrl[1];
  if (stringOfUsername == undefined) {
    stringOfUsername = 'DianaZaharova';
  }
  return stringOfUsername;
};

const getDate = new Promise((resolve, reject) =>
  setTimeout(() => date ? resolve(date) : reject('Время неизвестно'), 2000)
);

const getRequest = fetch(`https://api.github.com/users/${getUsernameFromUrl(url)}`);

Promise.all([getRequest, getDate])
  .then(([request, date]) => {
    requestFromPromise = request;
    dateFromPromise = date;
    savedDate = date;
  })
  .then(res => requestFromPromise.json())
  .then(user => {
    avatarOfUser = user.avatar_url;
    bioOfUser = user.bio;
    urlOfUser = user.url;
    const addUser = () => {
      const user = document.createElement('h1');
      user.innerHTML = `${getUsernameFromUrl(url)}`;
      body.appendChild(user);
    }
    const addBio = () => {
      const bio = document.createElement('h3');
      bio.innerHTML = `${bioOfUser}`;
      body.appendChild(bio);
    }
    const addImg = () => {
      const img = document.createElement('img');
      let newString = document.createElement('br');
      img.src = this.avatarOfUser;
      body.appendChild(img);
      body.appendChild(newString);
    }
    let createUrl = () => {
  	let userUrl = document.createElement('a');
  	let text = document.createTextNode('PROFILE');
  	userUrl.appendChild(text);
  	userUrl.href = 'https://github.com/' + name;
  	body.appendChild(userUrl);
	}
	const addDate = () => {
		let currentDate = document.createElement('h4');
	  currentDate.innerHTML = savedDate;
	  body.appendChild(currentDate);
	}
    addUser();
    addBio();
    addImg();
    createUrl();
    addDate();
});