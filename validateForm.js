function validateForm(){
  var name = document.forms.personalInfo.name;
  var gender = document.forms.personalInfo.gender;
  var email = document.forms.personalInfo.email;
  var iseasy = document.forms.personalInfo.iseasy;
  var data = [name, gender, email, iseasy];

  var i;
  var len = data.length;
  for(i = 0; i < len; i++){
    if(validateAux(data[i])){
      console.log("IN THE IF: " + i);
      return false;
    }
  }

  //insert data into blob type for csv insertion
  const dataBlob = new Blob([data.toString()],{type:'text/csv'});

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
