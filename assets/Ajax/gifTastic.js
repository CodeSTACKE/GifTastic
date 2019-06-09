// Initial array of food and drink
var foodDrink = ["Burger", "Kabab", "Cake", "Pancakes","Frenchfries","Margarita","Soda","Beer","pina colada"];

// dynamically create buttons
function renderButtons() {      
    for (var i = 0; i < foodDrink.length; i++) {
      var addButton = $("<button>");
      addButton.attr({
        "class":'button',
        "data-item": foodDrink[i],
      });
      addButton.text(foodDrink[i]);
      $("#buttondisplay").append(addButton);
      
    }
  }
//function for opening the Giphy API connection
function openconnection(food){
   var LIMIT=5;
   var giphyURL=[];
    var queryURL= "https://api.giphy.com/v1/gifs/search?q="+food+"&api_key=eb540ZBUIedT5TTDkoMEJbo9EC5pNd3P&limit="+LIMIT+"";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
   
    console.log(queryURL);
     for(var i=0;i< response.data.length;i++)
   {
    //    debugger;
    var rating=response.data[i].rating;
    console.log(rating);
      var animatedSrc= response.data[i].images.fixed_height.url ;
      console.log(animatedSrc);
      var stillSrc=response.data[i].images.fixed_height_still.url;
      console.log(stillSrc);
       var showImg=$("<Img>");
       var p = $("<p>").text("Rating: " + rating);
       showImg.attr('src', stillSrc);
       showImg.addClass("foodgipsy");
        	showImg.attr("data-state", "still");
        	showImg.attr("data-still", stillSrc);
        	showImg.attr("data-animate", animatedSrc);
        	$("#imagedp_gif").append(p);
        	$("#imagedp_gif").append(showImg);
            
   }

});
}




 // This function handles events where one button is clicked
 $(document).on("click","#add-food", function () {
    
     event.preventDefault();
    console.log("Inside click event");
    
    $("#buttondisplay").empty();
    var input = $("#food-input").val().trim();
    foodDrink.push(input);
    renderButtons();
    $("#food-input").val(" ");
  });
//   displays the image when the button clicked.
$(document).on("click",".button", function () {
    var dataItem=$(this).attr("data-item");
    dataItem.replace(/ /g, "+");
    console.log(dataItem);
    openconnection(dataItem);
});
//   Funtion call starts here.
  $(document).ready(function(event){
     renderButtons();
  });
 