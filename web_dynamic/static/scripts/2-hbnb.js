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
});
