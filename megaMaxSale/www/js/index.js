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
    return str.length >= 1 && str.match(/^[0-9]+$/);
}

function get_name_value(fieldName, defaultValue) {
    var value = $("#" + fieldName).val();
    if (value == "") {
        value = defaultValue;
        $("#" + fieldName).val(value);
    }
    if (fieldName == "oucu") {
        if (
            !(isLetter(value.charAt(0)) && isNumber(value.charAt(value.length - 1)))
        ) {
            alert("Please enter the correct value");
            return "";
        }
    }
    return value;
}


var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener(
            'deviceready',
            this.onDeviceReady.bind(this),
            false
        );
    },

    // deviceready Event Handler
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var address;
        //global state storage
        var login = false;
        var widget = 0;
        var clients = [];
        var orders = [];
        var widgets = [];
        var orderIndex = 0;
        var oucu;
        var currentOrder = 0;
        // hard coded password
        var password = "86EssKWs";
        
        function MegaMaxSale() {
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

            // function to display the widgets picture description
            function widgetDisplay(widget) {
                var url = widgets[widget].url;
                var pence_price = widgets[widget].pence_price;
                var description = widgets[widget].description;
                document.getElementById('widgetDescription').innerHTML = description;
                document.getElementById('widgetPrice').innerHTML = pence_price + "p";
                document.getElementById('widgetImage').src = url;
            }

            // function to get orders and store them in array
            function setOrders(data) {
                orders = data;
            }

            // function to get widgets and store them in an array
            function setWidgets(data) {
                widgets = data;
                widgetDisplay(widget);                
            }
            
            // function to store a clients array
            function setClients(data) {
                clients = data;
                displayOrder();
            }
            //function to make a order table from a json array
            function makeTable(json) {
                var col = ["Qty","Item","Price","Line Price"];
                 // create the table
                var table = document.createElement("table");
                // table row
                var tr = table.insertRow(-1);                   
                // create header from col
                for (var i = 0; i < col.length; i++) {
                    var th = document.createElement("th");      
                    th.innerHTML = col[i];
                    tr.appendChild(th);
                }
                // populate tabel
                for (var i = 0; i < json.length; i++) {
                    tr = table.insertRow(-1);
                    var tabCell = tr.insertCell(-1);
                    tabCell.style.textAlign = "right";
                    tabCell.innerHTML = json[i].number;
                    var tabCell = tr.insertCell(-1);
                    tabCell.style.textAlign = "right";
                    tabCell.innerHTML = "(widget " + json[i].widget_id +")";
                    var tabCell = tr.insertCell(-1);
                    tabCell.style.textAlign = "right";
                    tabCell.innerHTML = " * " + parseFloat(json[i].pence_price / 100).toFixed(2) + "GBP =";
                    var tabCell = tr.insertCell(-1);
                    tabCell.style.textAlign = "right";
                    tabCell.innerHTML = parseFloat((json[i].pence_price * json[i].number) / 100).toFixed(2)  + " GBP";
                }
                // calculate subtotal
                var subTotal = 0;
                for (var i = 0; i < json.length; i++) {
                    subTotal = subTotal + (json[i].pence_price * json[i].number);
                }
                // calculate vat
                var vat = (subTotal / 100) * 20;
                // calculate total
                var total = subTotal + vat;
                // add subtotal row to table
                tr = table.insertRow(-1);
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = "";
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = "";
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = "Subtotal =";
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = parseFloat(subTotal/100).toFixed(2) + " GBP";
                // add vat row to table
                tr = table.insertRow(-1);
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = "";
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = "";
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = "VAT @ 20% =";
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = parseFloat(vat/100).toFixed(2) + " GBP";
                // add total row to table
                tr = table.insertRow(-1);
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = "";
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = "";
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = "Total =";
                var tabCell = tr.insertCell(-1);
                tabCell.style.textAlign = "right";
                tabCell.innerHTML = parseFloat(total/100).toFixed(2) + " GBP";
                // return table html element
                 return table;
            }

            //function to display order
            function displayOrder() {
                var orderId = encodeURIComponent(orders[orderIndex].id.trim());
                currentOrder = orderId;
                var osm_param = "http://137.108.92.9/openstack/api/order_items?OUCU=" + oucu + "&password=" + password + "&order_id=" + orderId;
                $.get(osm_param, function (data) {
                    var obj = $.parseJSON(data);
                    if (obj.status == "success") {                     
                        var table = makeTable(obj.data);
                        var divContainer = document.getElementById("orderList");
                        divContainer.innerHTML = "";
                        divContainer.appendChild(table);
                    }
                    else {
                        var divContainer = document.getElementById("orderList");
                        divContainer.innerHTML = "Order number " + orderId + " is currently empty please add an item";
                    }
                });
                var clientId = orders[orderIndex].client_id;
                var client = [];
                for (var i = 0; i < clients.length; i++) {
                    if (clients[i].id == clientId) {
                        client.push(clients[i]);
                    }
                }
                var divContainer = document.getElementById("orderData");
                divContainer.innerHTML = "<br />Dear " + client[0].name;
                divContainer.innerHTML += "<br />Your order at " + client[0].address;
                divContainer.innerHTML += "<br />Placed on " + orders[orderIndex].date;               
            }

            //functionality manager
            function orderManager(index) {
                // this index loads in orders and clients and refreshes the stored array
                if (index == 1) {
                    //initiate orders load in all orders 
                    oucu = get_name_value("oucu", "zy631547");
                    var osm_param = "http://137.108.92.9/openstack/api/orders/?OUCU=" + oucu + "&password=" + password;
                    $.get(osm_param,
                        function (data) {
                            var obj = $.parseJSON(data);
                            if (obj.status == "success") {
                                setOrders(obj.data);
                            }
                            else {
                                alert("failed to retrieve orders")
                            }
                        });
                    //load in clients
                    var osm_param = "http://137.108.92.9/openstack/api/clients/?OUCU=" + oucu + "&password=" + password;
                    $.get(osm_param, function (data) {
                        var obj = $.parseJSON(data);
                        if (obj.status == "success") {
                            setClients(obj.data);
                        }
                        else {
                            alert("failed to retrieve client list")
                        }
                    });
                }
                // view next order in array
                else if (index == 2) {
                    if (orders.length > 0) {
                        orderIndex++;

                        if (orderIndex < 0 || orderIndex >= orders.length) {
                            orderIndex = 0;
                            displayOrder();
                        }
                        else {
                            displayOrder();
                        }

                    }
                }
                // view previous order in array
                else if (index == 3) {
                    if (orders.length > 0) {
                        orderIndex--;
                        if (orderIndex < 0 || orderIndex >= orders.length) {
                            orderIndex = orders.length - 1;
                            displayOrder();
                        }
                        else {
                            displayOrder();
                        }

                    }

                }
                // index to add an item to an order
                else if (index == 4) {
                    curOrder = currentOrder;
                    var curWidget = widget +1;
                    var number = document.getElementById("quantity").value;
                    var price = document.getElementById("price").value;
                    if (isNumber(number) && isNumber(price) && price > 0 && number > 0) {
                        console.log(oucu + " " + password + " " + curOrder + " " + curWidget + " " + number + " " + price);
                        $.post(
                            "http://137.108.92.9/openstack/api/order_items",
                            {
                                OUCU: oucu,
                                password: password,
                                order_id: curOrder,
                                widget_id: curWidget,
                                number: number,
                                pence_price: price
                            },
                            function (data) {
                                var obj = $.parseJSON(data);
                                if (obj.status == "success") {
                                    alert("widget " + oucu + " has been successfully added to.");
                                    //refreshes order
                                    displayOrder();

                                } else {
                                    alert("User " + oucu + " has been unable to post a request.");
                                }
                            }
                        );
                    }
                    else {
                        alert("Please enter correct values for quantity and price");
                    }
                }
                // index to create a new order
                else if (index == 5) {
                    // if the client number isnt valid inform user
                    var client = document.getElementById("clientId").value;
                    if (client == "" || isNumber(client) == false) {
                        alert("Please enter a valid client ID to create a new order");
                    }
                    else {
                        var clientFile = [];
                        for (var i = 0; i < clients.length; i++) {
                            if (clients[i].id == client) {
                                clientFile.push(clients[i]);
                            }
                        }
                        // if the client number is a valid format but does not exist notify user
                        if (clientFile.length == 0) {
                            alert("client not found!");
                        }
                        else {
                            // add the client locations here rather than at the mapping stage to prevent open street map server blocks
                            address = clientFile[0].address;
                            address = encodeURIComponent(address.trim())
                            var osm_param = "http://nominatim.openstreetmap.org/search/" + address + "?format=json&countrycodes=gb";
                            $.get(osm_param,
                                function (data) {
                                    var lat = data[0].lat;
                                    var lon = data[0].lon;
                                    // add marker to client location
                                    coords = { lat: lat, lng: lon };
                                    var marker = new H.map.Marker(coords);
                                    map.addObject(marker);
                                    // set map center to client location
                                    map.setCenter({
                                        lng: lon,
                                        lat: lat
                                    });
                                    // create the new order
                                    $.post(
                                        "http://137.108.92.9/openstack/api/orders",
                                        {
                                            OUCU: oucu,
                                            password: password,
                                            client_id: client,
                                            latitude: lat,
                                            longitude: lon
                                        },
                                        function (data) {
                                            var obj = $.parseJSON(data);
                                            console.log(obj);
                                            if (obj.status == "success") {
                                                alert("Order" + obj.data[0].id + " has been successfully created.");
                                                // set order index to new order
                                                orderIndex = orders.length;
                                                // use order manager to update orders from server and view newest order
                                                orderManager(1);
                                            } else {
                                                alert("User " + oucu + " has been unable to create an order.");
                                            }
                                        }
                                    );
                                }
                            );
                        }
                    }
                    var thisDay = new Date();
                    var todays = [];
                    // display all the orders for today
                    // find all orders with todays date
                    for (var i = 0; i < orders.length; i++) {
                        var date = new Date(orders[i].date);
                        console.log (date);
                        if (thisDay.getMonth() === date.getMonth() && thisDay.getFullYear() == date.getFullYear() && thisDay.getDate() === date.getDate()) {
                            todays.push(orders[i]);
                        }
                    } 
                    // show todays orders even if the client isnt valid
                    group = new H.map.Group();
                    // put a marker in a group for each order
                    for (var i = 0; i < todays.length; i++) {
                        var lat = parseFloat(todays[i].latitude);
                        var lon = parseFloat(todays[i].longitude);
                        console.log(todays[i].latitude + " " + todays[i].longitude);
                        coords = { lat: lat, lng: lon };
                        var marker = new H.map.Marker(coords);
                        group.addObject(marker);
                    }
                    // add group of markers to map
                    map.addObject(group);
                    // set the view of the map so all markers are visible
                    map.setViewBounds(group.getBounds());
                }
            }             

            // previous widget button handler
            this.prevWidget = function () {
                widget = widget - 1;
                // limit range of widgets
                if (widget < 0) {
                    widget = widgets.length -1;
                }
                widgetDisplay(widget);

            };

            //Next widget button handler
            this.nextWidget = function () {
                widget = widget + 1;
                // limit range of widgets
                if (widget > widgets.length -1) {
                    widget = 0;
                }
                widgetDisplay(widget);
            };

            //previous order button handler
            this.prevOrder = function () {
                orderManager(3)
            };

            //Next order button handler
            this.nextOrder = function () {
                orderManager(2);
            };

            //Add to order button handler
            this.addToOrder = function () {
                orderManager(4);

            };

            //Place order button handler
            this.placeOrder = function () {
                orderManager(5);

            };

            //login manager
            this.loginLogout = function () {
                //if login value is false
                if (login == false) {
                    //read in Sales ID and password values and check validity
                    oucu = get_name_value("oucu", "zy631547");
                    // uncomment the next line to get the password from the form!!!
                    //password = document.getElementById("password").value;
                    var osm_param = "http://137.108.92.9/openstack/api/widgets/?OUCU=" + oucu + "&password=" + password;
                    $.get(osm_param,
                        function (data) {
                            var obj = $.parseJSON(data);
                            // if valid enable form disable user name and password fields and set login value to true
                            if (obj.status == "success") {
                                login = true;
                                // store the widgets in the widgets array
                                setWidgets(obj.data);
                                document.getElementById("oucu").disabled = true;
                                document.getElementById("password").disabled = true;
                                document.getElementById("clientId").disabled = false;
                                document.getElementById("prevWidg").disabled = false;
                                document.getElementById("nextWidg").disabled = false;
                                document.getElementById("quantity").disabled = false;
                                document.getElementById("price").disabled = false;
                                document.getElementById("prevOrder").disabled = false;
                                document.getElementById("nextOrder").disabled = false;
                                document.getElementById("addToOrder").disabled = false;
                                document.getElementById("placeOrder").disabled = false;
                                document.getElementById("loginLogout").innerHTML = "Logout";
                                // initialise the display on first order and first widget
                                orderManager(1);
                            }
                            // if invalid notify user of error and request correct input
                            else {
                                alert("Please enter valid Sales ID and Password.")
                            }
                        });
                }
                else {
                    // disable form and enable credentials area
                    oucu = ""
                    password = ""
                    login = false;
                    document.getElementById("oucu").disabled = false;
                    document.getElementById("password").disabled = false;
                    document.getElementById("clientId").disabled = true;
                    document.getElementById("prevWidg").disabled = true;
                    document.getElementById("nextWidg").disabled = true;
                    document.getElementById("quantity").disabled = true;
                    document.getElementById("price").disabled = true;
                    document.getElementById("prevOrder").disabled = true;
                    document.getElementById("nextOrder").disabled = true;
                    document.getElementById("addToOrder").disabled = true;
                    document.getElementById("placeOrder").disabled = true;
                    document.getElementById("loginLogout").innerHTML = "Login";
                }
            }
            // set map to default position
            updateMap(address);
        }
        this.megaMaxSale = new MegaMaxSale();
    }
}
app.initialize();