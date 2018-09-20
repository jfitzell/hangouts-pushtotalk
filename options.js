enterkey = document.getElementById("enterkey");

function save_options() {
  var key = pressedkey;
  localStorage["ptt_key"] = key;
  document.querySelector('#status').innerText = "Key saved.";
}

function restore_options() {
  chrome.extension.sendMessage({method: "getStatus"}, function(response) {
	enterkey.value = response.status;
  });
}

enterkey.addEventListener("keydown",function(e){
  enterkey.value = pressedkey = e.key;
  e.preventDefault(); //Stop char entry showing
}, false);



document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelector('#save').addEventListener("click", function(){
    save_options();
  });

  restore_options();
});
