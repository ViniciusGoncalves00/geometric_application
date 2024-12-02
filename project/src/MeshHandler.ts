import * as THREE from 'three';
import { SceneManager } from './SceneManager';

interface ThreeCube {
    name : string;
    
    position_x : number;
    position_y : number;
    position_z : number;
    
    rotation_x : number;
    rotation_y : number;
    rotation_z : number;
    
    scale_x : number;
    scale_y : number;
    scale_z : number;
}

export class MeshHandler
{
    private _sceneManager : SceneManager;

    public constructor()
    {
        this._sceneManager = SceneManager.GetInstance();
    }

    public LoadObjects() : THREE.Object3D[]
    {
        console.log("Load");

        const data = JSON.parse(document.getElementById('object_data')?.textContent || '[]');
        
        let objects: THREE.Object3D[] = [];
    
        if (Array.isArray(data)) {
            for (let value of data) {
                const object = value as ThreeCube;
    
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const cube = new THREE.Mesh(geometry);
    
                cube.name = object.name;
                cube.position.set(object.position_x, object.position_y, object.position_z);
                cube.rotation.set(object.rotation_x, object.rotation_y, object.rotation_z);
                cube.scale.set(object.scale_x, object.scale_y, object.scale_z);

                objects.push(cube);
                this._sceneManager.Scene.add(cube);
            }
        } else {
            console.error("Loaded data is not in the expected format.");
        }
    
        return objects;
    }
    
    public CreateObject(): THREE.Object3D
    {
        console.log("Create");
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const cube = new THREE.Mesh(geometry);
        const meshes = this._sceneManager.Scene.children.filter(child => child instanceof THREE.Mesh);

        let index = 0;
        let name = "mesh_" + index;
        while(true)
        {
            try
            {
                meshes[index].name == name;
            }
            catch (error)
            {
                break;
            }
            index++;
            name = "mesh_" + index;
        }
        cube.name = name;
        this._sceneManager.Scene.add(cube);
        return cube;
    }

    public DeleteObject(object: THREE.Object3D): void
    {
        console.log("Delete");
        this._sceneManager.Scene.remove(object)
        const geometry = (object as THREE.Mesh).geometry;
        geometry.dispose()
    }
    public Save()
    {
        console.log("Save");

        // Collect objects from your Three.js scene
        const objects = this._sceneManager.Scene.children.map((object) => {
            if (object instanceof THREE.Mesh) {
                return {
                    name: object.name,
                    position_x: object.position.x,
                    position_y: object.position.y,
                    position_z: object.position.z,
                    rotation_x: object.rotation.x,
                    rotation_y: object.rotation.y,
                    rotation_z: object.rotation.z,
                    scale_x: object.scale.x,
                    scale_y: object.scale.y,
                    scale_z: object.scale.z,
                };
            }
        }).filter(Boolean); // Filter out undefined objects
    
        const csrf = (document.querySelector('input[name="csrfmiddlewaretoken"]') as HTMLInputElement)?.value;
    
        if (!csrf) {
            console.error("CSRF token not found.");
            return;
        }
    
        // Make the POST request
        fetch('/app/object_data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf,
            },
            body: JSON.stringify(objects), // Send objects as the request payload
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Objects saved successfully:", data);
        })
        .catch((error) => {
            console.error("Error saving objects:", error);
        });
    }
    public Clear()
    {
        console.log("Clear");

        const url = '/app/object_data/'
        const method = 'DELETE'
        
        // Collect objects from your Three.js scene
        const objects = this._sceneManager.Scene.children.map((object) => {
            if (object instanceof THREE.Mesh) {
                return {
                    name: object.name,
                    position_x: object.position.x,
                    position_y: object.position.y,
                    position_z: object.position.z,
                    rotation_x: object.rotation.x,
                    rotation_y: object.rotation.y,
                    rotation_z: object.rotation.z,
                    scale_x: object.scale.x,
                    scale_y: object.scale.y,
                    scale_z: object.scale.z,
                };
            }
        }).filter(Boolean); // Filter out undefined objects
    
        const csrf = (document.querySelector('input[name="csrfmiddlewaretoken"]') as HTMLInputElement)?.value;
    
        if (!csrf) {
            console.error("CSRF token not found.");
            return;
        }
    
        // Make the POST request
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf,
            },
            body: JSON.stringify(objects), // Send objects as the request payload
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Objects deleted successfully:", data);
        })
        .catch((error) => {
            console.error("Error deleting objects:", error);
        });
    }
}