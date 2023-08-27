import fs from 'node:fs'

export const getAllUsers = (req, res) => {

    fs.readFile('data/users.json', 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            try {
                let jsonData = JSON.parse(data)
                if (req.query.gender) {
                    jsonData = jsonData.filter(item => item.gender === req.query.gender)
                }

                if (req.query.name) {
                    jsonData = jsonData.filter(item => item.username.startsWith(req.query.name))
                }

                if (req.query.page) {
                    let limit = req.query.limit
                    let page = req.query.page
                    jsonData = jsonData.filter((item, idx) => idx >= page * page - limit && idx < req.query.page * req.query.limit)
                } else if (req.query.limit) {
                    jsonData = jsonData.slice(0, req.query.limit)
                }

                res.json(jsonData)
            } catch (error) {
                console.log(err.message)
            }
        })



}

export const getOneUser = (req, res) => {
    fs.readFile('data/users.json','utf-8', (err,data) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        try {
            let jsonData = JSON.parse(data)
            const user = jsonData.find(item => item.id == req.params.id)
            if (!user) {
                throw new Error('Can not find user')
            }
            res.json(user)
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })

}