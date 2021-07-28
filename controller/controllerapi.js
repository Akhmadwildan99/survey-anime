const {Anime, Biodata} = require('../models');

module.exports = {
    new: (req, res) => {
        Biodata.findAll(
            {
                include: Anime
            }
        )
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err)
        })
    },
    card: (req, res) => {
        Biodata.findOne(
            {
                include: Anime,
                where: {
                    id: req.params.id
                }
            }
        ).then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err)
        })
    },
    create: async (req, res) => {
        const biodata = await Biodata.findAll();
        if(biodata.length === 0) {
            Biodata.create({
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                isTrue: true
            }).then((Biodata)=>{
                Anime.create({
                    device: req.body.device,
                    favorite: req.body.favorite,
                    karakter: req.body.karakter,
                    comment: req.body.comment,
                    animeId: Biodata.get('id')
                }).then((result)=>{
                    res.status(200).json(result);
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err);
            })
        } else {
            Biodata.create({
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                isTrue: false
            }).then((Biodata)=>{
                Anime.create({
                    device: req.body.device,
                    favorite: req.body.favorite,
                    karakter: req.body.karakter,
                    comment: req.body.comment,
                    animeId: Biodata.get('id')
                }).then((result)=>{
                    res.status(200).json(result);
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }
}