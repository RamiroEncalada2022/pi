import React, { useEffect, useRef, useState } from 'react'
import { data } from './Data';
import style from "./Styles/Categories2.module.css";

const Categories2 = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1);
      }
    }
  }

  // Event listener to prevent arrow key scrolling
  const handleKeyDown = (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Add and remove event listener on mount/unmount

  return (
    <div className={style.maincontainer}>
      <div className={style.slidercontainer}>
        <div className={style.containerimages}>
          <ul ref={listRef} className={style.imageList}>
            {data.map((item) => (
              <li key={item.id}>
                <img className = {style.imagenCategoria}src={item.imgUrl} alt={`Slide ${item.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Categories2;