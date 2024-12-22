function getWaypointHandler () {

    var WaypointsAPI = Java.type('dev.mtechlab.mtechlabminimapadditions.api.WaypointsAPI');

    return {
        player: undefined,

        waypoints: undefined,
        actions: undefined,

        addedWaypointMessage: "§6Следуйте за меткой на карте",

        // DON'T TOUCH
        colors: ["black", "dark_blue", "dark_green", "dark_aqua", "dark_red", "purple", "gold", "light_gray", "dark_gray", "light_blue", "light_green", "light_aqua", "light_red", "pink", "yellow", "white"],

        init: function(player) {
            this.player = player;

            this.waypoints = {
                "test": {
                    "pos": [-175, 92, -413],
                    "name": "Начало ваших приключений",
                    "symbol": "Н",
                    "color": "light_red"
                },
                "test2": {
                    "pos": [-175, 92, -413],
                    "name": "Начало ваших приключений",
                    "symbol": "Н",
                    "color": "light_red"
                },
            }
            this.actions = {
                "11": {
                    "start": [
                        { "action": "add", "name": "test" },
                    ],
                    "turn_in": [
                        { "action": "remove", "name": "test" },
                    ]
                },
            }
        },

        questStart: function(event) {
            var id = event.quest.id;
            this.questAction(id, "start")
        },

        questComplete: function(event) {
            var id = event.quest.id;
            this.questAction(id, "complete")
        },

        questTurnIn: function(event) {
            var id = event.quest.id;
            this.questAction(id, "turn_in")
        },

        questAction: function(id, action) {
            var listWaypoints = this.getWaypoint(id, action)
            if(listWaypoints){
                for(var key in listWaypoints){
                    var object = listWaypoints[key]
                    var objectWaypoint = this.waypoints[object.name]
                    if(object.action==="add"){
                        this.waypointAdd(objectWaypoint)
                    }
                    else if (object.action === "remove"){
                        this.waypointRemove(objectWaypoint)
                    }
                }
            }
        },

        waypointAdd: function(waypoint) {
            WaypointsAPI.addWaypointToPlayer(this.player.getMCEntity(), waypoint.pos[0], waypoint.pos[1], waypoint.pos[2], waypoint.name, waypoint.symbol, this.getWaypointColor(waypoint))
            this.showWaypointMessage(this.addedWaypointMessage)
        },

        waypointRemove: function(waypoint) {
            WaypointsAPI.removeWaypointFromPlayer(this.player.getMCEntity(), waypoint.pos[0], waypoint.pos[1], waypoint.pos[2], waypoint.name, waypoint.symbol, this.getWaypointColor(waypoint))
        },

        getWaypoint: function(id, action) {
            var a = this.actions[id];
            if(a){
                return a[action]
            }
            return undefined
        },

        getWaypointColor: function (waypoint) {
            return Math.max(this.colors.indexOf(waypoint.color), 0);
        },

        showWaypointMessage: function(message){
            this.player.message("§8[§6EnigmaRPG§8] §r" + message)
        },

    }
}

var waypointHandler = undefined

function init(event){waypointHandler = getWaypointHandler(); waypointHandler.init(event.player)}
function questStart(event){waypointHandler.questStart(event)}
function questComplete(event){waypointHandler.questComplete(event)}
function questTurnIn(event){waypointHandler.questTurnIn(event)}