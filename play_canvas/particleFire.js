var ParticleFire = pc.createScript('particleFire');

// initialize code called once per entity
ParticleFire.prototype.initialize = function() {
    var onParticleFire = function(target, type) {        
        //position to target-entity
        this.entity.setPosition(target.getPosition());
        
        //fire particle if it's type matches event call 
        if(this.entity.tags.list()[0].toString() == type){
            this.entity.particlesystem.reset();
            this.entity.particlesystem.play();
        }
        
    };   
    this.app.on('game:particleFire', onParticleFire, this);
};