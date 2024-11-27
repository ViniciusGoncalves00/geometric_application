import './styles.css';
import Alpine from 'alpinejs';
import { SceneManager } from './src/SceneManager';

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
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