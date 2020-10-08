function validateForm(){
  var name = document.forms.personalInfo.name;
  var gender = document.forms.personalInfo.gender;
  var email = document.forms.personalInfo.email;
  var iseasy = document.forms.personalInfo.iseasy;
  var data;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //validate inputs before storing any data
  if(name.value == ""){
    alert("Please fill out your name.");
    name.focus();
    return false;
  }

  if (gender.value == ""){  //!(gender[0].checked || gender[1].checked || gender[2].checked)
    alert("Please choose your gender.")
    return false;
  }

  if(!email.value.match(mailformat)){
    alert("Please enter a valid email address.");
    email.focus();
    return false;
  }

  if(iseasy.value == ""){  //!(iseasy[0].checked || iseasy[1].checked)
    alert("Please choose whether or not it was easy.");
    return false;
  }
  //begin to store data once validated
  data = name.value + "," + gender.value + "," + email.value + "," + iseasy.value;

  //insert data into blob type for csv insertion
  const dataBlob = new Blob([data],{type:'text/csv'});

  //creating tag to download csv
  let tag = document.createElement("a");
  tag.download = "myData.csv";

  //logic to ensure correct creation of URL for download
  if(window.webkitURL != null){
    tag.href = window.webkitURL.createObjectURL(dataBlob);
  } else {
    tag.href = window.URL.createObjectURL(dataBlob);
    tag.style.display = "none";
    document.body.appendChild(tag);
  }

  //click tag to intiate download of csv
  tag.click();

}
