var Connection = Connection || {};

Connection = function (layer, host, port) {
    var self = this;
    this.host = host;
    this.port = port;
    this.layer = layer;
    this.pomelo = window.pomelo;

};

Connection.prototype.connect = function(next) {
    var self = this;
    var route = 'gate.gateHandler.queryEntry';
    self.pomelo.init({
        host: self.host,
        port: self.port,
        log: true
    }, function() {
        self.pomelo.request(route, { }, function(data) {
            self.startConnectorSession(data.host, data.port, next);
        })
    })
};

Connection.prototype.startConnectorSession = function(host, port, next) {
    var self = this;
    var route = 'connector.entryHandler.entry';
    self.pomelo.init({
        host: host,
        port: port,
        log: true
    }, function() {
        pomelo.request(route, {
        }, function(data) {
            self.startGame(next);
        });
    });
};

Connection.prototype.startGame = function(next) {
    var self = this;
    pomelo.request('gameHall.playerHandler.addToGame', { }, function(data) {
        console.log(data);
        next();
    });
};

Connection.prototype.sync = function () {
    // TODO for THU-wyw
    this.layer.peers = [];
    this.layer.asters = [];
    var peer = this.layer.ovariumDetails;
    var aster = new Aster(peer.position, peer.speed, peer.scale * globals.img_radius, peer.property)
    this.layer.asters.push(aster);
    this.layer.quadtree.insert(aster);
    for (var i = 0; i < 10; i ++) {
        peer = {
            position: {
                x: Math.random() * globals.playground.width,
                y: Math.random() * globals.playground.height
            },
            speed: {
                x: Math.random() * 3,
                y: Math.random() * 3
            },
            // recommend init value of radius to be 0~1
            radius: Math.random(),
            property: ASTERPROPERTY.NEUTRAL
        };
        aster = new Aster(peer.position, peer.speed, peer.radius * globals.img_radius, peer.property);
        this.layer.asters.push(aster);
        cc.log("New Aster:"+aster.pos.x+"   "+aster.radius);
        this.layer.quadtree.insert(aster);
    }

};

// TODO for THU-wyw
// Called when local ejection event is evoked
// Maybe the whole list of peer should be updated
Connection.prototype.eject = function (ejectedMessage) {
    var recievedMessage = {};
    recievedMessage = {
        id : 100,
        username: "NICE"
    };
    return recievedMessage;
};
