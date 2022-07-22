// import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.js";
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const valuePI = document.querySelector(".piValue");
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
const group = new THREE.Group();
const mouse = {
  x: undefined,
  y: undefined,
};
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);


const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(40, 40, 40, 6, 6, 6);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
  transparent: true,
  opacity: 0.2,
  wireframeLinewidth: 2.5,
});
const cube = new THREE.Mesh(geometry, material);
const mesh3 = new THREE.Mesh(
  new THREE.SphereGeometry(20, 40, 40),
  new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.06,
    wireframe: true,
    wireframeLinewidth: 2.5,
  })
);
group.add(cube, mesh3);
scene.add(group);
var main = {
  w: 400,
  h: 400,
};
var sphere = {
  x: main.w / 2,
  y: main.h / 2,
  z: main.h / 2,
  r: main.h / 2,
};

var data = {
  pIn: 0,
  pOut: 0,
  pTotal: 0,
  pi: 0,
};

const btn = document.querySelector(".btn");
const piVal = document.querySelector(".piVal");
const download = document.querySelector('.click');

btn.addEventListener("click", function (e) {
  e.preventDefault();
  let itt = Number(piVal.value);
  for (let i = 1; i < itt; i++) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    let x = Math.floor(Math.random() * (main.h + 1));
    let y = Math.floor(Math.random() * (main.h + 1));
    let z = Math.floor(Math.random() * (main.h + 1));

    setTimeout(() => {
      if (
        Math.sqrt(
          (x - sphere.x) * (x - sphere.x) +
          (y - sphere.y) * (y - sphere.y) +
          (z - sphere.z) * (z - sphere.z)
        ) < (sphere.r)
      ) {
        data.pIn++;
        var randomDirection = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        var radius3 = Math.random() * 19 + 1;
        var randomParticle = randomDirection.multiplyScalar(radius3);
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(randomParticle, 3)
        );

        let particles1 = new THREE.Points(
          geometry,
          new THREE.PointsMaterial({ color: 0xffffff })
        );
        mesh3.add(particles1);
      } else {
        data.pOut++;
        vertices.push(THREE.MathUtils.randFloatSpread(40, 42)); // x
        vertices.push(THREE.MathUtils.randFloatSpread(40, 42)); // y
        vertices.push(THREE.MathUtils.randFloatSpread(40, 42)); // z
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vertices, 3)
        );

        let particles = new THREE.Points(
          geometry,
          new THREE.PointsMaterial({ color: 0xffff00 })
        );
        cube.add(particles);
      }
      var pi = 6 * (data.pIn / data.pTotal);
      valuePI.textContent = pi;
      data.pTotal++;
      pi_data.push(pi);
      interval.push(i);
    }, 1000);
  }
});
addEventListener("mousemove", function (e) {
  mouse.x = (e.clientX / innerWidth) * 4 - 1;
  mouse.y = (e.clientY / innerHeight) * 4 + 1;
});
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.y += 0.01;
  mesh3.rotation.y += 0.01;
  gsap.to(group.rotation, {
    y: mouse.x * 0.5,
    x: -mouse.y * 0.5,
    duration: 2,
  });
}
animate();
const pi_data = [];
const interval = [];
var listing = [];

download.addEventListener('click', function (e) {
  e.preventDefault();
  for (let p = 0; p < interval.length; p++) {
    listing.push([interval[p], pi_data[p]]);
  }
  var rows = ["Iteration", "Calculated Pi \n"];
  var jaiho = listing;

  jaiho.forEach(function (cell) {
    rows += cell.join(",");
    rows += "\n";
  });

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(rows);
  hiddenElement.target = "_blank";
  hiddenElement.download = "Monte-carlo-3d_data.csv";
  hiddenElement.click();
})
// if(module.hot){
//   module.hot.accept();
// }
