// main document ready function to check if dom is loaded fully or not

let omdbToken, token_url, eachElement;

$(document).ready(() => {

    let var_id, src_split, final_img, img_src, criteriaFlag = 0, lastValue = '', alertMsg = '';

    omdbToken = prompt("Please enter your OMDb Token:", "");
    if (omdbToken == null || omdbToken == "") {
        alert("No user Token found");
    }  

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
    });

    $("#dropdown-menu2 a.dropdown-item").click(function() {
        $('#search-button').removeClass('d-none');
        $('#search-button').attr('disabled','disabled');
        $('#imdbID').val('');
        $('#movieTitle').val('');
        $('#movieYear').val('');       

        if($(this).text() == 'IMDb ID') {
            $("#imdbID").removeClass('d-none');
            $("#movieTitle").addClass('d-none');
            $("#movieYear").addClass('d-none'); 
            criteriaFlag = 1;
        } else {
            $("#movieTitle").removeClass('d-none');
            $("#movieYear").removeClass('d-none');
            $("#imdbID").addClass('d-none'); 
            criteriaFlag = 2;
        }

        if($(window).width() >= 1000 && $(window).width() <= 1127) {
            document.getElementById('navbarDropdown2').innerHTML = 'Criteria';
            document.getElementById('navbarDropdown').innerHTML = 'Genre';
        }

    })       

    $('.form-control').mouseout(function() {

        if(criteriaFlag == 1) {
             token_url = 'https://www.omdbapi.com/?apikey=' + omdbToken + '&i=' + document.getElementById('imdbID').value;
        } else {
            if($('#movieYear').val() == '') {
                token_url = 'https://www.omdbapi.com/?apikey=' + omdbToken + '&t=' + document.getElementById('movieTitle').value;
            } else {
                token_url = 'https://www.omdbapi.com/?apikey=' + omdbToken + '&t=' + document.getElementById('movieTitle').value + 
                '&y=' + document.getElementById('movieYear').value;
            }
        }  

        console.log("token_url : " + token_url);

        if($(this).val() != '' && $(this).val() != lastValue){
            lastValue = $(this).val();
            document.getElementById('movieSearchModalLabel').innerHTML = '';
            document.getElementById('desc').innerHTML = '';
            document.getElementById('imdb').innerHTML = '';
            document.getElementById('plot').innerHTML = '';
            document.getElementById('rotten-tomatoes').innerHTML = '';
            document.getElementById('metacritic').innerHTML = '';
            getAllDetails();
        }

    });      

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
        $("#movieModal .modal-footer").find($("a.tabLink")[0]).css("textDecorationLine", "underline");
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

    $('#movieModal').on("hidden.bs.modal", function () {
        $('.tabContent img').hide();
        $("#movieModal .modal-footer").find($("a.tabLink")[0]).css("textDecorationLine", "none");
        $("#movieModal .modal-footer").find($("a.tabLink")[1]).css("textDecorationLine", "none");
        $('.container-fluid').css('opacity','1');
    })

    $('#search-button').click(() => {
        $('.container-fluid').css('opacity','0.1');
    })    

    $('#movieSearchModal').on("hidden.bs.modal", function () {
        $('.container-fluid').css('opacity','1');
    })    

    $('[name="name"]').change(() => {
        if(!(/[a-zA-Z]+$/.test($('[name="name"]').val()))) {
            alert("You have entered an invalid name!");
            $('[name="emailid"]').attr('disabled','disabled');      
            $('#contactModal .modal-body textarea').attr('disabled','disabled');  
            $('#contactModal .modal-footer button').attr('disabled','disabled');      
        } else {
            $('[name="emailid"]').removeAttr('disabled'); 
            $('#contactModal .modal-body textarea').removeAttr('disabled');
        }       
    })    

    function validateEmail(email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test(email);
    }

    $('[name="emailid"]').change(() => {
        if( !validateEmail($('[name="emailid"]').val()) || $('[name="emailid"]').val() == '') {
            alert("You have entered an invalid email address!");
            $('#contactModal .modal-body textarea').attr('disabled','disabled');
            $('[name="name"]').attr('disabled','disabled');
            $('#contactModal .modal-footer button').attr('disabled','disabled');  
        } else {
            $('#contactModal .modal-body textarea').removeAttr('disabled');
            $('[name="name"]').removeAttr('disabled'); 
        }
    })

    $('#contactModal .modal-body textarea').mouseout(() => {
        if($('#contactModal .modal-body textarea').val() == '') {
            $('#contactModal .modal-footer button').attr('disabled','disabled');            
        } else {
            if($('[name="name"]').val() != '' && $('[name="emailid"]').val() != '') {
                $('#contactModal .modal-footer button').removeAttr('disabled'); 
            }
        }
    })

    $('#contactModal .modal-footer button').click(() => {
        alertMsg = "Your message has been submitted..!!";
    })

    $('#contactModal .close').click(() => {
        alertMsg = '';
    })

    $("#contactModal").on("hidden.bs.modal", function () {
        if(alertMsg == "Your message has been submitted..!!" && $('#contactModal .modal-body textarea').val() != '') {
            alert(alertMsg);
        }
        $('#contactModal .modal-body textarea').val('');
        $('#contactModal .modal-body input').val('');
    });    

}); // end document.ready function

let getAllDetails = () => {

    // API call to get user details
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: token_url,
        success: (response) => {

            console.log(response);

            if((response.Error != '' && response.Error != undefined) || response.Response == 'False' || response == null) {
                $('#search-button').attr('disabled','disabled');
                alert(response.Error);
            } else {
                $('#search-button').removeAttr('disabled');
            }

            document.getElementById('movieSearchModalLabel').innerHTML = response.Title 
            + "&nbsp;<span class=\"text-warning\" style=\"font-weight: lighter;font-size: 20px;\">(" + response.Year + ")</span>";   

            if(response.Rated != '' && response.Rated != undefined && response.Rated != 'N/A') {
                document.getElementById('desc').innerHTML = "<small>" + response.Rated + "&nbsp;&nbsp;|&nbsp;&nbsp;</small>";
            }

            if(response.Runtime != '' && response.Runtime != undefined && response.Runtime != 'N/A') {
                $('#desc').append("<small>" + response.Runtime + "&nbsp;&nbsp;|&nbsp;&nbsp;</small>");
            }

            if(response.Genre != '' && response.Genre != undefined && response.Genre != 'N/A') {
                $('#desc').append("<small>" + response.Genre + "&nbsp;&nbsp;|&nbsp;&nbsp;</small>");
            }

            if(response.Released != '' && response.Released != undefined && response.Released != 'N/A') {
                if(response.Country != '' && response.Country != undefined && response.Country != 'N/A') {
                    $('#desc').append("<small>" + response.Released + "</small>");
                } else {
                    $('#desc').append("<small>" + response.Released + "&nbsp;&nbsp;|&nbsp;&nbsp;</small>");
                }
            }

            if(response.Country != '' && response.Country != undefined && response.Country != 'N/A') {
                if(response.Released != '' && response.Released != undefined && response.Released != 'N/A') {
                    $('#desc').append("<small>&nbsp;(" + response.Country + ")&nbsp;&nbsp;|&nbsp;&nbsp;</small>");                    
                } else {
                    $('#desc').append("<small>" + response.Country + "&nbsp;&nbsp;|&nbsp;&nbsp;</small>");
                }                
            }

            if(response.Language != '' && response.Language != undefined && response.Language != 'N/A') {
                $('#desc').append("<small>" + response.Language + "</small>");
            }

            if(response.Poster == '' || response.Poster == undefined || response.Poster == 'N/A') {
                $('#poster').html('<img src="no-image.png" class="img-fluid"/>');       
            } else {
                $('#poster').html('<img src="' + response.Poster + '" class="img-fluid"/>');
            }

            if(response.imdbRating != undefined && response.imdbRating != 'N/A' && response.imdbRating != '') {
                document.getElementById('imdb').innerHTML = "<b>" + response.imdbRating + "</b><small style=\"font-size:10px;\">/10<br>" 
                + response.imdbVotes + "<small>";
            }

            if(response.Ratings[1] != undefined && response.Ratings[1] != 'N/A' && response.Ratings[1] != '') { 
                $('#rotten-tomatoes').append(response.Ratings[1].Value);
            }

            if(response.Metascore != undefined && response.Metascore != 'N/A' && response.Metascore != '') {
                $('#metacritic').append(response.Metascore + "%");
            }

            if(response.Plot != undefined && response.Plot != 'N/A' && response.Plot != '') {
                document.getElementById('plot').innerHTML = "<small><b>" + response.Plot + "</b></small><br>";
            }

            if(response.Director != undefined && response.Director != 'N/A' && response.Director != '') {
                $('#plot').append("<br><small><b>Director : </b>" + response.Director + "</small>");
            }

            if(response.Actors != undefined && response.Actors != 'N/A' && response.Actors != '') {
                $('#plot').append("<br><small><b>Actors : </b>" + response.Actors + "</small>");
            }

            if(response.Writer != undefined && response.Writer != 'N/A' && response.Writer != '') {
                $('#plot').append("<br><small><b>Writer : </b>" + response.Writer + "</small>");
            }

            if(response.Awards != undefined && response.Awards != 'N/A' && response.Awards != '') {
                $('#plot').append("<br><small><b>Awards : </b>" + response.Awards + "</small>");
            }

            if(response.Type != undefined && response.Type != 'N/A' && response.Type != '') {
                $('#plot').append("<br><small><b>Type : </b>" + response.Type + "</small>");
            }

            if(response.DVD != undefined && response.DVD != 'N/A' && response.DVD != '') {
                $('#plot').append("<br><small><b>DVD : </b>" + response.DVD + "</small>");
            }

            if(response.Website != undefined && response.Website != 'N/A' && response.Website != '') {
                $('#plot').append("<br><small><b>Website : </b><a href=\"" + response.Website + "\">" + response.Website + "</small>");
            }

            if(response.Production != undefined && response.Production != 'N/A' && response.Production != '') {
                $('#plot').append("</a><small><br><b>Production : </b>" + response.Production + "</small>");
            }

            if(response.BoxOffice != undefined && response.BoxOffice != 'N/A' && response.BoxOffice != '') {
                $('#plot').append("<br><small><b>BoxOffice : </b>" + response.BoxOffice + "</small>");
            }

        }, 
            error: (err) => {
            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message);
        }
    });// end ajax call 
}
