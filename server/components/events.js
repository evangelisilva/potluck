const route = require("express").Router()
const util = require("../utils");
const fs = require("fs")

route.post("/", util.fileUpload.array("images", 4), async (req, res) => {
    const {
        name,
        description,
        startTime,
        location,
        type,
        theme,
        phone
    } = req.body;
    if (req.files) {
        let paths = req.files.map(values => {
            return {
                'path': values.path,
                'fileName': values.filename,
                'originalName': values.originalname
            }
        })
    }
    const sql = "insert into event(title, description, startTime, location, type, theme, phone) VALUES (?,?,?,?,?,?,?)";

    util.mysqlPool.query(sql, [name, description, startTime, location, type, theme, phone], (err, data) => {
        console.log(err);
        if (err) return res.json(err)
        res.status(201);
        return res.json({
            "message": "created the event"
        })
    })
})

route.get("/", async (req, res) => {
    const sql = "select * from event"
    util.mysqlPool.query(sql, [], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


route.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const sql = "delete from event where id = ?";

    util.mysqlPool.query(sql, [id], (err, data) => {
        if (err) return res.json(err)
        res.status(200);
        return res.json({
            "message": "deleted the event"
        })
    })
})

route.patch("/:id", util.fileUpload.array("images", 4), async (req, res) => {
    const {
        name,
        description,
        startTime,
        location,
        type,
        phone,
        theme,
        state
    } = req.body;

    const id = req.params.id;

    if (req.files) {
        let paths = req.files.map(values => {
            return {
                'path': values.path,
                'fileName': values.filename,
                'originalName': values.originalname
            }
        })
    }
    let setClause = "set ";
    let setVariables = [];
    if (name) {
        setClause += " title = ?, "
        setVariables.push(name)
    }
    if (description) {
        setClause += " description = ?, "
        setVariables.push(description)
    }
    if (startTime) {
        setClause += " startTime = ?, "
        setVariables.push(startTime)
    }
    if (location) {
        setClause += " location = ?, "
        setVariables.push(location)
    }
    if (type) {
        setClause += " type = ?, "
        setVariables.push(type)
    }
    if (theme) {
        setClause += " theme = ?, "
        setVariables.push(theme)
    }
    if (state) {
        setClause += " state = ?, "
        setVariables.push(state)
    }
    if (phone) {
        setClause += " phone = ?, "
        setVariables.push(phone)
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
    var sql = "update event " + setClause + " where id = ?";
    console.log([...setVariables, id]);
    util.mysqlPool.query(sql, [...setVariables, id], (err, data) => {
        if (err) return res.json(err)
        res.status(201);
        return res.json({
            "message": "updated the event"
        })
    })
})

module.exports = route;