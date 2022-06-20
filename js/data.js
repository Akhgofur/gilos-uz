let products = localStorage.getItem("products") ||  [
  {
    id: 123,
    title: "Redmi Note 10 Pro",
    img: "https://picsum.photos/300/200",
    price: 4300000,
    model: "Xiaomi",
    addedDate: new Date("2021-11-12").toISOString(),
    benefits: ["8gb", "128gb", "Waterproof"]
  },
  {
    id: 124,
    title: "Samgung Note 20 Ultra",
    img: "https://picsum.photos/300/200",
    price: 8300000,
    model: "Samsung",
    addedDate: new Date("2021-10-12").toISOString(),
    benefits: ["32gb", "1tb"]
  },
  {
    id: 125,
    title: "Iphone 13 pro max",
    img: "https://picsum.photos/300/200",
    price: 12300000,
    model: "Samsung",
    addedDate: new Date("2021-10-12").toISOString(),
    benefits: ["32gb", "1tb"]
  },
  {
    id: 126,
    title: "Samgung S10",
    img: "https://picsum.photos/300/200",
    price: 7300000,
    model: "Samsung",
    addedDate: new Date("2021-10-12").toISOString(),
    benefits: ["32gb", "1tb"]
  },
  {
    id: 127,
    title: "Iphone x",
    img: "https://picsum.photos/300/200",
    price: 9300000,
    model: "Apple",
    addedDate: new Date("2021-10-12").toISOString(),
    benefits: ["32gb", "1tb"]
  },
  {
    id: 128,
    title: "Redmi Note 8",
    img: "https://picsum.photos/300/200",
    price: 3300000,
    model: "Xiaomi",
    addedDate: new Date("2021-11-12").toISOString(),
    benefits: ["4gb", "64gb", "Waterproof"]
  }
]

const manufacturers = [
  {
    id: 1,
    name: "Xiaomi"
  },
  {
    id: 2,
    name: "Apple"
  },
  {
    id: 3,
    name: "Samsung"
  }
];