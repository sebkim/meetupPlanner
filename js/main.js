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
 });
  $('#navMenu2').click(function(e) {
     $("#displayPlan").delay(100).fadeIn(100);
     $("#createPlan").fadeOut(100);
     $('#navMenu1').removeClass('active');
     $(this).addClass('active');
     e.preventDefault();
 });

 // // validation!!!
 // $('#createPlan-form').validate({
 //     rules : {
 //       nameEvent : {
 //         required: true
 //       },
 //       typeEvent : {
 //         required: true
 //       },
 //       eventHost : {
 //           required: true
 //       },
 //       eventStart: {
 //         required: true
 //       },
 //       eventEnd: {
 //         required: true
 //       },
 //       guestList: {
 //         required: true
 //       },
 //       location: {
 //         required: true
 //       }
 //     },
 //     messages: {
 //       nameEvent : {
 //         required: "<li style='color: red;'>Please enter the name of event!</li>"
 //       },
 //       typeEvent : {
 //         required: "<li style='color: red;'>Please enter the type of event!</li>"
 //       },
 //       eventHost : {
 //           required: "<li style='color: red;'>Please enter the host of event!</li>"
 //       },
 //       eventStart: {
 //         required: "<li style='color: red;'>Please enter the start of event!</li>"
 //       },
 //       eventEnd: {
 //         required: "<li style='color: red;'>Please enter the end of event!</li>"
 //       },
 //       guestList: {
 //         required: "<li style='color: red;'>Please enter the guest list!</li>"
 //       },
 //       location: {
 //         required: "<li style='color: red;'>Please enter the location of event!</li>"
 //       }
 //     }
 //   });
});
