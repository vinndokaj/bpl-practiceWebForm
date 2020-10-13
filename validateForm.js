function validateForm(){
  var name = document.forms.personalInfo.name.value;
  var gender = document.forms.personalInfo.gender.value;
  var email = document.forms.personalInfo.email.value;
  var iseasy = document.forms.personalInfo.iseasy.value;
  var data = name + "," + gender + "," + email + "," + iseasy;;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //validate inputs before storing any data
  if(name == ""){
    alert("Please fill out your name.");
    name.focus();
    return false;
  }

  if (gender == ""){
    alert("Please choose your gender.")
    return false;
  }

  if(!email.match(mailformat)){
    alert("Please enter a valid email address.");
    email.focus();
    return false;
  }

  if(iseasy == ""){
    alert("Please choose whether or not it was easy.");
    return false;
  }

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
