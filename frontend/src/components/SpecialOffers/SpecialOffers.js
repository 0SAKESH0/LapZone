import "./SpecialOffers.css";

function SpecialOffers() {

    const offers = [
        {
            title: "Student Offer",
            discount: "Up to 25% OFF",
            description: "Get exclusive student discounts on premium laptops.",
            button: "Shop Now"
        },
        {
            title: "Gaming Sale",
            discount: "Save ₹15,000",
            description: "Powerful gaming laptops at unbelievable prices.",
            button: "Explore"
        },
        {
            title: "Business Series",
            discount: "Corporate Deals",
            description: "Best laptops for professionals and offices.",
            button: "View Deals"
        }
    ];

    return (

        <section className="offers">

            <h2>Special Offers</h2>

            <div className="offer-container">

                {offers.map((offer, index) => (

                    <div className="offer-card" key={index}>

                        <span className="offer-tag">
                            {offer.discount}
                        </span>

                        <h3>{offer.title}</h3>

                        <p>{offer.description}</p>

                        <button>{offer.button}</button>

                    </div>

                ))}

            </div>

        </section>

    );
}

export default SpecialOffers;