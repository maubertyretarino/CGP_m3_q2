import * as THREE from './three.module.js'
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let textMesh = new THREE.Mesh();
let stars, starGeo;

lighting();
text();
particles();


function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = {};
    star.velocity = 0;
    star.acceleration = 0.02;
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("/assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

function animateParticles() {
    starGeo.verticesNeedUpdate = true;
    stars.position.y -= 0.9;

    //resets stars position 
    if (stars.position.y <= -105) {stars.position.y = 0;
      //color change every 3seconds
      stars.material.color.setRGB(Math.random(256),Math.random(256),Math.random(256));
  }
  
}
  
function text () {
  const texture = new THREE.TextureLoader().load("/assets/textures/wooden.jpg");


  const loader = new FontLoader();
  loader.load( '/assets/fonts/BallianPhil_Regular.json', function ( font ) 
  {
     const textGeometry = new TextGeometry( 'Maubert ', {
      font: font,
      size: 2,
      height: 1,
      
      
    } );
  
    const textMaterial = new THREE.MeshBasicMaterial({ map: texture });
    textMesh = new THREE.Mesh( textGeometry, textMaterial );
  
    textMesh.castShadow= true;
    textMesh.position.z= -5;
    camera.position.z = 15;
  
    scene.add(textMesh);
  
  } );

}



function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);

  animateParticles();

  textMesh.rotation.x += 0.008;
  textMesh.rotation.y += 0.008;
  renderer.render(scene, camera);
}

animate();
