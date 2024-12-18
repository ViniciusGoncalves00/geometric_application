import * as THREE from 'three';

export class SceneManager
{
    private static _instance : SceneManager | null = null;
    public readonly Scene : THREE.Scene;
    public readonly Renderer : THREE.Renderer;
    public readonly Camera : THREE.Camera;

    private constructor()
    {
        this.Scene = new THREE.Scene();
        this.Scene.background = new THREE.Color(0.75, 0.75, 0.80)

        this.Camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.Camera.position.x = 5;
        this.Camera.position.y = 5;
        this.Camera.position.z = 5;
        this.Camera.lookAt(0,0,0)

        this.Renderer = new THREE.WebGLRenderer();
        this.Renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.Renderer.domElement);

        this.Renderer.render(this.Scene, this.Camera);
    }

    public static GetInstance(): SceneManager
    {
        if (this._instance == null)
        {
            this._instance = new SceneManager();
        }

        return this._instance;
    }
}