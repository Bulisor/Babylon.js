import { Vector3 } from "../Maths/math.vector";
import type { PhysicsBody } from "./v2/physicsBody";

/**
 * Interface for query parameters in the raycast function.
 * @see the "Collision Filtering" section in https://github.com/eoineoineoin/glTF/tree/MSFT_RigidBodies/extensions/2.0/Vendor/MSFT_collision_primitives
 */
export interface IRaycastQuery {
    /** Membership mask */
    membership?: number;
    /** CollideWith mask */
    collideWith?: number;
}

/**
 * Holds the data for the raycast result
 * @see https://doc.babylonjs.com/features/featuresDeepDive/physics/usingPhysicsEngine
 */
export class PhysicsRaycastResult {
    private _hasHit: boolean = false;

    private _hitDistance: number = 0;
    private _hitNormalWorld: Vector3 = Vector3.Zero();
    private _hitPointWorld: Vector3 = Vector3.Zero();
    private _rayFromWorld: Vector3 = Vector3.Zero();
    private _rayToWorld: Vector3 = Vector3.Zero();
    private _triangleIndex: number = -1;

    /**
     * The Physics body that the ray hit
     */
    public body?: PhysicsBody;
    /**
     * The body Index in case the Physics body is using instances
     */
    public bodyIndex?: number;

    /**
     * Gets if there was a hit
     */
    get hasHit(): boolean {
        return this._hasHit;
    }

    /**
     * Gets the distance from the hit
     */
    get hitDistance(): number {
        return this._hitDistance;
    }

    /**
     * Gets the hit normal/direction in the world
     */
    get hitNormalWorld(): Vector3 {
        return this._hitNormalWorld;
    }

    /**
     * Gets the hit point in the world
     */
    get hitPointWorld(): Vector3 {
        return this._hitPointWorld;
    }

    /**
     * Gets the ray "start point" of the ray in the world
     */
    get rayFromWorld(): Vector3 {
        return this._rayFromWorld;
    }

    /**
     * Gets the ray "end point" of the ray in the world
     */
    get rayToWorld(): Vector3 {
        return this._rayToWorld;
    }

    /*
     * The index of the original triangle which was hit. Will be -1 if contact point is not on a mesh shape
     */
    get triangleIndex(): number {
        return this._triangleIndex;
    }

    /**
     * Sets the hit data (normal & point in world space)
     * @param hitNormalWorld defines the normal in world space
     * @param hitPointWorld defines the point in world space
     */
    public setHitData(hitNormalWorld: IXYZ, hitPointWorld: IXYZ, triangleIndex?: number) {
        this._hasHit = true;
        this._hitNormalWorld.set(hitNormalWorld.x, hitNormalWorld.y, hitNormalWorld.z);
        this._hitPointWorld.set(hitPointWorld.x, hitPointWorld.y, hitPointWorld.z);
        this._triangleIndex = triangleIndex ?? -1;
    }

    /**
     * Sets the distance from the start point to the hit point
     * @param distance
     */
    public setHitDistance(distance: number) {
        this._hitDistance = distance;
    }

    /**
     * Calculates the distance manually
     */
    public calculateHitDistance() {
        this._hitDistance = Vector3.Distance(this._rayFromWorld, this._hitPointWorld);
    }

    /**
     * Resets all the values to default
     * @param from The from point on world space
     * @param to The to point on world space
     */
    public reset(from: Vector3 = Vector3.Zero(), to: Vector3 = Vector3.Zero()) {
        this._rayFromWorld.copyFrom(from);
        this._rayToWorld.copyFrom(to);

        this._hasHit = false;
        this._hitDistance = 0;

        this._hitNormalWorld.setAll(0);
        this._hitPointWorld.setAll(0);
        this._triangleIndex = -1;

        this.body = undefined;
        this.bodyIndex = undefined;
    }
}

/**
 * Interface for the size containing width and height
 */
interface IXYZ {
    /**
     * X
     */
    x: number;

    /**
     * Y
     */
    y: number;

    /**
     * Z
     */
    z: number;
}
