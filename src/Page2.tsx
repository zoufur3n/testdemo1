import React, { useEffect, useState } from 'react';

import style from './App.module.scss';
interface Props {
  setShowPage: React.Dispatch<React.SetStateAction<string>>;
  showPage: string;
}
const SecondPage = ({ setShowPage, showPage }: Props) => {
  const [startY, setStartY] = useState<number>(0);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        // 向上滚动
        setShowPage('1');
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      setStartY(event.touches[0].clientY);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const endY = event.changedTouches[0].clientY;
      if (startY < endY) {
        // 向上滑动
        setShowPage('1');
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startY]);

  return (
    <div
      className={classNames(
        style.page2,
        // style.slideIn,
        showPage !== '2' && (style.displayNone, style.slideOut),
      )}
    ></div>
  );
};

export default SecondPage;
