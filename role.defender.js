var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
             filter: function(object) {
                return object.getActiveBodyparts(ATTACK) == 0;
            }
        });
        
        if(targets.length > 0) {
            this.creep.moveTo(targets[0]);
            this.creep.attack(targets[0]);
            return true;
        }else{
            var flag = creep.pos.findClosestByRange(FIND_FLAGS, {
                filter: function(object) {
                    return ( object.name === "Flag1")
                }
            });
            //console.log(flag);
            creep.moveTo(flag);
        }
        
    }
};

module.exports = roleDefender;