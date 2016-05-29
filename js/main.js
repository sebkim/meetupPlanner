// webshim.setOptions('forms-ext', {
//   replaceUI: 'auto'
// });
// //set language/UI dateformat || or use lang attribute on html element
// //webshims.activeLang('hu'); // hu == hungary
// webshim.polyfill('forms forms-ext');
// $('.check-validity').on('click', function () {
//     $(this).jProp('form').checkValidity();
//     return false;
// });

$(function() {
  $('#createPlan-form').click(function(e) {

    e.preventDefault();
  });

  $('#navMenu1').click(function(e) {
     $("#createPlan").delay(100).fadeIn(100);
     $("#displayPlan").fadeOut(100);
     $('#navMenu2').removeClass('active');
     $(this).addClass('active');
     setTimeout(function() {
        $("#nameEvent").focus();
     },101);
     e.preventDefault();
     $('#msg').empty();
     $('#errMsg').empty();
     validator.resetForm();
 });
  $('#navMenu2').click(function(e) {
     $("#displayPlan").delay(100).fadeIn(100);
     $("#createPlan").fadeOut(100);
     $('#navMenu1').removeClass('active');
     $(this).addClass('active');
     e.preventDefault();
 });

 $.validator.addMethod("greaterThan",
   function(value, element, params) {
       if (!/Invalid|NaN/.test(new Date(value))) {
           return new Date(value) >= new Date($(params).val());
       }
       return isNaN(value) && isNaN($(params).val())
           || (Number(value) > Number($(params).val()));
   },'Must be greater than {0}.'
 );

 // validation!!!
 var validator=$('#createPlan-form').validate({
     rules : {
       nameEvent : {
         required: true
       },
       typeEvent : {
         required: true
       },
       eventHost : {
           required: true
       },
       eventStart: {
         required: true
       },
       eventEnd: {
         required: true,
         greaterThan: "#eventStart"
       },
       guestList: {
         required: true
       },
       locationV: {
         required: true
       }
     },
     messages: {
       nameEvent : {
         required: "<li style='color: red;'>Please enter the name of event!</li>"
       },
       typeEvent : {
         required: "<li style='color: red;'>Please enter the type of event!</li>"
       },
       eventHost : {
           required: "<li style='color: red;'>Please enter the host of event!</li>"
       },
       eventStart: {
         required: "<li style='color: red;'>Please enter the start of event!</li>"
       },
       eventEnd: {
         required: "<li style='color: red;'>Please enter the end of event!</li>",
         greaterThan: "<li style='color: red;'>End Date should be greater than Start Date!</li>"
       },
       guestList: {
         required: "<li style='color: red;'>Please enter the guest list!</li>"
       },
       locationV: {
         required: "<li style='color: red;'>Please enter the location of event!</li>"
       }
     }
   });

});
