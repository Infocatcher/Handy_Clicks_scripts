// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Text_field
// Custom type for Handy Clicks extension
// Detects input fields (and also WYSIWYG editors)
// (c) Infocatcher 2009, 2014, 2019
// version 0.1.2 - 2019-01-23

if(this.ut.isChromeDoc(item.ownerDocument))
	return null;
if(item.ownerDocument.documentElement.namespaceURI == this.ut.XULNS)
	for(var tb = item; tb; tb = tb.parentNode)
		if(tb.namespaceURI == this.ut.XULNS && tb.localName == "textbox")
			return tb;
for(; item; item = item.parentNode) {
	if(item instanceof HTMLInputElement || item instanceof HTMLTextAreaElement) {
		try {
			if(typeof item.selectionStart == "number")
				return item;
		}
		catch(e) {
		}
		return null;
	}
	if(item.contentEditable == "true")
		return item;
}
return null;