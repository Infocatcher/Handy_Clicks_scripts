// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Link
// Code for link-like types in Handy Clicks extension
// Shows menu to copy link URI and/or text in various formats
// (c) Infocatcher 2009-2014, 2019
// version 0.1.2.2 - 2019-01-24

var _this = this;
function _localize(sid) {
	var strings = {
		en: {
			copyLink: "Copy link",
			copyLinkKey: "l",
			copyText: "Copy text",
			copyTextKey: "t",
			copyBB: "Copy as BB-code",
			copyBBKey: "B",
			copyHTML: "Copy as HTML",
			copyHTMLKey: "H"
		},
		ru: {
			copyLink: "Копировать ссылку",
			copyLinkKey: "с",
			copyText: "Копировать текст",
			copyTextKey: "т",
			copyBB: "Копировать в формате BB-code",
			copyBBKey: "B",
			copyHTML: "Копировать в формате HTML",
			copyHTMLKey: "H"
		}
	};
	var locale = (function() {
		if(!_this.pu.getPref("intl.locale.matchOS")) {
			var locale = _this.pu.getPref("general.useragent.locale");
			if(locale && locale.substr(0, 9) != "chrome://")
				return locale;
		}
		return _this.ut.xcr.getSelectedLocale("global");
	})().match(/^[a-z]*/)[0];
	_localize = function(sid) {
		return strings[locale] && strings[locale][sid] || strings.en[sid] || sid;
	};
	return _localize.apply(this, arguments);
}

var uris = Array.concat(this.getItemURI())
	.map(this.decodeURI || this.losslessDecodeURI, this);
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
var lb = this.ut.lineBreak || this.io.lineBreak;
var sourceDoc = this.getSourceDocument();
var items = this.ut.parseXULFromString('\
	<menupopup xmlns="' + this.ut.XULNS + '">\
		<menuitem\
			label="' + _localize("copyLink") + '"\
			accesskey="' + _localize("copyLinkKey") + '"\
			tooltiptext="' + this.ut.encodeHTML(uris.join(lb), true, true) + '" />\
		<menuitem\
			label="' + _localize("copyText") + '"\
			accesskey="' + _localize("copyTextKey") + '"\
			tooltiptext="' + this.ut.encodeHTML(texts.join(lb), true, true) + '" />\
		<menuseparator />\
		<menuitem\
			label="' + _localize("copyBB") + '"\
			accesskey="' + _localize("copyBBKey") + '"\
			tooltiptext="' + this.ut.encodeHTML(bbs.join(lb), true, true) + '" />\
		<menuitem\
			label="' + _localize("copyHTML") + '"\
			accesskey="' + _localize("copyHTMLKey") + '"\
			tooltiptext="' + this.ut.encodeHTML(htmls.join(lb), true, true) + '" />\
	</menupopup>'
);
this.addEditItem(items);
var popup = this.showGeneratedPopup(items);
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