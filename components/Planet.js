import * as THREE from 'three'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function Planet(props) {

    const mountRef = useRef(null)

    const { segments, sphereRotation, setSphereRotation, isBackground } = props
    const WIDTH = isBackground ? 2000 : 500
    const HEIGHT = isBackground ? 2000 : 500

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

        if (isBackground) {
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
        }

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