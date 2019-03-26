// Funzionr chr aggiunge il mio titolo con quanto voglio scrivere dentro
function addTitle(title,orTit,lang,vote){

  var tempData = {

    title: title,
    orTit: orTit,
    lang: lang,
    vote: vote,
  }

  var template =$("#movie-template").html();
  var compiled = Handlebars.compile(template);
  var printedTitle = compiled(tempData);

  var ulMovies = $(".movies");
  ulMovies.append(printedTitle);
}


// Funzione che cicla nell'array e cerca quello che io voglio per ogni risultato
function ajaxRes(data){

  var results = data.results;
  for (var i=0; i < results.length; i++){

    var res = results[i];
    var title = res.title;
    var orTit = res.original_title;
    var lang = res.original_language;
    var vote = res.vote_average;

    addTitle(title,orTit,lang,vote);
  };
};


// Funzione che collega all'API che mi sono creata con postman
function ajaxCall (title){

  var outData ={

    api_key : "abf15a2efe1bddde74e9cbfe7712457a",
    language: "it-IT",
    query: title,
  };

  $.ajax({

    url:"https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data : outData,
    success: function(data){

      ajaxRes(data);

    },
    error: function(request,state,error){

      console.log("request",request);
      console.log("date",date);
      console.log("error",error);
    },
  });
};

// Funzione per collegare la ricerca del titolo a quanto voglio stampare

function init (){

  ajaxCall("Harry Potter e i");
}


$(document).ready(init);
