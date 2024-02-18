class Resources {
    constructor() {
        this.toLoad = {
            ground: "/sprites/ground.png",
            hero: "/sprites/hero-sheet.png",
            shadow: "/sprites/shadow.png",
            coins: "/sprites/MonedaD.png",
            wumpus: "/sprites/UnravelingCrawler.png",
        };

        this.images = {};

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false,
            };

            img.onload = () => {
                this.images[key].isLoaded = true;
            };
        })
    }
}

export const resources = new Resources();