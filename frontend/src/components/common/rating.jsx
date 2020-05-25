import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const Rating = (props) => {

    return (                
        <div>
          <StarRatingComponent 
            name="rate1" 
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </div>
      );

}

export default Rating;