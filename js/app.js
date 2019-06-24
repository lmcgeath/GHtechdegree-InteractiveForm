let selectT = $('#color').find('option[value="Please select a T-shirt theme"]').val();

//NEED TO PREVENT FIREFOX FROM SAVING CHECKED BOXES
//Focuses cursor on first text box
$('#name').focus();

$('#other-title').hide();

/* toggles text box for user to type 'other job role'
when other option is selected*/
$('#title').on('change', function(){
  if ($(this).val() == 'other'){
    $('#other-title').show()
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
//creates new <p> element and adds text plus the varable for totalCost
let newElement = $('<p></p>');
//appends new element to the bottom of the list of event checkboxes
$('.activities').append(newElement);

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

 const dashIndex = labelText.indexOf('—');
 const commaIndex = labelText.indexOf(',');
 const timeOfEvent = labelText.slice(dashIndex, commaIndex);
 // console.log(dashIndex)
 // console.log(commaIndex)
 // console.log(timeOfEvent)

 //creates a variable of the list of checkboxes to loop over -- MAY NEED TO EDIT
 const checkboxes = $('.activities input');
 // console.log(labelText)

 for (i = 0; i<checkboxes.length; i++) {
   // let lastBoxText = lastBoxChecked.text()
   let checkboxText = $(checkboxes[i]).parent().text();
   // let lastTimeOfEvent = timeOfEvent[i]
   // console.log(lastTimeOfEvent)
   // if($(checkboxes).prop('checked') == true && lastTimeOfEvent == timeOfEvent)

   if(checkboxText.includes(timeOfEvent) && checkboxText !== labelText) {
     if ( $(lastBoxChecked).prop('checked') === false ) {
				checkboxes[i].disabled = false;
			} else {
				checkboxes[i].disabled = true;
			}
   }

 }
});
