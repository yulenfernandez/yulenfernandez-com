"use strict";

/**
 * Check if content overlap and so add class to modify display  
 */
function rwdClassAdd(sElement1, sElement2, sOrientation , iGap, sTargetElement, sClassToAdd) {
	var dElement1 = document.getElementById(sElement1);
	var dElement2 = document.getElementById(sElement2);
	var dTargetElement = document.getElementById(sTargetElement);

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
	var dPages = document.querySelectorAll('.js-page');
	var dTargetPage = document.querySelector('.js-page[page="' + sTargetPageName + '"]');

	for (var i=0; i != dPages.length; i++) {
		dPages[i].classList.add('u-display-none');
	}

	dTargetPage.classList.remove('u-display-none');
}


/**
 * Manage theme switcher
 */
function fnThemeSwitch(sTargetThemeValue) {
	document.body.setAttribute('data-theme', sTargetThemeValue);			

	var dActiveSwitchLinks = document.querySelectorAll('.js-themeSwitch.is-active');
	for (var i=0; i != dActiveSwitchLinks.length; i++ ) {
		dActiveSwitchLinks[i].classList.remove('is-active');
	}

	var dInactiveSwitchLinks = document.querySelectorAll('.js-themeSwitch[themeValue="' + sTargetThemeValue + '"]');
	for (var i=0; i != dInactiveSwitchLinks.length; i++ ) {
		dInactiveSwitchLinks[i].classList.add('is-active');
	}
}


/**
 * Empty all inputs (except the input with "submit" type) and textareas
 */
function fnClearForm() {
	var dFields = document.querySelectorAll('input:not([type="submit"]), textarea');

	for(var i=0; i!= dFields.length; i++) {
		dFields[i].value='';
	}
}


/**
 * Manage form submit
 */
$("#js-form").submit(function(e) {
	e.preventDefault();

	var $form = $(this);
	var formData = $form.serialize();
	var dFormSubmitBtn = $('#js-formSubmitBtn');
	var dFormSendingMsg = $('#js-formSendingMsg');
	var dFormSuccessMsg = $('#js-formSuccessMsg');
	var dFormFailureMsg = $('#js-formFailureMsg');

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

	var iCurrentHour = (new Date()).getHours();

	var sUrl=location.href;
	var sUrlFileName = sUrl.substring(sUrl.lastIndexOf('/'));


	// Automatically set color theme related to user's time
	if (iCurrentHour <= 7 || iCurrentHour >= 20) {
		fnThemeSwitch('dark');
	} else {
		fnThemeSwitch('light');
	}


	// Only if we are on home page
	if (sUrlFileName == '/') {

		rwdClassAdd('js-footerLeftSection', 'js-footerRightSection', 'horizontal', 15, 'js-footer', 'c-footer--mobile');
		
		var dPageLinks = document.querySelectorAll('.js-pageLink');
		for (var i=0; i != dPageLinks.length; i++ ) {
			dPageLinks[i].addEventListener('click', function() {
				fnPageHandler(this.getAttribute('targetPage'));
			});	
		}
		
		var dThemeSwitchs = document.querySelectorAll('.js-themeSwitch');
		for (var i=0; i != dThemeSwitchs.length; i++ ) {
			dThemeSwitchs[i].addEventListener('click', function() {
				fnThemeSwitch(this.getAttribute('themeValue'));
			});	
		}

		// Come back to home page if Escape key is pressed.
		// Source: https://medium.com/@uistephen/keyboardevent-key-for-cross-browser-key-press-check-61dbad0a067a
		document.addEventListener('keyup', function (event) {
			if (event.defaultPrevented) {
				return;
			}

			var key = event.key || event.keyCode;

			if (key === 'Escape' || key === 'Esc' || key === 27) {
				fnPageHandler('home');
			}
		});
	}

	document.body.classList.remove('preload');

}, false);
