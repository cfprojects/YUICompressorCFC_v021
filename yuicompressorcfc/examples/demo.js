function reloadWallet() {
	$("#walletEditContainer").parent().block() ;		
	$("#walletEditContainer").parent().load(tabSource) ;		
}

function validateWallet() {
	var aMessages = new Array();
	var string1 = "";
	var string2 = "";
	var tempVal = "";
	var dtToday = new Date();
	var iThisMonth = dtToday.getMonth() + 1 ;	// Jan is 0, thanks Javascript
	var iThisYear = dtToday.getFullYear();

	if ( ! getIsLoggedIn() ) {
		$.blockUI("You have been logged out.  Redirecting to login form...");
		location.reload();
		return false;
	}

	$("#walletEditContainer").block();
	
	if ( $("#formWallet #name_on_card").val() == '' ) aMessages.push("Cardholder name is required.");
	if ( $("#formWallet #card_num").val() == '' ) {
		aMessages.push("Card Number is required.");
	} else if ( ! isMod10($("#formWallet #card_num").val()) ) {
		aMessages.push("Card Number is invalid.");
	}
	
	// Check exp date >= today's month/year
	string1 = $("#formWallet #exp_month").val();
	string2 = $("#formWallet #exp_year").val();
	if ( string2 < iThisYear ) {
		aMessages.push("This credit card expiration date has already passed.");
	} else if ( ( string2 == iThisYear ) && ( string1 < iThisMonth ) ) {
		aMessages.push("Your credit card has already expired.");
	}
	
	/*
	if ( $("#formWallet #creditCard_CVV").val() == '' ) {
		aMessages.push("Card security code name is required.");
	} else if ( $("#formWallet #creditCard_CVV").val().length < 3 ) {
		aMessages.push("Card security code name is invalid.");
	} else if ( ! isValid('numeric', $("#formWallet #creditCard_CVV").val()) ) {
		aMessages.push("Card security code name must be numeric.");
	}
	*/

	if ( $("#formWallet #firstName").val() === '' ) { aMessages.push("First Name is required."); }
	if ( $("#formWallet #lastName").val() === '' ) { aMessages.push("Last Name is required."); }
	if ( $("#formWallet #address1").val() === '' ) { aMessages.push("Billing address is required."); }
	if ( $("#formWallet #city").val() == '' ) aMessages.push("City is required.");
	if ( $("#formWallet #stateProvinceCode").val() == '' ) aMessages.push("State is required.");

	tempVal = $("#formWallet #postalCode").val();
	if ( tempVal === '' ) {
		aMessages.push("Zip code is required.");
	} else if ( ! isValid("zipCode", tempVal) ) {
		aMessages.push("Zip code format is invalid.");
	}

	tempVal = $("#formWallet #phone_areaCode").val() + "-" + $("#addressBookEdit #phone_prefix").val() + "-" + $("#addressBookEdit #phone_lineNumber").val() ; 
	if (
			$("#formWallet #phone_areaCode").val() === ''
			|| $("#formWallet #phone_prefix").val() === ''
			|| $("#formWallet #phone_lineNumber").val() === ''
		) { 
		aMessages.push("Complete phone number is required."); 
	} else if ( 
			! isValid("numeric", $("#formWallet #phone_areaCode").val())
			|| ! isValid("numeric", $("#formWallet #phone_prefix").val())
			|| ! isValid("numeric", $("#formWallet #phone_lineNumber").val())
		) {
		aMessages.push("Phone number format is invalid."); 
	}


	// --------------------------------------
	if ( aMessages.length ) {
		showWalletMessages(aMessages);
		$("#walletEditContainer").unblock();
		return false;
	} else {
		// Ready to submit!  Make sure logged in before submitting
	}
	
	return true;
}

function showWalletMessages(aMessages) {
	var i = 0;
	var sError = "";
	for (i=0;i < aMessages.length; i++) {
		sError = sError + aMessages[i] + "\n";
	}
	if ( aMessages.length ) {
		alert(sError);
	}
	return true;
}

function afterSaveWallet(stResponse, statusText) {
	var aMessages = new Array();
	var data = "";

	if ( stResponse.SUCCESS ) {
		aMessages.push("Your credit card information has been saved.");
		showWalletMessages(aMessages);
		reloadWallet();
	} else {
		aMessages.push(stResponse.MESSAGE);
		showWalletMessages(aMessages);
	}

	return true;

}

function bindWalletForm(){ 
	var options1 = { 
		beforeSubmit: 	validateWallet		// pre-submit callback
		, success:		afterSaveWallet		// post-submit callback
		, dataType:  	'json'				// 'xml', 'script', or 'json' (expected server response type)
	}; 
	// bind form using 'ajaxForm'
	$('#formWallet').ajaxForm(options1);
} 
