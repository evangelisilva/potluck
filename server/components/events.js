const route = require("express").Router()
const util = require("../utils");

route.post("/", async (req, res) => {
    const {
        name,
        description,
        startTime,
        location,
        type,
        theme,
        phone,
        invitees,
        dish
    } = req.body;
    const sql = "insert into event(title, description, startTime, location, type, theme, phone) VALUES (?,?,?,?,?,?,?)";

    util.mysqlPool.query(sql, [name, description, startTime, location, type, theme, phone], (err, data) => {
        if (err) return res.json(err)

        const sql = "SELECT LAST_INSERT_ID() as id";
        util.mysqlPool.query(sql, [name, description, startTime, location, type, theme, phone], (err, data) => {
            if (err) return res.json(err)
            const id = data[0].id;
            const values = invitees.map(every => `('${every.join("', '")}')`).join(', ');
            const sql = `INSERT IGNORE INTO users (firstname, secondname, email) VALUES ${values}`;


            util.mysqlPool.query(sql, [], (err, data) => {
                if (err) return res.json(err)
                const deleteDishsql = `DELETE FROM dish where eventId = ?`;
                util.mysqlPool.query(deleteDishsql, [id], (err, data) => {
                    if (err) return res.json(err)

                    const values = dish.map(every => `('${every.join("', '")},${id}')`).join(', ');
                    const addDishsql = `INSERT INTO dish (name, quantity, eventId) VALUES ${values}`;
                    util.mysqlPool.query(addDishsql, [], (err, data) => {
                        if (err) return res.json(err)
                    });

                });

                for (let i = 0; i < invitees.length; i++) {

                    const sql = "SELECT id from users where firstname = ? and secondname = ? and email = ?";

                    util.mysqlPool.query(sql, [invitees[i][0], invitees[i][1], invitees[i][2]], (err, data) => {
                        if (err) return res.json(err)
                        console.log(invitees[i][2]);
                        var text = "Welcome " + invitees[i][0] + " " + invitees[i][1] + "\n" +
                            "\nDescription: " + description + "\nDate: " + startTime + "\nLocation: " + location + "\nTheme: " + theme
                        text += util.generateRSVPUrls(id, data[0].id);
                        util.sendMail(invitees[i][2], "Potluck Invitation: " + name, text)

                        const sql = "INSERT into eventguests (eventid, guestid, rsvp) values (?, ?, 0) ON DUPLICATE KEY UPDATE rsvp = 0";
                        util.mysqlPool.query(sql, [id, data[0].id], (err, data) => {
                            if (err) return res.json(err)
                        })
                    })
                }

                res.status(201);
                return res.json({
                    "message": "created the event"
                })
            })
        })
    })
})

route.get("/rsvp/:eventid/:guestid/:rsvp", async (req, res) => {
    const {
        eventid,
        guestid,
        rsvp
    } = req.params;
    const rsvp_table = (rsvp == "0") ? 0 : 1
    console.log(rsvp_table);
    const sql = "UPDATE eventguests set rsvp = ? where eventid = ? and guestid = ?";
    util.mysqlPool.query(sql, [rsvp_table, eventid, guestid], (err, data) => {
        if (err) return res.json(err)
        res.status(201)
        return res.json({"status": "Updated the RSVP"})
    })
})

route.get("/", async (req, res) => {
    const sql = "select * from event"
    util.mysqlPool.query(sql, [], async (err, data) => {
        if (err) return res.json(err)
        let result = []
        for (let i = 0; i < data.length; i++) {
            const sql = "select firstname, secondname, email, rsvp, allergans, dietary_restrictions from eventguests eg join users on users.id = eg.guestid where eventid = ?"
            const rows = await util.syncQuery(sql, [data[i].id]);

            data[i]["invitees"] = rows ? rows.slice() : [];

            const dishSql = "select name, quantity from dish where eventId = ?"
            const dishrows = await util.syncQuery(dishSql, [data[i].id]);
            
            data[i]["dish"] = dishrows ? dishrows.slice() : [];

            result.push(data[i])
        }
        return res.json(result);
    })
})

route.get("/:email", async (req, res) => {
    const email = req.params.email;

    const sql = "SELECT e.* FROM event e inner join eventguests eg on eg.eventid = e.id inner join users u on u.id = eg.guestid where u.email = ?";
    util.mysqlPool.query(sql, [email], async (err, data) => {
        if (err) return res.json(err)
        let result = []
        for (let i = 0; i < data.length; i++) {
            const sql = "select firstname, secondname, email, rsvp from eventguests eg join users on users.id = eg.guestid where eventid = ?"
            const rows = await util.syncQuery(sql, [data[i].id]);

            data[i]["invitees"] = rows ? rows.slice() : [];

            const dishSql = "select name, quantity from dish where eventId = ?"
            const dishrows = await util.syncQuery(dishSql, [data[i].id]);
            
            data[i]["dish"] = dishrows ? dishrows.slice() : [];

            result.push(data[i])
        }
        return res.json(result);
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

route.patch("/:id", async (req, res) => {
    const {
        name,
        description,
        startTime,
        location,
        type,
        phone,
        theme,
        state,
        invitees,
        dish
    } = req.body;

    const id = req.params.id;

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
    await util.syncQuery(sql, [...setVariables, id])

    const deleteDishsql = `DELETE FROM dish where eventId = ?`;
    await util.syncQuery(deleteDishsql, [id]);

    const deleteUsersSql = "delete users from users inner join eventguests g on users.id = g.guestId where g.eventId = ?";
    await util.syncQuery(deleteUsersSql, [id])

    const values = invitees.map(every => `('${every.join("', '")}')`).join(', ');
    const usersql = `INSERT IGNORE INTO users (firstname, secondname, email) VALUES ${values}`;

    await util.syncQuery(usersql, [])

    const dishvalues = dish.map(every => `('${every.join("', '")}', ${id})`).join(', ');
    const addDishsql = `INSERT INTO dish (name, quantity, eventId) VALUES ${dishvalues}`;
    await util.syncQuery(addDishsql, [])

    for (let i = 0; i < invitees.length; i++) {

        const sql = "SELECT id from users where firstname = ? and secondname = ? and email = ?";

        var rows = await util.syncQuery(sql, [invitees[i][0], invitees[i][1], invitees[i][2]])
        var text = "Hello " + invitees[i][0] + " " + invitees[i][1] + "\n" +
            "\nDescription: " + description + "\nDate: " + startTime + "\nLocation: " + location + "\nTheme: " + theme
        text += util.generateRSVPUrls(id, rows[0].id);
        util.sendMail(invitees[i][2], "Potluck Invitation: " + name, text)

        const egsql = "INSERT into eventguests (eventid, guestid, rsvp) values (?, ?, 0) ON DUPLICATE KEY UPDATE rsvp = 0";
        await util.syncQuery(egsql, [id, rows[0].id])
    }

    res.status(201);
    return res.json({
        "message": "updated the event"
    })
})

module.exports = route;