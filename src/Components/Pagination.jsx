import React from 'react'
import style from "./Styles/Pagination.module.css"

const Pagination = ({ productsPerPage, currentPage, setCurrentPage, totalProducts}) => {

  const pageNumbers= [];

  const length=(Math.ceil(totalProducts/productsPerPage))
  console.log(length)

  for (let i = 1; i<=length; i++) {
    pageNumbers.push(i)   
  }

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
    <div>
      <button onClick={onPreviusPage} className={`${currentPage === 1 ? `${style.disabled}` : " "}`}>Anterior</button>
      {
      pageNumbers.map(noPage =>(
        <button key={noPage} 
                onClick={()=>onSpecificPage(noPage)} 
                
                className={`${noPage === currentPage ? `${style.noPage}` : " "}`}

                >
          {noPage}
        </button>
      )
)
      }
      <button onClick={onNextPage} className={`${currentPage >= pageNumbers.length ? `${style.disabled}` : " "}`}>Siguiente</button>



    </div>
  )
}

export default Pagination