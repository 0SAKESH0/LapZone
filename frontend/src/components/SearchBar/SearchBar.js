import "./SearchBar.css";
import { FaSearch, FaSlidersH } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
   <div className="search-wrapper">

    <div className="search-border">

        <div className="search-box">

            <FaSearch className="search-icon" />

            <input
                type="text"
                placeholder="Search laptops..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />
        </div>

    </div>

</div>
  );
}

export default SearchBar;