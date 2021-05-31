exports.seed = function (knex) {
  return (
    knex("hotdogs")
      // Deletes ALL existing entries
      // .del()
      .then(function () {
        // Inserts seed entries
        return knex("hotdogs").insert([
          {
            title: "Chicago",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Rostbratwurstbrot.png/800px-Rostbratwurstbrot.png",
            description:
              "An all-beef frankfurter on a poppy seed bun that originated in the city of Chicago, Illinois. The hot dog is topped with yellow mustard, chopped white onions, bright green sweet pickle relish, a dill pickle spear, tomato slices or wedges, pickled sport peppers, and a dash of celery salt (but no ketchup).",
            price: 2.5,
          },
          {
            title: "Texas Tommy",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/e/e0/Completo_italiano.jpg",
            description:
              "An American hot dog dish in which a hot dog is prepared with bacon and cheese. It was invented in Pottstown, Pennsylvania in the 1950s. an American hot dog dish in which a hot dog is prepared with bacon and cheese. It was invented in Pottstown, Pennsylvania in the 1950s. an American hot dog dish in which a hot dog is prepared with bacon and cheese. It was invented in Pottstown, Pennsylvania in the 1950s.",
            price: 2.3,
          },
          {
            title: "Coney Island",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Sonoran-hot-dog-01.jpg/1920px-Sonoran-hot-dog-01.jpg",
            description:
              "A hot dog sandwich in a bun topped with a savory meat sauce and sometimes other toppings. a hot dog sandwich in a bun topped with a savory meat sauce and sometimes other toppings. a hot dog sandwich in a bun topped with a savory meat sauce and sometimes other toppings. a hot dog sandwich in a bun topped with a savory meat sauce and sometimes other toppings.",
            price: 3.5,
          },
          {
            title: "White Hot",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/8/81/White_hot_dog_exterior_detail.JPG",
            description:
              "A variation on the hot dog found primarily in the Central New York and Western New York areas. It is composed of a combination of uncured and unsmoked pork, beef, and veal; the lack of smoking or curing allows the meat to retain a naturally white color. ",
            price: 4.1,
          },
          {
            title: "Ripper",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/5/5b/Jerseybreakfast.jpg",
            description:
              "The slang term for a type of hot dog. The name derives from a hot dog which is deep fried in oil and having some casings burst, or rip. Tthe slang term for a type of hot dog. The name derives from a hot dog which is deep fried in oil and having some casings burst, or rip.",
            price: 3.5,
          },
        ]);
      })
  );
};
