import './styles.css';
import Alpine from 'alpinejs';
import { SceneManager } from './src/SceneManager';
import * as THREE from 'three';
import { MeshHandler } from './src/MeshHandler';

declare global {
    var htmx: any;
    interface Window {
        Alpine: typeof Alpine;
    }
}

window.Alpine = Alpine;
window.htmx = require("htmx.org");

let Objects : THREE.Object3D[] = [];

document.addEventListener("alpine:init", () => {
    Alpine.store("mesh", {
        create()
        {
            const meshHandler = new MeshHandler();
            const cube = meshHandler.CreateObject();
            Objects.push(cube);
        },
        delete()
        {
            const meshHandler = new MeshHandler();
            const object = Objects.pop() as THREE.Object3D;
            meshHandler.DeleteObject(object);
        },
        load()
        {
            const meshHandler = new MeshHandler();
            const objects = meshHandler.LoadObjects();

            for (let object of objects)
                {
                    Objects.push(object);
                }
        },
        save()
        {
            const meshHandler = new MeshHandler();
            const objects = meshHandler.Save();
        },
        clear()
        {
            new MeshHandler().Clear();
        }
    });
    Alpine.store("setup", {
        setup() {
            const sceneManager = SceneManager.GetInstance();
            
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