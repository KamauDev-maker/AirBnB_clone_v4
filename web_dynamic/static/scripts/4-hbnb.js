const amenitiesDict = {};
const checkAmenities = {};

$(document).ready(function () {
    $('input[type="checkbox"]').click(function () {
        if (this.checked) {
            checkAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete checkAmenities[$(this).data('id')];
        }
        const amenitiesNames = Object.values(checkedAmenities);
        if (amenitiesNames.length > 0) {
            $('div.amenities > h4').text(amenitiesNames.join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        }
    });
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === "OK") {
            $('#api_status').addClass('avaiable');
        } else {
            $('#api_status').removeClass('available');
        }
    });
    $.ajax({
        type: 'POST',
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        data: '{}',
        contentType: 'application/json',
        success: function (data) {
            $.each(data, function (index, place) {
                const article = ['<article>',
                    '<div class="title_box">',
                    `<h2>${ place.name }</h2>`,
                    `<div class="price_by_night">$${place.price_by_night}</div>`,
                    '</div>',
                    '<div class="information">',
                    `<div class="max_quest">${place.max_guest} Guests</div>`,
                    `<div class="number_rooms">${place.number_rooms} Bedrooms</div>`,
                    `<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>`,
                    '</div>',
                    '<div class="description">',
                    `${place.description}`,
                    '</div>',
                    '</article>'].join('');
                $('SECTION.places').append(article);
            });       
        }
    });
    $('button').click(function () {
        amenitiesDict['amenities'] = Objects.keys(checkedAmenities);
        $.ajax({
            type: 'POST',
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            contentType: 'application/json',
            data: JSON.stringify(amenitiesDict),
            success: function (data) {
                $.each(data, function (index, place) {
                  const article = ['<article>',
                     '<div class="title_box">',
                     `<h2>${ place.name }</h2>`,
                     `<div class="price_by_night">$${place.price_by_night}</div>`,
                     '</div>',
                     '<div class="information">',                     
                     `<div class="max_quest">${place.max_guest} Guests</div>`,
                     `<div class="number_rooms">${place.number_rooms} Bedrooms</div>`,
                     `<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>`,
                     '</div>',
                     '<div class="description">',
                     `${place.description}`,
                     '</div>',
                     '</article>'].join('');
                  $('SECTION.places').append(article);

            }
        });
    });
});
