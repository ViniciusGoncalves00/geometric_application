import './styles.css';
import Alpine from 'alpinejs';
import { SceneManager } from './src/SceneManager';
import * as THREE from 'three';
import { MeshHandler } from './src/MeshHandler';

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
    Alpine.store("mesh", {
        create()
        {
            const meshHandler = new MeshHandler();
            const cube = meshHandler.CreateCube();
        }
    });
    Alpine.store("setup", {
        setup() {
            const sceneManager = SceneManager.GetInstance();
            const meshHandler = new MeshHandler();
            meshHandler.InitializeComponents();

            // async function loadObjects() {
            //     try {
            //         const response = await fetch('');
            //         if (!response.ok) throw new Error('Error to find object data.');
                    
            //         const data = await response.json();
            //         if (data.error) throw new Error(data.error);
            
            //         const geometry = new THREE.BoxGeometry();
            //         const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            //         const object = new THREE.Mesh(geometry, material);
            
            //         object.position.set(data.position_x, data.position_y, data.position_z);
            //         object.rotation.set(data.rotation_x, data.rotation_y, data.rotation_z);
            //         object.scale.set(data.scale_x, data.scale_y, data.position_z);
            
            //         sceneManager.Scene.add(object);
            //     }
            //     catch (error)
            //     {
            //         console.error(error);
            //     }
            // }

            // loadObjects()
            
            const loop = () => {
                sceneManager.Renderer.render(sceneManager.Scene, sceneManager.Camera);
                requestAnimationFrame(loop);
            };
            loop();
        },
    });
});

interface SetupStore {
    setup: () => void;
}

document.addEventListener("DOMContentLoaded", () => {
    Alpine.start();

    if (localStorage.getItem('theme') === 'custom_light')
    {
        document.documentElement.setAttribute('data-theme', 'custom_light');
    }
    else
    {
        document.documentElement.setAttribute('data-theme', 'custom_light');
    }

    const input = Alpine.store("setup") as SetupStore;
    input.setup();
});