var TiBeacons = require('org.beuckman.tibeacons');
var people = require('data').people;
var zone = 'immediate';

TiBeacons.enableAutoRanging();

function handleProximity(e) {
    console.log(e)
    if (e.proximity === zone) {
        for (var y = 0; y < people.length; y++) {
            if (e.identifier === people[y].name) {
                if (!people[y].checkIn) {
                    $.photo.image = people[y].photo;
                    $.name.text = people[y].name;
                    $.bio.text = people[y].bio;
                    people[y].checkIn = true;
                }
            }
        }
    }
}

function startAttendance() {
    for (var x = 0; x < people.length; x++) {
        console.log(people[x]);
        TiBeacons.startMonitoringForRegion({
            identifier: people[x].name,
            uuid: people[x].uuid,
            major: people[x].major,
            minor: people[x].minor
        });
    }
}

TiBeacons.addEventListener("beaconProximity", handleProximity);


startAttendance();
$.wrapper.open();