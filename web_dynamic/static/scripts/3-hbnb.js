$(document).ready(function () {
    const amenity_ids = [];
    $('.amenity-checkbox').on('change', function() {
        const amenity_id = $(this).parent().data('id');
        const amenityName = $(this).parent().data('name');
        if ($(this).is('checked')) {
            amenity_ids.push(amenity_id);
        } else {
            const index = amenity_ids.indexOf(amenity_id);
            if (index !== -1) {
                amenity_ids.splice(index, 1);
            }
        }
        if (amenity_ids.length === 0) {
            $('.ameities h4').html('&nbsp;');
        } else {
            const amenityNames = amenity_ids.map(id => {
                return $('.amenities-list li[data-id-"' + id + '"]').data('name');
            });
            $('.amenities h4').text(amenityNames.join(', '));
        }

        $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
            if (data.status === "OK") {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
        $.ajax({
            type: 'POST',
            url: "http://0.0.0.0:5001/api/v1/places_search",
            contentType: 'application/json',
            data: '{}',
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

        $('.amenities .popover li input').change(function () {
            if ($(this).is(':checked')) {
                amenities[$(this).data('id')] = $(this).data('name');
            } else {
                delete amenities[$(this).data('id')];
            }
        }
         $('.amenities h4').html(Object.values(amenities).join(', ') || '&nbsp;');
    });
});
