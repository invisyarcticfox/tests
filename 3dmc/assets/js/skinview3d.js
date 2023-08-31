let skinViewer = new skinview3d.SkinViewer({
  canvas: document.getElementById("skin_container"),
  width: 1500,
  height: 900,
  skin: "./assets/img/skin.png"
});

// Change viewer size
skinViewer.width = 1500;
skinViewer.height = 900;

// Load another skin
// skinViewer.loadSkin("./assets/img/skin2.png");

// Load a cape
skinViewer.loadCape("./assets/img/cape.png");

// Load an elytra (from a cape texture)
skinViewer.loadCape("./assets/img/cape.png", { backEquipment: "cape" });

// Unload(hide) the cape / elytra
// skinViewer.loadCape(null);

// Set the background color
skinViewer.background = 0x141414;

// Set the background to a normal image
// skinViewer.loadBackground("./assets/img/background.png");

// Set the background to a panoramic image
// skinViewer.loadPanorama("./assets/img/panorama1.png");

// Change camera FOV
skinViewer.fov = 70;

// Zoom out
skinViewer.zoom = 0.5;

// Rotate the player
skinViewer.autoRotate = false;

// Apply an animation
skinViewer.animation = new skinview3d.IdleAnimation();

// Set the speed of the animation
skinViewer.animation.speed = 1;

// Pause the animation
skinViewer.animation.paused = false;

// Remove the animation
skinViewer.animation = true;

skinViewer.cameraLight.intensity = 0;
skinViewer.globalLight.intensity = 0;