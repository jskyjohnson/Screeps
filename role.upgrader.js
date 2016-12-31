var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('retriving');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            //
            if(creep.carry.energy < creep.carryCapacity) {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter:(structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER;
                    }
                });
            
                //console.log(targets[0]);
                var highestContainer = containers[0];
                
                for(var index = 0; index < containers.length; index++){
                    //console.log(containers[index].store[RESOURCE_ENERGY] + " " +containers[index].storeCapacity);
                    if(containers[index].store[RESOURCE_ENERGY] > highestContainer.store[RESOURCE_ENERGY]){
                        highestContainer = containers[index];
                        //console.log("EMPTY" + targ[index]);
                    }
                }
                if(highestContainer.store[RESOURCE_ENERGY] > 200){
                    if(creep.withdraw(highestContainer, RESOURCE_ENERGY ) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(highestContainer);
                    } 
                }else{
                    var flag = creep.pos.findClosestByRange(FIND_FLAGS, {
                        filter: function(object) {
                            return ( object.name === "Flag2")
                        }
                    });
                    //console.log(flag);
                    creep.moveTo(flag);
                }
                
            }else {
                    
            }
        }
    }
};

module.exports = roleUpgrader;