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

        const data = JSON.parse(document.getElementById('mesh_data')?.textContent || '[]');
        
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

    }
}