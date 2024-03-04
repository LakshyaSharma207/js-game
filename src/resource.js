class Resources {
    constructor() {
        this.toLoad = {
            ground: "/dungeon.png",
            shadow: "/sprites/shadow.png",
            coins: "/sprites/MonedaD.png",
            wumpus: "/sprites/Slime.png",
            agent: "/sprites/Archer-Green.png",
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