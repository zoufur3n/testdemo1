import './ScrollText.css'; // Assuming you have a CSS file with styles

import React, { useEffect, useRef, useState } from 'react';
interface ScrollFollowTextProps {
  onScrollProgress: (progress: number) => void;
  setShowPage: React.Dispatch<React.SetStateAction<string>>;
}
const ScrollFollowText: React.FC<ScrollFollowTextProps> = ({
  onScrollProgress,
  setShowPage,
}: ScrollFollowTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const paragraphHeight = 66; // Height of each paragraph
  const [visibleParagraphs, setVisibleParagraphs] = useState(3); // Number of visible paragraphs
  const [paragraphs] = useState([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Integer vitae magna quis risus porta tempor.',
    'Phasellus nec elit eget ligula vehicula sollicitudin.',
    'Sed vestibulum tortor vel diam luctus faucibus.',
    'Nulla facilisi. Duis eu consequat nisi.',
    'Etiam ut felis in enim maximus egestas.',
    'Vivamus efficitur urna quis nisi gravida, sit amet sodales ex pretium.',
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    'Sed porttitor metus non felis lobortis, sit amet feugiat magna volutpat.',
    'Donec ultrices lectus id elit consectetur, at pellentesque dui vestibulum.',
    'Phasellus nec mauris convallis, euismod augue at, dictum neque.',
    'Nunc lobortis tortor id nisi consectetur, eget rhoncus enim fermentum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Integer vitae magna quis risus porta tempor.',
    'Phasellus nec elit eget ligula vehicula sollicitudin.',
    'Sed vestibulum tortor vel diam luctus faucibus.',
    'Nulla facilisi. Duis eu consequat nisi.',
    'Etiam ut felis in enim maximus egestas.',
    'Vivamus efficitur urna quis nisi gravida, sit amet sodales ex pretium.',
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    'Sed porttitor metus non felis lobortis, sit amet feugiat magna volutpat.',
    'Donec ultrices lectus id elit consectetur, at pellentesque dui vestibulum.',
    'Phasellus nec mauris convallis, euismod augue at, dictum neque.',
    'Nunc lobortis tortor id nisi consectetur, eget rhoncus enim fermentum.',
  ]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault(); // Prevent default scroll behavior

      // Calculate new scroll speed based on scroll event
      const newScrollSpeed = scrollSpeed + event.deltaY;

      // Limit scroll speed within viewport height
      const maxScrollSpeed = (paragraphs.length - visibleParagraphs) * paragraphHeight; // Total height of visible paragraphs
      setScrollSpeed(Math.max(0, Math.min(newScrollSpeed, maxScrollSpeed)));
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    // Attach the scroll and resize event listeners
    if (containerRef.current) {
      containerRef.current.addEventListener('wheel', handleScroll, { passive: false });
      window.addEventListener('resize', handleResize);
    }

    // Clean up the event listeners on component unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollSpeed, paragraphs.length, visibleParagraphs, paragraphHeight]); // Depend on scrollSpeed, paragraphs length, visibleParagraphs and paragraphHeight
  useEffect(() => {
    // Calculate the progress as a percentage of total scrollable height

    const maxScrollSpeed = (paragraphs.length - visibleParagraphs) * paragraphHeight;
    const progress = scrollSpeed / maxScrollSpeed;
    onScrollProgress(progress);
    if (progress === 1) {
      setShowPage('2');
    } else {
      setShowPage('1');
    }
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0 && progress === 1) {
        // 进度条满时向下滚动
        setShowPage('2');
      } else {
        setShowPage('1');
      }
    };
    window.addEventListener('wheel', handleWheel);
  }, [
    scrollSpeed,
    paragraphs.length,
    visibleParagraphs,
    paragraphHeight,
    onScrollProgress,
  ]);
  // Calculate styles for each paragraph
  const calculateStyles = (index: number): React.CSSProperties => {
    const distanceFromCenter = Math.abs(index * paragraphHeight - scrollSpeed);
    let opacity = 1;
    let scale = 1;

    // Adjust opacity and scale based on distance from center
    if (distanceFromCenter <= paragraphHeight * (visibleParagraphs / 2)) {
      // Fully visible and normal size when in the middle region
      opacity = 1;
      scale = 1;
    } else if (
      distanceFromCenter > paragraphHeight * (visibleParagraphs / 2) &&
      distanceFromCenter <= paragraphHeight * visibleParagraphs
    ) {
      // Fading out and scaling down when in the upper region
      opacity =
        1 -
        (distanceFromCenter - paragraphHeight * (visibleParagraphs / 2)) /
          (paragraphHeight * (visibleParagraphs / 2));
      scale =
        1 -
        (distanceFromCenter - paragraphHeight * (visibleParagraphs / 2)) /
          (viewportHeight * 2);
    } else {
      // Fully transparent and minimum scale when above the upper region
      opacity = 0;
      scale = 0.2; // Minimum scale
    }

    return {
      opacity,
      transform: `translateY(${
        index * paragraphHeight - scrollSpeed
      }px) translate3d(0, 0, 0) scale(${scale})`,
    };
  };

  return (
    <div ref={containerRef} className="scroll-container">
      <div
        className="scroll-content"
        style={{ height: `${paragraphHeight * visibleParagraphs}px` }}
      >
        {paragraphs.map((text, index) => (
          <p key={index} style={calculateStyles(index)}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ScrollFollowText;
