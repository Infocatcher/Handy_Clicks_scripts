// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Link
// Code for link-like types in Handy Clicks extension
// Shows menu to copy link URI and/or text in various formats
// (c) Infocatcher 2009-2013
// version 0.1.1 - 2013-04-29

var uris = Array.concat(this.getItemURI())
	.map(this.losslessDecodeURI, this);
var texts = Array.concat(this.getItemText()).map(function(s, indx) {
	return s || uris[indx];
});
var bbs = uris.map(function(uri, indx) {
	return "[url=" + uri + "]" + texts[indx] + "[/url]";
});
var htmls = uris.map(function(uri, indx) {
	return '<a href="' + this.ut.encodeHTML(uri) + '">'
		+ this.ut.encodeHTML(texts[indx], false)
		+ '</a>';
}, this);
var lb = this.ut.lineBreak;
var sourceDoc = this.getSourceDocument();
var items = this.ut.parseXULFromString('\
	<menupopup xmlns="' + this.ut.XULNS + '">\
		<menuitem label="Копировать ссылку" tooltiptext="' + this.ut.encodeHTML(uris.join(lb), true, true) + '" />\
		<menuitem label="Копировать текст" tooltiptext="' + this.ut.encodeHTML(texts.join(lb), true, true) + '" />\
		<menuseparator />\
		<menuitem label="Копировать в формате BB-code" tooltiptext="' + this.ut.encodeHTML(bbs.join(lb), true, true) + '" />\
		<menuitem label="Копировать в формате HTML" tooltiptext="' + this.ut.encodeHTML(htmls.join(lb), true, true) + '" />\
	</menupopup>'
);
this.addEditItem(items);
var popup = this.showGeneratedPopup(items);
var _this = this;
popup.copyStr = function(e) {
	var tt = e.target.getAttribute("tooltiptext");
	tt && _this.ut.copyStr(tt, sourceDoc);
};
popup.setAttribute("oncommand", "this.copyStr(event);");
popup.onclick = function(e) {
	if(e.button != 2)
		return;
	var tt = e.target.getAttribute("tooltiptext");
	if(!tt)
		return;
	var clip = readFromClipboard();
	_this.ut.copyStr((clip ? clip + lb : "") + tt, sourceDoc);
	_this.ut.closeMenus(this);
};