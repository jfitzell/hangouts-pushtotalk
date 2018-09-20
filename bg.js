chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
    if (request.method == "getStatus") {
      if (localStorage['ptt_key'] == undefined)
        localStorage['ptt_key'] = ' ';

      sendResponse({status: localStorage['ptt_key']});
    }
    else
      sendResponse({}); // snub them.
});