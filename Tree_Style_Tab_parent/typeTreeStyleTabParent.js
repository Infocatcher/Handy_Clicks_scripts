// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Tree_Style_Tab_parent
// Custom type for Handy Clicks extension
// Detects parent tabs from Tree Style Tab extension
// (c) Infocatcher 2019
// version 0.1.0 - 2019-01-23

return "TreeStyleTabService" in window
	&& (item = this.hc.getTab(item))
	&& TreeStyleTabService.hasChildTabs(item)
	&& item
	|| null;