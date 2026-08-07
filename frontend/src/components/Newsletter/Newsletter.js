import "./Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter">

      <div className="newsletter-content">

        <h2>Stay Updated</h2>

        <p>
          Subscribe to get the latest laptop launches, exclusive deals and
          special discounts.
        </p>

        <div className="newsletter-box">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;