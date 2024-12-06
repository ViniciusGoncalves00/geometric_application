import Alpine from "alpinejs";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
    Alpine.store("dropdown", () => ({
        open: false,
    }) )
})

Alpine.start();