const warrants = require('./db.json')
let globalID = 4;

module.exports = {
    getAllwarrants: (req, res) => {
        res.status(200).send(warrants)
    },
    createWarrant: (req,res) => {
        const {name, bounty, imageURL} = req.body;

        let newWarrant = {
            name: name,
            warrant: +bounty,
            imageURL,
            id: globalID
        }

        warrants.push(newWarrant)
        globalID++;
        res.status(200).send(warrants)
    },
    deleteWarrant: (req, res) => {
        const {id} = req.params;
        let index = warrants.findIndex((elem) => elem.id === +id)
            warrants.splice(index,1)
            res.status(200).send(warrants)
    },
    updateWarrant: (req, res) => {
        const {type} = req.body;
        let index = warrants.findIndex((elem) => elem.id === +req.params.id)
        if (type === 'minus' && warrants[index].bounty > 10000) {
            warrants[index].bounty -= 10000;
            res.status(200).send(warrants)
        }else if (type === 'plus' && warrants[index].bounty < 600000){
            warrants[index].bounty += 10000;
            res.status(200).send(warrants)
        }else {
            res.status(400).send('Invalid')
        }
    }
}