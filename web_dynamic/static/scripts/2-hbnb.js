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

    });
});
