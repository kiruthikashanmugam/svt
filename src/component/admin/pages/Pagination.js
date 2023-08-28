import React, { Component } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            halfPageLimit: 0
        }
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }
    

    nextPage(event) {
        event.preventDefault();
        const { nPages, currentPage, setCurrentPage } = this.props;
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };

    prevPage(event) {
        event.preventDefault();
        const { currentPage, setCurrentPage } = this.props;
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    render() {
        const { nPages, currentPage, setCurrentPage } = this.props;
        const { halfPageLimit } = this.state;
        const pageNumbers = [];
        if (nPages <= 1) {
            return null;
        }
        let i;
        for (i = Math.max(1, currentPage - halfPageLimit); i <= Math.min(currentPage + halfPageLimit, nPages); i++) {
            pageNumbers.push(i);
        }
        const paginationText = `Page ${currentPage} of ${nPages}`;


        return (
            <nav style={{display:"flex",justifyContent:"end"}}>
               <div style={{marginTop:"61px",marginRight:"20px"}}> {paginationText}</div>
               <div>
               <ul className='pagination justify-content-center'>
                    <li className='page-item'>
                        <a className='page-link preview-button'  onClick={this.prevPage} href="">
                            Previous
                        </a>
                    </li>
                    {pageNumbers.map((pgNumber) => (
                        <li
                            key={pgNumber}
                            className={`page-item ${currentPage === pgNumber ? 'active' : ''}`}
                        >
                            <a onClick={() => setCurrentPage(pgNumber)} style={{margin:"0px"}} className='page-link'>
                                {pgNumber}
                            </a>
                        </li>
                    ))}
                    <li className='page-item'>
                        <a className='page-link next-button' style={{margin:"0px"}}  onClick={this.nextPage}>
                            Next
                        </a>
                    </li>
                </ul>

               </div>
               
            </nav>
        );
    }

}

export default Pagination;