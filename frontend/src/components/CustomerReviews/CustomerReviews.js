import "./CustomerReviews.css";

import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";

function CustomerReviews() {

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      image: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      review:
        "Amazing laptop quality and fast delivery. Highly recommended!",
    },

    {
      id: 2,
      name: "Priya Singh",
      image: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      review:
        "The shopping experience was smooth and customer support was excellent.",
    },

    {
      id: 3,
      name: "Arjun Kumar",
      image: "https://i.pravatar.cc/150?img=15",
      rating: 4,
      review:
        "Great discounts and genuine products. I'll definitely shop again.",
    },
  ];

  return (

    <section className="reviews">

      {/* Section Heading */}

      <div className="reviews-heading">

        <span className="reviews-label">
          CUSTOMER STORIES
        </span>

        <h2>
          What Our Customers Say
        </h2>

        <p>
          Real experiences from people who
          chose LapZone for their next laptop.
        </p>

      </div>


      {/* Reviews */}

      <div className="review-container">

        {reviews.map((review, index) => (

          <article
            className="review-card"
            key={review.id}
            style={{
              "--review-delay": `${index * 0.12}s`,
            }}
          >

            {/* Quote */}

            <div className="quote-icon">
              <FaQuoteLeft />
            </div>


            {/* Customer */}

            <div className="review-user">

              <img
                src={review.image}
                alt={review.name}
              />

              <div className="user-info">

                <h3>
                  {review.name}
                </h3>

                <span>
                  Verified Customer
                  <FaCheckCircle />
                </span>

              </div>

            </div>


            {/* Rating */}

            <div className="stars">

              {[...Array(5)].map((_, index) => (

                <FaStar
                  key={index}
                  className={
                    index < review.rating
                      ? "star-filled"
                      : "star-empty"
                  }
                />

              ))}

              <span>
                {review.rating}.0
              </span>

            </div>


            {/* Review */}

            <p className="review-text">
              "{review.review}"
            </p>

          </article>

        ))}

      </div>


      {/* Bottom Trust */}

      <div className="review-trust">

        <strong>
          Trusted by laptop shoppers
        </strong>

        <span>
          ★ 4.8 average rating
        </span>

      </div>

    </section>

  );
}

export default CustomerReviews;