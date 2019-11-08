"use strict";

//determines if the user has a set theme
//Source: https://stackoverflow.com/questions/56300132/how-to-over-ride-css-prefers-color-scheme-setting
let sTheme = "light"; //default to light

//local storage is used to override OS theme settings
if (localStorage.getItem("theme")) {
	if (localStorage.getItem("theme") == "dark") {
		sTheme = "dark";
	}
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	//OS theme setting detected as dark
	sTheme = "dark";
}

//dark theme preferred, set document with a `data-theme` attribute
if (sTheme == "dark") {
	document.documentElement.setAttribute("data-theme", "dark");
}