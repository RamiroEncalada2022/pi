import React, { useEffect, useRef, useState } from 'react'
import { data } from './Data';
import style from "./Styles/Categories2.module.css";
import { Link } from 'react-router-dom';

const Categories2 = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  

  // const scrollToImage = (direction) => {
  //   if (direction === 'prev') {
  //     setCurrentIndex(curr => {
  //       const isFirstSlide = currentIndex === 0;
  //       return isFirstSlide ? 0 : curr - 1;
  //     });
  //   } else {
  //     const isLastSlide = currentIndex === data.length - 1;
  //     if (!isLastSlide) {
  //       setCurrentIndex(curr => curr + 1);
  //     }
  //   }
  // }

  console.log(data)



  return (
    <div className={style.maincontainer}>
      <div className={style.slidercontainer}>
        <div className={style.containerimages}>
          <ul ref={listRef} className={style.imageList}>
            {data.map((item) => (
              <li key={item.id}>
                <Link to={`/${item.categoria}`}>
                <img className = {style.imagenCategoria}src={item.imgUrl} alt={`Slide ${item.id}`} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Categories2;