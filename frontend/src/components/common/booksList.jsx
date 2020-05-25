import React, { useState, useEffect } from 'react';
import BookCard from './bookCard';
import Pagination from './pagination';
import { paginate } from '../../utils/paginate';
import { Container, CardDeck } from 'reactstrap';

const ListBooks = ({ booksList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(8);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedBookList = paginate(booksList, currentPage, pageSize);

    return (
        // <h1>hello</h1>
        <Container>
            <br />
            <CardDeck>
                {
                    paginatedBookList.map((book, index) => {
                        return (
                            <BookCard
                                key={ index }
                                book={ book }
                            />
                        );
                    })
                }
            </CardDeck>
                <br/>
            <Pagination
                pageSize={ pageSize }
                itemsCount={ booksList.length }
                currentPage={ currentPage }
                onPageChange={ handlePageChange }
            />
        </Container>
    );
}

export default ListBooks;