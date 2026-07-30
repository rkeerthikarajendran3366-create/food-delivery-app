const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "30 mins",
    costForTwo: "₹300 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    menu: [
      {
        id: 101,
        name: "Margherita Pizza",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500",
      },
      {
        id: 102,
        name: "Farmhouse Pizza",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500",
      },
      {
        id: 103,
        name: "Veg Supreme Pizza",
        price: 349,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
      },
    ],
  },

  {
    id: 2,
    name: "Burger Hub",
    cuisine: "Fast Food",
    rating: 4.5,
    deliveryTime: "25 mins",
    costForTwo: "₹250 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    menu: [
      {
        id: 201,
        name: "Classic Burger",
        price: 149,
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
      },
      {
        id: 202,
        name: "Cheese Burger",
        price: 179,
        image:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
      },
      {
        id: 203,
        name: "Double Patty Burger",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500",
      },
    ],
  },

  {
    id: 3,
    name: "Biryani House",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: "35 mins",
    costForTwo: "₹400 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800",
    menu: [
      {
        id: 301,
        name: "Chicken Biryani",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1701579231349-d7459c40919d?w=500",
      },
      {
        id: 302,
        name: "Mutton Biryani",
        price: 349,
        image:
          "https://www.awesomecuisine.com/wp-content/uploads/2012/11/Chettinad-Mutton-Biryani-488x500.jpg",
      },
      {
        id: 303,
        name: "Veg Biryani",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=500",
      },
    ],
  },

  {
    id: 4,
    name: "South Spice",
    cuisine: "South Indian",
    rating: 4.6,
    deliveryTime: "20 mins",
    costForTwo: "₹250 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800",
    menu: [
      {
        id: 401,
        name: "Masala Dosa",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500",
      },
      {
        id: 402,
        name: "Idli",
        price: 70,
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
      },
      {
        id: 403,
        name: "Poori",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500",
      },
    ],
  },

  {
    id: 5,
    name: "Chinese Express",
    cuisine: "Chinese",
    rating: 4.4,
    deliveryTime: "30 mins",
    costForTwo: "₹350 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
    menu: [
      {
        id: 501,
        name: "Veg Noodles",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500",
      },
      {
        id: 502,
        name: "Fried Rice",
        price: 190,
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500",
      },
      {
        id: 503,
        name: "Manchurian",
        price: 220,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",
      },
    ],
  },

  {
    id: 6,
    name: "KFC",
    cuisine: "Fast Food",
    rating: 4.5,
    deliveryTime: "28 mins",
    costForTwo: "₹450 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=800",
    menu: [
      {
        id: 601,
        name: "Chicken Bucket",
        price: 499,
        image:
          "https://images.unsplash.com/photo-1562967916-eb82221dfb36?w=500",
      },
      {
        id: 602,
        name: "Zinger Burger",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
      },
      {
        id: 603,
        name: "French Fries",
        price: 129,
        image:
          "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500",
      },
    ],
  },
  {
    id: 7,
    name: "Domino's Pizza",
    cuisine: "Pizza",
    rating: 4.6,
    deliveryTime: "30 mins",
    costForTwo: "₹500 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    menu: [
      {
        id: 701,
        name: "Pepperoni Pizza",
        price: 399,
        image:
          "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500",
      },
      {
        id: 702,
        name: "Veg Loaded",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
      },
      {
        id: 703,
        name: "Garlic Bread",
        price: 149,
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500",
      },
    ],
  },

  {
    id: 8,
    name: "Subway",
    cuisine: "Sandwiches",
    rating: 4.4,
    deliveryTime: "20 mins",
    costForTwo: "₹350 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
    menu: [
      {
        id: 801,
        name: "Veg Delight",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=500",
      },
      {
        id: 802,
        name: "Paneer Tikka Sub",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500",
      },
      {
        id: 803,
        name: "Chicken Teriyaki",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500",
      },
    ],
  },

  {
    id: 9,
    name: "Barbeque Nation",
    cuisine: "BBQ",
    rating: 4.8,
    deliveryTime: "40 mins",
    costForTwo: "₹900 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800",
    menu: [
      {
        id: 901,
        name: "Chicken BBQ",
        price: 399,
        image:
          "https://images.unsplash.com/photo-1529692236671-f1dc01f55b6c?w=500",
      },
      {
        id: 902,
        name: "Grilled Fish",
        price: 499,
        image:
          "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500",
      },
      {
        id: 903,
        name: "Paneer BBQ",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
      },
    ],
  },

  {
    id: 10,
    name: "A2B",
    cuisine: "South Indian",
    rating: 4.5,
    deliveryTime: "22 mins",
    costForTwo: "₹300 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800",
    menu: [
      {
        id: 1001,
        name: "Mini Tiffin",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500",
      },
      {
        id: 1002,
        name: "Ghee Roast",
        price: 170,
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
      },
      {
        id: 1003,
        name: "Meals",
        price: 220,
        image:
          "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500",
      },
    ],
  },

  {
    id: 11,
    name: "Taco Bell",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "25 mins",
    costForTwo: "₹450 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800",
    menu: [
      {
        id: 1101,
        name: "Crunchy Taco",
        price: 149,
        image:
          "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=500",
      },
      {
        id: 1102,
        name: "Burrito",
        price: 229,
        image:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500",
      },
      {
        id: 1103,
        name: "Nachos",
        price: 179,
        image:
          "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500",
      },
    ],
  },

  {
    id: 12,
    name: "Starbucks",
    cuisine: "Cafe",
    rating: 4.7,
    deliveryTime: "18 mins",
    costForTwo: "₹600 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    menu: [
      {
        id: 1201,
        name: "Cappuccino",
        price: 250,
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
      },
      {
        id: 1202,
        name: "Cold Coffee",
        price: 220,
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
      },
      {
        id: 1203,
        name: "Blueberry Muffin",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500",
      },
    ],
  },
  {
    id: 13,
    name: "McDonald's",
    cuisine: "Fast Food",
    rating: 4.4,
    deliveryTime: "20 mins",
    costForTwo: "₹350 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
    menu: [
      {
        id: 1301,
        name: "McAloo Tikki",
        price: 79,
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
      },
      {
        id: 1302,
        name: "McChicken",
        price: 189,
        image:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",
      },
      {
        id: 1303,
        name: "McFlurry",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
      },
    ],
  },

  {
    id: 14,
    name: "Wow! Momo",
    cuisine: "Chinese",
    rating: 4.5,
    deliveryTime: "25 mins",
    costForTwo: "₹300 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    menu: [
      {
        id: 1401,
        name: "Steamed Momos",
        price: 149,
        image:
          "https://images.unsplash.com/photo-1628294896516-9f5d4db8f0cf?w=500",
      },
      {
        id: 1402,
        name: "Fried Momos",
        price: 169,
        image:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500",
      },
      {
        id: 1403,
        name: "Momo Platter",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=500",
      },
    ],
  },

  {
    id: 15,
    name: "The Belgian Waffle Co.",
    cuisine: "Desserts",
    rating: 4.8,
    deliveryTime: "20 mins",
    costForTwo: "₹350 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800",
    menu: [
      {
        id: 1501,
        name: "Chocolate Waffle",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500",
      },
      {
        id: 1502,
        name: "Nutella Waffle",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500",
      },
      {
        id: 1503,
        name: "Ice Cream Waffle",
        price: 279,
        image:
          "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500",
      },
    ],
  },

  {
    id: 16,
    name: "Fresh Juice Corner",
    cuisine: "Beverages",
    rating: 4.6,
    deliveryTime: "15 mins",
    costForTwo: "₹200 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800",
    menu: [
      {
        id: 1601,
        name: "Mango Juice",
        price: 99,
        image:
          "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
      },
      {
        id: 1602,
        name: "Watermelon Juice",
        price: 89,
        image:
          "https://images.unsplash.com/photo-1553530666-ba11a90bb918?w=500",
      },
      {
        id: 1603,
        name: "Mixed Fruit Juice",
        price: 129,
        image:
          "https://images.unsplash.com/photo-1546173159-315724a31696?w=500",
      },
    ],
  },

  {
    id: 17,
    name: "Cream Stone",
    cuisine: "Ice Cream",
    rating: 4.9,
    deliveryTime: "18 mins",
    costForTwo: "₹300 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    menu: [
      {
        id: 1701,
        name: "Oreo Sundae",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
      },
      {
        id: 1702,
        name: "Brownie Blast",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500",
      },
      {
        id: 1703,
        name: "Fruit Ice Cream",
        price: 189,
        image:
          "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=500",
      },
    ],
  },
  {
    id: 18,
    name: "Sushi World",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "35 mins",
    costForTwo: "₹800 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",

    menu: [
      {
        id: 1801,
        name: "Salmon Sushi",
        price: 399,
        image:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
      },

      {
        id: 1802,
        name: "California Roll",
        price: 349,
        image:
          "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500",
      },

      {
        id: 1803,
        name: "Tempura Roll",
        price: 449,
        image:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500",
      },
    ],
  },



  // ==========================
  // AMERICAN RESTAURANTS
  // ==========================


  {
    id: 19,
    name: "American Diner",
    cuisine: "American",
    rating: 4.6,
    deliveryTime: "25 mins",
    costForTwo: "₹600 for two",
    location: "Chennai",

    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800",


    menu: [

      {
        id: 1901,
        name: "Classic Cheeseburger",
        price: 299,

        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      },


      {
        id: 1902,
        name: "Chicken Wings",
        price: 349,

        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500",
      },


      {
        id: 1903,
        name: "French Fries",
        price: 149,

        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
      },


    ],

  },



  {
    id: 20,
    name: "New York Grill",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "30 mins",
    costForTwo: "₹700 for two",
    location: "Chennai",

    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",


    menu: [

      {
        id: 2001,
        name: "BBQ Chicken Burger",
        price: 399,

        image:
          "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500",
      },


      {
        id: 2002,
        name: "Steak Sandwich",
        price: 499,

        image:
          "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=500",
      },


      {
        id: 2003,
        name: "Loaded Nachos",
        price: 249,

        image:
          "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500",
      },

    ],

  },
  {
    id: 19,
    name: "Chennai Food Corner",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "25 mins",
    costForTwo: "₹350 for two",
    location: "Chennai",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800",

    menu: [
      {
        id: 1901,
        name: "Chicken Meals",
        price: 220,
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
      },

      {
        id: 1902,
        name: "Paneer Butter Masala",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
      },

      {
        id: 1903,
        name: "Butter Naan",
        price: 60,
        image:
          "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500",
      },
    ],
  },

];


export default restaurants;