// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Tab
// Code for tab type in Handy Clicks extension
// Highlights tabs (and saves highlighted tabs between sessions)
// (c) Infocatcher 2010, 2014
// version 0.1.1 - 2014-02-04

// Code:
if(item.hasAttribute("handyclicks-tab-colorize"))
	item.removeAttribute("handyclicks-tab-colorize");
else
	item.setAttribute("handyclicks-tab-colorize", "green");

// Initialization:
var cssStr = '\
	@-moz-document url("' + document.documentURI + '") {\n\
		.tabbrowser-tab[handyclicks-tab-colorize="green"] {\n\
			background: #dfffdf !important;\n\
		}\n\
		.tabbrowser-tab[handyclicks-tab-colorize="green"]:hover {\n\
			background: #d5ffd5 !important;\n\
		}\n\
		.tabbrowser-tab[handyclicks-tab-colorize="green"][selected="true"] {\n\
			background: #d5ffd5 !important;\n\
		}\n\
		.tabbrowser-tab[handyclicks-tab-colorize="green"][selected="true"]:hover {\n\
			background: #caffca !important;\n\
		}\n\
		.tabbrowser-tab[handyclicks-tab-colorize="green"] * {\n\
			background: transparent !important;\n\
		}\n\
		/* chrome://multipletab/skin/multipletab.css */\n\
		:root[multipletab-selection-style="color"] .tabbrowser-tab[multiselected="true"] .tab-text,\n\
		:root[multipletab-selection-style="color"] .tabbrowser-tab[multiselected="true"] > .tab-image-left,\n\
		:root[multipletab-selection-style="color"] .tabbrowser-tab[multiselected="true"] > .tab-image-middle,\n\
		:root[multipletab-selection-style="color"] .tabbrowser-tab[multiselected="true"] > .tab-image-middle + .tab-close-button,\n\
		:root[multipletab-selection-style="color"] .tabbrowser-tab[multiselected="true"] > .tab-image-right,\n\
		:root[multipletab-selection-style="color"] .tabbrowser-tab[multiselected="true"] .tab-content {\n\
			background-color: Highlight !important;\n\
			color: HighlightText !important;\n\
		}\n\
	}';
// chrome://global/content/contentAreaUtils.js
var cssURI = makeURI("data:text/css," + encodeURIComponent(cssStr));
function setSheet(cssURI, addFlag) {
	var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
		.getService(Components.interfaces.nsIStyleSheetService);
	if(addFlag == sss.sheetRegistered(cssURI, sss.USER_SHEET))
		return;
	if(addFlag)
		sss.loadAndRegisterSheet(cssURI, sss.USER_SHEET);
	else
		sss.unregisterSheet(cssURI, sss.USER_SHEET);
}
setSheet(cssURI, true);

setTimeout(function() {
	var ss = Components.classes["@mozilla.org/browser/sessionstore;1"]
		|| Components.classes["@mozilla.org/suite/sessionstore;1"];
	ss && ss.getService(Components.interfaces.nsISessionStore)
		.persistTabAttribute("handyclicks-tab-colorize");
}, 100);

this.ps.registerDestructor(function(reason) {
	setSheet(cssURI, false);
}, this, this.ps.DESTROY_REBUILD);