let Product = [
    {
      number: 1,
      type: "Single Origin",
      name: "GREEN TEA SPECIAL",
      ings: ["Green Tea"],
      highlight: "Earthy • Bittersweet • Mild",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "80 C", "2-3 mins"], 
      desc: "Mild aroma tea with a hints of soft seaweed. Richbin fibers, flavonoids, and low in caffeine. Helps maintain cholesterol levels, and surpressing overeating desire",
    },
    {
      number: 2,
      type: "Tea Blend",
      name: "COMFY CACAO",
      ings: ["Black tea", ", cacao nibs", ", sugar beads", ", vanilla essence"],
      highlight: "Sweet • Bittersweet • Mild",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "4-5 mins"], 
      desc: "Inspired by one of the hot drinks that is always available at the Weihnachtsmarkt (Christmas Market) in Germany, hot chocolate",
    },
    {
      number: 3,
      type: "Tea Blend",
      name: "OHARA",
      ings: ["Black Tea", ", strawberry", ", orange peel", ", safflower", ", flavour extraxt"],
      highlight: "Berry • Citrus • Medium",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "3-5 mins"],
      desc: "A great accompaniment for book indulger. A mixture of Black tea with strawberry & orange peel",
    },
  ];
  
  export function getProduct() {
    return Product;
  }
  
  export function getProducts(number) {
    return Product.find((Product) => Product.number === number);
  }
  