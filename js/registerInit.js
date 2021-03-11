$(document).ready(function () {

    $(function () {
        $("#otherBox").click(function () {
            if ($(this).is(":checked")) {
                $("#otherDiv").show();
            } else {
                $("#otherDiv").hide();
            }
        });
    });


    $('#sms').tooltip({
        title: "Extra charges for SMS may apply depending on your phone plan.",
        placement: "right",
        trigger: 'hover'
    })

    $('#sms').on('show.bs.tooltip change', function (e) {
        $this = $(this);
        if (e.type == 'show' && $this.find(":checkbox").is(":checked")) {
            e.preventDefault();
        } else if (e.type == 'change') {
            $this.find(":checkbox").is(":checked") ? $this.tooltip('hide') : $this.tooltip('show');
        }
    });

});