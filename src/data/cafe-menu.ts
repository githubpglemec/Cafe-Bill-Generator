
export const cafeMenu = {
  drinks: [
    {
      id: 1,
      name: "Espresso",
      price: 3.50,
      description: "Rich and concentrated coffee served in a small cup",
      variants: [
        { name: "Single", price: 3.50 },
        { name: "Double", price: 4.50 }
      ]
    },
    {
      id: 2,
      name: "Cappuccino",
      price: 4.75,
      description: "Espresso with steamed milk and a thick layer of foam",
      variants: [
        { name: "Small", price: 4.75 },
        { name: "Medium", price: 5.25 },
        { name: "Large", price: 5.75 }
      ]
    },
    {
      id: 3,
      name: "Latte",
      price: 4.50,
      description: "Espresso with steamed milk and a light layer of foam",
      variants: [
        { name: "Small", price: 4.50 },
        { name: "Medium", price: 5.00 },
        { name: "Large", price: 5.50 }
      ]
    },
    {
      id: 4,
      name: "Americano",
      price: 3.75,
      description: "Espresso diluted with hot water",
      variants: [
        { name: "Small", price: 3.75 },
        { name: "Medium", price: 4.25 },
        { name: "Large", price: 4.75 }
      ]
    },
    {
      id: 5,
      name: "Matcha Latte",
      price: 5.50,
      description: "Japanese green tea powder with steamed milk",
      variants: [
        { name: "Small", price: 5.50 },
        { name: "Medium", price: 6.00 },
        { name: "Large", price: 6.50 }
      ]
    },
    {
      id: 6,
      name: "Fresh Orange Juice",
      price: 4.95,
      description: "Freshly squeezed orange juice",
      variants: [
        { name: "Regular", price: 4.95 },
        { name: "Large", price: 5.95 }
      ]
    }
  ],
  food: [
    {
      id: 7,
      name: "Avocado Toast",
      price: 8.95,
      description: "Sourdough bread with smashed avocado, cherry tomatoes and microgreens"
    },
    {
      id: 8,
      name: "Croissant Sandwich",
      price: 9.95,
      description: "Butter croissant with scrambled eggs, cheese and your choice of protein",
      variants: [
        { name: "Bacon", price: 9.95 },
        { name: "Ham", price: 9.95 },
        { name: "Vegetarian", price: 8.95 }
      ]
    },
    {
      id: 9,
      name: "Acai Bowl",
      price: 10.95,
      description: "Acai blend topped with granola, fresh fruits, and honey"
    },
    {
      id: 10,
      name: "Chicken Caesar Salad",
      price: 12.95,
      description: "Romaine lettuce, grilled chicken, croutons, and Caesar dressing"
    }
  ],
  desserts: [
    {
      id: 11,
      name: "Chocolate Croissant",
      price: 4.25,
      description: "Butter croissant filled with chocolate"
    },
    {
      id: 12,
      name: "Tiramisu",
      price: 6.95,
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream"
    },
    {
      id: 13,
      name: "Cheesecake",
      price: 6.50,
      description: "Creamy cheesecake with a graham cracker crust",
      variants: [
        { name: "Plain", price: 6.50 },
        { name: "Strawberry", price: 7.00 },
        { name: "Chocolate", price: 7.00 }
      ]
    },
    {
      id: 14,
      name: "Macaron Set",
      price: 8.95,
      description: "Set of 4 assorted French macarons"
    }
  ],
  alcohol: [
    {
      id: 15,
      name: "Mimosa",
      price: 8.95,
      description: "Champagne and fresh orange juice"
    },
    {
      id: 16,
      name: "White Wine",
      price: 9.95,
      description: "Glass of house white wine",
      variants: [
        { name: "Chardonnay", price: 9.95 },
        { name: "Sauvignon Blanc", price: 10.95 },
        { name: "Pinot Grigio", price: 9.95 }
      ]
    },
    {
      id: 17,
      name: "Red Wine",
      price: 9.95,
      description: "Glass of house red wine",
      variants: [
        { name: "Cabernet Sauvignon", price: 10.95 },
        { name: "Merlot", price: 9.95 },
        { name: "Pinot Noir", price: 11.95 }
      ]
    },
    {
      id: 18,
      name: "Craft Beer",
      price: 7.95,
      description: "Bottle of local craft beer",
      variants: [
        { name: "IPA", price: 7.95 },
        { name: "Lager", price: 7.95 },
        { name: "Stout", price: 8.95 }
      ]
    }
  ]
};
