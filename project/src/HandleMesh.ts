import * as THREE from 'three';
import { SceneManager } from './SceneManager';

export class HandleMesh
{
    private _sceneManager : SceneManager;

    public constructor()
    {
        this._sceneManager = SceneManager.GetInstance();
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