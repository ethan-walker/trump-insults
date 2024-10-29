const btn = document.querySelector("#generate-tweet");
const nameInput = document.querySelector("#name-input");
const tweetList = document.querySelector(".tweet-list");

nameInput.addEventListener("focusout", updateName);

const genderMap = {
   "(he)" : ["he", "she", "they"],
   "(He)" : ["He", "She", "They"],
   "(HE)" : ["HE", "SHE", "THEY"],
   "(his)" : ["his", "her", "their"],
   "(His)" : ["His", "Her", "Their"],
   "(HIS)" : ["HIS", "HER", "THEIR"],
   "(him)" : ["him", "her", "them"],
   "(Him)" : ["Him", "Her", "Them"],
   "(HIM)" : ["HIM", "HER", "THEM"],
   "(is)" : ["is", "is", "are"],
   "(Is)" : ["Is", "Is", "Are"],
   "(IS)" : ["IS", "IS", "ARE"],
   "(was)" : ["was", "was", "were"],
   "(Was)" : ["Was", "Was", "Were"],
   "(WAS)" : ["WAS", "WAS", "WERE"],
   "(has)" : ["has", "has", "have"],
   "(Has)" : ["Has", "Has", "Have"],
   "(HAS)" : ["HAS", "HAS", "HAVE"],
   "(doesn't)" : ["doesn't", "doesn't", "don't"],
   "(does)" : ["does", "does", "do"],
   "(knows)" : ["knows", "knows", "know"],
   "(himself)" : ["himself", "herself", "themself"],
   "(Himself)" : ["Himself", "Herself", "Themself"],
   "(HIMSELF)" : ["HIMSELF", "HERSELF", "THEMSELF"],
   "(man)" : ["man", "woman", "person"]
}
// probably a better way to do this but oh well

var handle;
var prevName;

btn.addEventListener("click", generateTweet);

function updateName() {
   let name = toTitleCase(nameInput.value);

   if (name === prevName) return;

   handle = generateHandle(name);

   prevName = name;
}
function generateHandle(name) {
   name = name.split(" ");
   var firstName = name[0];
   var lastName = name[1] || "";
   console.log(firstName);

   if (Math.random() < 0.15) {
      firstName = firstName.split("")[0];
   }
   else if (Math.random() < 0.5) {
      firstName = firstName.toLowerCase();
   }

   if (Math.random() < 0.1) {
      lastName = lastName.split("")[0];
   }
   else if (Math.random() < 0.5) {
      lastName = lastName.toLowerCase();
   }

   var num = Math.floor(Math.random() * 99).toString().padStart(2, "0");

   var template = randItem(handles);
   handle = template.replace("[first]", firstName).replace("[last]", lastName).replace("[num]", num);
   handle = `.@${handle}`
   return handle;
}

const randBetween = (lo, hi) => Math.floor(Math.random() * (hi - lo)) + lo;
const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const toTitleCase = (str) => str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());

function generateTweet() {
   let name = toTitleCase(nameInput.value);

   let firstName = name.split(" ")[0];

   var changedName;

   if (Math.random() < 0.35) {
      changedName = `<span class="mention">${handle}</span>`;
   }
   else {
      changedName = `${randItem(epithets)} ${name}`;
   }

   let phrase = randItem(phrases);
   var message = phrase.replace("[NAME]", changedName);

   let gender = getGender(firstName);

   for (let [key, value] of Object.entries(genderMap)) {
      message = message.replaceAll(key, value[gender])
   }

   numComments = randBetween(10, 999);
   numLikes = randBetween(10, 999);
   numViews = randBetween(10, 999);
   numRetweets = randBetween(10, 999);

   var tweetTemplate = `<img class="tweet-avatar" src="./assets/trump_pfp.jpg" alt="Donald Trump's Twitter Avatar">
         <div class="tweet-content">
            <header>
               <span class="author-name">Donald J. Trump</span>
               <img class="checkmark" src="./assets/verified.png" alt="">
               <span class="author-handle">@realDonaldTrump</span>
               <span class="time">1m</span>
            </header>
            <p class="tweet-body">${message}</p>
            <footer>
               <ul class="tweet-options">
                  <li class="comment">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                     </svg>
                     <span>${numComments}</span>
                  </li>
                  <li class="retweet">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                      </svg>
                      <span>${numRetweets}</span>
                  </li>
                  <li class="like">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                     </svg> 
                     <span>${numLikes}</span>
                  </li>
                  <li class="views">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                     </svg>
                     <span>${numViews}</span>
                  </li>
               </ul>
            </footer>
         </div>`
   var tweet = document.createElement("article");
   tweet.classList.add("tweet");
   tweet.innerHTML = tweetTemplate;
   tweetList.prepend(tweet);

   document.querySelectorAll(".like").forEach(likeBtn => likeBtn.onclick = addLike);

   setInterval(function() {
      updateTime(tweet)
   }, 60 * 1000);
}

function addLike(e) {
   var likeButton = e.currentTarget;
   var display = likeButton.querySelector("span");

   if (likeButton.classList.contains("liked")) {
      likeButton.classList.remove("liked");
      display.innerHTML = parseInt(display.innerHTML) - 1;
   }
   else {
      likeButton.classList.add("liked");
      display.innerHTML = parseInt(display.innerHTML) + 1;
   }
}
function updateTime(tweet) {
   var timeElem = tweet.querySelector(".time");
   let time = parseInt(timeElem.textContent.replace("m","")) + 1;
   timeElem.textContent = time + "m";
}
function getGender(name) {
   name = name.toLowerCase();

   var probMale = (maleNames[name] || {"count" : 0}).count;
   var probFemale = (femaleNames[name] || {"count" : 0}).count;

   if (probMale > probFemale) {
      return 0; // Male
   }
   else if (probFemale > probMale) {
      return 1; // Female
   }
   // I pray no names have the same probability
   else {
      return 2; // what on earth??
   }
}

// const reader = new FileReader();
// reader.onload = function(e) {
//    const content = e.target.result;
//    console.log(content);
// };
// reader.readAsText(file);