// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Link
// Code for link-like types in Handy Clicks extension
// Calls built-in "Save Link As…" from page context menu
// (c) Infocatcher 2015
// version 0.1.1 - 2015-08-19

var _this = this;
window.addEventListener("popupshowing", function onPopupShowing(e) {
	window.removeEventListener(e.type, onPopupShowing, true);
	var cm = e.target;
	cm.collapsed = true;
	setTimeout(function() { // Wait for menu initialization
		_this.ui.blinkNode();
		cm.addEventListener("popuphiding", function onPopupHiding(e) {
			cm.removeEventListener(e.type, onPopupHiding, true);
			cm.collapsed = false;
		}, true);
		var mi = document.getElementById("context-savelink"); // Or id of any other menu item
		mi.doCommand();
	}, 0);
}, true);
this.showContextMenu();