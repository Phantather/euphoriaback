import fs from 'node:fs'

export const getAllUsers = (req, res) => {

    fs.readFile('data/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: err.message
            });
        }
        try {
            let jsonData = JSON.parse(data);

            if (req.query.gender) {
                jsonData = jsonData.filter((item) => item.gender === req.query.gender)
            }

            if (req.query.name) {
                jsonData = jsonData.filter(item => item.name.startsWith(req.query.name))
            }

            if (req.query.limit && req.query.page ) {
                let limit = req.query.limit
                let page = req.query.page

                jsonData = jsonData.filter((item, idx) => idx >= page * limit - limit && idx < page * limit)
            } else if (req.query.limit) {

                jsonData = jsonData.slice(0, req.query.limit)
            }
            res.json(jsonData)
        } catch (err) {
            console.error('Ошибка при разборе JSON:', err);
        }
    });
}


export const getOneUser = (req, res) => {

    fs.readFile('data/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: err.message
            });
        }
        try {
            let jsonData = JSON.parse(data);
            let user = jsonData.find(item => item.id == req.params.id)
            if (!user) {
                throw new Error('Пользователь не найден')
            }
            res.json(user)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })

}

export const createOneUser =  (req, res) => {
    try {

        fs.readFile('data/users.json', "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: err.message
                });
            }
            try {
                let jsonData = JSON.parse(data);
                let newData = [...jsonData, req.body]


                fs.writeFile('data/users.json', JSON.stringify(newData), () => {
                    res.json(req.body)
                })

            } catch (err) {
                res.status(500).json({
                    message: err.message
                })
            }

        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}


export const updateOneUser = (req, res) => {

    try {
        fs.readFile('data/users.json', "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: err.message
                });
            }
            try {
                let jsonData = JSON.parse(data);
                let newData = jsonData.map((item) => {
                    if (item.id == req.params.id){
                        return {...item, ...req.body}
                    } else {
                        return item
                    }
                })

                fs.writeFile('data/users.json', JSON.stringify(newData), () => {
                    res.json(newData)
                })

            } catch (err) {
                res.status(500).json({
                    message: err.message
                })
            }

        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}