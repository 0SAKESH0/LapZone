import "./CustomerReviews.css";
import { FaStar } from "react-icons/fa";

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

      <h2>What Our Customers Say</h2>

      <div className="review-container">

        {reviews.map((review) => (
          <div className="review-card" key={review.id}>

            <img
              src={review.image}
              alt={review.name}
            />

            <h3>{review.name}</h3>

            <div className="stars">
              {[...Array(review.rating)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>

            <p>"{review.review}"</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default CustomerReviews;