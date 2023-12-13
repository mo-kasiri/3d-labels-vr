// Assign this script to the left or right eye
// the script emits a ray from the eye and if it hits any important position on the helmet it activates the position's text

import {Component, Property} from '@wonderlandengine/api';

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
        param: Property.float(1.0),
        ventelation: Property.object(),
        lasers: Property.object(),
        headPhone:Property.object()
    };

    static onRegister(engine) {
        /* Triggered when this component class is registered.
         * You can for instance register extra component types here
         * that your component may create. */
    }

    init() {
        console.log('init() with param', this.param);
    }

    start() {
        console.log('start() with param', this.param);
    }

    update(dt) {
        /* Get the translation of this object and store it in "origin" */
        this.object.getPositionWorld(this.origin);
        /* Get the direction of this object and store it in "dir" */
        this.object.getForwardWorld(this.dir);

        /* Send a ray into the scene and see if it hits and object in
         * collision group "1" or "2" */
        const rayHit = this.engine.scene.rayCast(this.origin, this.dir, (1 << 1) | (1 << 2)); // Check whether it hits collisions in group 0 and 1 and 2
        this.hitData = rayHit.objects;

        if(rayHit.hitCount > 0) {
            for(let i = 0; i < rayHit.hitCount; ++i) {
                let o = rayHit.objects[i];

                // TODO: We will count up the counter on the
                // hit object here later instead!
                console.log('Raycast hit object:', o.name);
            }
        }else{

        }


        /* Called every frame. */
    }
}
