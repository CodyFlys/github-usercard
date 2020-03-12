/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function gitHubCard(data) {
  // --------------------  CARD CREATION START -------------------- 

  // card creation and profile picture
  let newCard = document.createElement('div');
  newCard.classList.add('card')
  let profilePicture = document.createElement('img');
  profilePicture.src = data.avatar_url;

  // card info
  let newCardInfo = document.createElement('div');
  newCardInfo.classList.add('card-info')
  let realName = document.createElement('h3');
  realName.classList.add('name')
  let userName = document.createElement('p');
  userName.classList.add('username')
  let location = document.createElement('p');
  location.textContent = `Location: ${data.location}`
  let profile = document.createElement('p'); // this one may be tricky.
  profile.textContent = `profile: `
  let followers = document.createElement('p');
  followers.textContent = `Followers: ${data.followers}`
  let following = document.createElement('p');
  following.textContent = `Following: ${data.following}`
  let bio = document.createElement('p');
  bio.textContent = `Bio: ${data.bio}`
  let link = document.createElement('a');
  link.setAttribute('href', data.html_url);

  link.textContent = data.html_url;

  // --------------------  CARD CREATION END --------------------
  // --------------------  CARD APPENDING START --------------------
  newCard.append(profilePicture, newCardInfo);

  // newCardInfo is appended to "newCard" with all items below.
  newCardInfo.append(realName, userName, location, profile, followers, following, bio);
  profile.append(link)
  return newCard;
}

const userCards = document.querySelector('.cards');

axios.get('https://api.github.com/users/CodyFlys')
.then(response => {
  console.log(response);
  userCards.append(gitHubCard(response.data))
})
.catch(error => {
  console.log("ERROR FOUND!", error)
})



axios.get('https://api.github.com/users/codyflys/followers')
.then(response => {
  response.data.forEach(function (item) {
    followersArray.push(item.login)

  })
  followersArray.forEach(function (item){
    axios.get(`https://api.github.com/users/${item}`)
    .then(response => {
      userCards.append(gitHubCard(response.data))
    })
  
    .catch(error => {
    console.log("ERROR FOUND!", error)
    })
  })

})
.catch(error => {
  console.log("ERROR FOUND!", error)
})

console.log(followersArray);

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
