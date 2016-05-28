$(function() {
  $('#register-submit').click(function(e) {
    // e.preventDefault();
    // window.location.assign('main.html');
  });
  // register form validation.
  $('#register-form').validate({
    rules : {
      username : {
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
      username: {
        required: "<li>Please enter a name!</li>"
      },
      email: {
        required: "<li>Please enter a email!</li>"
      },
      password: {
        required: "<li>Please enter a password!</li>",
        minlength: "<li>Minimum length of a password is 8!</li>"
      },
      confirm_password: {
        required: "<li>Please enter a password!</li>",
        minlength: "<li>Minimum length of a password is 8!</li>",
        equalTo: "<li>Password and Confirm Password must be same!</li>"
      }
    }
  });
});
