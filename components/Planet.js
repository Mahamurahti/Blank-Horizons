import * as THREE from 'three'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function Planet(props) {

    const mountRef = useRef(null)

    const { segments, sphereRotation, setSphereRotation } = props
    const WIDTH = 500
    const HEIGHT = 500

    useEffect(() => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(WIDTH, HEIGHT)

        mountRef.current.appendChild(renderer.domElement)

        const geometry = new THREE.SphereGeometry(1, segments, segments)
        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('/earth.jpg')
        });
        const sphere = new THREE.Mesh(geometry, material)

        const group = new THREE.Group()
        group.add(sphere)

        scene.add(group)
        camera.position.z = 2
        sphere.rotation.x = 0.7
        sphere.rotation.y = sphereRotation

        const mouse = {
            x: null,
            y: null
        }

        const animate = function () {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
            sphere.rotation.y += 0.001
            setSphereRotation(sphere.rotation.y)
            gsap.to(group.rotation, {
                x: -mouse.y * 0.2,
                y: mouse.x * 0.2,
                duration: 2
            })
        };

        animate()

        const handleMouseMove = (e) => {
            mouse.x = (e.clientX / WIDTH) * 2 - 1
            mouse.y = -(e.clientY / HEIGHT) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            mountRef.current?.removeChild(renderer.domElement)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <div ref={mountRef} />
    )
}