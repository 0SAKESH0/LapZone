import macbook from "../assets/images/macbook.png";
import dell from "../assets/images/dell.png";
import hp from "../assets/images/hp-pavi.png";
import lenovo from "../assets/images/lenovo.png";

const products = [
  {
    id: 1,
    brand: "Apple",
    name: "MacBook Air M3",
    price: 109999,
    rating: 4.9,
    discount: "10% OFF",
    image: macbook,
    description:
      "The MacBook Air M3 delivers incredible speed, battery life, and a lightweight design for professionals and students.",
    specs: {
      processor: "Apple M3",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "13.6-inch Liquid Retina",
      battery: "18 Hours",
      warranty: "2 Years",
    },
  },
  {
    id: 2,
    brand: "Dell",
    name: "Dell XPS 13",
    price: 99999,
    rating: 4.8,
    discount: "15% OFF",
    image: dell,
    description:
      "Dell XPS 13 features a premium aluminum body with Intel Core Ultra processor.",
    specs: {
      processor: "Intel Core Ultra 7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "13.4-inch FHD+",
      battery: "15 Hours",
      warranty: "2 Years",
    },
  },
  {
    id: 3,
    brand: "HP",
    name: "HP Pavilion",
    price: 68999,
    rating: 4.7,
    discount: "12% OFF",
    image: hp,
    description:
      "HP Pavilion is perfect for students, office work, and entertainment.",
    specs: {
      processor: "Intel Core i5",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch Full HD",
      battery: "9 Hours",
      warranty: "2 Years",
    },
  },
  {
    id: 4,
    brand: "Lenovo",
    name: "Lenovo Legion 5",
    price: 89999,
    rating: 4.8,
    discount: "18% OFF",
    image: lenovo,
    description:
      "Lenovo Legion 5 is designed for gamers with powerful Ryzen performance.",
    specs: {
      processor: "AMD Ryzen 7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "15.6-inch 165Hz",
      battery: "8 Hours",
      warranty: "2 Years",
    },
  },
];

export default products;