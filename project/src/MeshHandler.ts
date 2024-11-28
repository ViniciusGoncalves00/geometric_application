import * as THREE from 'three';
import { SceneManager } from './SceneManager';

export class MeshHandler
{
    private _sceneManager : SceneManager;

    public constructor()
    {
        this._sceneManager = SceneManager.GetInstance();
    }

    public InitializeComponents()
    {
        const value = JSON.parse(document.getElementById('value')?.textContent || '{}');
        console.log(value);
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const cube = new THREE.Mesh(geometry);

        cube.name = value.name;
        cube.position.x = value.position_x;
        cube.position.y = value.position_y;
        cube.position.z = value.position_z;
        cube.rotation.x = value.rotation_x;
        cube.rotation.y = value.rotation_y;
        cube.rotation.z = value.rotation_z;
        cube.scale.x = value.scale_x;
        cube.scale.y = value.scale_y;
        cube.scale.z = value.scale_z;

        this._sceneManager.Scene.add(cube);
        this._sceneManager.Renderer.render(this._sceneManager.Scene, this._sceneManager.Camera);
    }
    
    public CreateCube(): THREE.Mesh
    {
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
        this._sceneManager.Renderer.render(this._sceneManager.Scene, this._sceneManager.Camera);

        return cube;
    }
}