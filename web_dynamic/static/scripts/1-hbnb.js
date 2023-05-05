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
});
