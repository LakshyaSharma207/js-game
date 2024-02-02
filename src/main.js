import k from "./kaboomContext.js";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

kaboom();

loadSprite("dino", "sprites/dino.png");
loadSprite("obstacle", "sprites/coin.png")

scene("start", () => {
    let taxt = '';
    add([
        text("Write start to start game -"),
        pos(width() / 2 - 200, height() / 2 - 80)
    ])
    const mssg = add([
        text(taxt),
        pos(width() / 2, height() / 2 + 80)
    ])
    onKeyPress((event) => {
        taxt = taxt + event;
        mssg.text = taxt;
        if(mssg.text == "start" || mssg.text == "Start"){
            go("game");
        }
    })
})

scene("game", () => {
    const player = add([
        sprite("dino"),
        pos(80, 40),
        area(),
        body(),
    ]);
    
    onKeyDown("space", () => {
        if(player.isGrounded()){
            player.jump(JUMP_FORCE);
        }
    });
    
    add([
        rect(width(), FLOOR_HEIGHT),
        pos(0, height() - FLOOR_HEIGHT),
        outline(4),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
    ]);
    
    setGravity(1700)
    
    // loop(1, () => {
    // add([ some code ]);
    // });
    
    function spawnTree() {
        add([
            rect(48, rand(24, 64)),
            area(),
            outline(4),
            color(255, 69, 0),
            pos(width(), height() - FLOOR_HEIGHT),
            anchor("botleft"),
            move(LEFT, SPEED), 
            "tree",
        ]);
        // add([
        //     sprite("obstacle"),
        //     area(),
        //     pos(width(), height() - FLOOR_HEIGHT),
        //     move(LEFT, SPEED),
        //     anchor("botleft"),  
        //     scale(rand(1, 2)),
        //     "tree",
        // ])
        wait(rand(0.5, 1.5), () => {
            spawnTree();
        });
    };
    spawnTree();

    player.onCollide("tree", () => {
        go("lose", score);
        burp();
        addKaboom(player.pos);
    })
    let score = 0;
    const scoreLabel = add([
        text(score),  
        pos(24, 24)
    ])

    onUpdate(() => {
        score++;
        scoreLabel.text = `Score: ${score}`;
    });
});
    
go("start");

scene("lose", (score) => {
    add([
        sprite("dino"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);

    add([
        text(`${score}\n Space to continue`),
        pos(width() / 2, height() / 2 + 80),
        scale(1.2),
        anchor("center"),
    ]);

    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));
})