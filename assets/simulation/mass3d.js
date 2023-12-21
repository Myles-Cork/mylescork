// Myles Cork
// Class for simulating spherical masses with gravity and collisions in 3D using a Euler step method.

import * as THREE from "https://threejs.org/build/three.module.js";

// Mass speed limit
const speed_limit = 0.15;
// Constants for repulsion calculation
const gravity_eq_shift = 6.0;
const repulsion_power = 50.0;
const rt_gravity_eq_shift = Math.pow(gravity_eq_shift,2.0/repulsion_power);
// Increase the repulsion force of static masses (to prevent non-static masses from sticking to them)
const static_repulsion_multiplier = 4.0;

export class Mass3D {
    mass; // Mass quantity of this mass
    radius; // Radius of this mass
    position; // Position of this mass in 3D
    prev_velocity; // Velocity of this mass at the end of the previous step
    velocity; // Velocity of this mass
    static_mass; // True this mass is stationary
    obj; // Threejs object associated with this mass
    
    constructor(mass, radius, position, initial_velocity, static_mass, material){
        this.mass = mass;
        this.radius = radius;
        this.position = position;
        this.prev_velocity = initial_velocity;
        if(static_mass){
            this.velocity = new THREE.Vector3();
        }else{
            this.velocity = initial_velocity;
        }
        this.static_mass = static_mass;
        let geometry = new THREE.SphereGeometry(radius,32,16);
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.position.x = this.position.x;
        this.obj.position.y = this.position.y;
        this.obj.position.z = this.position.z;
    }

    // Calculate the velocity based on gravitational forces and wall
    calc_velocity(masses){
        if(this.static_mass){
            return
        }

        let force_total = new THREE.Vector3();

        // "Wall" force that pulls objects back towards the center based on the wall_dist
        let wall_dist = 20.0;
        let centerdist = this.position.length();
        if(centerdist > wall_dist){
            force_total.add(new THREE.Vector3().copy(this.position).normalize().multiplyScalar(-0.0001 * this.mass * Math.pow(centerdist-wall_dist, 2.0)));
        }

        masses.forEach(other => {
            let distance = this.position.distanceTo(other.position);
            if(distance != 0){
                let force_magnitude = 0.00001 * this.mass * other.mass / (Math.pow(Math.max(distance-(this.radius+other.radius)+gravity_eq_shift,gravity_eq_shift), 2.0));
                let force_vector = new THREE.Vector3();
                
                force_vector.subVectors(other.position, this.position);
                force_vector.setLength(force_magnitude);
                force_total.add(force_vector);
            }       
        });

        // Add acceleration to velocity
        this.velocity.add(force_total.divideScalar(this.mass))
    }

    // Handle collisions (not perfectly elastic due to rounding and step errors)
    elastic_collisions(masses){
        if(this.static_mass){
            return;
        }
        let normal = new THREE.Vector3();
        let force_total = new THREE.Vector3();
        let relative_velocity = new THREE.Vector3();
        let normal_vel_1 = new THREE.Vector3();
        let normal_vel_2 = new THREE.Vector3();
        masses.forEach(other => {
            let distance = this.position.distanceTo(other.position);
            if(distance != 0.0 && distance <= this.radius + other.radius){
                // Reflect velocity relative to impact direction 
                normal.subVectors(this.position,other.position).normalize();
                
                relative_velocity.copy(this.prev_velocity).sub(other.prev_velocity)
                let velocity_normal_magnitude = relative_velocity.dot(normal)

                if(other.static_mass){  
                    // Only this mass experiences a velocity change
                    normal_vel_1.copy(normal).multiplyScalar(velocity_normal_magnitude * (2.0 * other.mass)/(this.mass + other.mass))
                }else{
                    // Reflect the velocities of each mass, divided by 2
                    normal_vel_1.copy(normal).multiplyScalar(velocity_normal_magnitude * (2.0 * other.mass)/(this.mass + other.mass)/2.0)
                    normal_vel_2.copy(normal).multiplyScalar(velocity_normal_magnitude * (2.0 * this.mass)/(this.mass + other.mass)/2.0)
                    other.velocity.add(normal_vel_2)
                }
                this.velocity.sub(normal_vel_1);

                // Additional repulsion force for when masses are intersecting to prevent them from collapsing on one another
                let force_vector = new THREE.Vector3();
                let force_magnitude = -(0.00001 * this.mass * other.mass / (Math.pow(Math.max(distance-(this.radius+other.radius)+rt_gravity_eq_shift,rt_gravity_eq_shift-0.1*rt_gravity_eq_shift*(this.radius+other.radius)), repulsion_power)));

                if(other.static_mass){
                    force_magnitude = static_repulsion_multiplier*force_magnitude;
                }
                force_vector.subVectors(other.position, this.position);
                force_vector.setLength(force_magnitude);
                force_total.add(force_vector);
            }
        });
        this.velocity.add(force_total.divideScalar(this.mass));
    }

    // Update the position of the mass
    update_position(){
        if(this.static_mass){
            return
        }
        this.position.add(this.velocity.clampLength(0.0,speed_limit)); // limit velocity
        this.obj.position.x = this.position.x;
        this.obj.position.y = this.position.y;
        this.obj.position.z = this.position.z;
        this.prev_velocity.clone(this.velocity);
    }
}