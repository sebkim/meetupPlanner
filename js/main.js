webshim.setOptions('forms-ext', {
  replaceUI: 'auto'
});
//set language/UI dateformat || or use lang attribute on html element
//webshims.activeLang('hu'); // hu == hungary
webshim.polyfill('forms forms-ext');
$('.check-validity').on('click', function () {
    $(this).jProp('form').checkValidity();
    return false;
});

$(function() {
  $('#navMenu1').click(function(e) {
     $("#createPlan").delay(100).fadeIn(100);
     $("#displayPlan").fadeOut(100);
     $('#navMenu2').removeClass('active');
     $(this).addClass('active');
     setTimeout(function() {
        $("#nameEvent").focus();
     },101);
     e.preventDefault();
 });
  $('#navMenu2').click(function(e) {
     $("#displayPlan").delay(100).fadeIn(100);
     $("#createPlan").fadeOut(100);
     $('#navMenu1').removeClass('active');
     $(this).addClass('active');
     e.preventDefault();
 });

 // validation!!!
 // <label for="nameEvent">Name of the event</label>
 // <input type="text" name="nameEvent" id="nameEvent" tabindex="1" class="form-control" value="" autofocus >
 // <label for="typeEvent">Type of the event</label>
 // <input type="text" name="typeEvent" id="typeEvent" tabindex="2" class="form-control" value="">
 // <label for="eventHost">Event host</label>
 // <input type="text" name="eventHost" id="eventHost" tabindex="3" class="form-control" value="">
 // <label for="eventStart">Event start date and time</label>
 // <input type="datetime-local" name="eventStart" id="eventStart" tabindex="4" class="form-control">
 // <label for="eventEnd">Event end date and time</label>
 // <input type="datetime-local" name="eventEnd" id="eventEnd" tabindex="5" class="form-control">
 // <label for="guestList">Guest list</label>
 // <input type="text" name="guestList" id="guestList" tabindex="6" class="form-control" value="">
 // <label for="location">Location</label>
 // <input type="text" name="location" id="location" tabindex="7" class="form-control" value="">
 $('#createPlan-form').validate({
     rules : {
       nameEvent : {
         required: true
       },
       email : {
         required: true
       },
       password : {
           required: true,
           minlength : 8
       },
       confirm_password : {
           required: true,
           minlength : 8,
           equalTo : "#password"
       }
     },
     messages: {
       nameEvent: {
         required: "<li style='color: red;'>Please enter a name!</li>"
       },
       email: {
         required: "<li>Please enter a email!</li>"
       }
     }
   });
});
