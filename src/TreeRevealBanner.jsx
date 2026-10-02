
import { useEffect, useRef } from "react";
import img1 from "./assets/bg3.png";
import img2 from "./assets/bg4.png";

const TreeRevealBanner = () => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const visible = useRef(0);
  const targetVisible = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) return;

    let animationFrame;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();

      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top;

      targetVisible.current = 1;
    };

    const handleMouseEnter = () => {
      targetVisible.current = 1;
    };

    const handleMouseLeave = () => {
      targetVisible.current = 0;
    };

    const animate = () => {
      // Smooth cursor movement
      smoothMouse.current.x +=
        (mouse.current.x - smoothMouse.current.x) * 0.12;

      smoothMouse.current.y +=
        (mouse.current.y - smoothMouse.current.y) * 0.12;

      // Smooth reveal / hide
      visible.current +=
        (targetVisible.current - visible.current) * 0.08;

      overlay.style.setProperty(
        "--mouse-x",
        `${smoothMouse.current.x}px`
      );

      overlay.style.setProperty(
        "--mouse-y",
        `${smoothMouse.current.y}px`
      );

      overlay.style.setProperty(
        "--reveal-opacity",
        visible.current
      );

      animationFrame = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);

      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="tree-banner">
      <div className="tree-banner__content">
        <p className="tree-banner__eyebrow">
          NATURE / EXPERIENCE
        </p>

        <h1>
          Where nature
          <span> comes alive.</span>
        </h1>

        <p className="tree-banner__description">
          Discover a visual experience where every movement
          reveals something hidden beneath the surface.
        </p>

        <button className="tree-banner__button">
          Explore Experience
        </button>
      </div>

      <div
        ref={containerRef}
        className="tree-banner__visual"
      >
        {/* Base image - bare tree */}
        <img
          src={img1}
          alt=""
          className="tree-banner__image tree-banner__image--base"
        />

        {/* Overlay image - moss tree */}
        <div
          ref={overlayRef}
          className="tree-banner__overlay"
        >
          <img
            src={img2}
            alt=""
            className="tree-banner__image"
          />
        </div>

        <div className="tree-banner__hint">
          <span>Move your cursor</span>
        </div>
      </div>
    </section>
  );
};

export default TreeRevealBanner;