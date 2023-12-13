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
        ventelationPanel: Property.object(),
        eyeLeft: Property.object(),

    };

    static onRegister(engine) {
        /* Triggered when this component class is registered.
         * You can for instance register extra component types here
         * that your component may create. */
        engine.registerComponent(HowlerAudioSource);
        engine.registerComponent(CursorTarget);
    }

    init() {
        let ventelationPanelMesh = this.ventelationPanel.getComponent('mesh');
        ventelationPanelMesh.active = false;
        let lasersPanelMesh = this.lasersPanel.getComponent('mesh');
        lasersPanelMesh.active = false;
        let headPhonePanelMesh = this.headPhonePanel.getComponent('mesh');
        headPhonePanelMesh.active = false;


        this.collider = this.object.getComponent('collision');
        this.objectsArr = [];
        this.check = false;
        this.laserCollided = false;
        this.ventelationCollided = false;
        this.headPhoneCollided = false;
        console.log(this.collider);
        console.log('init() with param', this.param);
    }

    start() {
        this.target =
            this.object.getComponent(CursorTarget) ||
            this.object.addComponent(CursorTarget);

        let ventelationPanelMesh = this.ventelationPanel.getComponent('mesh');
        ventelationPanelMesh.active = false;
        let lasersPanelMesh = this.lasersPanel.getComponent('mesh');
        lasersPanelMesh.active = false;
        let headPhonePanelMesh = this.headPhonePanel.getComponent('mesh');
        headPhonePanelMesh.active = false;
    }

    update(dt) {
        //console.log(this.object.getPositionWorld())

        let collidingComps = this.collider.queryOverlaps();
        //console.log(collidingComps.length);
        //if(!this.check){
                for (let i = 0; i < collidingComps.length; ++i){
                    if(!this.check){
                        console.log('hi')
                        console.log(collidingComps[i]);

                        if(collidingComps[i].object.name === "ventelation"){
                            this.ventelationCollided = true;

                            this.laserCollided = false;
                            this.headPhoneCollided = false;
                            let ventelationPinmat = this.ventelationPin.getComponent('mesh');
                            ventelationPinmat.material = this.matCollision;
                           // console.log('reached ventelation');
                        }

                        if(collidingComps[i].object.name === "lasers"){
                            this.laserCollided = true;

                            this.ventelationCollided = false;
                            this.headPhoneCollided = false;
                            let laserPinmat = this.lasersPin.getComponent('mesh');
                            laserPinmat.material = this.matCollision;
                            //console.log('reached lasers')
                        }

                        if(collidingComps[i].object.name === "headPhone"){
                            this.headPhoneCollided = true;

                            this.ventelationCollided = false;
                            this.laserCollided = false;
                            let headPhonePinmat = this.headPhonePin.getComponent('mesh');
                            headPhonePinmat.material = this.matCollision;
                            //console.log('reached headPhone')
                        }


                        this.objectsArr.push(collidingComps[i]);
                        this.check = true;

                    }
                }
                if(collidingComps.length===0){
                    this.check = false;
                    for (let i = 0; i < this.objectsArr.length; i++) {

                        let ventelationPinmat = this.ventelationPin.getComponent('mesh');
                        ventelationPinmat.material = this.matStart;

                        let laserPinmat = this.lasersPin.getComponent('mesh');
                        laserPinmat.material = this.matStart;

                        let headPhonePinmat = this.headPhonePin.getComponent('mesh');
                        headPhonePinmat.material = this.matStart;

                    }
                    this.objectsArr = [];
                }

    //Positioning the information






    if(this.ventelationCollided)
    {
        let ventelationPanelMesh = this.ventelationPanel.getComponent('mesh');
        ventelationPanelMesh.active = true;


        let lasersPanelMesh = this.lasersPanel.getComponent('mesh');
        lasersPanelMesh.active = false;
        let headPhonePanelMesh = this.headPhonePanel.getComponent('mesh');
        headPhonePanelMesh.active = false;

    }
    if(this.headPhoneCollided){
        let headPhonePanelMesh = this.headPhonePanel.getComponent('mesh');
        headPhonePanelMesh.active = true;

        let ventelationPanelMesh = this.ventelationPanel.getComponent('mesh');
        ventelationPanelMesh.active = false;
        let lasersPanelMesh = this.lasersPanel.getComponent('mesh');
        lasersPanelMesh.active = false;

    }
    if(this.laserCollided){
        let lasersPanelMesh = this.lasersPanel.getComponent('mesh');
        lasersPanelMesh.active = true;

        let headPhonePanelMesh = this.headPhonePanel.getComponent('mesh');
        headPhonePanelMesh.active = false;
        let ventelationPanelMesh = this.ventelationPanel.getComponent('mesh');
        ventelationPanelMesh.active = false;
    }


        //this.headPhonePanel.active = false;

    }
}
