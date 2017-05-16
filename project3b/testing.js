	
var d = new Date();
var pred = new Date(d.getFullYear(),d.getMonth()+1,0).getDate();

var nowd;
var sat_array = "";
var sun_array = "";


for (i=1;i<=pred;i++) {

  try {
    console.log(d.getFullYear()+ "-" + (d.getMonth()+1) + "-" + i);
    nowd = new Date(d.getFullYear()+ "-" + (d.getMonth()+1) + "-" + i)

    if (nowd.getUTCDay() == 5)
    {
        sat_array = sat_array + "," + i;
    }

    if (nowd.getUTCDay() == 6)
    {
        sun_array = sun_array + "," + i;
    }


  }
  catch(e) {
      return;
  }

}

console.log("SAT list : " +sat_array);
console.log("SUN list : " +sun_array);