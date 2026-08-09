import macbook1 from "../assets/images/macbook/MacBook_Air_M2.png";
import macbook2 from "../assets/images/macbook/macbook.png";
import macbook3 from "../assets/images/macbook/MacBook_Pro_M3.png";
import macbook4 from "../assets/images/macbook/MacBook Air M4.png";
import macbook5 from "../assets/images/macbook/MacBook Pro M4.png";

import dell1 from "../assets/images/dell/Dell XPS 13.png";
import dell2 from "../assets/images/dell/Dell XPS 15.png";
import dell3 from "../assets/images/dell/Dell Inspiron 15.png";
import dell4 from "../assets/images/dell/Dell Inspiron 14.png";
import dell5 from "../assets/images/dell/Dell G15 Gaming.png";

import asus1 from "../assets/images/asus/ASUS ROG Strix G16.png";
import asus2 from "../assets/images/asus/ASUS ROG Zephyrus G14.png";
import asus3 from "../assets/images/asus/ASUS TUF Gaming F15.png";
import asus4 from "../assets/images/asus/ASUS VivoBook 15.png";
import asus5 from "../assets/images/asus/ASUS ZenBook 14.png";

import hp1 from "../assets/images/hp/HP Pavilion 15.png";
import hp2 from "../assets/images/hp/HP Pavilion Plus.png";
import hp3 from "../assets/images/hp/HP Envy 14.png";
import hp4 from "../assets/images/hp/HP Victus 15.png";
import hp5 from "../assets/images/hp/HP Omen 16.png";

import acer1 from "../assets/images/acer/Acer Aspire 5.png";
import acer2 from "../assets/images/acer/Acer Aspire 7.png";
import acer3 from "../assets/images/acer/Acer Nitro V.png";
import acer4 from "../assets/images/acer/Acer Predator Helios Neo.png";
import acer5 from "../assets/images/acer/Acer Swift Go 14.png";

import lenovo1 from "../assets/images/lenovo/Lenovo Legion 5.png";
import lenovo2 from "../assets/images/lenovo/Lenovo Legion 7.png";
import lenovo3 from "../assets/images/lenovo/Lenovo IdeaPad Slim 5.png";
import lenovo4 from "../assets/images/lenovo/Lenovo ThinkPad E14.png";
import lenovo5 from "../assets/images/lenovo/Lenovo Yoga Slim 7.png";

import msi1 from "../assets/images/msi/MSI Katana 15.png";
import msi2 from "../assets/images/msi/MSI Cyborg 15.png";
import msi3 from "../assets/images/msi/MSI Thin 15.png";
import msi4 from "../assets/images/msi/MSI Raider GE68.png";
import msi5 from "../assets/images/msi/MSI Stealth 16.png";


const products = [

  // =====================================================
  // APPLE - 5 PRODUCTS
  // =====================================================

  {
    id: 1,
    brand: "Apple",
    name: "MacBook Air M3",
    price: 109999,
    rating: 4.9,
    discount: "10% OFF",
    category: "Student",
    image: macbook1,
    description:
      "The MacBook Air M3 delivers incredible performance, long battery life, and a lightweight design.",
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
    brand: "Apple",
    name: "MacBook Air M2",
    price: 89999,
    rating: 4.8,
    discount: "12% OFF",
    category: "Student",
    image: macbook2,
    description:
      "MacBook Air M2 combines excellent performance with an ultra-thin and lightweight design.",
    specs: {
      processor: "Apple M2",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "13.6-inch Liquid Retina",
      battery: "18 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 3,
    brand: "Apple",
    name: "MacBook Pro M3",
    price: 159999,
    rating: 4.9,
    discount: "8% OFF",
    category: "Business",
    image: macbook3,
    description:
      "MacBook Pro M3 is designed for professionals who need powerful performance for demanding workloads.",
    specs: {
      processor: "Apple M3",
      ram: "18 GB",
      storage: "512 GB SSD",
      display: "14.2-inch Liquid Retina XDR",
      battery: "18 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 4,
    brand: "Apple",
    name: "MacBook Pro M4",
    price: 179999,
    rating: 4.9,
    discount: "5% OFF",
    category: "Business",
    image: macbook4,
    description:
      "MacBook Pro M4 delivers exceptional performance for developers, creators, and professionals.",
    specs: {
      processor: "Apple M4",
      ram: "24 GB",
      storage: "1 TB SSD",
      display: "14.2-inch Liquid Retina XDR",
      battery: "20 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 5,
    brand: "Apple",
    name: "MacBook Air M4",
    price: 124999,
    rating: 4.9,
    discount: "7% OFF",
    category: "Student",
    image: macbook5,
    description:
      "MacBook Air M4 combines next-generation Apple silicon performance with a thin and portable design.",
    specs: {
      processor: "Apple M4",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.3-inch Liquid Retina",
      battery: "18 Hours",
      warranty: "2 Years",
    },
  },

  // =====================================================
  // DELL - 5 PRODUCTS
  // =====================================================

  {
    id: 6,
    brand: "Dell",
    name: "Dell XPS 13",
    price: 99999,
    rating: 4.8,
    discount: "15% OFF",
    category: "Business",
    image: dell1,
    description:
      "Dell XPS 13 features a premium aluminum body and powerful Intel Core Ultra performance.",
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
    id: 7,
    brand: "Dell",
    name: "Dell XPS 15",
    price: 139999,
    rating: 4.8,
    discount: "10% OFF",
    category: "Business",
    image: dell2,
    description:
      "Dell XPS 15 provides powerful performance and a premium display for professionals and creators.",
    specs: {
      processor: "Intel Core Ultra 7",
      ram: "32 GB",
      storage: "1 TB SSD",
      display: "15.6-inch OLED",
      battery: "14 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 8,
    brand: "Dell",
    name: "Dell Inspiron 15",
    price: 67999,
    rating: 4.6,
    discount: "14% OFF",
    category: "Student",
    image: dell3,
    description:
      "Dell Inspiron 15 is an affordable everyday laptop for students, office work, and entertainment.",
    specs: {
      processor: "Intel Core i5",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch Full HD",
      battery: "9 Hours",
      warranty: "1 Year",
    },
  },

  {
    id: 9,
    brand: "Dell",
    name: "Dell Inspiron 14",
    price: 72999,
    rating: 4.7,
    discount: "12% OFF",
    category: "Student",
    image: dell4,
    description:
      "Dell Inspiron 14 offers a compact design with reliable performance for everyday productivity.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "14-inch Full HD+",
      battery: "10 Hours",
      warranty: "1 Year",
    },
  },

  {
    id: 10,
    brand: "Dell",
    name: "Dell G15 Gaming",
    price: 94999,
    rating: 4.7,
    discount: "18% OFF",
    category: "Gaming",
    image: dell5,
    description:
      "Dell G15 Gaming is built for gamers with powerful processing and dedicated graphics performance.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "15.6-inch 165Hz",
      battery: "7 Hours",
      warranty: "2 Years",
    },
  },

  // =====================================================
  // HP - 5 PRODUCTS
  // =====================================================

  {
    id: 11,
    brand: "HP",
    name: "HP Pavilion 15",
    price: 68999,
    rating: 4.7,
    discount: "12% OFF",
    category: "Student",
    image: hp1,
    description:
      "HP Pavilion 15 is perfect for students, office work, entertainment, and everyday productivity.",
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
    id: 12,
    brand: "HP",
    name: "HP Pavilion Plus",
    price: 79999,
    rating: 4.7,
    discount: "15% OFF",
    category: "Student",
    image: hp2,
    description:
      "HP Pavilion Plus offers a stylish design with excellent performance for productivity and entertainment.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "14-inch OLED",
      battery: "10 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 13,
    brand: "HP",
    name: "HP Envy 14",
    price: 104999,
    rating: 4.8,
    discount: "10% OFF",
    category: "Business",
    image: hp3,
    description:
      "HP Envy 14 is a premium laptop designed for professionals and creative users.",
    specs: {
      processor: "Intel Core Ultra 7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "14-inch 2.8K OLED",
      battery: "12 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 14,
    brand: "HP",
    name: "HP Victus 15",
    price: 84999,
    rating: 4.7,
    discount: "17% OFF",
    category: "Gaming",
    image: hp4,
    description:
      "HP Victus 15 delivers reliable gaming performance with a high refresh rate display.",
    specs: {
      processor: "AMD Ryzen 7",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch 144Hz",
      battery: "7 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 15,
    brand: "HP",
    name: "HP Omen 16",
    price: 114999,
    rating: 4.8,
    discount: "15% OFF",
    category: "Gaming",
    image: hp5,
    description:
      "HP Omen 16 is a powerful gaming laptop designed for demanding games and creative workloads.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "16.1-inch 165Hz",
      battery: "8 Hours",
      warranty: "2 Years",
    },
  },

  // =====================================================
  // LENOVO - 5 PRODUCTS
  // =====================================================

  {
    id: 16,
    brand: "Lenovo",
    name: "Lenovo Legion 5",
    price: 89999,
    rating: 4.8,
    discount: "18% OFF",
    category: "Gaming",
    image: lenovo1,
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

  {
    id: 17,
    brand: "Lenovo",
    name: "Lenovo Legion 7",
    price: 149999,
    rating: 4.9,
    discount: "10% OFF",
    category: "Gaming",
    image: lenovo2,
    description:
      "Lenovo Legion 7 provides high-end gaming performance with a premium display and cooling system.",
    specs: {
      processor: "Intel Core i9",
      ram: "32 GB",
      storage: "1 TB SSD",
      display: "16-inch 240Hz",
      battery: "8 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 18,
    brand: "Lenovo",
    name: "Lenovo IdeaPad Slim 5",
    price: 74999,
    rating: 4.7,
    discount: "16% OFF",
    category: "Student",
    image: lenovo3,
    description:
      "Lenovo IdeaPad Slim 5 provides a balanced combination of performance, portability, and battery life.",
    specs: {
      processor: "AMD Ryzen 7",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch OLED",
      battery: "12 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 19,
    brand: "Lenovo",
    name: "Lenovo ThinkPad E14",
    price: 81999,
    rating: 4.8,
    discount: "11% OFF",
    category: "Business",
    image: lenovo4,
    description:
      "Lenovo ThinkPad E14 is designed for business users with a durable build and professional features.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "14-inch Full HD",
      battery: "13 Hours",
      warranty: "3 Years",
    },
  },

  {
    id: 20,
    brand: "Lenovo",
    name: "Lenovo Yoga Slim 7",
    price: 99999,
    rating: 4.8,
    discount: "13% OFF",
    category: "Business",
    image: lenovo5,
    description:
      "Lenovo Yoga Slim 7 combines a lightweight premium design with strong productivity performance.",
    specs: {
      processor: "AMD Ryzen 7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "14-inch OLED",
      battery: "14 Hours",
      warranty: "2 Years",
    },
  },

  // =====================================================
  // ASUS - 5 PRODUCTS
  // =====================================================

  {
    id: 21,
    brand: "ASUS",
    name: "ASUS ROG Strix G16",
    price: 124999,
    rating: 4.9,
    discount: "12% OFF",
    category: "Gaming",
    image: asus1,
    description:
      "ASUS ROG Strix G16 delivers powerful gaming performance with a high refresh rate display.",
    specs: {
      processor: "Intel Core i9",
      ram: "32 GB",
      storage: "1 TB SSD",
      display: "16-inch QHD 240Hz",
      battery: "8 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 22,
    brand: "ASUS",
    name: "ASUS ROG Zephyrus G14",
    price: 139999,
    rating: 4.9,
    discount: "10% OFF",
    category: "Gaming",
    image: asus2,
    description:
      "ROG Zephyrus G14 combines powerful gaming hardware with a compact and portable design.",
    specs: {
      processor: "AMD Ryzen 9",
      ram: "32 GB",
      storage: "1 TB SSD",
      display: "14-inch OLED 120Hz",
      battery: "10 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 23,
    brand: "ASUS",
    name: "ASUS TUF Gaming F15",
    price: 84999,
    rating: 4.7,
    discount: "18% OFF",
    category: "Gaming",
    image: asus3,
    description:
      "ASUS TUF Gaming F15 provides durable construction and reliable gaming performance.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch 144Hz",
      battery: "7 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 24,
    brand: "ASUS",
    name: "ASUS VivoBook 15",
    price: 65999,
    rating: 4.6,
    discount: "13% OFF",
    category: "Student",
    image: asus4,
    description:
      "ASUS VivoBook 15 is a stylish everyday laptop designed for students and productivity.",
    specs: {
      processor: "Intel Core i5",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch Full HD",
      battery: "10 Hours",
      warranty: "1 Year",
    },
  },

  {
    id: 25,
    brand: "ASUS",
    name: "ASUS ZenBook 14",
    price: 94999,
    rating: 4.8,
    discount: "9% OFF",
    category: "Business",
    image: asus5,
    description:
      "ASUS ZenBook 14 is an ultra-portable premium laptop designed for professionals.",
    specs: {
      processor: "Intel Core Ultra 7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "14-inch OLED",
      battery: "14 Hours",
      warranty: "2 Years",
    },
  },

  // =====================================================
  // ACER - 5 PRODUCTS
  // =====================================================

  {
    id: 26,
    brand: "Acer",
    name: "Acer Aspire 5",
    price: 62999,
    rating: 4.6,
    discount: "15% OFF",
    category: "Student",
    image: acer1,
    description:
      "Acer Aspire 5 is an affordable laptop suitable for students and everyday productivity.",
    specs: {
      processor: "Intel Core i5",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch Full HD",
      battery: "10 Hours",
      warranty: "1 Year",
    },
  },

  {
    id: 27,
    brand: "Acer",
    name: "Acer Aspire 7",
    price: 74999,
    rating: 4.7,
    discount: "17% OFF",
    category: "Student",
    image: acer2,
    description:
      "Acer Aspire 7 offers strong everyday performance with dedicated graphics.",
    specs: {
      processor: "AMD Ryzen 7",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch Full HD",
      battery: "8 Hours",
      warranty: "1 Year",
    },
  },

  {
    id: 28,
    brand: "Acer",
    name: "Acer Nitro V",
    price: 82999,
    rating: 4.7,
    discount: "18% OFF",
    category: "Gaming",
    image: acer3,
    description:
      "Acer Nitro V is a gaming laptop designed for smooth gameplay and high performance.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch 144Hz",
      battery: "7 Hours",
      warranty: "1 Year",
    },
  },

  {
    id: 29,
    brand: "Acer",
    name: "Acer Predator Helios Neo",
    price: 109999,
    rating: 4.8,
    discount: "12% OFF",
    category: "Gaming",
    image: acer4,
    description:
      "Acer Predator Helios Neo delivers high-end gaming performance with advanced cooling.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "16-inch 165Hz",
      battery: "7 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 30,
    brand: "Acer",
    name: "Acer Swift Go 14",
    price: 84999,
    rating: 4.8,
    discount: "10% OFF",
    category: "Business",
    image: acer5,
    description:
      "Acer Swift Go 14 is a lightweight laptop with excellent battery life for professionals.",
    specs: {
      processor: "Intel Core Ultra 5",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "14-inch OLED",
      battery: "12 Hours",
      warranty: "1 Year",
    },
  },

  // =====================================================
  // MSI - 5 PRODUCTS
  // =====================================================

  {
    id: 31,
    brand: "MSI",
    name: "MSI Katana 15",
    price: 94999,
    rating: 4.7,
    discount: "20% OFF",
    category: "Gaming",
    image: msi1,
    description:
      "MSI Katana 15 combines powerful graphics and high refresh rate performance for gaming.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "1 TB SSD",
      display: "15.6-inch 144Hz",
      battery: "7 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 32,
    brand: "MSI",
    name: "MSI Cyborg 15",
    price: 89999,
    rating: 4.7,
    discount: "16% OFF",
    category: "Gaming",
    image: msi2,
    description:
      "MSI Cyborg 15 offers a lightweight gaming design with powerful graphics performance.",
    specs: {
      processor: "Intel Core i7",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch 144Hz",
      battery: "7 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 33,
    brand: "MSI",
    name: "MSI Thin 15",
    price: 77999,
    rating: 4.6,
    discount: "19% OFF",
    category: "Gaming",
    image: msi3,
    description:
      "MSI Thin 15 is a slim gaming laptop designed for students and gamers.",
    specs: {
      processor: "Intel Core i5",
      ram: "16 GB",
      storage: "512 GB SSD",
      display: "15.6-inch 144Hz",
      battery: "7 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 34,
    brand: "MSI",
    name: "MSI Raider GE68",
    price: 169999,
    rating: 4.9,
    discount: "8% OFF",
    category: "Gaming",
    image: msi4,
    description:
      "MSI Raider GE68 is a high-end gaming laptop designed for demanding gaming and creative workloads.",
    specs: {
      processor: "Intel Core i9",
      ram: "32 GB",
      storage: "2 TB SSD",
      display: "16-inch QHD+ 240Hz",
      battery: "6 Hours",
      warranty: "2 Years",
    },
  },

  {
    id: 35,
    brand: "MSI",
    name: "MSI Stealth 16",
    price: 149999,
    rating: 4.8,
    discount: "11% OFF",
    category: "Business",
    image: msi5,
    description:
      "MSI Stealth 16 combines gaming performance with a sleek design suitable for professionals.",
    specs: {
      processor: "Intel Core i9",
      ram: "32 GB",
      storage: "1 TB SSD",
      display: "16-inch QHD+",
      battery: "8 Hours",
      warranty: "2 Years",
    },
  },

];

export default products;