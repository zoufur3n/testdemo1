// import { useEffect, useState } from 'react';

import { useEffect } from 'react';

import styles from './NavBar.module.scss';
interface Props {
  setShowPage: React.Dispatch<React.SetStateAction<string>>;
  scrollProgress: number;
}
const Navbar = ({ setShowPage, scrollProgress }: Props) => {
  useEffect(() => {
    console.log(scrollProgress);
  }, [scrollProgress]);
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a
            href="#section1"
            onClick={() => {
              setShowPage('1');
            }}
          >
            Section 1
          </a>
          <div
            style={{ width: `${scrollProgress * 100}%` }}
            className={classNames(styles.progressBar, { width: `${scrollProgress}%` })}
          ></div>
        </li>
        <li className={styles.navItem}>
          <a
            href="#section2"
            onClick={() => {
              setShowPage('2');
            }}
          >
            Section 2
          </a>
          <div className={classNames(styles.progressBar)}></div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
