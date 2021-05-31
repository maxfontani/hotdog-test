exports.handleGetData = (req, res, knex) => {
  knex
    .select()
    .from("hotdogs")
    .then((data) => {
      data.length
        ? res.status(200).json(data)
        : res.status(404).json("DB is empty!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("ERR getting DB data");
    });
};

exports.handleAddHotdog = async (req, res, knex) => {
  try {
    const { title, image, price, description } = req.body;

    if (!req.body || !title || !image || !description) {
      res.status(400).json("ERR incorrect form submission");
    } else {
      knex("hotdogs")
        .returning(["id", "created_at", "updated_at"])
        .insert({
          title: title,
          image: image,
          description: description,
          price: price,
        })
        .then((hotdog) =>
          hotdog
            ? res.status(200).json(hotdog)
            : res.status(404).json("Failed inserting data")
        )
        .catch((err) => {
          console.log(err);
          res.status(400).json("ERR inserting DB data");
        });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.handleDeleteHotdog = async (req, res, knex) => {
  try {
    const { id } = req.body;

    if (!req.body || !id) {
      res.status(400).json("ERR incorrect requrest format");
    } else {
      knex("hotdogs")
        .returning("id")
        .where("id", id)
        .del()
        .then((id) =>
          id
            ? res.status(200).json(id)
            : res.status(404).json("Failed deleting data")
        )
        .catch((err) => {
          console.log(err);
          res.status(400).json("ERR deleting DB data");
        });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.handleEditHotdog = async (req, res, knex) => {
  try {
    const { id } = req.params;

    if (Object.keys(req.body).length) {
      knex("hotdogs")
        .returning(["id", ...Object.keys(req.body)])
        .where({ id })
        .update({ ...req.body })
        .then((res_db) => {
          if (res_db) {
            res_db.id = id;
            res.status(200).json(res_db);
          } else {
            res.status(400).json("Unable to update DB");
          }
        })
        .catch((err) => {
          console.log("ERROR:", err);
          res.status(400).json("error updating DB");
        });
    } else {
      res.status(400).json("Invalid update info");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
