var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.mine == 'Mine1'){
            console.log("UNDEFINED MINE");
        }
        if(creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            creep.memory.sourceId = source;
            var source = Game.getObjectById(creep.memory.mine);
            
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            
            var targ = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                                (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) )
                    }
            });
            
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter:(structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER;
                }
            });
            
            var lowestContainer = containers[0];
            
            for(var index = 0; index < containers.length; index++){
                if(containers[index].store[RESOURCE_ENERGY] < lowestContainer.store[RESOURCE_ENERGY]){
                    lowestContainer = containers[index];
                }
            }
            var fdestination = lowestContainer;
            
            for(var index = 0; index < targ.length; index++){
                if(targ[index].energy < targ[index].energyCapacity){
                    fdestination = targ[index];
                }
            }
            
            if(creep.transfer(fdestination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(fdestination);
            }
        }
    }
};

module.exports = roleHarvester;