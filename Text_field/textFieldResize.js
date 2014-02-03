// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Text_field
// Code for "text field" custom type in Handy Clicks extension
// Resizes any text field (even if resizing is somehow forbidden)
// (c) Infocatcher 2009-2014
// version 0.2.0 - 2014-02-03

var force = true;
var ta = item;
var e = event;
var win = ta.ownerDocument.defaultView;

function init() {
	init = function() {};
	resize.ta = ta;
	resize.pageX = e.pageX || e.screenX;
	resize.pageY = e.pageY || e.screenY;
	resize.w = getStyle("width");
	resize.h = getStyle("height");
	resize.rc = getOffset(ta);
	resize.noY = ta.localName.toLowerCase() == "input";
}
var resize = function _rs(e) {
	init();
	var rc = getOffset(ta);
	var dx = (e.pageX || e.screenX) - _rs.pageX + _rs.rc.left - rc.left;
	var w = mm(_rs.w + dx) + "px";
	var s = _rs.ta.style;
	if("transition" in s)
		s.setProperty("transition", "none", "important");
	else if("MozTransition" in s)
		s.setProperty("MozTransition", "none", "important");
	setStyle(s, "width", w);
	if(_rs.noY)
		return;
	var dy = (e.pageY || e.screenY) - _rs.pageY + _rs.rc.top - rc.top;
	var h = mm(_rs.h + dy) + "px";
	setStyle(s, "height", h);
}
function mm(n) {
	return Math.max(20, Math.min(Infinity, n));
}
function setStyle(style, prop, val) {
	style.setProperty(prop, val, "important");
	if(force) {
		style.setProperty("min-" + prop, val, "important");
		style.setProperty("max-" + prop, val, "important");
	}
}
function getStyle(prop) {
	return parseInt(win.getComputedStyle(ta, "")[prop]);
}
function getOffset(node) { // Based on code from http://javascript.ru/ui/offset
	if(node.getBoundingClientRect)
		return getOffsetRect(node);
	return getOffsetSum(node);
}
function getOffsetSum(node) { // Based on code from http://javascript.ru/ui/offset
	var top  = 0;
	var left = 0;
	for(; node; node = node.offsetParent) {
		top  += parseInt(node.offsetTop);
		left += parseInt(node.offsetLeft);
	}
	return {
		top:  top,
		left: left
	};
}
function getOffsetRect(node) { // Based on code from http://javascript.ru/ui/offset
	var doc = node.ownerDocument;
	var win = doc.defaultView;
	var box = node.getBoundingClientRect();
	var de = doc.documentElement;
	var b = doc.body || de;
	var scrollTop  = win.pageYOffset || de.scrollTop  || b.scrollTop;
	var scrollLeft = win.pageXOffset || de.scrollLeft || b.scrollLeft;
	var clientTop  = de.clientTop  || b.clientTop  || 0;
	var clientLeft = de.clientLeft || b.clientLeft || 0;
	var top  = box.top  + scrollTop  - clientTop;
	var left = box.left + scrollLeft - clientLeft;
	return {
		top:  Math.round(top),
		left: Math.round(left)
	};
}

window.addEventListener("mousemove", resize, true);
window.addEventListener("mouseup", function stopResize(e) {
	window.removeEventListener(e.type, stopResize, true);
	window.removeEventListener("mousemove", resize, true);
}, true);