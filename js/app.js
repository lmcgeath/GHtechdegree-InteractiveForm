//Focuses cursor on first text box
$('#name').focus();

$('#other-title').hide();

// toggles text box for user to type 'other job role'
  $('#title').on('click', function(){
  if ($(this).val() == 'other'){
    $('#other-title').show()
  }
  else {
    $('#other-title').hide();

  }
});
