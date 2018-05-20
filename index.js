// main document ready function to check if dom is loaded fully or not

let omdbToken;

$(document).ready(() => {

    let var_id;
    let src_split;
    let final_img;
    let img_src;
    let carousel_id;

    $("#dropdown-menu1 a.dropdown-item").click(function() {

        var_id = $(this).attr('href');
        if($(this).text() == 'All') {

            $(".slide").show();
            $(".slide").css("marginTop","");
            if($(window).width() <= 800) {
                $(".navbar-toggler").click();
            }

        } else {

            $(".slide").hide();
            $(var_id).show();
            $(var_id).css("marginTop", "5%");        

            if($(window).width() <= 800) {

                $(".navbar-toggler").click();
                $(var_id).css("marginTop", "20%");

            }
        }
    })

    $("#dropdown-menu2 a.dropdown-item").click(function() {

        if($(this).text() == 'IMDb ID') {
            $("#imdbID").removeClass('d-none');
            $("#movieTitle").addClass('d-none');
            $("#movieYear").addClass('d-none');        
        } else {
            $("#movieTitle").removeClass('d-none');
            $("#movieYear").removeClass('d-none');
            $("#imdbID").addClass('d-none'); 
        }
    })    

    $(".carousel-item div img").click(function() {
        $(".modal-footer a").css("display", "flex");
        src_split = ($(this).attr('src')).split("."); 
        final_img = src_split[0] + "-" + 1 + ".JPG";
        for(img_src=0; img_src<60; img_src++) {
            if($("#overview").find($("#overview img")[img_src]).attr('src') == final_img) {
                $("#overview").find($("#overview img")[img_src]).show();
                break;
            } 
        }
        $('.container-fluid').css('opacity','0.1');
    })

    $("a.tabLink").click(function() {

        $(".tabContent img").hide();           
        var_id = $(this).attr('href');

        if(var_id == '#overview') {
            final_img = src_split[0] + "-" + 1 + ".JPG";
            for(img_src=0; img_src<60; img_src++) {
                if($("#overview").find($("#overview img")[img_src]).attr('src') == final_img) {
                    $("#overview").find($("#overview img")[img_src]).show();
                    break;
                } 
            }
            $("#movieModal .modal-footer").find($("a.tabLink")[0]).css("textDecorationLine", "underline");
            $("#movieModal .modal-footer").find($("a.tabLink")[1]).css("textDecorationLine", "none");
        } else {
            final_img = src_split[0] + "-" + 2 + ".JPG";
            for(img_src=0; img_src<60; img_src++) {
                if($("#details").find($("#details img")[img_src]).attr('src') == final_img) {
                    $("#details").find($("#details img")[img_src]).show();
                    break;
                } 
            }
            $("#movieModal .modal-footer").find($("a.tabLink")[1]).css("textDecorationLine", "underline");
            $("#movieModal .modal-footer").find($("a.tabLink")[0]).css("textDecorationLine", "none");
        }
    })    

    $('#movieModal .close').click(() => {
        $('.tabContent img').hide();
        $("#movieModal .modal-footer").find($("a.tabLink")[0]).css("textDecorationLine", "none");
        $("#movieModal .modal-footer").find($("a.tabLink")[1]).css("textDecorationLine", "none");
        $('.container-fluid').css('opacity','1');
    })

    $('.form-inline button').click(() => {
        $('.container-fluid').css('opacity','0.1');
    })    

    $('#movieSearchModal .close').click(() => {
        $('.container-fluid').css('opacity','1');
    })    

    // omdbToken = prompt("Please enter your OMDb Token:", "");
    // if (omdbToken == null || omdbToken == "") {
    //     alert("No user Token found");
    // } else {

        getAllDetails();

   // } // end if condition

}); // end document.ready function

let getAllDetails = () => {

    // API call to get user details
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://www.omdbapi.com/?apikey=ca2cf604&i=tt3896198',
        // url: 'http://www.omdbapi.com/?apikey=' + omdbToken + '&i=tt3896198',
        success: (response) => {

            console.log(response);

            document.getElementById('movieSearchModalLabel').innerHTML = response.Title 
            + "&nbsp;<span class=\"text-warning\" style=\"font-weight: lighter;font-size: 20px;\">(" + response.Year + ")</span>";   

            document.getElementById('desc').innerHTML = "<small>" + response.Rated + "&nbsp;&nbsp;|&nbsp;&nbsp;" +
            response.Runtime + "&nbsp;&nbsp;|&nbsp;&nbsp;" + response.Genre + "&nbsp;&nbsp;|&nbsp;&nbsp;" + response.Released + 
            "&nbsp;(" + response.Country + ")&nbsp;&nbsp;|&nbsp;&nbsp;" + response.Language + "</small>";   

            $('#poster').html('<img src="' + response.Poster + '" class="img-fluid"/>');       

            document.getElementById('imdb').innerHTML = "<b>" + response.imdbRating + "</b><small style=\"font-size:10px;\">/10<br>" 
            + response.imdbVotes + "<small>";

            $('#rotten-tomatoes').append(response.Ratings[1].Value);

            $('#metacritic').append(response.Metascore + "%");

            document.getElementById('plot').innerHTML = "<small><b>" + response.Plot + "</b><br><br><b>Director : </b>" + 
            response.Director + "<br><b>Actors : </b>" + response.Actors + "<br><b>Writer : </b>" + response.Writer + 
            "<br><b>Awards : </b>" + response.Awards + "<br><b>DVD : </b>" + response.DVD + "<br><b>Website : </b><a href=\"" 
            + response.Website + "\">" + response.Website + "</a><br><b>Production : </b>" 
            + response.Production + "<br><b>BoxOffice : </b>" + response.BoxOffice + "</small>";

        }, 
            error: (err) => {
            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)
        }
    });// end ajax call 
}