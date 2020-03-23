var pttkey;
var down;

chrome.extension.sendMessage({method: "getStatus"}, function(response) {
	pttkey = response.status;
	console.log("Push to talk loaded with key: '" + response.status + "'");
});

var mouseup = document.createEvent("MouseEvents");
var mousedown = document.createEvent("MouseEvents");

mouseup.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
mousedown.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

function press(button) {
  button.dispatchEvent(mousedown);
	button.dispatchEvent(mouseup);
	// Prevent space from now triggering a click on the button
	button.blur();
}

function microphoneButton() {
  target = document.querySelector('div[role="button"][data-is-muted]');
	if (! target) {
		console.log("PTT: Cannot find microphone button");
	}
	return target;
}

window.onkeydown = function(e) {
	if(e.key == pttkey && ! e.target.matches('textarea, input[type="text"], div[role="button"') && !down) {
		down = true;

		var button = microphoneButton();

		if (button && button.dataset["isMuted"] == "true") {
			press(button);
		}
	}
};

window.onkeyup = function(e) {
	if(e.key == pttkey && ! e.target.matches('textarea, input[type="text"], div[role="button"')) {
		down = false;

		var button = microphoneButton();

		if (button && button.dataset["isMuted"] == "false") {
			press(button);
		}
	}
};