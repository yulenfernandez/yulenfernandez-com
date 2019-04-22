"use strict";

window.addEventListener('DOMContentLoaded', function() {

	var dLinks = document.getElementById('js-links');
	var dFooter = document.getElementById('js-footer');
	var dSiteContent = document.getElementById('js-siteContent');

	if (dFooter.offsetTop - dLinks.offsetTop < 30) {
		dSiteContent.classList.add('o-site-content--fixed');
	} else {
		dSiteContent.classList.remove('o-site-content--fixed');
	}

});
