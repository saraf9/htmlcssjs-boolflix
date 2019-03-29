
// Funzione per la creazione delle stelle
function createStars(vote){

  vote /= 2;

  var str = "";
  for (var i=1; i <=5; i++){

    if (i <= vote){
    str += '<i class="fas fa-star"></i>'
    }else{

    str += '<i class="far fa-star"></i>'
    }
  }
  return str;
}


// Funzione per la creazione delle bandiere in base al linguaggio
function createFlagPic(flag){

  var flagPic;

  switch(flag){

    case "en":
      flagPic = "<img src='img/en.png' width='30px'>";
    break;
    case "it":
      flagPic = "<img src='img/it.png' width='30px'>";
    break;
    case "ger":
      flagPic = "<img src='img/ger.png' width='30px'>";
    break;
    case "fr":
      flagPic = "<img src='img/fr.png' width='30px'>";
    break;
    case "usa":
      flagPic = "<img src='img/usa.png' width='30px'>";
    break;
    case "es":
      flagPic = "<img src='img/es.png' width='30px'>";
    break;
    default:
    flagPic = "<img src='img/nan.png' width='30px'>";
  }

  return flagPic;
}


// Funzione per la creazione dell'immagine di copertina con i relativi link
function getLinkImg(posterPath){

  var imgSrc = "https://image.tmdb.org/t/p/w342";

  if (posterPath == null){

     imgSrc = "img/nan.png"

  } else {

    imgSrc += posterPath;
  }

  return imgSrc;
}

// Funzione per la stampa del film
function printMovie(dataList){

  var movie = $(".movie");
  movie.remove();

  var movieContainer = $(".movie-container");

  var template = $("#movie-template").html();
  var compiled = Handlebars.compile(template);

  for (var i = 0; i < dataList.length; i++){

    var data = dataList[i];

    var tempData = {

      type: "Movie",
      title: data.title,
      orTit: data.original_title,
      lang: data.original_language,
      langPic: createFlagPic(data.original_language),
      vote: Math.ceil(data.vote_average) ,
      stars: createStars(data.vote_average),
      imgSrc: getLinkImg(data.poster_path),
      overview: data.overview,
    }

    var movie = compiled(tempData);
    movieContainer.append(movie);
  }
}



// Funzione per la stampa della serieTv
function printSeries(dataList){


  var movieContainer = $(".movie-container");

  var template = $("#movie-template").html();
  var compiled = Handlebars.compile(template);

  for (var i = 0; i < dataList.length; i++){

    var data = dataList[i];
    var tempData = {

      type: "SerieTv",
      title: data.name,
      orTit: data.original_name,
      lang: data.original_language,
      langPic: createFlagPic(data.original_language),
      vote: Math.ceil(data.vote_average) ,
      stars: createStars(data.vote_average),
      imgSrc: getLinkImg(data.poster_path),
      overview: data.overview,
    };

    var serie = compiled(tempData);
    movieContainer.append(serie);
  }
}



// Funzione per il collegamento ajax all'API per i film
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
};


//Funzione di collegamento ajax all'API per le serie tv
function ajaxSearchTv(val){

  var outData = {

    api_key : "abf15a2efe1bddde74e9cbfe7712457a",
    language: "it-IT",
    query: val,
  };


  $.ajax({

    url:"https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data : outData,
    success: function(inData){

      var resultsS = inData.results;
      var countS = resultsS.length;

      if (countS > 0){

        printSeries(resultsS);

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
  ajaxSearchTv(val);
}

//Funzione che mi serve per la barra di ricerca da mostrare o no
function showInput(){


  var inputFilm = $("#film-input");

  if( inputFilm.hasClass("open")){

    searchByBtn();
  }else{

    inputFilm.show({direction: "left"});
    inputFilm.addClass("open");
  }
};


function init (){

  var btn = $("#btn");

  btn.click(showInput);


  var inputFilm = $("#film-input");
  inputFilm.on("keyup", function(e){

    if (e.which == 13){
      searchByBtn();
    }
  })
}


$(document).ready(init);
