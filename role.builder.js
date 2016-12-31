var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('retriving');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            
            var repairs = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(object) {
                    return (( (object.structureType !== STRUCTURE_WALL && object.structureType !== STRUCTURE_RAMPART )&& object.hits < object.hitsMax* (3/4))||
                            (object.structureType === STRUCTURE_RAMPART && object.hits < object.hitsMax* (1/1000)))
                }
            });
            
            var lowwalls = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(object) {
                    return ( object.structureType === STRUCTURE_WALL && object.hits < object.hitsMax* (1/20000)||
                        (object.structureType === STRUCTURE_RAMPART && object.hits < object.hitsMax * (1/200))
                    )
                }
            });
            
            var highwalls = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(object) {
                    return ( object.structureType === STRUCTURE_WALL && object.hits < object.hitsMax* (1/8000)||
                        (object.structureType === STRUCTURE_RAMPART && object.hits < object.hitsMax * (1/80))
                    )
                }
            });
            
            if(target != null){
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else if(repairs != null){
                //console.log(repairs);
                if(creep.repair(repairs) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairs);
                }
            }else if(lowwalls != null){
                //console.log("repairing Walls");
                if(creep.repair(lowwalls) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(lowwalls);
                }
                
            }else{
                if(creep.repair(highwalls) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(highwalls);
                }
            }
            
        }
        else {
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
            
            if(creep.withdraw(highestContainer, RESOURCE_ENERGY ) == ERR_NOT_IN_RANGE) {
                creep.moveTo(highestContainer);
            }
        }
    }
};

module.exports = roleBuilder;