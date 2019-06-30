var gifArray = ["Micky Mouse", "Donald Duck", "Roger Rabit", "Goofy", "Minnie Mouse"];
var giphyAPIKey = "QaQRN9wZhZfIxKBf1DxDasjnsXjgCoqS";
// var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=" + searchQuery + "&limit=10&offset=0&rating=PG&lang=en";
var searchQuery = "Donald Duck";




function renderButtons() {
    for (var i = 0; i < gifArray.length; i++) {
        var a = $("<button>");
        a.addClass("gif-button");
        a.attr("data-character", gifArray[i]);
        a.text(gifArray[i]);
        $("#buttons").append(a);
    }
}


// This function handles events where one button is clicked
$("#submit").on("click", function (event) {
    event.preventDefault();
    var gif = $("#giphy-search").val().trim();
    gifArray.push(gif);
    $("#buttons").empty();
    renderButtons();
});



renderButtons();

$("button").on("click", function () {
    var character = $(this).attr("data-character");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=" + character + "+disney&limit=10&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.data);
        var results = response.data;
        // for (var i = 0;i < response.length; i++) {
        results.forEach(function (gif) {
            if (gif.rating !== "r") {
                var gifDiv = $("<div class='gif-div'>");
                var rating = gif.rating;
                console.log(rating);
                var p = $("<p>").text("Rating: " + rating);
                var characterImage = $("<img>");
                characterImage.attr("src", gif.images.fixed_height.url);
                gifDiv.prepend(p);
                gifDiv.prepend(characterImage);
                $("#gif-section").prepend(gifDiv);
            }
        })



    });
})
