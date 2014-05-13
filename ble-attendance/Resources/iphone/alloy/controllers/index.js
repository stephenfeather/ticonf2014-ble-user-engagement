function Controller() {
    function handleProximity(e) {
        console.log(e);
        if (e.proximity === zone) for (var y = 0; people.length > y; y++) if (e.identifier === people[y].name && !people[y].checkIn) {
            $.photo.image = people[y].photo;
            $.name.text = people[y].name;
            $.bio.text = people[y].bio;
            people[y].checkIn = true;
        }
    }
    function startAttendance() {
        for (var x = 0; people.length > x; x++) {
            console.log(people[x]);
            TiBeacons.startMonitoringForRegion({
                identifier: people[x].name,
                uuid: people[x].uuid,
                major: people[x].major,
                minor: people[x].minor
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wrapper = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "wrapper"
    });
    $.__views.wrapper && $.addTopLevelView($.__views.wrapper);
    $.__views.photo = Ti.UI.createImageView({
        width: 100,
        top: 100,
        left: 5,
        id: "photo"
    });
    $.__views.wrapper.add($.__views.photo);
    $.__views.name = Ti.UI.createLabel({
        top: 100,
        left: 115,
        id: "name"
    });
    $.__views.wrapper.add($.__views.name);
    $.__views.bio = Ti.UI.createLabel({
        top: 125,
        left: 115,
        id: "bio"
    });
    $.__views.wrapper.add($.__views.bio);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var TiBeacons = require("org.beuckman.tibeacons");
    var people = require("data").people;
    var zone = "immediate";
    TiBeacons.enableAutoRanging();
    TiBeacons.addEventListener("beaconProximity", handleProximity);
    startAttendance();
    $.wrapper.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;