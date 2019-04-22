"use strict";

window.addEventListener('DOMContentLoaded', function() {

	/**
	 * Manage if content is fixed of use percentage heights.
	 * Fixed is triggered in small screen were the footer would overlap main content.
	 */
	
	var dLinks = document.getElementById('js-links');
	var dFooter = document.getElementById('js-footer');
	var dSiteContent = document.getElementById('js-siteContent');

	if (dFooter.offsetTop - dLinks.offsetTop < 30) {
		dSiteContent.classList.add('o-site-content--fixed');
	} else {
		dSiteContent.classList.remove('o-site-content--fixed');
	}



	/**
	 * Manage pages displays
	 */

	var dPageLinks = document.querySelectorAll('.js-pageLink');
	for (var i=0; i != dPageLinks.length; i++ ) {
		dPageLinks[i].addEventListener('click', fnPageHandler, false);	
	}

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
	 * Manage form submit
	 */
	function fnClearForm() {
		var dFields = document.querySelectorAll('input:not([type="submit"]), textarea');

		for(var i=0; i!= dFields.length; i++) {
			dFields[i].value='';
		}
	}
	
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


});
