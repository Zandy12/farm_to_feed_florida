var Tile = pc.createScript('tile');

Tile.attributes.add('modelBodyContainer', {type: 'entity'});
Tile.attributes.add('cropBodyContainer', {type: 'entity'});
Tile.attributes.add('cropModel', {type: 'entity'});

// initialize code called once per entity
Tile.prototype.initialize = function() {
    //misc
    this.time = 0;
    this.speed = 5;
    this.moveAmount = 0.02;
    this.pulseTileBodyFlag = false;
    this.ogModelPosition = this.entity.getPosition().clone();
    this.flagHasCrop = false;
    this.cropBodyContainer.enabled = false;
    this.clickCounter = 0;
    this.clickCounterMax = Math.random() * (20 - 3) + 3; //add randomness to max click
    this.cropScaleOG = this.cropBodyContainer.getLocalScale().clone();
    
    //material initialize logic
    this.modelBody = this.modelBodyContainer;
    this.ogMaterial = [];   
    for (var i = 0; i < this.modelBody.model.model.meshInstances.length; ++i) {
        this.ogMaterial[i] = this.modelBody.model.model.meshInstances[i].material.clone();
        this.modelBody.model.model.meshInstances[i].material = this.modelBody.model.model.meshInstances[i].material.clone();
        
        this.modelBody.model.model.meshInstances[i].material.blendType = pc.BLEND_NORMAL;
            
        this.modelBody.model.model.meshInstances[i].material.opacity = 0.5;
        this.modelBody.model.model.meshInstances[i].material.diffuse.set(this.ogMaterial[i].diffuse.r, this.ogMaterial[i].diffuse.g, this.ogMaterial[i].diffuse.b);
        this.modelBody.model.model.meshInstances[i].material.update();
    }
    
    //////////
    //events//
    //////////
    var onTileSelected = function(result) {         
        if(this.entity == result){
            //toggle tile oscillation up/down
            this.pulseTileBodyFlag = true;
            
            //toggle tile effect explosion
            this.app.fire('game:particleFire', this.entity, 'up');
            
            //update tile color
            for (var i = 0; i < this.modelBody.model.model.meshInstances.length; ++i) {
                this.modelBody.model.model.meshInstances[i].material.diffuseMap = null;
                this.modelBody.model.model.meshInstances[i].material.blendType = pc.BLEND_ADDITIVEALPHA;

                this.modelBody.model.model.meshInstances[i].material.diffuse.set(1,1,1);
                this.modelBody.model.model.meshInstances[i].material.update();
            }
            
            //spawn plant (if non-spawned yet)
            if(!this.flagHasCrop){
                this.app.fire('tile:spawnCrop', this.entity);
            } else {
                //grow crop size
                this.app.fire('tile:growCrop', this.entity);
            }
        }
    };   
    this.app.on('tile:selected', onTileSelected, this);    
    
    var onTileSelectedEnd = function() {
        if(this.modelBody.model){
            //reset tile to white
            for (var i = 0; i < this.modelBody.model.model.meshInstances.length; ++i) {
                this.modelBody.model.model.meshInstances[i].material.blendType = pc.BLEND_NORMAL;

                this.modelBody.model.model.meshInstances[i].material.opacity = 0.5;
                this.modelBody.model.model.meshInstances[i].material.diffuse.set(this.ogMaterial[i].diffuse.r, this.ogMaterial[i].diffuse.g, this.ogMaterial[i].diffuse.b);
                this.modelBody.model.model.meshInstances[i].material.update();
            }
        }
        
        //reset tile position
        this.modelBody.setPosition(this.ogModelPosition);

        //reset tile oscillation variables
        this.time = 0;
        this.pulseTileBodyFlag = false;
    };   
    this.app.on('tile:selectedEnd', onTileSelectedEnd, this);
    
    var onTileSpawnCrop = function(result) {         
        if(this.entity == result){
            // console.log('spawn crop');
            
            //enable crop  asset and toggle crop flag
            this.cropBodyContainer.enabled = true;
            this.entity.tags.add('cropActive');
            this.flagHasCrop = true;
            
            //rotate crop randomly for aesthetics
            this.cropBodyContainer.rotateLocal(0, 360 * Math.random(), 0);
            
            //add randomness to animation speed for aesthetics
            this.cropModel.animation.speed = Math.random() * (2 - 0.5) + 0.5;
        }
    };   
    this.app.on('tile:spawnCrop', onTileSpawnCrop, this);
    
    var onTileReset = function(result) {         
        if(this.entity == result){
            // console.log('reset tile');            
            
            //hide crop
            this.cropBodyContainer.enabled = false;
            this.flagHasCrop = false;
            
            //remove tags
            if(this.entity.tags.list()[0]){
                this.entity.tags.remove(this.entity.tags.list()[0].toString());
            }
        }
    };   
    this.app.on('tile:reset', onTileReset, this);
    
    var onTileGrowCrop = function(result) {         
        if(this.entity == result){
            // console.log('grow crop');
            
            //increment click counter
            this.clickCounter++;
            
            //explode crop if clicks surpasses max-limit
            if(this.clickCounter > this.clickCounterMax){
                // console.log('explode');
                
                //toggle tile effect explosion
                this.app.fire('game:particleFire', this.entity, 'out');
                
                //reset tile and crop
                this.app.fire('tile:reset', this.entity);
                this.app.fire('tile:selectedEnd');
                this.cropBodyContainer.setLocalScale(this.cropScaleOG);
                
                //reset click counters
                this.clickCounter = 0;
                this.clickCounterMax = Math.random() * (20 - 3) + 3;
            } else {
                //increase crop scale
                this.cropBodyContainer.setLocalScale(this.cropBodyContainer.getLocalScale().clone().scale(1.1));
            }
        }
    };   
    this.app.on('tile:growCrop', onTileGrowCrop, this);
};

// update code called every frame
Tile.prototype.update = function(dt) {
    //oscille tile effect up/down
    if(this.pulseTileBodyFlag){
        this.time += dt * this.speed;

        var t1 = Math.cos(this.time);

        var posFactor = t1 * this.moveAmount; 
        this.modelBody.setLocalPosition(this.modelBody.getLocalPosition().x, this.modelBody.getLocalPosition().y + posFactor, this.modelBody.getLocalPosition().z);
    }
};