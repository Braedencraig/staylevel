// // import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
// // import { CameraControls } from "@react-three/drei";
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
// //         camera={{ position: [-3, 0, 3] }}
// //         style={{
// //           position: "absolute",
// //           top: 0,
// //           left: 0,
// //         }}
// //       >
// //         <ColorCube setBgColor={setBgColor} />
// //         <XAxisCameraControls />
// //         <ambientLight intensity={2.4} />
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
// //             bottom: "15%",
// //             left: "50%",
// //             fontSize: "1.2rem",
// //             transform: "translateX(-50%)",
// //             padding: "10px 20px",
// //             zIndex: 1, // Ensure the button is above other elements
// //             transition: "background-color 0.3s, color 0.3s", // Smooth transition
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
// //   const { camera } = useThree();

// //   // State to store the target quaternion for rotation
// //   const [targetQuaternion, setTargetQuaternion] = useState(null);

// //   const handleClick = (event) => {
// //     event.stopPropagation();

// //     // Get the face that was clicked
// //     const faceIndex = event.faceIndex;
// //     const geometry = event.object.geometry;

// //     // Determine the normal of the clicked face
// //     let faceNormal = new THREE.Vector3();
// //     if (geometry.index) {
// //       // Indexed geometry
// //       const idx = geometry.index.array[faceIndex * 3];
// //       faceNormal.fromBufferAttribute(geometry.attributes.normal, idx);
// //     } else {
// //       // Non-indexed geometry
// //       faceNormal.fromBufferAttribute(geometry.attributes.normal, faceIndex * 3);
// //     }

// //     // Transform the normal to world space
// //     cubeRef.current.updateMatrixWorld();
// //     faceNormal.applyNormalMatrix(
// //       new THREE.Matrix3().getNormalMatrix(cubeRef.current.matrixWorld)
// //     );

// //     // Calculate the rotation required to align the face normal with the camera direction
// //     const cubeWorldQuaternion = cubeRef.current.getWorldQuaternion(
// //       new THREE.Quaternion()
// //     );

// //     // Camera direction in world space
// //     const cameraDirection = new THREE.Vector3();
// //     camera.getWorldDirection(cameraDirection);

// //     // Desired direction is opposite of camera direction
// //     const desiredDirection = cameraDirection.clone().negate();

// //     // Calculate the rotation quaternion from face normal to desired direction
// //     const rotationQuaternion = new THREE.Quaternion().setFromUnitVectors(
// //       faceNormal.normalize(),
// //       desiredDirection.normalize()
// //     );

// //     // Compute the target quaternion
// //     const targetQuat = cubeWorldQuaternion.clone().multiply(rotationQuaternion);

// //     // Inverse parent world quaternion if any
// //     const parentInverseQuat = cubeRef.current.parent
// //       ? cubeRef.current.parent
// //           .getWorldQuaternion(new THREE.Quaternion())
// //           .invert()
// //       : new THREE.Quaternion();

// //     // Apply inverse parent rotation to get local target quaternion
// //     targetQuat.premultiply(parentInverseQuat);

// //     // Set the target quaternion
// //     setTargetQuaternion(targetQuat);

// //     // Set background color based on face index
// //     if ([8, 9, 10, 11].includes(faceIndex)) {
// //       setBgColor("#000000"); // Black background
// //     } else if ([0, 1, 2, 3].includes(faceIndex)) {
// //       setBgColor("#CCC9C1"); // Beige background
// //     } else {
// //       // Set a default or additional colors for other faces if needed
// //       setBgColor("#ffffff"); // White background
// //     }
// //   };

// //   useFrame(() => {
// //     if (cubeRef.current && targetQuaternion) {
// //       // Smoothly interpolate towards target quaternion
// //       cubeRef.current.quaternion.slerp(targetQuaternion, 0.1);

// //       // Check if close enough to stop animating
// //       if (cubeRef.current.quaternion.angleTo(targetQuaternion) < 0.001) {
// //         cubeRef.current.quaternion.copy(targetQuaternion);
// //         setTargetQuaternion(null); // Stop animating
// //       }
// //     }
// //   });

// //   return (
// //     <mesh
// //       position={[0, 0.3, 0]}
// //       ref={cubeRef}
// //       onPointerDown={handleClick}
// //       castShadow
// //       receiveShadow
// //     >
// //       <boxGeometry args={[2, 3, 2]} />
// //       <meshStandardMaterial attach="material-0" map={blackTexture} />
// //       <meshStandardMaterial attach="material-1" map={blackTexture} />
// //       <meshStandardMaterial attach="material-2" map={beigeTexture} />
// //       <meshStandardMaterial attach="material-3" map={beigeTexture} />
// //       <meshStandardMaterial attach="material-4" map={beigeTexture} />
// //       <meshStandardMaterial attach="material-5" map={beigeTexture} />
// //     </mesh>
// //   );
// // }

// // function XAxisCameraControls() {
// //   const { camera } = useThree();
// //   const controlsRef = useRef();

// //   return (
// //     <CameraControls
// //       ref={controlsRef}
// //       makeDefault
// //       camera={camera}
// //       enableZoom={false} // Disable zoom to keep the focus on rotation
// //       maxPolarAngle={Math.PI / 2} // Restrict vertical movement
// //       minPolarAngle={Math.PI / 2} // Lock to X-axis rotation
// //       enablePan={false} // Disable panning
// //     />
// //   );
// // }

// // export default App;
// import { Canvas, useLoader, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { useState, useRef } from "react";
// import { motion } from "framer-motion";

// export const App = () => {
//   const [bgColor, setBgColor] = useState(null);
//   const [isHovered, setIsHovered] = useState(false); // Hover state

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Background gradient */}
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
//       {/* Animated background color overlay */}
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
//       {/* Canvas */}
//       <Canvas
//         shadows
//         camera={{ position: [0, 0, 5] }} // Adjusted camera position
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//       >
//         <ambientLight intensity={2.4} />
//         <ColorCube setBgColor={setBgColor} />
//       </Canvas>
//       {/* Button with Hover Effect */}
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
//             bottom: "15%",
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
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(null);
//   const [currentYRotation, setCurrentYRotation] = useState(0);
//   const targetYRotation = useRef(0);

//   const handlePointerDown = (event) => {
//     event.stopPropagation();
//     setIsDragging(true);
//     setStartX(event.clientX);
//   };

//   const handlePointerMove = (event) => {
//     if (!isDragging || startX === null) return;

//     const deltaX = event.clientX - startX;
//     const rotationSpeed = 0.01;

//     // Update target rotation based on horizontal drag
//     targetYRotation.current = currentYRotation + deltaX * rotationSpeed;
//   };

//   const handlePointerUp = () => {
//     setIsDragging(false);
//     setStartX(null);

//     // Snap to the nearest 90-degree increment
//     const snappedYRotation =
//       Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);

//     targetYRotation.current = snappedYRotation;
//     setCurrentYRotation(snappedYRotation);

//     // Determine which face is now facing the camera
//     updateBackgroundColor(snappedYRotation);
//   };

//   const updateBackgroundColor = (yRotation) => {
//     // Normalize rotation to [0, 2π]
//     const normalizedYRotation =
//       ((yRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

//     // Each face corresponds to a rotation
//     if (
//       (normalizedYRotation >= 0 && normalizedYRotation < Math.PI / 4) ||
//       (normalizedYRotation >= (7 * Math.PI) / 4 &&
//         normalizedYRotation < 2 * Math.PI)
//     ) {
//       // Front face
//       setBgColor("#CCC9C1");
//     } else if (
//       normalizedYRotation >= Math.PI / 4 &&
//       normalizedYRotation < (3 * Math.PI) / 4
//     ) {
//       // Right face
//       setBgColor("#000000");
//     } else if (
//       normalizedYRotation >= (3 * Math.PI) / 4 &&
//       normalizedYRotation < (5 * Math.PI) / 4
//     ) {
//       // Back face
//       setBgColor("#CCC9C1");
//     } else if (
//       normalizedYRotation >= (5 * Math.PI) / 4 &&
//       normalizedYRotation < (7 * Math.PI) / 4
//     ) {
//       // Left face
//       setBgColor("#000000");
//     } else {
//       setBgColor("#ffffff"); // Default background
//     }
//   };

//   useFrame(() => {
//     if (cubeRef.current) {
//       // Smoothly interpolate towards target Y rotation
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
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//       onPointerOut={handlePointerUp}
//       onPointerLeave={handlePointerUp}
//       castShadow
//       receiveShadow
//     >
//       <boxGeometry args={[2, 3, 2]} />
//       <meshStandardMaterial attach="material-0" map={blackTexture} />{" "}
//       {/* Right */}
//       <meshStandardMaterial attach="material-1" map={blackTexture} />{" "}
//       {/* Left */}
//       <meshStandardMaterial attach="material-2" map={beigeTexture} />{" "}
//       {/* Top */}
//       <meshStandardMaterial attach="material-3" map={beigeTexture} />{" "}
//       {/* Bottom */}
//       <meshStandardMaterial attach="material-4" map={beigeTexture} />{" "}
//       {/* Front */}
//       <meshStandardMaterial attach="material-5" map={beigeTexture} />{" "}
//       {/* Back */}
//     </mesh>
//   );
// }

// export default App;
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export const App = () => {
  const [bgColor, setBgColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // Hover state

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
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
      {/* Animated background color overlay */}
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
      {/* Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5] }} // Adjusted camera position
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <ambientLight intensity={2.4} />
        <ColorCube setBgColor={setBgColor} />
      </Canvas>
      {/* Button with Hover Effect */}
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
            bottom: "15%",
            left: "50%",
            fontSize: "1.2rem",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            zIndex: 1,
            transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
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

  // Set initial rotation to 45 degrees (Math.PI / 4 radians)
  const initialRotation = Math.PI / 4;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [currentYRotation, setCurrentYRotation] = useState(initialRotation);
  const targetYRotation = useRef(initialRotation);

  const handlePointerDown = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    setStartX(event.clientX);
  };

  const handlePointerMove = (event) => {
    if (!isDragging || startX === null) return;

    const deltaX = event.clientX - startX;
    const rotationSpeed = 0.01;

    // Update target rotation based on horizontal drag
    targetYRotation.current = currentYRotation + deltaX * rotationSpeed;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setStartX(null);

    // Snap to the nearest 90-degree increment
    const snappedAngle =
      Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);

    // Update rotations
    targetYRotation.current = snappedAngle;
    setCurrentYRotation(snappedAngle);

    // Determine which face is now facing the camera
    updateBackgroundColor(snappedAngle);
  };

  const updateBackgroundColor = (yRotation) => {
    // Normalize rotation to [0, 2π]
    const normalizedYRotation =
      ((yRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    // Each face corresponds to a rotation
    if (
      (normalizedYRotation >= 0 && normalizedYRotation < Math.PI / 4) ||
      (normalizedYRotation >= (7 * Math.PI) / 4 &&
        normalizedYRotation < 2 * Math.PI)
    ) {
      // Front face
      setBgColor("#CCC9C1");
    } else if (
      normalizedYRotation >= Math.PI / 4 &&
      normalizedYRotation < (3 * Math.PI) / 4
    ) {
      // Right face
      setBgColor("#000000");
    } else if (
      normalizedYRotation >= (3 * Math.PI) / 4 &&
      normalizedYRotation < (5 * Math.PI) / 4
    ) {
      // Back face
      setBgColor("#CCC9C1");
    } else if (
      normalizedYRotation >= (5 * Math.PI) / 4 &&
      normalizedYRotation < (7 * Math.PI) / 4
    ) {
      // Left face
      setBgColor("#000000");
    } else {
      setBgColor("#ffffff"); // Default background
    }
  };

  useFrame(() => {
    if (cubeRef.current) {
      // Smoothly interpolate towards target Y rotation
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
      rotation={[0, initialRotation, 0]} // Set initial rotation
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onPointerLeave={handlePointerUp}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2, 3, 2]} />
      <meshStandardMaterial attach="material-0" map={blackTexture} />{" "}
      {/* Right */}
      <meshStandardMaterial attach="material-1" map={blackTexture} />{" "}
      {/* Left */}
      <meshStandardMaterial attach="material-2" map={beigeTexture} />{" "}
      {/* Top */}
      <meshStandardMaterial attach="material-3" map={beigeTexture} />{" "}
      {/* Bottom */}
      <meshStandardMaterial attach="material-4" map={beigeTexture} />{" "}
      {/* Front */}
      <meshStandardMaterial attach="material-5" map={beigeTexture} />{" "}
      {/* Back */}
    </mesh>
  );
}

export default App;
