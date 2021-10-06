import * as THREE from 'three'
import { useEffect, useRef } from 'react'

export default function Planet(props) {

    const mountRef = useRef(null)

    const { segments, sphereRotation, setSphereRotation, isBackground } = props
    const WIDTH = isBackground ? 2000 : 500
    const HEIGHT = isBackground ? 2000 : 500

    useEffect(() => {

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true })

        renderer.setSize(WIDTH, HEIGHT)

        mountRef.current.appendChild(renderer.domElement)

        const geometry = new THREE.SphereGeometry(1, segments, segments)
        const material = new THREE.MeshBasicMaterial({
            //color: 0x00ff00,
            map: new THREE.TextureLoader().load('/earth.jpg')
        });
        const sphere = new THREE.Mesh(geometry, material)

        scene.add(sphere)
        camera.position.z = 2
        sphere.rotation.y = sphereRotation

        const animate = function () {
            requestAnimationFrame(animate)
            sphere.rotation.x = 0.7
            sphere.rotation.y += 0.003
            setSphereRotation(sphere.rotation.y)
            renderer.render(scene, camera)
        };

        animate()

        return () => mountRef.current?.removeChild(renderer.domElement)
    }, [])

    return (
        <div ref={mountRef} />
    )
}