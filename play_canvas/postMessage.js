var PostMessage = pc.createScript('postMessage');

// initialize code called once per entity
PostMessage.prototype.initialize = function() {
    //misc
    this.app.root.playerSeedCounter = 0;
    
    //tell Bubble that playcanvas is loaded
    window.parent.postMessage({
        command: "pc-loaded",
        number: 0,
        string: "test"
    },"https://master.dgkvycv1mu2ym.amplifyapp.com/");
    
    //listen for command from Bubble 
    window.addEventListener("message", function (event) {
        if (event.origin === "https://master.dgkvycv1mu2ym.amplifyapp.com/") {
            console.log('message received from bubble', event.data);
            
            //reset
            if (event.data.command.includes('b-reset') === true){                
                //reset all
                pc.Application.getApplication().fire('game:reset');
            }
            
            //soft-reset
            if (event.data.command.includes('b-softReset') === true){                
                //Bubble fyi
                window.parent.postMessage({
                    command: "pc-softReset"
                },"https://master.dgkvycv1mu2ym.amplifyapp.com/");
            }
            
            //update seed counter from Bubble
            if (event.data.command.includes('b-seedCounterUpdate') === true){                
                console.log('updating seed count', event.data.number);
                
                pc.Application.getApplication().root.playerSeedCounter = parseInt(event.data.number);                
            }
        }
    }, false);
};