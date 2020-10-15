function validateForm(){
  var name = document.forms.personalInfo.name;
  var gender = document.forms.personalInfo.gender;
  var email = document.forms.personalInfo.email;
  var iseasy = document.forms.personalInfo.iseasy;
  var data = [name, gender, email, iseasy];
  var forBlob = "";

  var i;
  var len = data.length;
  for(i = 0; i < len; i++){
    if(validateAux(data[i])){
      alert("Please complete form.");
      return false;
    }
    forBlob += data[i].value + ",";
  }
  console.log(forBlob);

  //insert data into blob type for csv insertion
  const dataBlob = new Blob([forBlob],{type:'text/csv'});

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

function validateAux(val){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (val.value == "") {return true;}
  if ((val.type == 'email')  && (!(val.value.match(mailformat)))) {return true;}
}
