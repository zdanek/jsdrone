var keypress = require('keypress');
var arDrone = require('ar-drone');

var change = 0.1;

var client = arDrone.createClient();

keypress(process.stdin);

var keys = {
    'return': function(){
        console.log('Takeoff!');
        client.takeoff();
    },
    'space': function(){
        console.log('top!');
        client.stop();
    },

    'l': function(){
        console.log('Land!');
        client.stop();
        client.land();
    },
    'a': function(){
        client.left(change);
    },
    'd': function(){
        client.right(change);
    },
    'w': function(){
        client.front(change);
    },
    's': function(){
        client.back(change);
    },
    'left': function(){
        client.counterClockwise(change);
    },
    'right': function(){
        client.clockwise(change);
    },
    'up': function(){
        client.up(change);
    },
    '=' : function() {
        if (change < 1) {
            change += 0.2;
        }
        console.log("CHANGE " + change);
    },
    '-' : function() {
        if (change > 0) {
            change += 0.2;
        }
        console.log("CHANGE " + change);
    },
    'down': function(){
        client.down(change);
    }

}

var quit = function(){
    console.log('Quitting');
    process.stdin.pause();

    client.stop();
    client.land();
    client._udpControl.close();
}

process.stdin.on('keypress', function (ch, key) {
    console.log("KEYPRESS ")
    console.log(ch)
    console.log(key)
    if(key && keys[key.name]){ keys[key.name](); }
    if(key && key.ctrl && key.name == 'c') { quit(); }
});

process.stdin.setRawMode(true);
process.stdin.resume();