var gifArray = ["Micky Mouse", "Donald Duck", "Buzz Lightyear", "Elsa", "Goofy", "Minnie Mouse"];
var giphyAPIKey = "QaQRN9wZhZfIxKBf1DxDasjnsXjgCoqS";

function renderButtons() {
    for (var i = 0; i < gifArray.length; i++) {
        var a = $("<button>");
        a.addClass("gif-button btn btn-primary");
        a.attr("data-character", gifArray[i]);
        a.text(gifArray[i]);
        $("#buttons").append(a);
    }

    $(".gif-button").on("click", function () {
        var character = $(this).attr("data-character");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=" + character + "+disney&limit=10&lang=en";
        axios({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.data.data);
            var results = response.data.data;
            var animationState = "still";
            // for (var i = 0;i < response.length; i++) {
            results.forEach(function (gif) {
                if (gif.rating !== "r") {
                    var gifDiv = $("<div class='gif-div'>");
                    var rating = gif.rating;
                    var characterStillImage = gif.images.fixed_height_still.url;
                    // var characterAnimatedImage = gif.images.fixed_height.url;

                    console.log(rating);
                    var p = $("<p class='rating'>").text("Rating: " + rating);
                    var characterStillImage = $("<img id='gif'>");
                    characterStillImage.attr("src", gif.images.fixed_height_still.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(characterStillImage);
                    $("#gif-section").prepend(gifDiv);
                };
            });

            // $("#gif").on("click", function () {
            //     var animationState = $(this).attr("data-state");
            //     if (state === "still") {
            //         $(this).atr("src", $(this).attr("data-animate"));
            //         $(this).attr("data-state", "animate");
            //     } else {
            //         $(this).atr("src", $(this).attr("data-still"));
            //         $(this).attr("data-state", "still");
            // };
        });
    });
}


// This function handles events where one button is clicked
$("#submit").on("click", function (event) {
    event.preventDefault();
    // console.log("bew button clicked");
    var gif = $("#giphy-search").val().trim();
    gifArray.push(gif);
    $("#buttons").empty();
    renderButtons();
});


renderButtons();


