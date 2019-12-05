/**
 * This utility method converts a date to a string according to the format
 * @param {type} date
 * @param {type} format, e.g., "yyyy:MM:dd:HH:mm" converts the date "2017-01-26 5:15pm" to "2017:01:26:17:15"
 * @param {type} utc
 * @returns {unresolved}
 */
function formatDate(date, format, utc) {
    var MMMM = [
        "\x00",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var MMM = [
        "\x01",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    var dddd = [
        "\x02",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
}
/**
 * Formatting the date string
 * @param {type} d, the date argument
 * @returns formatted Date string
 */
function format(d) {
    return formatDate(d, "yyyy:MM:dd:HH:mm");
}

/**
 * Utility to get default value from the field name if it was undefined or empty
 * @param {type} fieldName
 * @param {type} defaultValue
 * @returns {jQuery}
 */
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
function isNumber(str) {
    return str.length === 1 && str.match(/[0-9]/);
}

function get_name_value(fieldName, defaultValue) {
    var value = $("#" + fieldName).val();
    if (value == "") {
        value = defaultValue;
        $("#" + fieldName).val(value);
    }
    if (fieldName == "name") {
        if (
            !(isLetter(value.charAt(0)) && isNumber(value.charAt(value.length - 1)))
        ) {
            alert("Please enter the correct value");
            return "";
        }
    }
    return value;
}

/**
 * This is the main class
 */
var app = {
    initialize: function () {
        document.addEventListener(
            "deviceready",
            this.onDeviceReady.bind(this),
            false
        );
    },
    // deviceready Event Handler
    onDeviceReady: function () {
        this.receivedEvent("deviceready");
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        //globals
        var address;
        //global added for destination
        var destination = null;
        var bubbleContent = null;
        function TaxiShare() {
            // initialize the platform object:
            var platform = new H.service.Platform({
                app_id: "XYe2ev7cmEwevzr5gFiz", // Changed APP_ID
                app_code: "sX3rMg9aPnMCNMYxNpihZQ" // Changed APP_CODE
            });
            // obtain the default map types from the platform object
            var defaultLayers = platform.createDefaultLayers();
            // instantiate (and display) a map object:
            var map = new H.Map(
                document.getElementById("map_canvas"),
                defaultLayers.normal.map
            );
            // optional: create the default UI:
            var ui = H.ui.UI.createDefault(map, defaultLayers);
            // optional: change the default settings of UI
            var mapSettings = ui.getControl("mapsettings");
            var zoom = ui.getControl("zoom");
            var scalebar = ui.getControl("scalebar");
            var panorama = ui.getControl("panorama");
            panorama.setAlignment("top-left");
            mapSettings.setAlignment("top-left");
            zoom.setAlignment("top-left");
            scalebar.setAlignment("top-left");
            var marker = null;
            /**
             * Updating the Map location according to an address
             * @param {type} address
             * @returns {undefined}
             */
            function updateMap(address) {
                var onSuccess = function (position) {
                    // get the canvas
                    var div = document.getElementById("map_canvas");
                    div.width = window.innerWidth - 20;
                    div.height = window.innerHeight * 0.5;
                    // change the zoomin level
                    map.setZoom(15);
                    if (address != undefined) {
                        // DONE 2(a) FR2.2
                        // gets lat and lon from address and sets map centre to that
                        // then places marker
                        address = encodeURIComponent(address.trim())
                        var osm_param = "http://nominatim.openstreetmap.org/search/" + address + "?format=json&countrycodes=gb";
                        $.get(osm_param,
                            function (data) {
                                var lat = data[0].lat;
                                var lon = data[0].lon;
                                map.setCenter({
                                    lng: lon,
                                    lat: lat
                                });
                                //place marker on map for taxishare
                                if (marker != null) map.removeObject(marker);
                                marker = new H.map.Marker(map.getCenter());
                                map.addObject(marker);
                                // add infobubble with picture and oucu of taxishare
                                if (destination != null) ui.removeBubble(destination);
                                destination = new H.ui.InfoBubble(map.getCenter(), {
                                    content: bubbleContent
                                });
                                ui.addBubble(destination);
                            });
                    }
                    else {
                        map.setCenter({
                            lng: position.coords.longitude,
                            lat: position.coords.latitude
                        });
                    }
                };
                var onError = function (error) {
                    alert(
                        "code: " + error.code + "\n" + "message: " + error.message + "\n"
                    );
                };
                navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                    enableHighAccuracy: true
                });
            }
            /**
             * Updating the matching address
             * @param {type} address
             * @returns {undefined}
             */
            function updateMatchingStatus(address) {
                /* Fetch the user ID from the "name" input field */
                var oucu = get_name_value("name", "user1");
                var name = null;
                /* Invoke the RESTful API to get all the matching addresses */
                var url = "http://137.108.92.9/openstack/taxi/matches?OUCU=" + oucu;
                $.get(url, function (data) {
                    var obj = $.parseJSON(data);
                    if (obj.status == "success") {
                        // ensure new infobubble is created
                        if (destination != null) ui.removeBubble(destination);
                        // add oucu and picture to infobubble
                        if (oucu == obj.data[0].hire_oucu) {
                            name = obj.data[0].offer_oucu;
                        }
                        else {
                            name = obj.data[0].hire_oucu;
                        }
                        //this part would grab an image from the server but we will be using a placeholder
                        var pic = "img/logo.png ";
                        // this code assembles the bubble content html and assigns it to a global variable
                        bubbleContent = '<span> <img style = "width:40%;height:20%;" id = "image" src = ' +
                            pic + '/><br />' + name + ' will meet you here </span>';
                        // Showing the address on the Google map
                        //find the address in the data
                        address = obj.data[0].hire_address;
                        updateMap(address);
                    } else {
                        alert(data);
                        alert(obj.status + " " + obj.data);
                    }
                });
            }
            /**
             * Use a second-by-second timer to update the matching status
             * @returns {undefined}
             */
            // 2(a) FR3
            var timerId = null;
            function timer() {
                updateMatchingStatus(address);
            }
            /**
             * Callback function to start the timer
             */
            this.start = function () {
                if (timerId) clearInterval(timerId);
                timerId = setInterval(timer, 10000); // every 10 seconds
            };
            /**
             * Callback function to stop the timer
             */
            this.stop = function () {
                clearInterval(timerId);
            };
            /**
             * callback function for registering the taxi sharing service
             */
            this.register = function () {
                /* Fetch the user ID from the "name" input field */
                var oucu = get_name_value("name", "user1");
                // 2(a) FR1.1
                // Post the user ID using the "users" API
                $.post(
                    "http://137.108.92.9/openstack/taxi/users",
                    {
                        OUCU: oucu
                    },
                    function (data) {
                        var obj = $.parseJSON(data);
                        if (obj.status == "success") {
                            alert("User " + oucu + " has been successfully registered.");
                        } else {
                            alert("User " + oucu + " is already registered.");
                        }
                    }
                      // upload image to servers at this point
                );
            };
            /**
             * DONE callback function for volunteering a taxi
             */
            this.volunteer = function () {
                var oucu = get_name_value("name", "user1");
                address = get_name_value("addr", "Open University");
                var start_time = get_name_value("time", format(new Date()));
                var hours = get_name_value("hours", 1);
                // compute the date of the next end_time hours
                //var d = get_name_value("time");
                var d = new Date(start_time);
                d.setHours(d.getHours() + hours);
                var end_time = format(d);
                // Post the details of start, end time, the address and the type to the orders API
                // DONE 2(a) FR1.2
                $.post(
                    "http://137.108.92.9/openstack/taxi/orders",
                    {
                        OUCU: oucu,
                        address: address,
                        start: start_time,
                        end: end_time,
                        type: 0
                    },
                    function (data) {
                        var obj = $.parseJSON(data);
                        if (obj.status == "success") {
                            alert("User " + oucu + " has been successfully posted an offer.");
                        } else {
                            alert("User " + oucu + " has been unable to post an offer.");
                        }
                    }
                );
            };
            /**
             * DONE callback function for requesting a taxi
             */
            this.request = function () {
                var oucu = get_name_value("name", "user1");
                address = get_name_value("addr", "Open University");
                var start_time = get_name_value("time", format(new Date()));
                // Post the details of start time, the address and the type to the orders API
                // DONE 2(a) FR1.3
                $.post(
                    "http://137.108.92.9/openstack/taxi/orders",
                    {
                        OUCU: oucu,
                        address: address,
                        start: start_time,
                        type: 1
                    },
                    function (data) {
                        var obj = $.parseJSON(data);
                        if (obj.status == "success") {
                            alert("User " + oucu + " has been successfully posted a request.");
                        } else {
                            alert("User " + oucu + " has been unable to post a request.");
                        }
                    }
                );
            };
            /**
             * callback function for cancelling the bookings
             */
            this.cancel = function () {
                var oucu = get_name_value("name", "user1");
                // 2(a) FR1.4
                $.get(
                    "http://137.108.92.9/openstack/taxi/orders?OUCU=" + oucu,
                    function (data) {
                        var obj = $.parseJSON(data);
                        if (obj.status == "success") {
                            $.each(obj.data, function (index, value) {
                                var url =
                                    "http://137.108.92.9/openstack/taxi/orders/" +
                                    value.id +
                                    "?OUCU=" +
                                    oucu;
                                $.ajax({
                                    url: url,
                                    type: "DELETE",
                                    data: {},
                                    success: function (result) {
                                        alert("Deleted: " + result);
                                    }
                                })
                            });
                        } else {
                            alert(obj.status + " " + obj.data);
                        }
                    }
                );
            };
            //FR4 take a photo and alow user to crop before use
            this.photo = function () {
                var cameraSuccess = function (imageData) {
                    var image = document.getElementById("image");
                    image.style.display = "block";
                    image.src = imageData;                  
                };
                var cameraError = function () {
                    console.error("Problem in getting the camera picture");
                };
                navigator.camera.getPicture(cameraSuccess, cameraError, {
                    quality: 60,
                    targetWidth: 3000,
                    allowEdit: true,
                    correctOrientation: true,
                });
            };
            // update the HERE  map initially
            // 2(a) FR2
            updateMap(address);
        }
        this.taxiShare = new TaxiShare();
    }
};
app.initialize();
