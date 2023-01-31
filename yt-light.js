/*
 * Light YouTube Embeds by @labnol
 * Credit: https://www.labnol.org/
 * Title from YT oauth by @kmhelander 
 */

function labnolIframe(div) {
  var iframe = document.createElement('iframe');
  iframe.setAttribute(
    'src',
    'https://www.youtube-nocookie.com/embed/' + div.dataset.id + '?autoplay=1&rel=0'  // No Cookie URL...
  );
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '1');
  iframe.setAttribute(
    'allow',
    'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
  );
  div.parentNode.replaceChild(iframe, div);
}

function initYouTubeVideos() {
  var playerElements = document.getElementsByClassName('youtube-player');
  for (var n = 0; n < playerElements.length; n++) {
    var videoId = playerElements[n].dataset.id;

    let ytDataUrl = 'https://www.youtube-nocookie.com/oembed?format=json&url=http%3A//youtube.com/watch%3Fv%3D' + videoId;
    
    // fetch() is async, each player on page must have unique ID
    let thisPlayerId = "playerid-" + n.toString();

    // Fetch the JSON from Youtube and write the video title in TextNode element
    fetch(ytDataUrl)
    .then(res => res.json())
    .then(out =>
    document.getElementById(thisPlayerId).innerHTML = out.title.substr(0,40))
    .catch(err => { console.log(err) });

    // get the poster image in a IMG element
    var div = document.createElement('div');
    div.setAttribute('data-id', videoId);
    var thumbNode = document.createElement('img');
    thumbNode.src = '//i.ytimg.com/vi/ID/hqdefault.jpg'.replace(
      'ID',
      videoId
    ); 
    div.appendChild(thumbNode);

    // Create TextNode for title with class videotitle
    var videoTitle = document.createElement('div');
    var titleNode = document.createTextNode('');
    videoTitle.setAttribute('class', 'videotitle');
    videoTitle.setAttribute('id', thisPlayerId);
    videoTitle.appendChild(titleNode);
    div.appendChild(videoTitle);

    // Create the play button overlay on poster image
    var playButton = document.createElement('div');
    playButton.setAttribute('class', 'play');
    div.appendChild(playButton);
    div.onclick = function () {
      labnolIframe(this);
    };
    playerElements[n].appendChild(div);
  }
}

document.addEventListener('DOMContentLoaded', initYouTubeVideos);
