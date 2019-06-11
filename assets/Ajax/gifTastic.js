// Initial array of food and drink
var foodDrink = ["Burger", "Kabab", "Cake", "Pancakes", "Frenchfries", "Margarita", "Soda", "Beer", "pina colada"];
LIMIT = 5;
var DATA_ITEM;
var gifArray=[];
var META1=null;
var META2=null;


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
function openconnection(DATA_ITEM ,LIMIT) {
  
  var p;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + DATA_ITEM + "&api_key=eb540ZBUIedT5TTDkoMEJbo9EC5pNd3P&limit=" + LIMIT + "";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    
    console.log("Insde open connection"+META1,META2);
    var divRow = $("<div>");
    divRow.addClass("row");
    console.log(queryURL);
     for (var i = 0; i < response.data.length; i++) {
      var divColumn = $("<div>");
      divColumn.addClass("column");
      var card = $("<div>");
      card.addClass("card");
      var showImg = $("<Img>");
       p = $("<p>").text("Rating :" +response.data[i].rating.toUpperCase());
        if(META1===null && META2===null)
       console.log("Meta is null");
        else if(META1==="title" &&  META2==="type"){
         var title = $("<p>").text("Title :" +response.data[i].title.toUpperCase());
         var type= $("<p>").text("Type :" +response.data[i].type.toUpperCase());
         p.append(title);
         p.append(type);
         console.log("Inside if condition 2"+title);
         console.log("Inside if condition 2"+type);
         

       }
       else if(META1==="title" && META2===null)
       {
         var title = $("<p>").text("Title :" +response.data[i].title.toUpperCase());
         console.log("Inside if condition 2"+title);
         p.append(title);
         console.log("Inside if condition 2"+title);
         
         
       }
       else if(META1==="null" && META2==="type")
       {
         var type= $("<p>").text("Type :" +response.data[i].type.toUpperCase());
         p.append(type);
         console.log("Inside if condition 2"+type);
         
       }  
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
  console.log("ISIDE"+LIMIT);
  //intializin the meta variable to null 
  meta2=null;
  meta1=null;
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
  LIMIT=0;
  console.log("LIMIT 0:"+LIMIT);
   console.log(($("input[name='gif']:checked").val()));
  if(($("input[name='gif']:checked").val())==="5")
  {
    LIMIT=5;
    
    $("#5").prop("checked",false);
    $("#10").prop("checked",false);
    console.log("LIMIT 5:"+LIMIT);
  }
  else 
  if(($("input[name='gif']:checked").val())==="10")
  {
    LIMIT=10;
    $("#10").prop("checked",false);
    $("#5").prop("checked",false);
    console.log("LIMIT 10:"+LIMIT);
  }
  else{
    alert("please select one ");
  }
  openconnection(DATA_ITEM,LIMIT);
  LIMIT=5;
  

//dipslaying the Metas
});
$(document).on("click", "#display-meta", function () {
  event.preventDefault();
  
  var chkArray=[];
  
  $(".chk:checked").each(function() {
		chkArray.push($(this).val().toLowerCase());
	});
	
	/* we join the array separated by the comma */
  var selected;
  var array1=[];
  selected = chkArray.join(',') ;
  console.log(chkArray);
	if(selected.length > 0){
    console.log("You have selected " + selected);	
        array1=selected.split(",");
        META1=array1[0];
        META2=array1[1];
       

        console.log(META1,META2);
    openconnection(DATA_ITEM,LIMIT);
    $("#title").prop("checked",false);
    $("#type").prop("checked",false);
	}else{
		alert("Please at least check one of the checkbox");	
	}

});
   
 


//Animate the gifs from Still to Animate.
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
