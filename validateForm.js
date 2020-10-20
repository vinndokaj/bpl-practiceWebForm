function validateForm(){
  var forBlob = "";

  const data = [
    {key:'name', error:{color:'red',element:'borderColor'}},
    {key:'gender', error:{color:'red',element:'color'}},
    {key:'email', error:{color:'red',element:'borderColor'}},
    {key:'iseasy', error:{color:'red',element:'color'}},
  ];

  var i;
  for(i = 0; i < data.length; i++){
    if(validateAux(document.forms.personalInfo[data[i].key])){
      document.getElementById(data[i].key).style[data[i].error.element] = data[i].error.color;
      return false;
    }
    forBlob += document.forms.personalInfo[data[i].key].value + ",";
  }
  //console.log(forBlob);

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

function validateAux(input){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var val = input.value.trim();
  if (val == "") {return true;}
  if ((input.type == 'email')  && (!(val.match(mailformat)))) {return true;}
  return false;
}
