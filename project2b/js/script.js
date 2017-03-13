var joy;
var anger;
var sadness;
var fear;
var surprise;

var wordScores = [];

var totalScore = [];

var linesArray = [];

var m = 0;

$( document ).ready(function() {

    // LOAD file and split line by line
$.get('sentences.txt', function(data) {    
    var lines = data.split("\n");
    $.each(lines, function(n, elem) {
       //$('.carcontent').append('<div>' + elem + '</div>');
       linesArray.push(elem);
       //console.log("n is " + n);
       //$('.carousel').append('<div class=\"slide' + n + '\">' + elem + '</div>');
    });



  var wordScores = [];

  var totalScore = [];

  ////var str = "i really hate the subway so much. it's always late";
  $( "#showNext" ).click(function() {
  //alert( "Handler for .click() called." );
      $('#totalVals').css('visibility','visible');
      $('.leftCol').addClass("animated fadeIn");
      $('.leftCol').one(
          'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
          $('.leftCol').removeClass("fadeIn")
        );


      $('.em').css('font-size','16px');

      $('.angerVal').html("--%"); 
      $('.fearVal').html("--%");  
      $('.joyVal').html("--%"); 
      $('.sadVal').html("--%"); 
      $('.surpVal').html("--%"); 
    


  if(m>=linesArray.length) {
    console.log("end")
    $('#showNext').css('display','none');
    $('#words2').css('font-style','italic');
    $("#words2").html("fin.");
    $("#totalVals").html("");
  }
  else {
  $("#words2").html("");
  /*$("#angryBox").html("");
  $("#fearBox").html("");
  $("#joyBox").html("");
  $("#sadBox").html("");
  $("#surpBox").html("");*/


  var str = linesArray[m];
  var words = str.split(" ");
  var wordsCumulative = [];

  console.log(words);

  var wordsHTML = [];
  for(var i=0;i<words.length;i++) {
    //wordsHTML[i] = words[i];
    wordsHTML[i] = '<span class=\"aWord word' + i + '\">' + words[i] + ' </span>';
    if(i>0) {
      wordsCumulative[i] = wordsCumulative[i-1] + " " + words[i];
      console.log("wordsCum is " + wordsCumulative[i])
    }
    else {
      wordsCumulative[i] = words[i];
      console.log("wordsCum at 0 is " + wordsCumulative[i]);
    }
  }

  //for(var i = 0; i < words.length; i++) {
  //      wordsHTML[i] = '<span class=\"aWord word' + i + '\">' + words[i] + ' </span>';
        /*if (i%5==0) {
          wordsHTML.splice(i,0,'<br>');
        }*/
  //}

  console.log(wordsHTML);

  $("#words2").prepend(wordsHTML.join(""));
  //$('.leftCol').css('visibility','hidden');
  //$('.leftCol').addClass("fadeOut");
  //$('.leftCol').removeClass("fadeOut");
  //$('.leftCol').addClass("animated fadeIn");
  //$("#fakeWords2").prepend(wordsHTML.join(""));


//get whole sentence total score
/*$.xpost(
  'https://apiv2.indico.io/emotion',
  JSON.stringify({
    'api_key': "3950b1266fa13f83630be8e10cce7fa4",
    'data': str,
    'threshold': 0.001
  })
).then(function(res) {
  var obj = JSON.parse(res);
  totalScore = getEmotionTotalScore(obj);

  var totalAngerPcnt = totalScore[0] * 100;
  var totalFearPcnt = totalScore[1] * 100;
  var totalJoyPcnt = totalScore[2] * 100;
  var totalSadnessPcnt = totalScore[3] * 100;
  var totalSurprisePcnt = totalScore[4] * 100;

  var totalAngerSize = totalAngerPcnt/1.1;
  var totalFearSize = totalFearPcnt/1.1;
  var totalJoySize = totalJoyPcnt/1.1;
  var totalSadnessSize = totalSadnessPcnt/1.1;
  var totalSurpriseSize = totalSurprisePcnt/1.1;

  var angryHTML = '<i title="Anger: ' + Math.round(totalAngerPcnt) + '%\" class="em em-angry" style="font-size:' + totalAngerSize +'px;\"></i>';
  var fearHTML = '<i title="Fear: ' + Math.round(totalFearPcnt) + '%\" class="em em-fearful" style="font-size:' + totalFearSize +'px;\"></i>';
  var joyHTML = '<i title="Joy: ' + Math.round(totalJoyPcnt) + '%\" class="em em-smiley" style="font-size:' + totalJoySize +'px;"></i>';
  var sadHTML = '<i title="Sadness: ' + Math.round(totalSadnessPcnt) + '%\" class="em em-cry" style="font-size:' + totalSadnessSize +'px;\"></i>';
  var surpHTML = '<i title="Surprise: ' + Math.round(totalSurprisePcnt) + '%\" class="em em-open_mouth" style="font-size:' + totalSurpriseSize +'px;\"></i>';

  console.log("surp is " + totalSurprisePcnt);

  $("#angryBox").prepend(angryHTML);
  $("#fearBox").prepend(fearHTML);
  $("#joyBox").prepend(joyHTML);
  $("#sadBox").prepend(sadHTML);
  $("#surpBox").prepend(surpHTML);

  //$("#angryBox").prepend(angryHTML.join("<i title="Anger: ' + Math.round(angerPcnt) + '\%" class="em em-angry" style="font-size:' + totalAngerSize +'px;"></i>"));
  //$("#fearBox").prepend(fearHTML.join("<i title="Fear: ' + Math.round(angerPcnt) + '\%" class="em em-fearful" style="font-size:' + totalFearSize +'px;"></i>"));
  //$("#joyBox").prepend(joyHTML.join("<i title="Joy: ' + Math.round(angerPcnt) + '\%" class="em em-smiley" style="font-size:' + totalJoySize +'px;"></i>"));
  //$("#sadBox").prepend(sadHTML.join("<i title="Sadness: ' + Math.round(angerPcnt) + '\%" class="em em-cry" style="font-size:' + totalSadnessSize +'px;"></i>"));
  //$("#surpBox").prepend(surpHTML.join("<i title="Surprise: ' + Math.round(angerPcnt) + '\%" class="em em-open_mouth" style="font-size:' + totalSurpriseSize +'px;"></i>"));



  console.log("totalScore in code is..");
console.log(totalScore);
});*/


// //get each word score
// for(var i=0;i < words.length;i++) {
//   console.log("in loop " + words[i]);
//       $.post(
//     'https://apiv2.indico.io/emotion',
//     JSON.stringify({
//       'api_key': "3950b1266fa13f83630be8e10cce7fa4",
//       'data': words[i],
//       'threshold': 0.001
//     })
//   ).then(function(res) {
     
//     var obj = JSON.parse(res);
//     wordScores[i] = getEmotionScores(obj);

//   });
//  console.log("in loop & then : " + words[i]);
//      console.log("For word: " + words[i] + ", the wordScore is...");
//     console.log(wordScores[i]);

// }

//get cumulative words scores
var wordScore = function(wordsCumulative,i){
  if(i<words.length){
    $.post(
      'https://apiv2.indico.io/emotion',
      JSON.stringify({
        'api_key': "3950b1266fa13f83630be8e10cce7fa4",
        'data': wordsCumulative[i],
        'threshold': 0.001
      })
    ).then(function(res) {
      var obj = JSON.parse(res);
      wordScores[i] = getEmotionScores(obj);

      //format scores to put into popover
      var intWordScores = [];
      var num = wordScores.length;

      var angerPcnt = wordScores[i][0] * 100;
      var fearPcnt = wordScores[i][1] * 100;
      var joyPcnt = wordScores[i][2] * 100;
      var sadnessPcnt = wordScores[i][3] * 100;
      var surprisePcnt = wordScores[i][4] * 100;

      var angerSize = angerPcnt/1.1;
      var fearSize = fearPcnt/1.1;
      var joySize = joyPcnt/1.1;
      var sadnessSize = sadnessPcnt/1.1;
      var surpriseSize = surprisePcnt/1.1;

      //compile popover content
      /*var stuff= $('<div/>', {
        'class':'analysis' + i,
        'html':'<div class="val angerVal"><i title="Anger: ' + Math.round(angerPcnt) + '%\" class="em em-angry" style="font-size:' + angerSize +'px;\"></i></div> ' 
                + '<div class="val fearVal"><i title="Fear: ' + Math.round(fearPcnt) + '%\" class="em em-fearful" style="font-size:' + fearSize +'px;\"></i></div> '
                + '<div class="val joyVal"><i title="Joy: ' + Math.round(joyPcnt) + '%\" class="em em-smiley" style="font-size:' + joySize +'px;\"></i></div> '
                + '<div class="val sadVal"><i title="Sadness: ' + Math.round(sadnessPcnt) + '%\" class="em em-cry" style="font-size:' + sadnessSize +'px;"></i></div> '
                + '<div class="val surpVal"><i title="Surprise: ' + Math.round(surprisePcnt) + '%\"class="em em-open_mouth" style="font-size:' + surpriseSize +'px;\"></i></div> '
      });*/


      /*var angryHTML = '<i title="Anger: ' + Math.round(angerPcnt) + '%\" class="em em-angry" style="font-size:' + angerSize +'px;\"></i>';
      var fearHTML = '<i title="Fear: ' + Math.round(fearPcnt) + '%\" class="em em-fearful" style="font-size:' + fearSize +'px;\"></i>';
      var joyHTML = '<i title="Joy: ' + Math.round(joyPcnt) + '%\" class="em em-smiley" style="font-size:' + joySize +'px;"></i>';
      var sadHTML = '<i title="Sadness: ' + Math.round(sadnessPcnt) + '%\" class="em em-cry" style="font-size:' + sadnessSize +'px;\"></i>';
      var surpHTML = '<i title="Surprise: ' + Math.round(surprisePcnt) + '%\" class="em em-open_mouth" style="font-size:' + surpriseSize +'px;\"></i>';*/

      //console.log("surp is " + totalSurprisePcnt);

      var angerNum = Math.round(angerPcnt);
      var fearNum = Math.round(fearPcnt);
      var joyNum = Math.round(joyPcnt);
      var sadNum = Math.round(sadnessPcnt);
      var surpNum = Math.round(surprisePcnt);

      /*angryHTML += '<div class=\"num angerNum\">' + angerNum + '%</div>';
      fearHTML += '<div class=\"num fearNum\">' + fearNum + '%</div>';
      joyHTML += '<div class=\"num joyNum\">' + joyNum + '%</div>';
      sadHTML += '<div class=\"num sadNum\">' + sadNum + '%</div>';
      surpHTML += '<div class=\"num surpNum\">' + surpNum + '%</div>';*/

      /*$("#angryBox").html(angryHTML);
      $("#fearBox").html(fearHTML);
      $("#joyBox").html(joyHTML);
      $("#sadBox").html(sadHTML);
      $("#surpBox").html(surpHTML);*/

   /*   $('.em').css('transition','font-size 0.8s linear');
      $('.em-angry').css('font-size',angerSize);
      $('.em-fearful').css('font-size',fearSize);
      $('.em-smiley').css('font-size',joySize);
      $('.em-cry').css('font-size',sadnessSize);
      $('.em-open_mouth').css('font-size',surpriseSize);
*/

      
      $('.em-angry').animate({'font-size': angerSize}, 300); 
      $('.em-fearful').animate({'font-size': fearSize}, 300); 
      $('.em-smiley').animate({'font-size': joySize}, 300); 
      $('.em-cry').animate({'font-size': sadnessSize}, 300); 
      $('.em-open_mouth').animate({'font-size': surpriseSize}, 300); 

      $('.word' + i).css('background','#D69963');
      $('.word' + i).css('transition','background 0.1s linear');
      $('.word' + i).css('color','#000');
      //$('.word' + i).addClass("animated fadeIn");
     /* $('.word' + i).animate( { backgroundColor: '#d1d1d1', color: '#fff' });
      $('.word' + i).animate( { backgroundColor: '',        color: ''     });*/

      $('.angerVal').html(angerNum + "%"); 
      $('.fearVal').html(fearNum + "%");  
      $('.joyVal').html(joyNum + "%"); 
      $('.sadVal').html(sadNum + "%"); 
      $('.surpVal').html(surpNum + "%"); 


      /*var stuff= $('<div/>', {
        'class':'analysis' + i,
        'html':'<div class="angerVal">Anger: ' 
                + angerPcnt + "%"+ '</div>'
                + '<div class="fearVal">Fear: '
                + fearPcnt + "%"+ '</div>'
                + '<div class="joyVal"><i class="em em-smiley" style="font-size:' + joySize +'px;"></i>: '
                + joyPcnt + "%"+ '</div>'
                + '<div class="sadVal">Sadness: '
                + sadnessPcnt + "%"+ '</div>'
                + '<div class="surpVal">Surprise: '
                + surprisePcnt + "%"+ '</div>'
      });*/

     /* var stuff = document.createElement('div');
      $(stuff).addClass('stuff' + i)
              .html("text");*/
              //.appendTo($("."));

     /* while(i < num) {
        i++;
      }*/

        //for(var i=0;i<num;i++) {
          //intWordScores[i] = parseInt(wordScores[i]);
        //}
          console.log(intWordScores);
      //for(var i=0;i<wordScores.length;i++) {
        //percentages[i] = wordScores[i] * 10;
              //console.log(wordScores[i]);

     // }


      
/*      $('.word' + i).webuiPopover({content:wordScores[i].toString(),animation:'pop',placement:'bottom', trigger:'hover'});
*/      
      //$('.word' + i).webuiPopover({content:stuff,animation:'pop',placement:'bottom', trigger:'hover'});

      //show each result and do animation

      setTimeout(function(){ wordScore(wordsCumulative,i+1); }, 400);
      //wordScore(wordsCumulative,i+1);
    });
  }else{
    console.log(wordScores);
  }
}
setTimeout(function(){ wordScore(wordsCumulative,0); }, 400);
//wordScore(wordsCumulative,0);

 m++;
}//end if m
});//showNext 
});//end get load txt
$( "#showNext" ).trigger( "click" );
}); //end document.ready

function getEmotionTotalScore(o) {
  var scoresArray = [];

  anger = o.results.anger;
  fear = o.results.fear;
  joy = o.results.joy;
  sadness = o.results.sadness;
  surprise = o.results.surprise;

  totalScore = [anger,fear,joy,sadness,surprise];
console.log("totalScore in fnc is " + totalScore);
  return totalScore;
}

function getEmotionScores(o) {
  var scoresArray = [];

  anger = o.results.anger;
  fear = o.results.fear;
  joy = o.results.joy;
  sadness = o.results.sadness;
  surprise = o.results.surprise;

  scoresArray = [anger,fear,joy,sadness,surprise];
console.log("scoresArray in fnc is... ");
console.log(scoresArray);
  return scoresArray;
}
/*
$(function() {
  $('.aWord').hover(function() {
    $('.aWord').css('color', '#FFD1A7');
  }, function() {
    // on mouseout, reset the background colour
    $('.aWord').css('color', '#D69963');
  });
});

$(function() {
  $('#summaryVals').hover(function() {
    $('.aWord').css('color', '#FFD1A7');
  }, function() {
    // on mouseout, reset the background colour
    $('.aWord').css('color', '#D69963');
  });
});*/

