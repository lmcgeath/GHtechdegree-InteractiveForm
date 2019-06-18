let selectT = $('#color').find('option[value="Please select a T-shirt theme"]').val()


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
$('#color option:gt(0)').hide()

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
    $('#color option:lt(4)').show()
    $('#color option:gt(3)').hide()
    //resets the option selected to first color
    $('#color').val('cornflowerblue');
    console.log('testjsPuns')
}
  else if ($('#design').val() == 'heart js'){
    //hides all colors less than/greater than index value
    //according to order of colors - must change if colors are added
    $('#color option:gt(3)').show()
    $('#color option:lt(4)').hide()
    //resets the option selected to first color
    $('#color').val('tomato');
}
});

//------------------Activity section -------------------------------
