import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input");
const tweetBtn = document.getElementById("tweet-btn");
const feed = document.getElementById("feed");

tweetBtn.addEventListener("click", function () {
  console.log(tweetInput.value);
});

function getFeedHtml() {
  let feedHtml = "";
  tweetsData.forEach(function (tweets) {
    feedHtml += `<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweets.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweets.handle}</p>
            <p class="tweet-text">${tweets.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots"></i>           
                ${tweets.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart"></i>
                ${tweets.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet"></i>
                ${tweets.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
`;
  });
  return feedHtml;
}

function renderTweets() {
  feed.innerHTML = getFeedHtml();
}

renderTweets();
