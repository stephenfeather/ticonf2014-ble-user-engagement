function Controller() {
    function buildTableRows(filter) {
        var data = [];
        for (var x = 0; products.length > x; x++) filter ? filter === products[x].storeId && (data[x] = Titanium.UI.createTableViewRow({
            height: 40,
            title: products[x].name,
            record: products[x],
            storeId: products[x].storeId
        })) : data[x] = Titanium.UI.createTableViewRow({
            height: 40,
            title: products[x].name + "  (" + products[x].storeId + ")",
            record: products[x],
            storeId: products[x].storeId
        });
        $.table.setData(data);
    }
    function handleProximity(e) {
        Ti.API.info(e);
        if (e.proximity === zone) if ("Payless" === e.identifier) {
            $.details.text = e.identifier + "(" + e.proximity + ")";
            buildTableRows(1);
        } else if ("Publix" === e.identifier) {
            $.details.text = e.identifier + "(" + e.proximity + ")";
            buildTableRows(2);
        } else {
            $.details.text = "";
            buildTableRows(1);
        }
    }
    function goShopping() {
        TiBeacons.startMonitoringForRegion({
            identifier: "Payless",
            uuid: "F949B5EE-9A37-468D-ADDE-4850E7D7B061",
            major: 1,
            minor: 2
        });
        TiBeacons.startMonitoringForRegion({
            identifier: "Publix",
            uuid: "F949B5EE-9A37-468D-ADDE-4850E7D7B061",
            major: 1,
            minor: 1
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wrapper = Ti.UI.createWindow({
        id: "wrapper"
    });
    $.__views.wrapper && $.addTopLevelView($.__views.wrapper);
    $.__views.title = Ti.UI.createLabel({
        text: L("Shopping"),
        top: 20,
        height: 44,
        color: "#ffffff",
        id: "title"
    });
    $.__views.wrapper.add($.__views.title);
    $.__views.table = Ti.UI.createTableView({
        top: 64,
        bottom: 44,
        id: "table"
    });
    $.__views.wrapper.add($.__views.table);
    $.__views.details = Ti.UI.createLabel({
        bottom: 0,
        height: 44,
        color: "#ffffff",
        id: "details"
    });
    $.__views.wrapper.add($.__views.details);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var TiBeacons = require("org.beuckman.tibeacons");
    var products = require("data").products;
    require("data").beacons;
    var zone = "near";
    TiBeacons.enableAutoRanging();
    TiBeacons.addEventListener("beaconProximity", handleProximity);
    buildTableRows();
    goShopping();
    $.wrapper.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;