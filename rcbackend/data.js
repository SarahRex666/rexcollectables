import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Sarah",
      email: "sarahrexcodes@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
  ],
  products: [
    {
      name: "Wilderness Booster Box",
      slug: "wilderness-booster-box",
      category: "metazoo",
      image: "/images/wilderness.jpg",
      price: 90,
      countInStock: 10,
      description: "36 sealed booster packs!",
    },
    {
      name: "UFO Booster Box",
      slug: "ufo-booster-box",
      category: "metazoo",
      image: "/images/ufo.jpg",
      price: 90,
      countInStock: 10,
      description: "36 sealed booster packs!",
    },
    {
      name: "Cryptid Nation 2nd Edition Booster Box",
      slug: "cn-booster-box",
      category: "metazoo",
      image: "/images/cn2.jpg",
      price: 90,
      countInStock: 10,
      description: "36 sealed booster packs!",
    },
  ],
};

export default data;
