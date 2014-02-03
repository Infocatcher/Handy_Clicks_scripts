// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Text_field
// Custom type for Handy Clicks extension
// Detects input fields (and also WYSIWYG editors)
// (c) Infocatcher 2009, 2014
// version 0.1.1 - 2014-02-03

if(this.ut.isChromeDoc(item.ownerDocument))
	return null;
if(item.namespaceURI == this.ut.XULNS && item.localName == "textbox")
	item = item.inputField || item.wrappedJSObject && item.wrappedJSObject.inputField;
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