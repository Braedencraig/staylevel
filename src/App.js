// // import { Canvas, useLoader, useFrame } from "@react-three/fiber";
// // import * as THREE from "three";
// // import { useState, useRef } from "react";
// // import { motion } from "framer-motion";

// // export const App = () => {
// //   const [bgColor, setBgColor] = useState(null);
// //   const [isHovered, setIsHovered] = useState(false); // Hover state

// //   return (
// //     <div
// //       style={{
// //         width: "100vw",
// //         height: "100vh",
// //         position: "relative",
// //         overflow: "hidden",
// //       }}
// //     >
// //       {/* Background gradient */}
// //       <div
// //         style={{
// //           width: "100%",
// //           height: "100%",
// //           background: "linear-gradient(90deg, #CCC9C1 50%, #000000 50%)",
// //           position: "absolute",
// //           top: 0,
// //           left: 0,
// //           pointerEvents: "none",
// //         }}
// //       />
// //       {/* Animated background color overlay */}
// //       <motion.div
// //         initial={{ backgroundColor: "transparent" }}
// //         animate={{
// //           backgroundColor: bgColor ? bgColor : "transparent",
// //         }}
// //         transition={{ duration: 0.5 }}
// //         style={{
// //           width: "100%",
// //           height: "100%",
// //           position: "absolute",
// //           top: 0,
// //           left: 0,
// //           pointerEvents: "none",
// //         }}
// //       />
// //       {/* Canvas */}
// //       <Canvas
// //         shadows
// //         camera={{ position: [0, 0, 5] }} // Adjusted camera position
// //         style={{
// //           position: "absolute",
// //           top: 0,
// //           left: 0,
// //         }}
// //       >
// //         <ambientLight intensity={2.4} />
// //         <ColorCube setBgColor={setBgColor} />
// //       </Canvas>
// //       {/* Button with Hover Effect */}
// //       {(bgColor === "#000000" || bgColor === "#CCC9C1") && (
// //         <button
// //           onMouseEnter={() => setIsHovered(true)}
// //           onMouseLeave={() => setIsHovered(false)}
// //           style={{
// //             fontFamily: "DrukTextWide, sans-serif",
// //             border: `1px solid ${
// //               isHovered
// //                 ? bgColor === "#000000"
// //                   ? "#CCC9C1"
// //                   : "#000000"
// //                 : "#000"
// //             }`,
// //             backgroundColor: isHovered
// //               ? bgColor
// //               : bgColor === "#000000"
// //               ? "#CCC9C1"
// //               : "#000000",
// //             color: isHovered
// //               ? bgColor === "#000000"
// //                 ? "#CCC9C1"
// //                 : "#000000"
// //               : bgColor === "#000000"
// //               ? "#000000"
// //               : "#CCC9C1",
// //             position: "absolute",
// //             cursor: "pointer",
// //             bottom: "22%",
// //             left: "50%",
// //             fontSize: "1.2rem",
// //             transform: "translateX(-50%)",
// //             padding: "10px 20px",
// //             zIndex: 1,
// //             transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
// //           }}
// //         >
// //           Go to site
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // function ColorCube({ setBgColor }) {
// //   const beigeTexture = useLoader(THREE.TextureLoader, "/beige.png");
// //   const blackTexture = useLoader(THREE.TextureLoader, "/black.png");
// //   const cubeRef = useRef();

// //   // Set initial rotation to 45 degrees (Math.PI / 4 radians)
// //   const initialRotation = Math.PI / 4;

// //   const [isDragging, setIsDragging] = useState(false);
// //   const [startX, setStartX] = useState(null);
// //   const [currentYRotation, setCurrentYRotation] = useState(initialRotation);
// //   const targetYRotation = useRef(initialRotation);

// //   const handlePointerDown = (event) => {
// //     event.stopPropagation();
// //     setIsDragging(true);
// //     setStartX(event.clientX);
// //   };

// //   const handlePointerMove = (event) => {
// //     if (!isDragging || startX === null) return;

// //     const deltaX = event.clientX - startX;
// //     const rotationSpeed = 0.01;

// //     // Update target rotation based on horizontal drag
// //     targetYRotation.current = currentYRotation + deltaX * rotationSpeed;
// //   };

// //   const handlePointerUp = () => {
// //     // if startX is over 900 then rotate as if the user swipped left.
// //     setIsDragging(false);
// //     setStartX(null);

// //     // Snap to the nearest 90-degree increment
// //     const snappedAngle =
// //       Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);

// //     // Update rotations
// //     targetYRotation.current = snappedAngle;
// //     setCurrentYRotation(snappedAngle);

// //     // Determine which face is now facing the camera
// //     updateBackgroundColor(snappedAngle);
// //   };

// //   const updateBackgroundColor = (yRotation) => {
// //     console.log(yRotation, "yrotation");
// //     // on initial page load, when i click on the left side, I get 1.5707963267948966 'yrotation' but when I click on the right, I get the same value, on the initial click on page load if I click the right side I should get 0 'yrotation'
// //     // Normalize rotation to [0, 2π]
// //     const normalizedYRotation =
// //       ((yRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

// //     // Each face corresponds to a rotation
// //     if (
// //       (normalizedYRotation >= 0 && normalizedYRotation < Math.PI / 4) ||
// //       (normalizedYRotation >= (7 * Math.PI) / 4 &&
// //         normalizedYRotation < 2 * Math.PI)
// //     ) {
// //       // Front face
// //       setBgColor("#CCC9C1");
// //     } else if (
// //       normalizedYRotation >= Math.PI / 4 &&
// //       normalizedYRotation < (3 * Math.PI) / 4
// //     ) {
// //       // Right face
// //       setBgColor("#000000");
// //     } else if (
// //       normalizedYRotation >= (3 * Math.PI) / 4 &&
// //       normalizedYRotation < (5 * Math.PI) / 4
// //     ) {
// //       // Back face
// //       setBgColor("#CCC9C1");
// //     } else if (
// //       normalizedYRotation >= (5 * Math.PI) / 4 &&
// //       normalizedYRotation < (7 * Math.PI) / 4
// //     ) {
// //       // Left face
// //       setBgColor("#000000");
// //     } else {
// //       setBgColor("#ffffff"); // Default background
// //     }
// //   };

// //   useFrame(() => {
// //     if (cubeRef.current) {
// //       // Smoothly interpolate towards target Y rotation
// //       cubeRef.current.rotation.y = THREE.MathUtils.lerp(
// //         cubeRef.current.rotation.y,
// //         targetYRotation.current,
// //         0.1
// //       );
// //     }
// //   });

// //   return (
// //     <mesh
// //       ref={cubeRef}
// //       position={[0, 0.3, 0]}
// //       rotation={[0, initialRotation, 0]} // Set initial rotation
// //       onPointerDown={handlePointerDown}
// //       onPointerMove={handlePointerMove}
// //       onPointerUp={handlePointerUp}
// //       onPointerOut={handlePointerUp}
// //       onPointerLeave={handlePointerUp}
// //       castShadow
// //       receiveShadow
// //     >
// //       <boxGeometry args={[2, 3, 2]} />
// //       <meshStandardMaterial attach="material-0" map={blackTexture} />{" "}
// //       {/* Right */}
// //       <meshStandardMaterial attach="material-1" map={blackTexture} />{" "}
// //       {/* Left */}
// //       <meshStandardMaterial attach="material-2" map={beigeTexture} />{" "}
// //       {/* Top */}
// //       <meshStandardMaterial attach="material-3" map={beigeTexture} />{" "}
// //       {/* Bottom */}
// //       <meshStandardMaterial attach="material-4" map={beigeTexture} />{" "}
// //       {/* Front */}
// //       <meshStandardMaterial attach="material-5" map={beigeTexture} />{" "}
// //       {/* Back */}
// //     </mesh>
// //   );
// // }

// // export default App;
// import { Canvas, useLoader, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";

// export const App = () => {
//   const [bgColor, setBgColor] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           background: "linear-gradient(90deg, #CCC9C1 50%, #000000 50%)",
//           position: "absolute",
//           top: 0,
//           left: 0,
//           pointerEvents: "none",
//         }}
//       />
//       <motion.div
//         initial={{ backgroundColor: "transparent" }}
//         animate={{
//           backgroundColor: bgColor ? bgColor : "transparent",
//         }}
//         transition={{ duration: 0.5 }}
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           top: 0,
//           left: 0,
//           pointerEvents: "none",
//         }}
//       />
//       <Canvas
//         shadows
//         camera={{ position: [0, 0, 5] }}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//       >
//         <ambientLight intensity={2.4} />
//         <ColorCube setBgColor={setBgColor} />
//       </Canvas>
//       {(bgColor === "#000000" || bgColor === "#CCC9C1") && (
//         <button
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           style={{
//             fontFamily: "DrukTextWide, sans-serif",
//             border: `1px solid ${
//               isHovered
//                 ? bgColor === "#000000"
//                   ? "#CCC9C1"
//                   : "#000000"
//                 : "#000"
//             }`,
//             backgroundColor: isHovered
//               ? bgColor
//               : bgColor === "#000000"
//               ? "#CCC9C1"
//               : "#000000",
//             color: isHovered
//               ? bgColor === "#000000"
//                 ? "#CCC9C1"
//                 : "#000000"
//               : bgColor === "#000000"
//               ? "#000000"
//               : "#CCC9C1",
//             position: "absolute",
//             cursor: "pointer",
//             bottom: "22%",
//             left: "50%",
//             fontSize: "1.2rem",
//             transform: "translateX(-50%)",
//             padding: "10px 20px",
//             zIndex: 1,
//             transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
//           }}
//         >
//           Go to site
//         </button>
//       )}
//     </div>
//   );
// };

// function ColorCube({ setBgColor }) {
//   const beigeTexture = useLoader(THREE.TextureLoader, "/beige.png");
//   const blackTexture = useLoader(THREE.TextureLoader, "/black.png");
//   const cubeRef = useRef();

//   const initialRotation = Math.PI / 4;
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(null);
//   const [currentYRotation, setCurrentYRotation] = useState(initialRotation);
//   const targetYRotation = useRef(initialRotation);
//   const viewportWidth = useRef(window.innerWidth);
//   const hasInitialClick = useRef(false);

//   useEffect(() => {
//     const handleInitialClick = (event) => {
//       if (!hasInitialClick.current) {
//         const clickX = event.clientX;
//         const isRightSide = clickX > viewportWidth.current / 2;

//         // For right side: move to 0 from initial π/4
//         // For left side: move to π/2 from initial π/4
//         const targetRotation = isRightSide ? 0 : Math.PI / 2;

//         targetYRotation.current = targetRotation;
//         setCurrentYRotation(targetRotation);
//         updateBackgroundColor(targetRotation);
//         hasInitialClick.current = true;
//       }
//     };

//     window.addEventListener("click", handleInitialClick);
//     return () => window.removeEventListener("click", handleInitialClick);
//   }, []);

//   const handlePointerDown = (event) => {
//     event.stopPropagation();
//     setIsDragging(true);
//     setStartX(event.clientX);
//   };

//   const handlePointerMove = (event) => {
//     if (!isDragging || startX === null) return;

//     const deltaX = event.clientX - startX;
//     const rotationSpeed = 0.01;
//     const newRotation = currentYRotation + deltaX * rotationSpeed;
//     targetYRotation.current = newRotation;
//   };

//   const handlePointerUp = () => {
//     if (!isDragging) return;

//     setIsDragging(false);
//     setStartX(null);

//     // Snap to the nearest 90-degree increment
//     const snappedAngle =
//       Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);
//     targetYRotation.current = snappedAngle;
//     setCurrentYRotation(snappedAngle);
//     updateBackgroundColor(snappedAngle);
//   };

//   const updateBackgroundColor = (yRotation) => {
//     // Normalize rotation to [0, 2π]
//     const normalizedRotation =
//       ((yRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

//     const isBeigeFace =
//       (normalizedRotation >= 0 && normalizedRotation < Math.PI / 4) ||
//       (normalizedRotation >= (3 * Math.PI) / 4 &&
//         normalizedRotation < (5 * Math.PI) / 4) ||
//       normalizedRotation >= (7 * Math.PI) / 4;

//     setBgColor(isBeigeFace ? "#CCC9C1" : "#000000");
//   };

//   useFrame(() => {
//     if (cubeRef.current) {
//       cubeRef.current.rotation.y = THREE.MathUtils.lerp(
//         cubeRef.current.rotation.y,
//         targetYRotation.current,
//         0.1
//       );
//     }
//   });

//   return (
//     <mesh
//       ref={cubeRef}
//       position={[0, 0.3, 0]}
//       rotation={[0, initialRotation, 0]}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//       onPointerOut={handlePointerUp}
//       onPointerLeave={handlePointerUp}
//       castShadow
//       receiveShadow
//     >
//       <boxGeometry args={[2, 3, 2]} />
//       <meshStandardMaterial attach="material-0" map={blackTexture} />
//       <meshStandardMaterial attach="material-1" map={blackTexture} />
//       <meshStandardMaterial attach="material-2" map={beigeTexture} />
//       <meshStandardMaterial attach="material-3" map={beigeTexture} />
//       <meshStandardMaterial attach="material-4" map={beigeTexture} />
//       <meshStandardMaterial attach="material-5" map={beigeTexture} />
//     </mesh>
//   );
// }

// export default App;
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
  }, []);

  const handlePointerDown = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    setStartX(event.touches ? event.touches[0].clientX : event.clientX);
  };

  const handlePointerMove = (event) => {
    if (!isDragging || startX === null) return;

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX;
    const rotationSpeed = 0.01;
    const newRotation = currentYRotation + deltaX * rotationSpeed;
    targetYRotation.current = newRotation;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setStartX(null);

    const snappedAngle =
      Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);
    targetYRotation.current = snappedAngle;
    setCurrentYRotation(snappedAngle);
    updateBackgroundColor(snappedAngle);
  };

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
