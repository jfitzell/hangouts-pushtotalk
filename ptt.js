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

window.onkeydown = function(e) {
	if(e.key == pttkey && ! e.target.matches('textarea, input[type="text"]') && !down) {
		down = true;
		var targetbutton;

		targetbutton = document.querySelector('div[role="button"][data-is-muted="true"]');
		if (! targetbutton) {
			console.log("PTT: Cannot find unmute button");
		}

		if (targetbutton) {
			targetbutton.dispatchEvent(mousedown);
			targetbutton.dispatchEvent(mouseup);
			// Prevent space from now triggering a click on the button
			targetbutton.blur();
		}
	}
};

window.onkeyup = function(e) {
	if(e.key == pttkey && ! e.target.matches('textarea, input[type="text"]')) {
		down = false;
		var targetbutton;

		targetbutton = document.querySelector('div[role="button"][data-is-muted="false"]');
		if (! targetbutton) {
			console.log("PTT: Cannot find mute button");
		}

		if (targetbutton) {
			targetbutton.dispatchEvent(mousedown);
			targetbutton.dispatchEvent(mouseup);
			// Prevent space from now triggering a click on the button
			targetbutton.blur();
		}
	}
};