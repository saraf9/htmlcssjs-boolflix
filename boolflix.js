

function printMovie(dataList){

  var movie = $(".movie");
  movie.remove();

  var movieContainer = $(".movie-container");

  var template = $("#movie-template").html();
  var compiled = Handlebars.compile(template);

  for (var i = 0; i < dataList.length; i++){

    var data = dataList[i];
    var tempData = {

        title: data.title,
        orTit: data.original_title,
        lang: data.original_language,
        vote: data.vote_average,
      }

    var movie = compiled(tempData);
    movieContainer.append(movie);
  }

}

function ajaxSearchMovie(val){

  var outData = {

    api_key : "abf15a2efe1bddde74e9cbfe7712457a",
    language: "it-IT",
    query: val,
  };


  $.ajax({

    url:"https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data : outData,
    success: function(inData){

      var resultsM = inData.results;
      var countM = resultsM.length;

      if (countM > 0){

        printMovie(resultsM);

      };

    },
    error: function(request,state,error){

      console.log("request",request);
      console.log("state",state);
      console.log("error",error);
    },
  });
}


// Funzione per collegare la ricerca del titolo a quanto voglio stampare
function searchByBtn(input){

  var input = $("#film-input");
  var val = input.val();

  ajaxSearchMovie(val);
}


function init (){


  var btn = $("#btn");
  btn.click(searchByBtn);

  var inputFilm = $("#film-input");

  inputFilm.on("keyup", function(e){


    if (e.which == 13){
      searchByBtn();
    }
  })

}


$(document).ready(init);
