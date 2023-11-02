import React from 'react'
import style from "./Styles/Pagination.module.css"

const Pagination = ({ productsPerPage, currentPage, setCurrentPage, totalProducts}) => {

  const pageNumbers= [];

  const length=(Math.ceil(totalProducts/productsPerPage))
  console.log(length)

  for (let i = 1; i<=length; i++) {
    pageNumbers.push(i)   
  }

  console.log(pageNumbers)

  const onPreviusPage = () =>{
    setCurrentPage(currentPage-1)
  }

  const onNextPage = () =>{
    setCurrentPage(currentPage+1)
  }

  const onSpecificPage = (n) => {
    setCurrentPage(n)
  }



  


  return (
    <div className={style.container}>
      <button onClick={onPreviusPage} className={`${currentPage === 1 ? `${style.disabled}` : style.firstButton}`}>⬅️</button>
      {
      pageNumbers.map(noPage =>(
        <button key={noPage} 
                onClick={()=>onSpecificPage(noPage)} 
                
                className={`${noPage === currentPage ? `${style.noPage}` : style.firstButton}`}

                >
          {noPage}
          {console.log(noPage)}
        </button>
      )
)
      }
<button onClick={onNextPage} className={`${currentPage >= pageNumbers.length ? style.disabled : style.firstButton}`}>➡️</button>




    </div>
  )
}

export default Pagination