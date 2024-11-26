import './styles.css';
import Alpine from 'alpinejs';
import * as THREE from 'three';
import { SceneManager } from './src/SceneManager';
import { Keyboard } from './src/Keyboard';
import { Mouse } from './src/Mouse';
import { Vector } from './src/Utils';
import { HandleMesh } from './src/HandleMesh';

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

window.Alpine = Alpine;

let selectedMesh: THREE.Mesh | null;

document.addEventListener("alpine:init", () => {
    Alpine.store("input", {
        setup_input() {
            const sceneManager = SceneManager.GetInstance();
            const mouse = Mouse.GetInstance();
            const keyboard = Keyboard.GetInstance();
            const meshHandler = new HandleMesh();
            
            const raycaster = new THREE.Raycaster();

            const update = () => {
                if(mouse.GetButtonDown(mouse.leftButton))
                {
                    raycaster.setFromCamera(mouse.NormalizedPosition(), sceneManager.Camera);

                    const intersects = raycaster.intersectObjects(sceneManager.Scene.children, true);
                
                    if (intersects.length > 0) {
                        selectedMesh = intersects[0].object as THREE.Mesh;
                    }
                    else
                    {
                        selectedMesh = null;
                    }
                }
            }

            const loop = () => {
                update();
                sceneManager.Renderer.render(sceneManager.Scene, sceneManager.Camera);
                requestAnimationFrame(loop);
            };
            loop();
        },
    });
    interface SceneStore {
        children: string[];
        setup_scene: () => void;
    }

    Alpine.store("scene", {
        children: [],
        setup_scene() {
            const sceneManager = SceneManager.GetInstance();
            this.children = sceneManager.Scene.children.map(child => child.name || "Unnamed Object");
        },
    } as SceneStore);
});

interface InputStore {
    setup_input: () => void;
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

    const input = Alpine.store("input") as InputStore;
    input.setup_input();
});