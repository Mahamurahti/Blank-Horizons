import * as THREE from 'three'
import { useEffect, useRef } from 'react'

export default function Stars() {

    const mountRef = useRef(null)

    const WIDTH = 6000
    const HEIGHT = 4000

    useEffect(() => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(WIDTH, HEIGHT)

        mountRef.current.appendChild(renderer.domElement)

        camera.position.z = 2

        const starGeometry = new THREE.BufferGeometry()
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
        })
        const starVertices = []
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000
            const y = (Math.random() - 0.5) * 2000
            const z = -Math.random() * 1000
            starVertices.push(x, y ,z)
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
        const stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)

        const animate = function () {
            requestAnimationFrame(animate)
            //stars.rotation.z += 0.0001
            renderer.render(scene, camera)
        };

        animate()

        return () => mountRef.current?.removeChild(renderer.domElement)
    }, [])

    return (
        <div ref={mountRef} />
    )
}