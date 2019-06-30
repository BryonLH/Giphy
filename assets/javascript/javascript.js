var giphys = ["Micky Mouse", "Donald Duck", "Roger Rabit", "Goofy", "Minnie Mouse"];
var giphyAPIKey = "QaQRN9wZhZfIxKBf1DxDasjnsXjgCoqS";
var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=" + searchQuery + "&limit=15&offset=0&rating=PG&lang=en";
var searchQuery = "Donald Duck";

$.ajax({
    url: giphyURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
  });

function renderButtons() {
    for (var i = 0; i < giphys.length; i++) {
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", giphys[i]);
        a.text(giphys[i]);
        $("#buttons").append(a);
      }
    }

    // This function handles events where one button is clicked
    $("#add-movie").on("click", function(event) {
      event.preventDefault();

      var gif = $("#giphys")
        .val()
        .trim();

      giphys.push(gif);

      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
    });


    $("#submit").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var gif = $("#giphy-search")
          .val()
          .trim();

        // The movie from the textbox is then added to our array
        giphys.push(gif);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      renderButtons();