import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const App = () => {
  const [bgColor, setBgColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Add touch event handlers to prevent unwanted scrolling
  useEffect(() => {
    const preventDefault = (e) => {
      e.preventDefault();
    };

    // Prevent all touch moves on the canvas
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // Add passive: false to ensure preventDefault works on all devices
    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("touchstart", preventDefault, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      document.removeEventListener("touchmove", preventDefault);
      document.removeEventListener("touchstart", preventDefault);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        touchAction: "none", // Disable touch actions at the container level
        userSelect: "none", // Prevent text selection during touch
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, #CCC9C1 50%, #000000 50%)",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ backgroundColor: "transparent" }}
        animate={{
          backgroundColor: bgColor ? bgColor : "transparent",
        }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
      <Canvas
        shadows
        camera={{ position: [0, 0, 5] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          touchAction: "none", // Disable touch actions on the canvas
        }}
      >
        <ambientLight intensity={2.4} />
        <ColorCube setBgColor={setBgColor} />
      </Canvas>
      {(bgColor === "#000000" || bgColor === "#CCC9C1") && (
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            fontFamily: "DrukTextWide, sans-serif",
            border: `1px solid ${
              isHovered
                ? bgColor === "#000000"
                  ? "#CCC9C1"
                  : "#000000"
                : "#000"
            }`,
            backgroundColor: isHovered
              ? bgColor
              : bgColor === "#000000"
              ? "#CCC9C1"
              : "#000000",
            color: isHovered
              ? bgColor === "#000000"
                ? "#CCC9C1"
                : "#000000"
              : bgColor === "#000000"
              ? "#000000"
              : "#CCC9C1",
            position: "absolute",
            cursor: "pointer",
            bottom: "22%",
            left: "50%",
            fontSize: "1.2rem",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            zIndex: 1,
            transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
            touchAction: "none", // Disable touch actions on the button
          }}
        >
          Go to site
        </button>
      )}
    </div>
  );
};

function ColorCube({ setBgColor }) {
  const beigeTexture = useLoader(THREE.TextureLoader, "/beige.png");
  const blackTexture = useLoader(THREE.TextureLoader, "/black.png");
  const cubeRef = useRef();

  const initialRotation = Math.PI / 4;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [currentYRotation, setCurrentYRotation] = useState(initialRotation);
  const targetYRotation = useRef(initialRotation);
  const viewportWidth = useRef(window.innerWidth);
  const hasInitialClick = useRef(false);

  useEffect(() => {
    const handleInitialClick = (event) => {
      if (!hasInitialClick.current) {
        // Handle both mouse clicks and touch events
        const clientX = event.touches
          ? event.touches[0].clientX
          : event.clientX;
        const isRightSide = clientX > viewportWidth.current / 2;

        const targetRotation = isRightSide ? 0 : Math.PI / 2;

        targetYRotation.current = targetRotation;
        setCurrentYRotation(targetRotation);
        updateBackgroundColor(targetRotation);
        hasInitialClick.current = true;
      }
    };

    // Add both mouse and touch event listeners
    window.addEventListener("click", handleInitialClick);
    window.addEventListener("touchstart", handleInitialClick, {
      passive: false,
    });

    return () => {
      window.removeEventListener("click", handleInitialClick);
      window.removeEventListener("touchstart", handleInitialClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [previousX, setPreviousX] = useState(null);

  const handlePointerDown = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    setPreviousX(clientX);
  };

  const handlePointerMove = (event) => {
    if (!isDragging || previousX === null) return;

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - previousX;
    const rotationSpeed = 0.01;
    targetYRotation.current += deltaX * rotationSpeed;
    setPreviousX(clientX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setPreviousX(null);

    const snappedAngle =
      Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);
    targetYRotation.current = snappedAngle;
    setCurrentYRotation(snappedAngle);
    updateBackgroundColor(snappedAngle);
  };

  // const handlePointerDown = (event) => {
  //   event.stopPropagation();
  //   setIsDragging(true);
  //   setStartX(event.touches ? event.touches[0].clientX : event.clientX);
  // };

  // const handlePointerMove = (event) => {
  //   if (!isDragging || startX === null) return;

  //   const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  //   const deltaX = clientX - startX;
  //   const rotationSpeed = 0.01;
  //   const newRotation = currentYRotation + deltaX * rotationSpeed;
  //   targetYRotation.current = newRotation;
  // };

  // const handlePointerUp = () => {
  //   if (!isDragging) return;

  //   setIsDragging(false);
  //   setStartX(null);

  //   const snappedAngle =
  //     Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);
  //   targetYRotation.current = snappedAngle;
  //   setCurrentYRotation(snappedAngle);
  //   updateBackgroundColor(snappedAngle);
  // };

  const updateBackgroundColor = (yRotation) => {
    const normalizedRotation =
      ((yRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const isBeigeFace =
      (normalizedRotation >= 0 && normalizedRotation < Math.PI / 4) ||
      (normalizedRotation >= (3 * Math.PI) / 4 &&
        normalizedRotation < (5 * Math.PI) / 4) ||
      normalizedRotation >= (7 * Math.PI) / 4;

    setBgColor(isBeigeFace ? "#CCC9C1" : "#000000");
  };

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y = THREE.MathUtils.lerp(
        cubeRef.current.rotation.y,
        targetYRotation.current,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={cubeRef}
      position={[0, 0.3, 0]}
      rotation={[0, initialRotation, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onPointerLeave={handlePointerUp}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2, 3, 2]} />
      <meshStandardMaterial attach="material-0" map={blackTexture} />
      <meshStandardMaterial attach="material-1" map={blackTexture} />
      <meshStandardMaterial attach="material-2" map={beigeTexture} />
      <meshStandardMaterial attach="material-3" map={beigeTexture} />
      <meshStandardMaterial attach="material-4" map={beigeTexture} />
      <meshStandardMaterial attach="material-5" map={beigeTexture} />
    </mesh>
  );
}

export default App;
