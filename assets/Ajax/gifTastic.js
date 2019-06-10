// Initial array of food and drink
var foodDrink = ["Burger", "Kabab", "Cake", "Pancakes", "Frenchfries", "Margarita", "Soda", "Beer", "pina colada"];
LIMIT = 5;
var DATA_ITEM;
var gifArray=[];
var META;
var metaArray=[];
// dynamically create buttons
function renderButtons() {
  for (var i = 0; i < foodDrink.length; i++) {
    var addButton = $("<button>");
    addButton.attr({
      "class": 'button showbutton',
      "data-item": foodDrink[i],
    });
    addButton.text(foodDrink[i]);
    $("#buttondisplay").append(addButton);

  }
}
//function for opening the Giphy API connection
function openconnection(DATA_ITEM ,LIMIT,metaArray) {
  
  var giphyURL = [];
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + DATA_ITEM + "&api_key=eb540ZBUIedT5TTDkoMEJbo9EC5pNd3P&limit=" + LIMIT + "";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    var divRow = $("<div>");
    divRow.addClass("row");
    console.log(queryURL);
    console.log("MetaURL "+metaArray);
    for(var i=0;i<metaArray-length;i++)
    {
      console.log("INside for meta");
      debugger;
      if(metaArray[i]==="Title")
      {
        var title=metaArray[i];
        console.log("Inside titlr"+title);
      }
      else if(metaArray[i]==="Tags")
      {
        var tags=metaArray[i];
        console.log("inside tags"+tags);
      }
    }
    for (var i = 0; i < response.data.length; i++) {
      
      var divColumn = $("<div>");
      divColumn.addClass("column");
      var card = $("<div>");
      card.addClass("card");
      var showImg = $("<Img>");
      var p = $("<p>").text("Rating :" +response.data[i].rating.toUpperCase());
      var animatedSrc = response.data[i].images.fixed_height.url;
      console.log(animatedSrc);
      var stillSrc = response.data[i].images.fixed_height_still.url;
      console.log(stillSrc);
      showImg.attr('src', stillSrc);
      showImg.addClass("foodgipsy card-img-top");
      showImg.attr("data-state", "still");
      showImg.attr("data-still", stillSrc);
      showImg.attr("data-animate", animatedSrc);
      card.append(showImg);
      card.append(p);
      divColumn.append(card);
      divRow.append(divColumn);
      $(".container").append(divRow);
      gifArray.push(divRow);

    }

  });
}




// This function handles events where one button is clicked
$(document).on("click", "#add-food", function () {

  event.preventDefault();
  console.log("Inside click event");

  $("#buttondisplay").empty();
  var input = $("#food-input").val().trim();
  foodDrink.push(input);
  renderButtons();
  $("#food-input").val(" ");
});
//   displays the image when the button clicked.
$(document).on("click", ".showbutton", function () {
  DATA_ITEM = $(this).attr("data-item");
  DATA_ITEM.replace(/ /g, "+");
  console.log(DATA_ITEM);
  $(".container").empty();
  openconnection(DATA_ITEM,LIMIT);
});
// Displaying additional gifs on user request.
$(document).on("click", "#add-gif", function () {
  event.preventDefault();
  LIMIT = $("input[name='gif']:checked").val();
  console.log(LIMIT);
  openconnection(DATA_ITEM,LIMIT);

//dipslaying the Metas
});
$(document).on("click", "#display-meta", function () {
  event.preventDefault();
  $("input[name='meta']:checked").each(function() {
    metaArray.push($(this).val());
});
   
  console.log("LIMIT:::"+ LIMIT);
  console.log("META:   "+metaArray)

  openconnection(DATA_ITEM,LIMIT,metaArray);
 metaArray.splice(0, metaArray.length);
});
$(document).on("click", ".foodgipsy", function () {

 var state= $(this).attr("data-state");
 if(state==="still")
 {
  var animates = $(this).attr("data-animate");
  //change giphy link to the one to animate
  $(this).attr("src", animates);
  //change state of giphy to animate
      $(this).attr("data-state", "animate");
  } else {
      var still = $(this).attr("data-still");
      //change giphy link to the one that is still
      $(this).attr("src", still);
      //change state of giphy to animate
      $(this).attr("data-state", "still");
}
$("#buttondisplay").empty();
renderButtons();
 });



//   Funtion call starts here.
$(document).ready(function (event) {
  renderButtons();
});
