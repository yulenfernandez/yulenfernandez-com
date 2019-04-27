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
function fnPageHandler() {
	var dPages = document.querySelectorAll('.js-page');
	var sTargetPageName = this.getAttribute('targetPage');
	var dTargetPage = document.querySelector('.js-page[page="' + sTargetPageName + '"]');

	for (var i=0; i != dPages.length; i++) {
		dPages[i].classList.add('u-display-none');
	}

	dTargetPage.classList.remove('u-display-none');
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
	var dFormMsg = $('#js-formMsg');

	dFormSubmitBtn.addClass('c-btn--deactivated');
	dFormMsg.text('Sending your message...');
	
	$.ajax({
		type: 'POST',
		url: $form.attr('action'),
		data: formData
	})
	.done(function(response) {
		fnClearForm();
		dFormSubmitBtn.removeClass('c-btn--deactivated');
		dFormMsg.removeClass('u-display-none');
		dFormMsg.text('Your message has been sent.');
		setTimeout(function() {
			dFormMsg.addClass('u-display-none');
		}, 5000);
	})
	.fail(function(data) {
		fnClearForm();
		dFormSubmitBtn.removeClass('c-btn--deactivated');
		dFormMsg.removeClass('u-display-none');
		dFormMsg.text('Sorry, your message couldn\'t be sent.');
		setTimeout(function() {
			dFormMsg.addClass('u-display-none');
		}, 5000);
	});
});	


window.addEventListener('DOMContentLoaded', function() {

	rwdClassAdd('js-footerLeftSection', 'js-footerRightSection', 'horizontal', 15, 'js-footer', 'c-footer--mobile');

	/**
	 * Attach to all page links the function to handle the switch
	 */
	var dPageLinks = document.querySelectorAll('.js-pageLink');
	for (var i=0; i != dPageLinks.length; i++ ) {
		dPageLinks[i].addEventListener('click', fnPageHandler, false);	
	}

}, false);
