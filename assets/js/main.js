'use strict';

let sCurrentPage = document.body.getAttribute('data-current-page');

/**
 * Check if content overlap and so add class to modify display  
 */
function rwdClassAdd(sElement1, sElement2, sOrientation , iGap, sTargetElement, sClassToAdd) {
	let dElement1 = document.getElementById(sElement1);
	let dElement2 = document.getElementById(sElement2);
	let dTargetElement = document.getElementById(sTargetElement);

	switch (sOrientation) {
		case 'horizontal':
			if (dElement2.getBoundingClientRect().left - dElement1.getBoundingClientRect().left < iGap) {
				dTargetElement.classList.add(sClassToAdd);
			}
			break;
		
		case 'vertical':
			if (dElement2.getBoundingClientRect().top - dElement1.getBoundingClientRect().top < iGap) {
				dTargetElement.classList.add(sClassToAdd);
			}
			break;

		default:
			console.log('function rwdClassAdd error: bad orientation value, must be "horizontal" or "vertical".');
			break;
	}
}



/**
 * Display the needed page
 */
function fnPageHandler(sTargetPageName) {
	let dPages = document.querySelectorAll('.js-page');
	let dTargetPage = document.querySelector('.js-page[page="' + sTargetPageName + '"]');

	for (let i=0; i != dPages.length; i++) {
		dPages[i].classList.add('u-display-none');
	}

	dTargetPage.classList.remove('u-display-none');
}



/**
 * Manage theme switcher
 */
function fnThemeSwitch(sTargetThemeValue) {

	document.documentElement.setAttribute('data-theme', sTargetThemeValue);

	let dActiveSwitchLinks = document.querySelectorAll('.js-themeSwitch.is-active');
	for (let i=0; i != dActiveSwitchLinks.length; i++ ) {
		dActiveSwitchLinks[i].classList.remove('is-active');
	}

	let dTargetSwitchLinks = document.querySelectorAll('.js-themeSwitch[themeValue="' + sTargetThemeValue + '"]');
	for (let i=0; i != dTargetSwitchLinks.length; i++ ) {
		dTargetSwitchLinks[i].classList.add('is-active');
	}
}



/**
 * Empty all inputs (except the input with "submit" type) and textareas
 */
function fnClearForm() {
	let dFields = document.querySelectorAll('input:not([type="submit"]), textarea');

	for(let i=0; i!= dFields.length; i++) {
		dFields[i].value='';
	}
}



/**
 * Manage form submit
 */
$('#js-form').submit(function(e) {
	e.preventDefault();

	let $form = $(this);
	let formData = $form.serialize();
	let dFormSubmitBtn = $('#js-formSubmitBtn');
	let dFormSendingMsg = $('#js-formSendingMsg');
	let dFormSuccessMsg = $('#js-formSuccessMsg');
	let dFormFailureMsg = $('#js-formFailureMsg');

	dFormSubmitBtn.removeClass('is-active');
	dFormSendingMsg.removeClass('u-display-none');
	
	$.ajax({
		type: 'POST',
		url: $form.attr('action'),
		data: formData
	})
	.done(function(response) {
		fnClearForm();
		dFormSubmitBtn.addClass('is-active');
		dFormSendingMsg.addClass('u-display-none');
		dFormSuccessMsg.removeClass('u-display-none');
		setTimeout(function() {
			dFormSuccessMsg.addClass('u-display-none');
		}, 5000);
	})
	.fail(function(data) {
		fnClearForm();
		dFormSubmitBtn.addClass('is-active');
		dFormSendingMsg.addClass('u-display-none');
		dFormFailureMsg.removeClass('u-display-none');
		setTimeout(function() {
			dFormFailureMsg.addClass('u-display-none');
		}, 5000);
	});
});	


window.addEventListener('DOMContentLoaded', function() {

	// Set active element on theme switcher depending on user's preferences
	let dDarkThemeSwitches = document.querySelectorAll('.js-themeSwitch[themeValue="dark"]');
	let dLightThemeSwitches = document.querySelectorAll('.js-themeSwitch[themeValue="light"]');

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		for (let i = 0; i != dDarkThemeSwitches.length; i++) {
			dDarkThemeSwitches[i].classList.add('is-active');
		}
	} else {
		for (let i = 0; i != dLightThemeSwitches.length; i++) {
			dLightThemeSwitches[i].classList.add('is-active');
		}
	}

	// Only if we are on home page
	if (sCurrentPage == 'home') {

		let dPageLinks = document.querySelectorAll('.js-pageLink');
		for (let i = 0; i != dPageLinks.length; i++) {
			dPageLinks[i].addEventListener('click', function () {
				fnPageHandler(this.getAttribute('targetPage'));
			});
		}

		let dThemeSwitchs = document.querySelectorAll('.js-themeSwitch');
		for (let i = 0; i != dThemeSwitchs.length; i++) {
			dThemeSwitchs[i].addEventListener('click', function () {
				fnThemeSwitch(this.getAttribute('themeValue'));
			});
		}


		// Come back to home page if Escape key is pressed.
		// Source: https://medium.com/@uistephen/keyboardevent-key-for-cross-browser-key-press-check-61dbad0a067a
		document.addEventListener('keyup', function (event) {
			if (event.defaultPrevented) {
				return;
			}

			let key = event.key || event.keyCode;

			if (key === 'Escape' || key === 'Esc' || key === 27) {
				fnPageHandler('home');
			}
		});
	}
});

window.addEventListener('load', function() {
	// Only if we are on home page
	if (sCurrentPage == 'home') {
		rwdClassAdd('js-footerLeftSection', 'js-footerRightSection', 'horizontal', 15, 'js-footer', 'c-footer--mobile');
	}

	document.body.classList.remove('preload');
});

