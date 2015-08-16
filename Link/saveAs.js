// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Link
// Code for link-like types in Handy Clicks extension
// Calls built-in "Save Link As…" from page context menu
// (c) Infocatcher 2015
// version 0.1.0 - 2015-08-16

var _this = this;
window.addEventListener("popupshowing", function onPopup(e) {
	window.removeEventListener(e.type, onPopup, true);
	var cm = e.target;
	cm.collapsed = true;
	setTimeout(function() { // Wait for menu initialization
		setTimeout(function() {
			cm.hidePopup();
			cm.collapsed = false;
		}, 0);
		_this.ui.blinkNode();
		var mi = document.getElementById("context-savelink"); // Or id of any other menu item
		mi.doCommand();
	}, 0);
}, true);
this.showContextMenu();