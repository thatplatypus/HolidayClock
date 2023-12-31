/*!
confetti2
Copyright (c) 2023 by Wakana Y.K. (https://codepen.io/wakana-k/pen/mdvoQaV)
*/
/*!
Changes from the previous version:
・Added curves to the confetti.
・Added star objects.

previous version : confetti / https://codepen.io/wakana-k/pen/gOqqWdY
*/
"use strict";

import * as THREE from 'three';
import { RGBELoader } from 'https://unpkg.com/three@0.159.0/examples/jsm/loaders/RGBELoader.js';

import { OrbitControls as t } from "three/addons/controls/OrbitControls.js";



!(function () {
    function n() {
        (m.aspect = window.innerWidth / window.innerHeight),
            m.updateProjectionMatrix(),
            M.setSize(window.innerWidth, window.innerHeight);
    }
    function o(t) {
        for (let e = 0; e < t.count; e++)
            t.getMatrixAt(e, x),
                x.decompose(b.position, b.quaternion, b.scale),
                (b.position.y -= h * ((e % 4) + 1)),
                b.position.y < -a
                    ? ((b.position.y = a),
                        (b.position.x = THREE.MathUtils.randFloat(-a, a)),
                        (b.position.z = THREE.MathUtils.randFloat(-a, a)))
                    : e % 4 == 1
                        ? ((b.position.x += u), (b.position.z += p))
                        : e % 4 == 2
                            ? ((b.position.x += u), (b.position.z -= p))
                            : e % 4 == 3
                                ? ((b.position.x -= u), (b.position.z += p))
                                : ((b.position.x -= u), (b.position.z -= p)),
                (b.rotation.x += THREE.MathUtils.randFloat(0, d)),
                (b.rotation.z += THREE.MathUtils.randFloat(0, c)),
                b.updateMatrix(),
                t.setMatrixAt(e, b.matrix);
        t.instanceMatrix.needsUpdate = !0;
    }
    function i() {
        requestAnimationFrame(i), H.update(), g && o(g), f && o(f), M.render(R, m);
    }
    const a = 5,
        r = 0.15,
        s = 1800,
        l = 150,
        E = 0.1,
        d = Math.PI / 30,
        c = Math.PI / 50,
        h = 0.007,
        u = 0.005,
        p = 0.005,
        w = 0.05;
    let m, R, M, H, T, g, f;
    const b = new THREE.Object3D(),
        x = new THREE.Matrix4(),
        P = new THREE.Color();
        new RGBELoader().load(
            "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/blouberg_sunrise_2_1k.hdr",
            function (e) {
            ((T = e).mapping = THREE.EquirectangularReflectionMapping),
                (function () {
                    function e() {
                        const t = ["silver", "gold"];
                        return t[Math.floor(Math.random() * t.length)];
                    }
          /*!
      this function from : https://discourse.threejs.org/t/simple-curved-plane/26647/10
    */ function o(
                        t,
                        n = !0
                    ) {
                        for (let o = 0; o < t.count; o++)
                            x.makeRotationFromEuler(
                                new THREE.Euler(
                                    Math.random() * Math.PI,
                                    Math.random() * Math.PI,
                                    Math.random() * Math.PI
                                )
                            ),
                                x.setPosition(
                                    THREE.MathUtils.randFloat(-a, a),
                                    THREE.MathUtils.randFloat(-a, a),
                                    THREE.MathUtils.randFloat(-a, a)
                                ),
                                t.setMatrixAt(o, x),
                                n && t.setColorAt(o, P.set(e()));
                        return t;
                    }
                    ((m = new THREE.PerspectiveCamera(
                        35,
                        window.innerWidth / window.innerHeight,
                        0.1,
                        3 * a
                    )).position.z = a * Math.sqrt(2)),
                        ((R = new THREE.Scene()).environment = T),
                        (R.environment.mapping = THREE.EquirectangularReflectionMapping),
                        R.add(new THREE.AmbientLight("white", 0.8));
                    const d = new THREE.DirectionalLight("white", 5);
                    (d.position.y = 0), (d.position.z = a), R.add(d);
                    const c = new THREE.PlaneGeometry(r, r / 3, 30, 1);
                    !(function (t, e) {
                        let n = 0.5 * t.parameters.width,
                            o = new THREE.Vector2(-n, 0),
                            i = new THREE.Vector2(0, e),
                            a = new THREE.Vector2(n, 0),
                            r = new THREE.Vector2().subVectors(o, i),
                            s = new THREE.Vector2().subVectors(i, a),
                            l = new THREE.Vector2().subVectors(o, a),
                            E =
                                (r.length() * s.length() * l.length()) /
                                (2 * Math.abs(r.cross(l))),
                            d = new THREE.Vector2(0, e - E),
                            c =
                                2 *
                                (new THREE.Vector2().subVectors(o, d).angle() - 0.5 * Math.PI),
                            h = t.attributes.uv,
                            u = t.attributes.position,
                            p = new THREE.Vector2();
                        for (let t = 0; t < h.count; t++) {
                            let e = 1 - h.getX(t),
                                n = u.getY(t);
                            p.copy(a).rotateAround(d, c * e), u.setXYZ(t, p.x, n, -p.y);
                        }
                        u.needsUpdate = !0;
                    })(c, w),
                        c.center(),
                        c.computeVertexNormals();
                    let h = new THREE.MeshStandardMaterial({
                        color: "white",
                        metalness: 1,
                        roughness: 0.3,
                        side: THREE.DoubleSide
                    });
                    (g = o((g = new THREE.InstancedMesh(c, h, s)))),
                        R.add(g),
                        ((h = h.clone()).metalness = 1),
                        (h.roughness = 0);
                    const u = (function (t) {
                        let e = [];
                        for (let n = 0; n < 2 * t; n++) {
                            let o, i;
                            e.push(0, 0, -0.25),
                                n % 2 == 0 ? ((o = 0.5), (i = 1)) : ((o = 1), (i = 0.5));
                            let a = ((n + 1) / t) * Math.PI;
                            e.push(Math.cos(a) * o, Math.sin(a) * o, 0),
                                (a = (n / t) * Math.PI),
                                e.push(Math.cos(a) * i, Math.sin(a) * i, 0);
                        }
                        e = new Float32Array(e);
                        let n = new THREE.BufferGeometry();
                        return (
                            n.setAttribute("position", new THREE.BufferAttribute(e, 3)),
                            (n.attributes.position.needsUpdate = !0),
                            n.computeVertexNormals(),
                            n.center(),
                            n
                        );
                    })(5);
                    u.scale(E, E, E),
                        (h = h.clone()).color.set("#ffe866"),
                        (f = o((f = new THREE.InstancedMesh(u, h, l)), !1)),
                        R.add(f),
                        (M = new THREE.WebGLRenderer({
                            antialias: !0,
                            alpha: !0
                        })).setPixelRatio(window.devicePixelRatio),
                        M.setSize(window.innerWidth, window.innerHeight),
                        (M.shadowMap.enabled = !1),
                        document.body.appendChild(M.domElement),
                        ((H = new t(m, M.domElement)).target.y = 0),
                        (H.autoRotate = !0),
                        (H.autoRotateSpeed = 2),
                        (H.enableDamping = !0),
                        (H.enablePan = !1),
                        (H.minDistance = 1),
                        (H.maxDistance = a * Math.sqrt(2)),
                        (H.minPolarAngle = 0),
                        (H.maxPolarAngle = Math.PI / 2),
                        H.update(),
                        i(),
                        window.addEventListener("resize", n);
                })();
        }
    );
})();