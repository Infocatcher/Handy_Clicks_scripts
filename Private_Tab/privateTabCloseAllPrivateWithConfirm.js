// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Private_Tab
// Code for "Private Tab" custom type in Handy Clicks extension
// Closes all private tabs and windows (with confirmation)
// (c) Infocatcher 2019
// version 0.1.0 - 2019-01-23

var toClose = {
	wins: [],
	tabs: [],
	tabsCount: 0
};

var ws = this.wu.wm.getEnumerator(this.ut.isSeaMonkey ? null : "navigator:browser");
while(ws.hasMoreElements()) {
	var w = ws.getNext();
	if(!("handyClicks" in w))
		continue;
	if(PrivateBrowsingUtils.isWindowPrivate(w)) {
		toClose.tabsCount += w.gBrowser.tabs.length;
		toClose.wins.push(w);
		continue;
	}
	var tabs = w.gBrowser.tabs;
	for(var i = tabs.length - 1; i >=0; --i) {
		var tab = tabs[i];
		if(privateTab.isTabPrivate(tab))
			toClose.tabs.push(tab);
	}
	toClose.tabsCount += toClose.tabs.length;
}

if(!toClose.tabsCount || !this.fn.warnAboutClosingTabs(toClose.tabsCount))
	return;

toClose.wins.forEach(function(w) {
	w.close();
});
toClose.tabs.forEach(function(tab) {
	var w = tab.ownerDocument.defaultView;
	w.gBrowser.removeTab(tab);
});