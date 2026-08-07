import "./BrandCard.css";

function BrandCard({ name, logo }) {
  return (
    <div className="brand-card">
      <img src={logo} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default BrandCard;