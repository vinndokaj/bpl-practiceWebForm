function validateForm(){
  var name = document.forms.personalInfo.name;
  var gender = document.forms.personalInfo.gender;
  var email = document.forms.personalInfo.email;
  var iseasy = document.forms.personalInfo.iseasy;
  var data = name.value + "," + gender.value + "," + email.value + "," + iseasy.value;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //validate inputs before storing any data
  if(name.value == ""){
    document.getElementById("name").style.borderColor = 'red';
    return false;
  }

  if (gender.value == ""){
    document.getElementById("gender").style.color = 'red';
    return false;
  }

  if(!email.value.match(mailformat)){
    document.getElementById("email").style.borderColor = 'red';
    return false;
  }

  if(iseasy.value == ""){
    document.getElementById("iseasy").style.color = 'red';
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
