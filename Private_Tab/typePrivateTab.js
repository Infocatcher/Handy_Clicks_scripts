// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Private_Tab
// Custom type for Handy Clicks extension
// Detects private tabs from Private Tab extension
// (c) Infocatcher 2019
// version 0.1.0 - 2019-01-23

return "privateTab" in window
	&& (item = this.hc.getTab(item))
	&& privateTab.isTabPrivate(item)
	&& item
	|| null;