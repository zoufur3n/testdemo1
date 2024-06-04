/* eslint-disable jsx-a11y/media-has-caption */
// import './App.css';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
// import logo from './logo.svg';
import videojs from 'video.js';

import style from './App.module.scss';
import Navbar from './NavBar';
import ScrollText from './ScrollText';
function App() {
  const videoRef = useRef(null);
  // const playerRef = useRef(null);
  const [showPage, setShowPage] = useState('1');
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    console.log(scrollProgress);
    if (videoRef.current) {
      videoRef.current = videojs(videoRef.current, {
        autoplay: true,
        loop: true,
        muted: true,
        controls: false,
        fluid: true,
        debug: false,
      });

      videoRef.current.on('ready', () => {
        console.log('Background video is ready!');
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.dispose();
      }
    };
  }, []);
  useEffect(() => {
    console.log(scrollProgress, 'a');
  }, [scrollProgress]);
  return (
    <div className="App">
      <Navbar scrollProgress={scrollProgress} setShowPage={setShowPage} />

      <div className={style.videoContainer}></div>
      <div
        className={classNames(
          style.content,
          showPage !== '1' && (style.displayNone, style.slideOut),
        )}
      >
        <video ref={videoRef} className={style['video-js']} playsInline>
          <source src="../resources/intro.mp4" type="video/mp4" />
          {/* <source src="YOUR_VIDEO.webm" type="video/webm" /> */}
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web
            browser that
            <a
              href="https://videojs.com/html5-video-support/"
              target="_blank"
              rel="noreferrer"
            >
              supports HTML5 video
            </a>
          </p>
        </video>
        <ScrollText setShowPage={setShowPage} onScrollProgress={setScrollProgress} />
      </div>
      <div
        className={classNames(
          style.page2,
          // style.slideIn,
          showPage !== '2' && (style.displayNone, style.slideOut),
        )}
        onScroll={() => {
          setShowPage('1');
        }}
      ></div>
    </div>
  );
}

export default App;
