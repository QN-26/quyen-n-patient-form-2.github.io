/*
    Name: Quyen Do Nguyen  
    File: patient-form-js-2.JS
    Date Created: 2026-03-02
    Date Updated: 2026-03-27
    Purpose: MIS 3371 Assignment 2's JS file for the HTML file.
*/

  /* Today's date code */
  document.getElementById("todaydate").innerHTML = new Date().toLocaleDateString();

  
  /* Validation Function */
  function validateField(id, pattern, message)
  {
    let input = document.getElementById(id);
    let value = input.value.trim();

    if (!pattern.test(value))
    {
      input.setCustomValidity(message);
    }
    else
    {
      input.setCustomValidity("");
    }
  }

  // Validate First Name
  function validateFirstName()
  {
    validateField
    ("firstname", /^[A-Za-z'-]{1,30}$/, "First Name must be 1-30 characters long; only letters, (') or (-) are allowed.");
  }

  // Validate Middle Initial
  function validateMiddleInitial()
  {
    validateField("middlename", /^[A-Za-z]{1,}$/, "Middle Initial must only be 1 character long; only letters allowed.");
  }

  // Validate Last Name
  function validateLastName()
  {
    validateField("lastname", /^[A-Za-z2345'-]{1,30}$/, "Last Name must be 1-30 characters long; only letters, ('), (-), and numbers 2-5 allowed.");
  }


  // Validate Date of Birth
  function validateDOB() 
  {
    let dobInput = document.getElementById("dob");
    let dobDate = new Date(dobInput.value);

    let today = new Date();

    let maxPastDate = new Date();
    maxPastDate.setFullYear(today.getFullYear() - 120);

    if (dobInput.value == "") 
    {
      dobInput.setCustomValidity("Please enter your Date of Birth.");
      return;
    }
    else if (dobDate > today) 
    {
      dobInput.setCustomValidity("Date of Birth cannot be in the future.");
    }
    else if (dobDate < maxPastDate) 
    {
      dobInput.setCustomValidity("Date of Birth cannot be more than 120 years ago.");
    }
    else 
    {
      dobInput.setCustomValidity("");
      }
  }

  // Validate SSN
  function validateSSN()
  {
    let ssnInput = document.getElementById("ssn");

    if (ssnInput.value.length == 9)
    {
    validateField("ssn", /^\d{9}$/, "Social Security Number must 9-11 characters long");
    }
    else if (ssnInput.value.length == 11)
    {
    validateField("ssn", /^\d{3}-\d{2}-\d{4}$/, "Social Security Number must 9-11 characters long");
    }
    else
    {
      ssnInput.setCustomValidity("Invalid Social Security Number.");
    }
  }

  // Validate Email
  function validateEmail()
  {
    validateField("email", /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email Address must follow this format: name@domain.tld");
  }


  // Validate Address 1
  function validateAddress1()
  {
    validateField("address1", /^.{2,30}$/, "Address Line 1 must be 2–30 characters.");
  }

  // Validate Address 2
  function validateAddress2()
  {
    let address2Input = document.getElementById("address2");

    if (address2Input.value.length == 1)
    {
    address2Input.setCustomValidity("Address Line must be at least 2 characters long.");
    }
    else
    {
    validateField("address2", /^.{2,30}$/, "Address Line 2 must be 2–30 characters.")
    };
  }


  // Validate City
  function validateCity()
  {
    validateField("city", /^.{2,30}$/, "City must be 2–30 characters.");
  }

// Validate Zip Code
  function validateZip()
  {
    validateField("zip", /^\d{5}(-\d{4})?$/, "Zip Code must be 5-10 characters long; only numbers and (-) allowed.");
  }


  // Validate User ID
  function validateUserID() 
  {
    let useridInput = document.getElementById("userid");
    let userid = useridInput.value.trim();

    useridInput.value = userid.toLowerCase();

    validateField("userid", /^[a-z][a-z0-9_-]{4,29}$/, "User ID must be 5-30 characters and cannot start with a number; lowercase letters, numbers, (_) and (-) allowed (No spaces).");
  }

  // Validate Password
  function validatePassword()
  {
    let userid = document.getElementById("userid").value.toLowerCase().trim();
    let passwordInput = document.getElementById("password");
    let password = passwordInput.value;

    if (password.toLowerCase().includes(userid))
    {
      passwordInput.setCustomValidity("Password cannot contain your User ID.");
    }
    else
    {
      validateField("password", /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_\+=\\\/><.,`~]).{8,30}$/, "Password must contain at least 1 upper case letter, 1 number, and 1 special character.");
    }

  }

  // Compare Re-enter Password with Password
  function validateReenterPassword()
  {
    let password = document.getElementById("password").value;
    let reenter = document.getElementById("reenterpassword");

    if (reenter.value !== password)
    {
      reenter.setCustomValidity("Passwords do not match.");
    }
    else
    {
      reenter.setCustomValidity("");
    }
  }

  // Validate Phone Number
function validatePhoneNumber() 
{
  let phoneInput = document.getElementById("phonenumber");

  if (phoneInput.value.length == 10)
  {
    validateField("phonenumber", /^\d{10}$/, "Phone Number must be 10-12 characters long.");
  }
  else if (phoneInput.value.length == 12)
  {
    validateField("phonenumber", /^\d{3}-\d{3}-\d{4}$/, "Phone Number must be 10-12 characters long.");
  }
  else
  {
    phoneInput.setCustomValidity("Invalid Phone Number.");
  }
}


  // Contact Checkbox requirement
  let contactBoxes = document.querySelectorAll('input[name="contact"]');
  let firstContact = contactBoxes[0];

  function validateContactCheckboxes()
  {
    let boxIsChecked = false;
    boxIsChecked = [...contactBoxes].some(box => box.checked); // change value to true if at least 1 box is checked
    
    // display appropriate message based on if the variable returns true or false
    if (!boxIsChecked)
    {
      firstContact.setCustomValidity("Please select at least one preferred contact method.");
    }
    else
    {
      firstContact.setCustomValidity("");
    }
};

  // initialize validate function whenever there is a change in box selected
  contactBoxes.forEach(box => box.addEventListener("change", validateContactCheckboxes));

  // prevent submission if no box was selected
  document.getElementById("patient-form-2").addEventListener("submit", function(submission)
  {
    validateContactCheckboxes();

    if (!firstContact.checkValidity()) 
    {
      firstContact.reportValidity();
      submission.preventDefault();
    }
  }
);

  
  // Dynamic Slide Bar numbers
  let slider = document.getElementById("urgencySlider");
  let output = document.getElementById("urgencyOutput");

  function updateSliderValue() 
  {
    let min = parseInt(slider.min);
    let max = parseInt(slider.max);
    let currentValue = parseInt(slider.value);

    output.textContent = currentValue;

    let percentageOfBar = currentValue/ (max - min);

    let sliderWidth = slider.offsetWidth;
    let outputWidth = output.offsetWidth;
      
    // calculates how much to offset the position of dynamic number 
    let position = (percentageOfBar * sliderWidth) - (outputWidth / 2);
      
    // assign dynamic position to dynamic value output
    output.style.left = `${position}px`;
  }

  // initialize function to change the position of the dynamic number whenever there is movement on the slide bar
  updateSliderValue();
  slider.addEventListener("input", updateSliderValue);


  /* Clear Form */
  function clearForm()
  {
    let clearMessage = document.getElementById("clearFormMessage");
    clearMessage.textContent = "Form cleared";

    // reset slider number and position
    let slider = document.getElementById("urgencySlider");
    slider.value = 5;
    updateSliderValue();

    // set timer for message
    setTimeout(function() {message.textContent = "";}, 1500);
  }
 

  /* Review Form */
  function reviewForm()
  {
    let formInputs = document.getElementById("patient-form-2");
    let output = "";

    let reviewFormOutput = document.getElementById("outputFormInput");

    // toggle Review Form section on and off
    if (reviewFormOutput.style.display === "none") 
    {
        reviewFormOutput.style.display = "block";
    } 
    else // otherwise, close review section
    {
        reviewFormOutput.style.display = "none";
        return;
    }

      //retrieve text inputs 
      let firstname = document.getElementById("firstname").value;
      let middlename = document.getElementById("middlename").value;
      let lastname = document.getElementById("lastname").value;

      let dob = document.getElementById("dob").value;
      let ssn = document.getElementById("ssn").value;
      let email = document.getElementById("email").value;

      let address1 = document.getElementById("address1").value;
      let address2 = document.getElementById("address2").value;

      let city = document.getElementById("city").value;
      let state = document.getElementById("state").value;
      let zip = document.getElementById("zip").value;

      let userid = document.getElementById("userid").value;
      let phone = document.getElementById("phonenumber").value;

      let urgency = document.getElementById("urgencySlider").value;
      let notes = document.getElementById("notes").value;


      // retrieve radio button inputs 
      let race = document.querySelector('input[name="race"]:checked');
          race = (race ? race.parentElement.textContent : "");

      let gender = document.querySelector('input[name="gender"]:checked');
          gender = (gender ? gender.parentElement.textContent : "");

      let marital = document.querySelector('input[name="marital"]:checked');
          marital = (marital ? marital.parentElement.textContent : "");


      // retrieve checkbox inputs 
      let referrals = Array.from(document.querySelectorAll('input[name="referral"]:checked'))
          .map(referralCheckBox => `${referralCheckBox.parentElement.textContent}<br>`);

      let contacts = Array.from(document.querySelectorAll('input[name="contact"]:checked'))
          .map(contactCheckBox => `${contactCheckBox.parentElement.textContent}<br>`);


        // actual output format
        output += "<h3 class='output-form-input-title'>Review Information</h3>";

        output += "<table class='review-table'>";
        output += "<tr><td><strong>First Name: &emsp;</strong></td><td>" + firstname + "</td></tr>";
        output += "<tr><td><strong>Middle Initial: &emsp;</strong></td><td>" + middlename + "</td></tr>";
        output += "<tr><td><strong>Last Name: &emsp;</strong></td><td>" + lastname + "</td></tr>";
        
        output += "<tr><td><strong>Date of Birth: &emsp;</strong></td><td>" + dob + "</td></tr>";
        output += "<tr><td><strong>SSN: &emsp;</strong></td><td>" + ssn + "</td></tr>";
        output += "<tr><td><strong>Email: &emsp;</strong></td><td>" + email + "</td></tr>";

        output += "<tr><td><strong>Address Line 1: &emsp;</strong></td><td>" + address1 + "</td></tr>";
        output += "<tr><td><strong>Address Line 2: &emsp;</strong></td><td>" + address2 + "</td></tr>";
        
        output += "<tr><td><strong>City: &emsp;</strong></td><td>" + city + "</td></tr>";
        output += "<tr><td><strong>State: &emsp;</strong></td><td>" + state + "</td></tr>";
        output += "<tr><td><strong>Zip Code: &emsp;</strong></td><td>" + zip + "</td></tr>";

        output += "<tr><td><strong>User ID: &emsp;</strong></td><td>" + userid + "</td></tr>";
        output += "<tr><td><strong>Phone Number: &emsp;</strong></td><td>" + phone + "</td></tr>";

        output += "<tr><td><strong>Race: &emsp;</strong></td><td>" + race + "</td></tr>";
        output += "<tr><td><strong>Gender: &emsp;</strong></td><td>" + gender + "</td></tr>";
        output += "<tr><td><strong>Marital Status: &emsp;</strong></td><td>" + marital + "</td></tr>";

        output += `<tr><td><strong>Referral Source(s): &emsp;</strong></td><td>${referrals.join("")}</td></tr>`;
        output += `<tr><td><strong>Preferred Contact(s): &emsp;</strong></td><td>${contacts.join("")}</td></tr>`;

        output += "<tr><td><strong>Urgency Level: &emsp;</strong></td><td>" + urgency + "</td></tr>";
        output += "<tr><td><strong>Additional Notes: &emsp;</strong></td><td>" + notes + "</td></tr>";

        output += "</table>";

    // prompting output
    document.getElementById("outputFormInput").innerHTML = output;
  }

    /* End of document: patient-form-js-2.JS */