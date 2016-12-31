var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleUpgrader = require('role.upgrader');
var statController = require('stat.controller');
var DESIRED_HARVESTER_LENGTH = 7;
module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < DESIRED_HARVESTER_LENGTH) {
        if(Game.spawns['Spawn1'].canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester', mine: 'Mine1'}) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester', mine: 'Mine1'});
            //var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', mine: 'Mine1'});
        }
        
        //console.log('Spawning new harvester: ' + newName);
    }
    
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    //console.log('Harvesters: ' + harvesters.length);

    if(defenders.length < 4) {
        if(Game.spawns['Spawn1'].canCreateCreep([TOUGH, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, MOVE], undefined, {role: 'defender'}) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([TOUGH, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, MOVE], undefined, {role: 'defender'});
            //var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', mine: 'Mine1'});
        }
        
        //console.log('Spawning new harvester: ' + newName);
    }
    
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Harvesters: ' + harvesters.length);

    if(upgrader.length < 5) {
        if(Game.spawns['Spawn1'].canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'}) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
        }
        
        //var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        //console.log('Spawning new upgrader: ' + newName);
    }
    
    
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Harvesters: ' + harvesters.length);

    if(builder.length < 3) {
        if(Game.spawns['Spawn1'].canCreateCreep([WORK,WORK,CARRY,CARRY,CARRY,WORK,MOVE,MOVE], undefined, {role: 'builder'}) == OK){
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,WORK,MOVE,MOVE], undefined, {role: 'builder'});
        }
        //var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        //console.log('Spawning new upgrader: ' + newName);
    }
    
    console.log('Harvesters: ' + harvesters.length +' '+'Upgraders: ' + upgrader.length+' '+'Builders: ' + builder.length);
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    
    
    statController.run();
}