//Validates webform for correct inputs and marks inputs in red if required
function validateForm(){
  testValidateAux();

  var forBlob = "";

  const data = [
    {key:'name', error:{color:'red',element:'borderColor'}},
    {key:'gender', error:{color:'red',element:'color'}},
    {key:'email', error:{color:'red',element:'borderColor'}},
    {key:'iseasy', error:{color:'red',element:'color'}},
  ];

  var i;
  for(i = 0; i < data.length; i++){
    if(!validateAux(document.forms.personalInfo[data[i].key])){
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

} //end validateForm

//Returns
function validateAux(input){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var val = input.value.trim();
  if (val == "") {return false;}
  if ((input.type == 'email')  && (!(val.match(mailformat)))) {return false;}
  return true;
} //end validateAux

//Unit Test for validateAux
function testValidateAux(){
  const cases = [
    {input:{name:{value:"",type:""}, gender:{value:"",type:""}, email:{value:"",type:"email"}, iseasy:{value:"",type:""}},
     output:{name:false, gender:false, email:false, iseasy:false}},
    {input:{name:{value:" ",type:""}, gender:{value:" ",type:""}, email:{value:" ",type:"email"}, iseasy:{value:" ",type:""}},
     output:{name:false, gender:false, email:false, iseasy:false}},
    {input:{name:{value:"Vin",type:""}, gender:{value:"Male",type:""}, email:{value:"vin@vin",type:"email"}, iseasy:{value:"true",type:""}},
     output:{name:true, gender:true, email:false, iseasy:true}},
    {input:{name:{value:"Bob",type:""}, gender:{value:"Male",type:""}, email:{value:"bobby@.com",type:"email"}, iseasy:{value:" ",type:""}},
     output:{name:true, gender:true, email:false, iseasy:false}},
    {input:{name:{value:"Vin Ndokaj",type:""}, gender:{value:"Male",type:""}, email:{value:"@.com",type:"email"}, iseasy:{value:"true",type:""}},
     output:{name:true, gender:true, email:false, iseasy:true}},
    {input:{name:{value:"Haidar",type:""}, gender:{value:"Male",type:""}, email:{value:"haidar@e.e",type:"email"}, iseasy:{value:"false",type:""}},
     output:{name:true, gender:true, email:false, iseasy:true}},
    {input:{name:{value:"Isabella",type:""}, gender:{value:"Female",type:""}, email:{value:"iz@.edu",type:"email"}, iseasy:{value:"true",type:""}},
     output:{name:true, gender:true, email:false, iseasy:true}},
    {input:{name:{value:"Tyna",type:""}, gender:{value:"Female",type:""}, email:{value:"bpl@bpl.e",type:"email"}, iseasy:{value:"",type:""}},
     output:{name:true, gender:true, email:false, iseasy:false}},
    {input:{name:{value:"Ronnie Coleman",type:""}, gender:{value:"Male",type:""}, email:{value:"yeah@buddy.com",type:"email"}, iseasy:{value:"true",type:""}},
     output:{name:true, gender:true, email:true, iseasy:true}},
  ]
  console.log("Test cases:");
  var i;
  for(i = 0; i < cases.length; i++){
    if(
      validateAux(cases[i].input.name) != cases[i].output.name ||
      validateAux(cases[i].input.gender) != cases[i].output.gender ||
      validateAux(cases[i].input.email) != cases[i].output.email ||
      validateAux(cases[i].input.iseasy) != cases[i].output.iseasy
    ) {console.log("Case " + i + " failed.");}
    else {console.log("Case " + i + " passed.");}
  }
} //end testValidateAux
