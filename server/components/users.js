const route = require("express").Router()
const util = require("../utils");

route.patch("/:email/userAttributes", async (req, res) => {
    const {
        userAllergans,
        userDiet
    } = req.body;

    const email = req.params.email;

    let setClause = "set ";
    let setVariables = [];
    if (userAllergans) {
        setClause += " allergans = ?, "
        setVariables.push(userAllergans)
    }
    if (userDiet) {
        setClause += " dietary_restrictions = ?, "
        setVariables.push(userDiet)
    }

    if (setVariables.length == 0) {
        res.status(400);
        return res.json({
            "error": "no parameters to update"
        });
    }

    if (setClause.endsWith(", ")) {
        setClause = setClause.slice(0, -2);
    }
    var sql = "update users " + setClause + " where email = ?";
    await util.syncQuery(sql, [...setVariables, email])

    res.status(201);
    return res.json({
        "message": "updated the event"
    })
})

module.exports = route;