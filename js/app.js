let selectT = $('#color').find('option[value="Please select a T-shirt theme"]').val();
//creates a variable of the list of checkboxes to loop over in the activities section
const checkboxes = $('.activities input');

//Focuses cursor on first text box
$('#name').focus();

$('#other-title').hide();

/* toggles text box for user to type 'other job role'
when other option is selected*/
$('#title').on('change', function(){
  if ($(this).val() == 'other'){
    $('#other-title').show();
  }
  else {
    $('#other-title').hide();
  }
});
//------------------T shirt section -------------------------------

//Hides colors on first page load
$('#color option:gt(0)').hide();

//hides the 'Select Theme' option when the dropdown is clicked
$('#design').on('click', function(){
  $('#design option:lt(1)').hide();
});

/*creates an event handler with conditional statements to filter which
colors are visible on the dropdown menu based on the design selection*/
$('.shirt').change(function(){
 if ($('#design').val() == 'js puns'){
    //hides all colors less than/greater than index value
    //according to order of colors - must change if colors are added
    $('#color option:lt(4)').show();
    $('#color option:gt(3)').hide();
    //resets the option selected to first color
    $('#color').val('cornflowerblue');
}
  else if ($('#design').val() == 'heart js'){
    //hides all colors less than/greater than index value
    //according to order of colors - must change if colors are added
    $('#color option:gt(3)').show();
    $('#color option:lt(4)').hide();
    //resets the option selected to first color
    $('#color').val('tomato');
}
});

//------------------Activity section -------------------------------
//establishes counter for to keep track of event costs
let totalCost = 0;
//creates new <p> element and adds text plus the variable for totalCost
let newElement = $('<p></p>');
//appends new element to the bottom of the list of event checkboxes
$('.activities').append(newElement);
//creates a change event handler
$('.activities').change(function(){
  const lastBoxChecked = event.target;
  const labelText = $(lastBoxChecked).parent().text();
  const dollarIndex = labelText.indexOf('$') + 1;
  const eventCostSlice = labelText.slice(dollarIndex);
  const eventCostInt = parseInt(eventCostSlice);
/*checks whether the last box checked has a current state of
checked or unchecked and add/subtracts the cost of the event
accordingly*/
  if($(lastBoxChecked).prop('checked') == true){
    totalCost += eventCostInt
}
  else if ($(lastBoxChecked).prop('checked') == false){
    totalCost -= eventCostInt
}
 //sets the text of the event cost counter to display as it changes
 newElement.text('Total: $' + totalCost);
//creates variables to access the time and day of event
 const dashIndex = labelText.indexOf('—');
 const commaIndex = labelText.indexOf(',');
 const timeOfEvent = labelText.slice(dashIndex, commaIndex);
//creates a loop to check for conflicting events and disable them
 for (i = 0; i<checkboxes.length; i++) {
   let checkboxText = $(checkboxes[i]).parent().text();
   if(checkboxText.includes(timeOfEvent) && checkboxText !== labelText) {
     if ( $(lastBoxChecked).prop('checked') === false ) {
				checkboxes[i].disabled = false;
			} else {
				checkboxes[i].disabled = true;
			}
   }
 }
});
//------------------Payment section -------------------------------
//hides select option value
$('#payment option[value="select_method"]').hide();
$('.paypal').hide();
$('.bitcoin').hide();

//defaults the first option to 'credit card' in the dropdown menu
$('#payment').val('credit card');
/*creates a change event to get the value of the selected option and show
content accordingly*/
$('#payment').change(function(){
let paymentChoice = $(event.target).val();
if (paymentChoice == 'paypal'){
  $('.paypal').show();
  $('.bitcoin').hide();
  $('.credit-card').hide();
  }
else if (paymentChoice == 'bitcoin'){
  $('.bitcoin').show();
  $('.paypal').hide();
  $('.credit-card').hide();
}
else if (paymentChoice == 'credit card'){
  $('.bitcoin').hide();
  $('.paypal').hide();
  $('.credit-card').show();
}
});

//------------------Validation section -------------------------------

//Function for validating name field
function validateName (name){
  //captures user input into a variable
  const username = $('#name').val();
  if (username == "" || username == " "){
    $('#name').css("border","2px solid red");
    return false
  }
  else {
    $('#name').css('border', '1px solid green');
    return true
  }
}

//Tests valid email regex expression against email input and colors box accordingly
function validateEmail (){
  let emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let email = $('#mail').val();
  if (emailTest.test(email) == false){
    $('#mail').css("border","2px solid red");
    return false
  }
  else {
    $('#mail').css('border', '1px solid green');
    return true
}
}
//Function for validating event boxes checked
function validateActivities(){
  let numberOfChecked = $(checkboxes).filter(':checked').length
  if (numberOfChecked == 0) {
      $('.activities').css("border","2px solid red");
      return false
  }
  else {
    $('.activities').css('border', '1px solid green');
    return true
}
}
//Function for validating credit card input
function validateCreditCard(){
  let creditCardTest = /^\d{13,16}$/
  creditCard = $('#cc-num').val();
  if (creditCardTest.test(creditCard) == false){
    $('#cc-num').css("border","2px solid red");
    return false
  }
  else {
    $('#cc-num').css('border', '1px solid green');
    return true
}
};
//Function for validating zip code input
function validateZip(){
  let zipTest = /^\d{5}$/
  zipcode = $('#zip').val();
  if (zipTest.test(zipcode) == false){
    $('#zip').css("border","2px solid red");
    return false
  }
  else {
    $('#zip').css('border', '1px solid green');
    return true
}
};
//Function for validating cvv input
function validateCvv(){
  let cvvTest = /^\d{3}$/
  cvv = $('#cvv').val();
  if (cvvTest.test(cvv) == false){
    $('#cvv').css("border","2px solid red");
    return false
  }
  else {
    $('#cvv').css('border', '1px solid green');
    return true
}
};
/*creates a function to run all of the validation functions and evaluate
whether they are true or false to prevent the form from submitting in the
handler below*/
function validateAll(){
  validateName(name);
  validateEmail();
  validateActivities();
  validateCreditCard();
  validateZip();
  validateCvv();
  let returnValue = true
  if (validateName(name) == false){
    returnValue = false
  }
  if(validateEmail() == false) {
     returnValue = false;
  }

  if (validateActivities() == false) {
     returnValue = false;
   }
  if ($("#payment").val() === 'credit card') {
    if(validateCreditCard() == false) {
        returnValue = false;
        }
    if(validateZip() == false) {
        returnValue = false;
        }
    if (validateCvv() == false) {
        returnValue = false;
        }
    }
      return returnValue;
};
/*Event handler to run the validation functions upon user input or submitting the form.
Also prevents the form from submitting until all input is valid*/
$('form').on('input submit', function(){
if (validateAll() == false){
  event.preventDefault();
validateAll()
}});
