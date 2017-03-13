var joy;
var anger;
var sadness;
var fear;
var surprise;

var wordScores = [];

var totalScore = [];

$( document ).ready(function() {

var linesArray = [];

 





  // LOAD file and split line by line and append divs
$.get('sentences.txt', function(data) {    
    var lines = data.split("\n");

    $.each(lines, function(n, elem) {
       //$('.carcontent').append('<div>' + elem + '</div>');
       linesArray.push(elem);
       //console.log("n is " + n);
       $('.carousel').append('<div class=\"slide' + n + '\">' + elem + '</div>');
    });

$('.carousel').slick({
    arrows: true,
    infinite:true
  });
//console.log("lines array:" + linesArray);
/*
for(var i=0;i<linesArray.length;i++) {
  console.log("linesarray: " + linesArray[i]);
}*/

  


  var wordScores = [];

  var totalScore = [];

  var str = "i really hate the subway so much. it's always late";
  $('.carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      //console.log(nextSlide);
      //$('.slide' + index).prepend(element);
          //linesArray.forEach(doIt);
          doIt(linesArray[nextSlide],nextSlide,linesArray);
    });
  //var str = linesArray

  function doIt(element, index, array) {
    str = element;
    



  var words = str.split(" ");

  console.log(words);

  var wordsHTML = [];
  for(var i=0;i<words.length;i++) {
    wordsHTML[i] = words[i];
  }

  for(var i = 0; i < words.length; i++) {
        wordsHTML[i] = '<span class=\"aWord word' + i + '\">' + words[i] + ' </span>';
        /*if (i%5==0) {
          wordsHTML.splice(i,0,'<br>');
        }*/
  }

  console.log(wordsHTML);

  //$("#words2").prepend(wordsHTML.join(""));
  //$("#fakeWords2").prepend(wordsHTML.join(""));
  $(".slide1").html(wordsHTML.join(""));


//get whole sentence total score
$.post(
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

  $("#angryBox").html(angryHTML);
  $("#fearBox").html(fearHTML);
  $("#joyBox").html(joyHTML);
  $("#sadBox").html(sadHTML);
  $("#surpBox").html(surpHTML);

  /*$("#angryBox").prepend(angryHTML.join("<i title="Anger: ' + Math.round(angerPcnt) + '\%" class="em em-angry" style="font-size:' + totalAngerSize +'px;"></i>"));
  $("#fearBox").prepend(fearHTML.join("<i title="Fear: ' + Math.round(angerPcnt) + '\%" class="em em-fearful" style="font-size:' + totalFearSize +'px;"></i>"));
  $("#joyBox").prepend(joyHTML.join("<i title="Joy: ' + Math.round(angerPcnt) + '\%" class="em em-smiley" style="font-size:' + totalJoySize +'px;"></i>"));
  $("#sadBox").prepend(sadHTML.join("<i title="Sadness: ' + Math.round(angerPcnt) + '\%" class="em em-cry" style="font-size:' + totalSadnessSize +'px;"></i>"));
  $("#surpBox").prepend(surpHTML.join("<i title="Surprise: ' + Math.round(angerPcnt) + '\%" class="em em-open_mouth" style="font-size:' + totalSurpriseSize +'px;"></i>"));
*/

  console.log("totalScore in code is..");
console.log(totalScore);
});


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

var wordScore = function(words,i){
  if(i<words.length){
    $.post(
      'https://apiv2.indico.io/emotion',
      JSON.stringify({
        'api_key': "3950b1266fa13f83630be8e10cce7fa4",
        'data': words[i],
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

      var stuff= $('<div/>', {
        'class':'analysis' + i,
        'html':'<div class="val angerVal"><i title="Anger: ' + Math.round(angerPcnt) + '%\" class="em em-angry" style="font-size:' + angerSize +'px;\"></i></div> ' 
                + '<div class="val fearVal"><i title="Fear: ' + Math.round(fearPcnt) + '%\" class="em em-fearful" style="font-size:' + fearSize +'px;\"></i></div> '
                + '<div class="val joyVal"><i title="Joy: ' + Math.round(joyPcnt) + '%\" class="em em-smiley" style="font-size:' + joySize +'px;\"></i></div> '
                + '<div class="val sadVal"><i title="Sadness: ' + Math.round(sadnessPcnt) + '%\" class="em em-cry" style="font-size:' + sadnessSize +'px;"></i></div> '
                + '<div class="val surpVal"><i title="Surprise: ' + Math.round(surprisePcnt) + '%\"class="em em-open_mouth" style="font-size:' + surpriseSize +'px;\"></i></div> '
      });

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
      $('.word' + i).webuiPopover({content:stuff,animation:'pop',placement:'bottom', trigger:'hover'});

      wordScore(words,i+1);
    });
  }else{
    console.log(wordScores);
  }
}
wordScore(words,0);

   }//end doIt
   
});//end load txt

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

