/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('stat.controller');
 * mod.thing == 'a thing'; // true
 */
var statController = {
    run: function(){
        var mine1Max = 3;
        var mine1ID = '9fa9077331385d3';
        var mine2ID = '68050773313e4cb';
        var mine2Max = 4;
        var mine1Obs = 0;
        var mine2Obs = 0;
        for(var name in Game.creeps){
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester'){
                if(creep.memory.mine == mine1ID){
                    mine1Obs++;
                }
                if(creep.memory.mine == mine2ID){
                    mine2Obs++;
                }
            }
        }
        if(mine2Obs + mine2Obs != mine2Max + mine1Max){
            for(var name in Game.creeps){
                var creep = Game.creeps[name];
                if(creep.memory.role == 'harvester'){
                    if(creep.memory.mine == 'Mine1'){
                        if(mine2Obs != mine2Max){
                            creep.memory.mine = mine2ID;
                        }else{
                            creep.memory.mine = mine1ID;
                        }
                    }
                }
            }
        }
        console.log("Mine 1: "+mine1Obs +'/'+ mine1Max +" _ "+ "Mine 2: "+mine2Obs +'/'+ mine2Max  )
    
        var tower = Game.getObjectById('0c420c85aa50d66');
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        if(closestHostile == null){
            var repairs = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(object) {
                    return (( (object.structureType !== STRUCTURE_WALL && object.structureType !== STRUCTURE_RAMPART )&& object.hits < object.hitsMax* (3/4))||
                            (object.structureType === STRUCTURE_RAMPART && object.hits < object.hitsMax* (1/1000)))
                }
            });
            tower.repair(repairs);
        }
    }
    
    
}
module.exports = statController;