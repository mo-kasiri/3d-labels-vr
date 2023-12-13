// Assign this script to the left or right eye
// the script emits a ray from the eye and if it hits any important position on the helmet it activates the position's text

import {Component, Property} from '@wonderlandengine/api';
import {vec3, quat} from 'gl-matrix'

/**
 * gaze-info
 */
export class GazeInfo extends Component {
    static TypeName = 'gaze-info';

    //Properties
    origin = [0,0,0];
    direction = [0,0,0];

    /* Properties that are configurable in the editor */
    static Properties = {
        //collisionIndicator: Property.object(null),
        ventelation: Property.object(null),
        lasers: Property.object(null),
        headPhone:Property.object(null),

        headPhonePin: Property.object(null),
        lasersPin: Property.object(null),
        ventelationPin: Property.object(null)

        //handedness: Property.enum( ['input component', 'left', 'right', 'none'], 'input component' )
    };

    static onRegister(engine) {
        /* Triggered when this component class is registered.
         * You can for instance register extra component types here
         * that your component may create. */
    }

    init() {
        // this.dir = vec3.create();
        // this.tmpVec = vec3.create();
        // this.tmpVec1 = vec3.create();
    }

    start() {
        // this.eyeLeft = this.object;
        // //console.log(this.object);
        // //console.log(this.ventelation);
        // if(this.headPhonePin){
        //     //this.headPhonePin.lookAt(this.direction,[0,0,1]);
        //     this.headPhonePin.scaleLocal([]);
        // }
    }


    update(dt) {
        // if(this.object) {
        //     /* Get the translation of this object and store it in "origin" */
        //     this.object.getPositionWorld(this.origin);
        //     /* Get the direction of this object and store it in "dir" */
        //     this.object.getForwardWorld(this.direction);
        //
        //     /* Send a ray into the scene and see if it hits and object in
        //      * collision group "1" or "2" */
        //     const labelRayHit = this.engine.scene.rayCast(this.origin, this.direction, (1 << 1) ); // Check whether it hits collisions in group 0 and 1 and 2
        //     //const helmetRayHit = this.engine.scene.rayCast(this.origin2,this.direction2, (1 << 6) );
        //     this.labelHitData = {location: labelRayHit.locations, object:labelRayHit.objects}
        //
        //     if(labelRayHit.hitCount > 0) {
        //         for(let i = 0; i < labelRayHit.hitCount; ++i) {
        //             let o = labelRayHit.objects[i];
        //             if(this.ventelationPin && o.name === 'ventelation'){
        //                 this.ventelationPin.active = true;
        //             }
        //             if(this.lasersPin && o.name === 'lasers'){
        //                 this.lasersPin.active = true;
        //             }
        //             if(this.headPhonePin && o.name === 'headPhone'){
        //                 // this.headPhonePin.getPositionWorld(this.tmpVec);
        //                 // vec3.scale(this.tmpVec,this.tmpVec, dt);
        //                 // this.headPhonePin.setPositionWorld(this.tmpVec)
        //                 this.headPhonePin.active = true;
        //             }
        //
        //             // TODO: We will count up the counter on the
        //             // hit object here later instead!
        //             console.log('Raycast hit object:', o.name);
        //         }
        //     }else{
        //         if(this.ventelationPin) this.ventelationPin.active = false;
        //         if(this.headPhonePin) this.headPhonePin.active = false;
        //         if(this.lasersPin) this.lasersPin.active = false;
        //     }
        // }
    }
}
