var TiBeacons = require('org.beuckman.tibeacons');
var products = require('data').products;
var beacons = require('data').beacons;
var zone = 'near';

TiBeacons.enableAutoRanging();

function buildTableRows(filter) {
    var data = [];
    for (var x = 0; x < products.length; x++) {
        if (filter) {
            if (filter === products[x].storeId) {
                data[x] = Titanium.UI.createTableViewRow({
                    height: 40,
                    title: products[x].name,
                    record: products[x],
                    storeId: products[x].storeId
                });
            }
        } else {
            data[x] = Titanium.UI.createTableViewRow({
                height: 40,
                title: products[x].name + '  (' + products[x].storeId + ')',
                record: products[x],
                storeId: products[x].storeId
            });
        }

    }
    $.table.setData(data);
}


function handleProximity(e) {
    console.log(e);
    if (e.proximity === zone) {
        if (e.identifier === 'Payless') {
            $.details.text = e.identifier + '(' + e.proximity + ')';
            buildTableRows(1);
        } else if (e.identifier === 'Publix') {
            $.details.text = e.identifier + '(' + e.proximity + ')';
            buildTableRows(2);
        } else {
            $.details.text = '';
            buildTableRows(1);
        }
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

TiBeacons.addEventListener("beaconProximity", handleProximity);


buildTableRows();
goShopping();
$.wrapper.open();