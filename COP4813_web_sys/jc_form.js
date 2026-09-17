
const phone_input = document.getElementById("phone");
const form = document.getElementById('personal_form');
const dialog = document.getElementById('review_dialog');
const confirm_button = document.getElementById('confirm_button');
const cancel_button = document.getElementById('cancel_button');
const review_content = document.getElementById('review_content');
const dia_fname = document.getElementById('dia_fname');
const dia_lname = document.getElementById('dia_lname');
const dia_street = document.getElementById('dia_street');
const dia_unit = document.getElementById('dia_unit');
const dia_city = document.getElementById('dia_city');
const dia_state = document.getElementById('dia_state');
const dia_zip = document.getElementById('dia_zip');
const dia_email = document.getElementById('dia_email');
const dia_phone = document.getElementById('dia_phone');
const dia_message = document.getElementById('dia_message');

phone_input.addEventListener("input", function (event) {
	let phone = event.target.value.replace(/\D/g, "");
	phone = phone.substring(0, 10);
	if (phone.length > 6) {
		phone = "(" + phone.substring(0, 3) + ") " + phone.substring(3, 6) + "-" + phone.substring(6);
	} else if (phone.length > 3) {
		phone = "(" + phone.substring(0, 3) + ") " + phone.substring(3);
	} else if (phone.length > 0) {
		phone = "(" + phone;
	}
	event.target.value = phone;
});

form.addEventListener('submit', function (event) {
	const sec_question = document.getElementById('sec_question').value;
	event.preventDefault();
	if (sec_question === "what") {
		review();
	} else {
		alert("not today, toaster!");
	}
	
});



function review() {
	const fname = document.getElementById('fname').value;
	const lname = document.getElementById('lname').value;
	const street = document.getElementById('addr_street').value;
	const unit = document.getElementById('addr_unit').value;
	const city = document.getElementById('addr_city').value;
	const state = document.getElementById('addr_state').value;
	const zip = document.getElementById('addr_zip').value;
	const email = document.getElementById('email').value;
	const phone = document.getElementById('phone').value;
	const message = document.getElementById('message').value;
	dia_fname.textContent = fname;
	dia_lname.textContent = lname;
	dia_street.textContent = street;
	dia_unit.textContent = unit;
	dia_city.textContent = city;
	dia_state.textContent = state;
	dia_zip.textContent = zip;
	dia_email.textContent = email;
	dia_phone.textContent = phone;
	dia_message.textContent = message;
	dialog.showModal();
}

confirm_button.addEventListener('click', function() {
		dialog.close();
		HTMLFormElement.prototype.submit.call(form);
});
	
cancel_button.addEventListener('click', function() {
	event.preventDefault();
	dialog.close();
});

