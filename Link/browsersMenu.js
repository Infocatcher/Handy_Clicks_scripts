// https://github.com/Infocatcher/Handy_Clicks_scripts/tree/master/Link
// Code for link-like types in Handy Clicks extension
// Shows menu to open link in other browser (example)
// (c) Infocatcher 2009-2010, 2014
// version 0.1.1 - 2014-02-03

var items = [
	{ tagName: "menuitem", attr_label: "Opera", prop_hc_path: "%ProgF%\\Opera\\opera.exe" },
	{
		tagName: "menu",
		attr_label: "Opera",
		childNodes: [{
			tagName: "menupopup",
			childNodes: [
				{ tagName: "menuitem", attr_label: "Opera 12.0x", prop_hc_path: "%ProgF%\\Opera 12.0x\\opera.exe" },
				{ tagName: "menuitem", attr_label: "Opera 11.6x", prop_hc_path: "%ProgF%\\Opera 11.6x\\opera.exe" },
				{ tagName: "menuitem", attr_label: "Opera 11.5x", prop_hc_path: "%ProgF%\\Opera 11.5x\\opera.exe" },
				{ tagName: "menuitem", attr_label: "Opera 11.1x", prop_hc_path: "%ProgF%\\Opera 11.1x\\opera.exe" },
				{ tagName: "menuitem", attr_label: "Opera 11.0x", prop_hc_path: "%ProgF%\\Opera 11.0x\\opera.exe" }
			]
		}]
	},
	{ tagName: "menuseparator" },
	{ tagName: "menuitem", attr_label: "Internet Explorer", prop_hc_path: "%ProgF%\\Internet Explorer\\iexplore.exe" },
	{ tagName: "menuitem", attr_label: "Google Chrome", prop_hc_path: "%LocalAppData%\\Google\\Chrome\\Application\\chrome.exe" },
	{ tagName: "menuitem", attr_label: "Seamonkey", prop_hc_path: "%ProgF%\\SeaMonkey\\seamonkey.exe" },
	{ tagName: "menuseparator" },
	{ tagName: "menuitem", attr_label: "Firefox nightly", prop_hc_path: "D:\\Firefox\\Nightly\\firefox.exe", prop_hc_args: ["-no-remote", "-p", "fx4.2", "-purgecaches"] },
	{ tagName: "menuitem", attr_label: "Firefox current - test", prop_hc_path: "%ProgF%\\Mozilla Firefox\\firefox.exe", prop_hc_args: ["-no-remote", "-p", "fx4.0", "-purgecaches"] },
	{
		tagName: "menu",
		attr_label: "Firefox test",
		childNodes: [{
			tagName: "menupopup",
			childNodes: [
				{ tagName: "menuitem", attr_label: "Firefox 3.6 - test", prop_hc_path: "%ProgF%\\Mozilla Firefox 3.6.x\\firefox.exe", prop_hc_args: ["-no-remote", "-p", "fx3.6"] },
				{ tagName: "menuitem", attr_label: "Firefox 3.5 - test", prop_hc_path: "%ProgF%\\Mozilla Firefox 3.5.x\\firefox.exe", prop_hc_args: ["-no-remote", "-p", "fx3.5"] },
				{ tagName: "menuitem", attr_label: "Firefox 3.0 - test", prop_hc_path: "%ProgF%\\Mozilla Firefox 3.0.x\\firefox.exe", prop_hc_args: ["-no-remote", "-p", "fx3.0"] },
				{ tagName: "menuitem", attr_label: "Firefox 2.0 - test", prop_hc_path: "%ProgF%\\Mozilla Firefox 2.0.0.20\\firefox.exe", prop_hc_args: ["-no-remote", "-p", "fx2.0"] }
			]
		}]
	},
	{ tagName: "menuseparator" },
	{ tagName: "menuitem", attr_label: "Opera portable", prop_hc_path: "%ProfD%\\..\\..\\..\\Opera\\Opera.exe" },
	{ tagName: "menuitem", attr_label: "Google Chrome portable", prop_hc_path: "%ProfD%\\..\\..\\..\\GoogleChromePortable\\GoogleChromePortable.exe" },
	{ tagName: "menuitem", attr_label: "Safari portable", prop_hc_path: "%ProfD%\\..\\..\\..\\SafariPortable\\SafariPortable.exe" }
];
this.showOpenURIWithAppsPopup(items, true /* check paths */);