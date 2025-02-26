// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import { Canvas, useLoader, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { ArrowLeftRight, MousePointer } from "lucide-react";

// const InteractionHint = ({ bgColor }) => {
//   const [showHint, setShowHint] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     const timer = setTimeout(() => {
//       setShowHint(false);
//     }, 4000);

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("resize", checkMobile);
//     };
//   }, []);

//   if (!showHint) return null;

//   const textColor = "#FFFFFF";

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         pointerEvents: "none",
//         userSelect: "none",
//         zIndex: 1000,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         color: textColor,
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "12px",
//           animation: "fadeInOut 4s ease-in-out",
//         }}
//       >
//         <div
//           style={{
//             animation: "pulse 2s infinite",
//           }}
//         >
//           {isMobile ? <ArrowLeftRight size={32} /> : <MousePointer size={32} />}
//         </div>
//         <p
//           style={{
//             fontSize: "22px",
//             fontFamily: "DrukTextWide, sans-serif",
//           }}
//         >
//           {isMobile ? "Swipe to rotate" : "Click and drag to rotate"}
//         </p>
//       </div>

//       <style>
//         {`
//           @keyframes fadeInOut {
//             0% { opacity: 0; }
//             20% { opacity: 1; }
//             80% { opacity: 1; }
//             100% { opacity: 0; }
//           }

//           @keyframes pulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.1); }
//             100% { transform: scale(1); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export const App = () => {
//   const [bgColor, setBgColor] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);

//   // Add touch event handlers to prevent unwanted scrolling
//   useEffect(() => {
//     const preventDefault = (e) => {
//       e.preventDefault();
//     };

//     // Prevent all touch moves on the canvas
//     document.body.style.overflow = "hidden";
//     document.body.style.touchAction = "none";

//     // Add passive: false to ensure preventDefault works on all devices
//     document.addEventListener("touchmove", preventDefault, { passive: false });
//     document.addEventListener("touchstart", preventDefault, { passive: false });

//     return () => {
//       document.body.style.overflow = "auto";
//       document.body.style.touchAction = "auto";
//       document.removeEventListener("touchmove", preventDefault);
//       document.removeEventListener("touchstart", preventDefault);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         position: "relative",
//         overflow: "hidden",
//         touchAction: "none", // Disable touch actions at the container level
//         userSelect: "none", // Prevent text selection during touch
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
//       <InteractionHint bgColor={bgColor} />

//       <Canvas
//         shadows
//         camera={{ position: [0, 0, 5] }}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           touchAction: "none", // Disable touch actions on the canvas
//         }}
//       >
//         <ambientLight intensity={2.4} />
//         <ColorCube setBgColor={setBgColor} />
//       </Canvas>
//       {(bgColor === "#000000" || bgColor === "#CCC9C1") && (
//         <a
//           href={
//             bgColor === "#000000"
//               ? "https://www.staylevelrecords.com"
//               : "https://www.stayleveldistribution.com"
//           }
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           style={{
//             fontFamily: "DrukTextWide, sans-serif",
//             border: `1px solid ${
//               bgColor === "#000000"
//                 ? "#CCC9C1"
//                 : bgColor === "#CCC9C1"
//                 ? "#000000"
//                 : isHovered
//                 ? "#000000"
//                 : "#CCC9C1"
//             }`,
//             backgroundColor:
//               bgColor === "#000000"
//                 ? isHovered
//                   ? "#CCC9C1"
//                   : "#000000"
//                 : bgColor === "#CCC9C1"
//                 ? isHovered
//                   ? "#000000"
//                   : "#CCC9C1"
//                 : isHovered
//                 ? "#CCC9C1"
//                 : "#000000",
//             color:
//               bgColor === "#000000"
//                 ? isHovered
//                   ? "#000000"
//                   : "#CCC9C1"
//                 : bgColor === "#CCC9C1"
//                 ? isHovered
//                   ? "#CCC9C1"
//                   : "#000000"
//                 : isHovered
//                 ? "#000000"
//                 : "#CCC9C1",

//             position: "absolute",
//             cursor: "pointer",
//             bottom: "22%",
//             left: "50%",
//             fontSize: "1.2rem",
//             transform: "translateX(-50%)",
//             padding: "10px 20px",
//             zIndex: 1,
//             transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
//             touchAction: "none", // Disable touch actions on the button
//             textDecoration: "none",
//           }}
//         >
//           Go to site
//         </a>
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
//   const [currentYRotation, setCurrentYRotation] = useState(initialRotation);
//   const targetYRotation = useRef(initialRotation);
//   const viewportWidth = useRef(window.innerWidth);
//   const hasInitialClick = useRef(false);
//   const dragStartX = useRef(null);
//   const [previousX, setPreviousX] = useState(null);
//   const lastRotationDirection = useRef(0); // Track the last rotation direction

//   // Detect if device is mobile
//   const isMobile = useRef(false);

//   useEffect(() => {
//     // Simple mobile detection
//     isMobile.current =
//       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//         navigator.userAgent
//       );
//   }, []);

//   useEffect(() => {
//     const handleInitialClick = (event) => {
//       if (!hasInitialClick.current) {
//         const clientX = event.touches
//           ? event.touches[0].clientX
//           : event.clientX;
//         const isRightSide = clientX > viewportWidth.current / 2;
//         const targetRotation = isRightSide ? 0 : Math.PI / 2;
//         targetYRotation.current = targetRotation;
//         setCurrentYRotation(targetRotation);
//         updateBackgroundColor(targetRotation);
//         hasInitialClick.current = true;
//       }
//     };

//     window.addEventListener("click", handleInitialClick);
//     window.addEventListener("touchstart", handleInitialClick, {
//       passive: false,
//     });

//     return () => {
//       window.removeEventListener("click", handleInitialClick);
//       window.removeEventListener("touchstart", handleInitialClick);
//     };
//   }, []);

//   const handleDesktopPointerDown = (event) => {
//     event.stopPropagation();
//     const clientX = event.clientX;
//     dragStartX.current = clientX;
//   };

//   const handleDesktopPointerUp = (event) => {
//     if (dragStartX.current === null) return;

//     const clientX = event.clientX;
//     const deltaX = clientX - dragStartX.current;

//     if (Math.abs(deltaX) > 0) {
//       // Determine the new rotation direction
//       const newDirection = deltaX > 0 ? 1 : -1;

//       // If direction changed and we're at a snap point, reset the target rotation
//       if (
//         newDirection !== lastRotationDirection.current &&
//         Math.abs(targetYRotation.current % (Math.PI / 2)) < 0.1
//       ) {
//         targetYRotation.current =
//           Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);
//       }

//       // Update the rotation
//       const newRotation =
//         targetYRotation.current + (newDirection * Math.PI) / 2;
//       targetYRotation.current = newRotation;
//       setCurrentYRotation(newRotation);
//       updateBackgroundColor(newRotation);

//       // Store the last rotation direction
//       lastRotationDirection.current = newDirection;
//     }

//     dragStartX.current = null;
//   };

//   // Mobile handlers remain the same
//   const handleMobilePointerDown = (event) => {
//     event.stopPropagation();
//     setIsDragging(true);
//     const clientX = event.touches ? event.touches[0].clientX : event.clientX;
//     setPreviousX(clientX);
//   };

//   const handleMobilePointerMove = (event) => {
//     if (!isDragging || previousX === null) return;

//     const clientX = event.touches ? event.touches[0].clientX : event.clientX;
//     const deltaX = clientX - previousX;
//     const rotationSpeed = 0.01;
//     targetYRotation.current += deltaX * rotationSpeed;
//     setPreviousX(clientX);
//   };

//   const handleMobilePointerUp = () => {
//     if (!isDragging) return;

//     setIsDragging(false);
//     setPreviousX(null);

//     const snappedAngle =
//       Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);
//     targetYRotation.current = snappedAngle;
//     setCurrentYRotation(snappedAngle);
//     updateBackgroundColor(snappedAngle);
//   };

//   const updateBackgroundColor = (yRotation) => {
//     const normalizedRotation =
//       ((yRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
//     const isBeigeFace =
//       Math.abs(normalizedRotation) < Math.PI / 4 ||
//       Math.abs(normalizedRotation - Math.PI) < Math.PI / 4 ||
//       Math.abs(normalizedRotation - 2 * Math.PI) < Math.PI / 4;

//     setBgColor(isBeigeFace ? "#000000" : "#CCC9C1");
//   };

//   useFrame(() => {
//     if (cubeRef.current) {
//       cubeRef.current.rotation.y = THREE.MathUtils.lerp(
//         cubeRef.current.rotation.y,
//         targetYRotation.current,
//         isMobile.current ? (isDragging ? 0.3 : 0.1) : 0.1
//       );
//     }
//   });

//   const pointerProps = isMobile.current
//     ? {
//         onPointerDown: handleMobilePointerDown,
//         onPointerMove: handleMobilePointerMove,
//         onPointerUp: handleMobilePointerUp,
//         onPointerOut: handleMobilePointerUp,
//         onPointerLeave: handleMobilePointerUp,
//       }
//     : {
//         onPointerDown: handleDesktopPointerDown,
//         onPointerUp: handleDesktopPointerUp,
//         onPointerOut: handleDesktopPointerUp,
//         onPointerLeave: handleDesktopPointerUp,
//       };

//   return (
//     <mesh
//       ref={cubeRef}
//       position={[0, 0.3, 0]}
//       rotation={[0, initialRotation, 0]}
//       {...pointerProps}
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
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, MousePointer } from "lucide-react";

const InteractionHint = ({ bgColor }) => {
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!showHint) return null;

  const textColor = "#FFFFFF";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: textColor,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          animation: "fadeInOut 4s ease-in-out",
        }}
      >
        <div
          style={{
            animation: "pulse 2s infinite",
          }}
        >
          {isMobile ? <ArrowLeftRight size={32} /> : <MousePointer size={32} />}
        </div>
        <p
          style={{
            fontSize: "22px",
            fontFamily: "DrukTextWide, sans-serif",
          }}
        >
          {isMobile ? "Swipe to rotate" : "Click and drag to rotate"}
        </p>
      </div>

      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

function ColorCube({ setBgColor }) {
  const beigeTexture = useLoader(THREE.TextureLoader, "/beige.png");
  const blackTexture = useLoader(THREE.TextureLoader, "/black.png");
  const cubeRef = useRef();

  const initialRotation = Math.PI / 4;
  const [isDragging, setIsDragging] = useState(false);
  const [currentYRotation, setCurrentYRotation] = useState(initialRotation);
  const targetYRotation = useRef(initialRotation);
  const viewportWidth = useRef(window.innerWidth);
  const hasInitialClick = useRef(false);
  const dragStartX = useRef(null);
  const [previousX, setPreviousX] = useState(null);
  const lastRotationDirection = useRef(0);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  }, []);

  useEffect(() => {
    const handleInitialClick = (event) => {
      if (!hasInitialClick.current) {
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

    window.addEventListener("click", handleInitialClick);
    window.addEventListener("touchstart", handleInitialClick, {
      passive: false,
    });

    return () => {
      window.removeEventListener("click", handleInitialClick);
      window.removeEventListener("touchstart", handleInitialClick);
    };
  }, []);

  const handleDesktopPointerDown = (event) => {
    event.stopPropagation();
    const clientX = event.clientX;
    dragStartX.current = clientX;
  };

  const handleDesktopPointerUp = (event) => {
    if (dragStartX.current === null) return;

    const clientX = event.clientX;
    const deltaX = clientX - dragStartX.current;

    if (Math.abs(deltaX) > 0) {
      const newDirection = deltaX > 0 ? 1 : -1;

      if (
        newDirection !== lastRotationDirection.current &&
        Math.abs(targetYRotation.current % (Math.PI / 2)) < 0.1
      ) {
        targetYRotation.current =
          Math.round(targetYRotation.current / (Math.PI / 2)) * (Math.PI / 2);
      }

      const newRotation =
        targetYRotation.current + (newDirection * Math.PI) / 2;
      targetYRotation.current = newRotation;
      setCurrentYRotation(newRotation);
      updateBackgroundColor(newRotation);

      lastRotationDirection.current = newDirection;
    }

    dragStartX.current = null;
  };

  const handleMobilePointerDown = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    setPreviousX(clientX);
  };

  const handleMobilePointerMove = (event) => {
    if (!isDragging || previousX === null) return;

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - previousX;
    const rotationSpeed = 0.01;
    targetYRotation.current += deltaX * rotationSpeed;
    setPreviousX(clientX);
  };

  const handleMobilePointerUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setPreviousX(null);

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
      Math.abs(normalizedRotation) < Math.PI / 4 ||
      Math.abs(normalizedRotation - Math.PI) < Math.PI / 4 ||
      Math.abs(normalizedRotation - 2 * Math.PI) < Math.PI / 4;

    setBgColor(isBeigeFace ? "#000000" : "#CCC9C1");
  };

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y = THREE.MathUtils.lerp(
        cubeRef.current.rotation.y,
        targetYRotation.current,
        isMobile.current ? (isDragging ? 0.3 : 0.1) : 0.1
      );
    }
  });

  const pointerProps = isMobile.current
    ? {
        onPointerDown: handleMobilePointerDown,
        onPointerMove: handleMobilePointerMove,
        onPointerUp: handleMobilePointerUp,
        onPointerOut: handleMobilePointerUp,
        onPointerLeave: handleMobilePointerUp,
      }
    : {
        onPointerDown: handleDesktopPointerDown,
        onPointerUp: handleDesktopPointerUp,
        onPointerOut: handleDesktopPointerUp,
        onPointerLeave: handleDesktopPointerUp,
      };

  return (
    <mesh
      ref={cubeRef}
      position={[0, 0.3, 0]}
      rotation={[0, initialRotation, 0]}
      {...pointerProps}
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

export const App = () => {
  const [bgColor, setBgColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const preventDefault = (e) => {
      // Only prevent default if the touch started on the canvas
      if (e.target.tagName.toLowerCase() === "canvas") {
        e.preventDefault();
      }
    };

    // Only prevent scrolling on the canvas element
    canvas.style.touchAction = "none";

    // Add event listeners to the canvas only
    canvas.addEventListener("touchmove", preventDefault, { passive: false });
    canvas.addEventListener("touchstart", preventDefault, { passive: false });

    return () => {
      if (canvas) {
        canvas.style.touchAction = "auto";
        canvas.removeEventListener("touchmove", preventDefault);
        canvas.removeEventListener("touchstart", preventDefault);
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
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
      {/* <InteractionHint bgColor={bgColor} /> */}

      <div ref={canvasRef} style={{ width: "100%", height: "100%" }}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 5] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <ambientLight intensity={2.4} />
          <ColorCube setBgColor={setBgColor} />
        </Canvas>
      </div>

      {(bgColor === "#000000" || bgColor === "#CCC9C1") && (
        <a
          href={
            bgColor === "#000000"
              ? "https://www.staylevelrecords.com"
              : "https://www.stayleveldistribution.com"
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            fontFamily: "DrukTextWide, sans-serif",
            border: `1px solid ${
              bgColor === "#000000"
                ? "#CCC9C1"
                : bgColor === "#CCC9C1"
                ? "#000000"
                : isHovered
                ? "#000000"
                : "#CCC9C1"
            }`,
            backgroundColor:
              bgColor === "#000000"
                ? isHovered
                  ? "#CCC9C1"
                  : "#000000"
                : bgColor === "#CCC9C1"
                ? isHovered
                  ? "#000000"
                  : "#CCC9C1"
                : isHovered
                ? "#CCC9C1"
                : "#000000",
            color:
              bgColor === "#000000"
                ? isHovered
                  ? "#000000"
                  : "#CCC9C1"
                : bgColor === "#CCC9C1"
                ? isHovered
                  ? "#CCC9C1"
                  : "#000000"
                : isHovered
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
            textDecoration: "none",
          }}
        >
          Go to site
        </a>
      )}
    </div>
  );
};

export default App;
