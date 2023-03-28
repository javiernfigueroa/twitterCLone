import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const tweetInput = document.getElementById("tweet-input");
const feed = document.getElementById("feed");

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.dataset.retweet) {
    handleRtClick(e.target.dataset.retweet);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  renderTweets();
}

function handleRtClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  renderTweets();
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleTweetBtnClick() {
  tweetsData.unshift({
    handle: `@javier_figueroa 💎`,
        profilePic: `images/javier.jpeg`,
        likes: 0,
        retweets: 0,
        tweetText: `${tweetInput.value}`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
  })
  renderTweets()
}

function getFeedHtml() {
  let feedHtml = "";

  tweetsData.forEach(function (tweets) {
    let likeIconClass = "";
    if (tweets.isLiked) {
      likeIconClass = "liked";
    }
    let retweetIconClass = "";
    if (tweets.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";

    if (tweets.replies.length > 0) {
      tweets.replies.forEach(function (reply) {
        repliesHtml += `
        <div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`;
      });
    }

    feedHtml += `<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweets.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweets.handle}</p>
            <p class="tweet-text">${tweets.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweets.uuid}"></i>           
                ${tweets.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweets.uuid}"></i>
                ${tweets.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweets.uuid}"></i>
                ${tweets.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweets.uuid}">
        ${repliesHtml}
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
