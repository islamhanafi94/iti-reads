import React from 'react';
import { Badge } from 'reactstrap';
const BookTable = (props) => {
    return (
        <>
            <h1><Badge color="secondary">Current Shelve</Badge></h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Cover</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Avg Rate</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Shelve</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {movies.map((movie) => {
                    return (
                        <tr key={movie._id}>
                            <th scope="row">{movie.title}</th>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like
                                    movie={movie}
                                    handleLike={this.handleLike}
                                    liked={movie.liked}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => { this.removeMovie(movie._id) }}>delete</button>
                            </td>
                        </tr>
                    )
                })} */}
                </tbody>
            </table>
        </>
    );
}

export default BookTable;
