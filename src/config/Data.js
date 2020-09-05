
//   useEffect(() => {
//     for (let i = 0; i < 100; i++) {
//       var imgUrl = faker.image.imageUrl();
//       var title = faker.commerce.productName();
//       var description = faker.commerce.productDescription();
//       var price = faker.random.number(200);
//       var DbQte = faker.random.number(50);
//       var rate = faker.random.number(5);
//       var type = faker.random.arrayElement(["clothes", "coats", "jackets"]);
//       let product = {
//         imgUrl,
//         description,
//         price,
//         title,
//         DbQte,
//         rate,
//         type,
//       };
//       AddProduct(product);
//     }
//   }, []);