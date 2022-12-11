const Moderator = require("../models/Moderator");
const Roles = require('../Roles')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config


// Display All Moderators Data
const getModerators = (req, res) => {
	Moderator.find(function (err, moderators) {
		res.json(moderators);
	});
};

// Create New Moderator
const createModerator = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10)

    let moderator = new Moderator({
        Name: req.body.Name,
        Password: hashedPassword,
        Role: Roles.MODERATOR
    });
    moderator
        .save()
        .then((moderator) => {
            res.send(moderator);
        })
        .catch(function (err) {
            res.status(422).send("Moderator add failed");
        });
};

// get moderator by name and password
const getModerator= async (req, res) => {
    Moderator.findOne({Name: req.body.Name}, async (err, moderator) => {
        console.log(moderator)
        if(!moderator){
            res.status(404).send("Moderator not found");
        }
        else{
            try {
                if (await bcrypt.compare(req.body.Password, moderator.Password)) {
                    res.send(moderator)
                }
                else {
                    res.send("Wrong moderator password")
                }
            }
            catch(e) {
                console.log(e)
                res.status(500).send()
            }
        }
    })
}

// Update Moderator Detail by Name
const updateModerator = async (req, res) => {
	Moderator.findOneAndUpdate(req.params, {
        "Name": req.body.Name,
        "Password": await bcrypt.hash(req.body.Password, 10)
    })
		.then(function (moderator) {
            console.log(moderator)
			res.json("Moderator updated");
		})
		.catch(function (err) {
            console.log(err)
			res.status(422).send("Moderator update failed.");
		});
};

// Delete Moderator Detail by Name
const deleteModerator = (req, res) => {
	Moderator.findOne(req.params, function (err, moderator) {
        console.log(moderator)
		if (!moderator) {
			res.status(404).send("Moderator not found");
		} else {
			Moderator.findOneAndDelete(req.params)
				.then(function () {
					res.status(200).json("Moderator deleted");
				})
				.catch(function (err) {
					res.status(400).send("Moderator delete failed.");
				});
		}
	});
};

//moderator login
const loginModerator= async (req, res) => {
    Moderator.findOne({Name: req.body.Name}, async (err, moderator) => {
        if(!moderator){
            res.send("Moderator not found");
        }
        else{
            try {
                if (await bcrypt.compare(req.body.Password, moderator.Password)) {
                    console.log(moderator.Name)
                    const moderatorName = {Name: moderator.Name, Role: moderator.Role};
                    const accessToken = generateAccessToken(moderatorName)
                
                    res.send({accessToken : accessToken})
                }
                else {
                    res.send("Password is incorrect")
                }
            }
            catch(e) {
                console.log(e)
                res.status(500).send()
            }
        }
    })
}

function generateAccessToken(moderator){
    return jwt.sign(moderator, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
}

module.exports = {
	getModerators,
	getModerator,
	createModerator,
	updateModerator,
	deleteModerator,
    loginModerator
};