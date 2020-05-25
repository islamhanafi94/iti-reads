import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorCard from './authorCard';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Container, CardDeck } from 'reactstrap';



const AuthorsMenu = (props) => {

    const [authorList, setAuthorList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(5);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get("http://localhost:5000/author", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
                setIsLoaded(true);
                setAuthorList(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedAuthorList = paginate(authorList, currentPage, pageSize);

    return (
        <Container>
            <br />
            <CardDeck>
                {
                    paginatedAuthorList.map((author, index) => {
                        return (
                            <AuthorCard
                                key={ index }
                                author={ author }
                            />
                        );
                    })
                }
            </CardDeck>
            
            <br />
            
            <Pagination
                pageSize={ pageSize }
                itemsCount={ authorList.length }
                currentPage={ currentPage }
                onPageChange={ handlePageChange }
            />
        </Container>
    );

};

export default AuthorsMenu;