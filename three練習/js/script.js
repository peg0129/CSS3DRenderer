window.addEventListener("load", function(){
  var scrollY = window.scrollY; //0からwindow.scrollYへ

  // 幅、高さ取得
  const width  = window.innerWidth;
  const height = window.innerHeight;

  var aaa = document.getElementById("scroll-container"),
      bbb = document.querySelectorAll(".title");

  // レンダラの作成、DOMに追加
  const renderer = new THREE.CSS3DRenderer({alpha: true});
  renderer.setSize(width, height);
  const container = document.getElementById("canvas-container");
  container.appendChild(renderer.domElement);

  // シーンの作成
  var scene  = new THREE.Scene();

  //カメラの作成
  const fov = 60;
  const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = (height / 2) / Math.tan(fovRad);
  const camera = new THREE.PerspectiveCamera(fov, width / height, 1, dist * 2);
  camera.position.z = dist;

  //ライトの作成
  const light  = new THREE.PointLight(0xffffff);
  light.position.set(0, 0, 400);
  light.castShadow = true;
  scene.add(light);

  // メッシュの作成と追加
  var mesh = new THREE.CSS3DObject(bbb);
  scene.add(mesh);
  console.log(mesh);

  while (aaa.firstChild) aaa.removeChild(aaa.firstChild);
  aaa.appendChild( renderer.domElement );


  //マウスイベント
   var mouse = new THREE.Vector2(0, 0);

  function mouseMoved(x, y) {
    mouse.x =  x - (width / 2);// 原点を中心に持ってくる
    mouse.y = -y + (height / 2);// 軸を反転して原点を中心に持ってくる

    light.position.x = mouse.x;
    light.position.y = mouse.y;
  }

  window.addEventListener('mousemove', e => {
    mouseMoved(e.clientX, e.clientY);
  });

  //スクロールイベント
  function scrolled(y) {
    scrollY = y;
  }

  scrolled(window.scrollY);
  window.addEventListener('scroll', e => {
    scrolled(window.scrollY);
  });


  // レンダリング
  const animation = () => {

    //ミリ秒から秒へ変換
    //const sec = performance.now() / 1000;

    // 1秒で45°回転する
    //mesh.rotation.x = sec * (Math.PI / 4);
    //mesh.rotation.y = sec * (Math.PI / 4);

    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  };

  animation();
}, false)
