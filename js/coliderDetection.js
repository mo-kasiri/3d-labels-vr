import {Component, Property} from '@wonderlandengine/api';
import {CursorTarget, HowlerAudioSource} from '@wonderlandengine/components';

function hapticFeedback(object, strength, duration) {
    const input = object.getComponent(InputComponent);
    if (input && input.xrInputSource) {
        const gamepad = input.xrInputSource.gamepad;
        if (gamepad && gamepad.hapticActuators)
            gamepad.hapticActuators[0].pulse(strength, duration);
    }
}

/**
 * coliderDetection
 */
export class ColiderDetection extends Component {
    static TypeName = 'coliderDetection';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),
        matStart: Property.material(),
        matCollision: Property.material(),

        headPhonePin: Property.object(null),
        lasersPin: Property.object(null),
        ventelationPin: Property.object(null),

        headPhonePanel: Property.object(),
        lasersPanel: Property.object(),
        ventelationPanel: Property.object()

    };

    static onRegister(engine) {
        /* Triggered when this component class is registered.
         * You can for instance register extra component types here
         * that your component may create. */
        engine.registerComponent(HowlerAudioSource);
        engine.registerComponent(CursorTarget);
    }

    init() {
        this.collider = this.object.getComponent('collision');
        this.objectsArr = [];
        this.check = false;
        console.log(this.collider);
        console.log('init() with param', this.param);
    }

    start() {
        this.target =
            this.object.getComponent(CursorTarget) ||
            this.object.addComponent(CursorTarget);
    }

    update(dt) {
        let collidingComps = this.collider.queryOverlaps();
        //console.log(collidingComps.length);
        //if(!this.check){
                for (let i = 0; i < collidingComps.length; ++i){
                    if(!this.check){
                        console.log('hi')
                        console.log(collidingComps[i]);

                        if(collidingComps[i].object.name === "ventelation"){
                            let ventelationPinmat = this.ventelationPin.getComponent('mesh');
                            ventelationPinmat.material = this.matCollision;

                            console.log('reached ventelation');
                        }

                        if(collidingComps[i].object.name === "lasers"){
                            let laserPinmat = this.lasersPin.getComponent('mesh');
                            laserPinmat.material = this.matCollision;
                            console.log('reached lasers')
                        }

                        if(collidingComps[i].object.name === "headPhone"){
                            let headPhonePinmat = this.headPhonePin.getComponent('mesh');
                            headPhonePinmat.material = this.matCollision;
                            console.log('reached headPhone')
                        }


                        this.objectsArr.push(collidingComps[i]);
                        this.check = true;

                    }
                }
                if(collidingComps.length===0){
                    this.check = false;
                    for (let i = 0; i < this.objectsArr.length; i++) {
                        // let startMesh = this.objectsArr[i].object.getComponent('mesh');
                        // console.log(startMesh);
                        // startMesh.material = this.matStart;
                        let ventelationPinmat = this.ventelationPin.getComponent('mesh');
                        ventelationPinmat.material = this.matStart;

                        let laserPinmat = this.lasersPin.getComponent('mesh');
                        laserPinmat.material = this.matStart;

                        let headPhonePinmat = this.headPhonePin.getComponent('mesh');
                        headPhonePinmat.material = this.matStart;

                    }
                    this.objectsArr = [];
                }
        //}
        //console.log(this.objectsArr);
        //console.log(collidingComps.children);
        // for(const otherCollision of collidingComps){
        //     //console.log(otherCollision.object.name);
        //     if(!this.check){
        //         // let collidingMesh = otherCollision.object.getComponent('mesh');
        //         // collidingMesh.material = this.matCollision;
        //         // this.objectsArr.push(otherCollision);
        //         this.check = true;
        //         this.objectsArr.push(otherCollision);
        //         if(otherCollision.object.name === "ventelation"){
        //             let ventelationPinmat = this.ventelationPin.getComponent('mesh');
        //             ventelationPinmat.material = this.matCollision;
        //             //this.ventelationPin.material.material = this.matCollision;
        //             console.log('reached ventelation');
        //             //hapticFeedback(this.object, 0.5, 50);
        //             //this.objectsArr.push(otherCollision);
        //         }
        //
        //         if(otherCollision.object.name === "lasers"){
        //             let laserPinmat = this.lasersPin.getComponent('mesh');
        //             laserPinmat.material = this.matCollision;
        //             console.log('reached lasers')
        //             //hapticFeedback(this.object, 0.5, 50);
        //             //this.objectsArr.push(otherCollision);
        //         }
        //
        //         if(otherCollision.object.name === "headPhone"){
        //             let headPhonePinmat = this.headPhonePin.getComponent('mesh');
        //             headPhonePinmat.material = this.matCollision;
        //             console.log('reached headPhone')
        //             //hapticFeedback(this.object, 0.5, 50);
        //             //this.objectsArr.push(otherCollision);
        //         }
        //     }
        // }
        //
        // if(collidingComps.length === 0){
        //     console.log('yes');
        //     this.check = false;
        //     for (let i = 0; i < this.objectsArr.length; i++) {
        //         let startMesh = this.objectsArr[i].object.getComponent('mesh');
        //         startMesh.material = this.matStart;
        //     }
        //     this.objectsArr = [];
        //     //this.objectsArr = [];
        //     // let ventelationPinmat = this.ventelationPin.getComponent('mesh');
        //     // ventelationPinmat.material = this.matStart;
        //     //
        //     // let laserPinmat = this.lasersPin.getComponent('mesh');
        //     // laserPinmat.material = this.matStart;
        //     //
        //     // let headPhonePinmat = this.headPhonePin.getComponent('mesh');
        //     // headPhonePinmat.material = this.matStart;
        //}

    }
}
