var Touch = pc.createScript('touch');

Touch.attributes.add('camera', {type: 'entity'});
Touch.attributes.add('cameraContainer', {type: 'entity'});

// initialize code called once per entity
Touch.prototype.initialize = function() {
    //misc
    this.cameraDollySpeed = 0.1;
    this.app.root.activeTile = null;
    
    //touch controls via hammer.min.js https://hammerjs.github.io/getting-started/
    this.hammer = Hammer(this.app.graphicsDevice.canvas);
    this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.get('rotate').set({ enable: true });
    this.hammer.get('press').set();
    this.hammer.get('tap').set();
    this.hammer.get('pinch').set({ enable: true });
    this.hammer.on("tap pan panstart panend panup pandown panleft panright", function(event) {
        // console.log(event.type);
        
        if(event.type === "tap"){
            //fire raycast
            this.doRaycastTap(event.center.x, event.center.y);
        } else if(event.type === "panright"){
            //dolly camera right
            this.cameraContainer.rigidbody.applyTorque(this.cameraContainer.up.clone().scale(-1 * this.cameraDollySpeed));
        } else if(event.type === "panleft"){
            //dolly camera left
            this.cameraContainer.rigidbody.applyTorque(this.cameraContainer.up.clone().scale(this.cameraDollySpeed));
        } else if(event.type === "panend"){
            // is this needed for now?
        }
    }.bind(this));
    
    //////////
    //events//
    //////////
    var onGameReset = function() {         
        //reset all
        this.app.fire('tile:selectedEnd');
        this.app.root.activeTile = null;
        console.log('pc-reset');
        
        //Bubble fyi
        window.parent.postMessage({
            command: "pc-reset"
        },"https://master.dgkvycv1mu2ym.amplifyapp.com/"); //https://sftchackathon2020f3.bubbleapps.io
    };   
    this.app.on('game:reset', onGameReset, this);
};

//raycast logic (tap)
Touch.prototype.doRaycastTap = function (screenX, screenY) {
    // The pc.Vec3 to raycast from (the position of the camera)
    var from = this.camera.getPosition();

    // The pc.Vec3 to raycast to (the click position projected onto the camera's far clip plane)
    var to = this.camera.camera.screenToWorld(screenX, screenY, this.camera.camera.farClip);

    // Raycast between the two points and return the closest hit result
    var result = this.app.systems.rigidbody.raycastFirst(from, to);    
    //console.log(result);
    
    if(result){
        //console.log(result.entity);
        
        //tile logic    
        if(result.entity.name == "Tile"){
            console.log('tap ', result.entity.name, result.entity.tags.list());
            
            //make tile active & fire selection events
            this.app.root.activeTile = result.entity;            
            this.app.fire('tile:selectedEnd');
            this.app.fire('tile:selected', result.entity);
            
            //////////
            //BUBBLE//
            //////////
            //decrement global player seed counter
            this.app.root.playerSeedCounter--;
            
            //Bubble fyi
            window.parent.postMessage({
                command: "pc-tileSelected",
                number: this.app.root.playerSeedCounter
            },"https://master.dgkvycv1mu2ym.amplifyapp.com/");
        }
    } else {
        //reset all
        this.app.fire('game:reset');
    }
};

// update code called every frame
Touch.prototype.update = function(dt) {
    
};