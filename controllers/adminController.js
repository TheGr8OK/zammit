const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require("../models/Admin");
const Roles = require('../Roles')
require('dotenv').config

// Display All Admins Data
const getAdmins = (req, res) => {
    Admin.find(function (err, admins) {
        if(err) throw err;
        res.json(admins);
    });
};

// Create New Admin
const createAdmin = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10)

    let admin = new Admin({
        Name: req.body.Name,
        Password: hashedPassword,
        Role: Roles.ADMIN
    });
    admin
        .save()
        .then((admin) => {
            res.send(admin);
        })
        .catch(function (err) {
            res.status(422).send("Admin add failed");
        });
};

// Show a particular Admin Detail by Id
const getAdmin = (req, res) => {
    Admin.findOne(req.params, function (err, admin) {
        if (!admin) {
            res.status(404).send("Admin not found");
        } else {
            res.json(admin);
        }
    });
};

// Update Admin Detail by Name
const updateAdmin = async (req, res) => {
	Admin.findOneAndUpdate(req.params, {
        "Name": req.body.Name,
        "Password": await bcrypt.hash(req.body.Password, 10)
    })
		.then(function (admin) {
            console.log(admin)
			res.json("Admin updated");
		})
		.catch(function (err) {
            console.log(err)
			res.status(422).send("Admin update failed.");
		});
};

// Delete Admin Detail by Name
const deleteAdmin = (req, res) => {
	Admin.findOne(req.params, function (err, admin) {
        console.log(admin)
		if (!admin) {
			res.status(404).send("Admin not found");
		} else {
			Admin.findOneAndDelete(req.params)
				.then(function () {
					res.status(200).json("Admin deleted");
				})
				.catch(function (err) {
					res.status(400).send("Admin delete failed.");
				});
		}
	});
};


//admin login
const loginAdmin= async (req, res) => {
        Admin.findOne({Name: req.body.Name}, async (err, admin) => {
            if(!admin){
                res.status(404).send("Admin not found");
            }
            else{
                try {
                    if (await bcrypt.compare(req.body.Password, admin.Password)) {
                        console.log(admin.Name)
                        const adminName = {Name: admin.Name, Role: admin.Role};
                        const accessToken = generateAccessToken(adminName)
                    
                        res.send({accessToken : accessToken})
                    }
                    else {
                        res.send("Failed")
                    }
                }
                catch(e) {
                    console.log(e)
                    res.status(500).send()
                }
            }
        })
    }


const testToken = (req, res)=>{
    Admin.find(function (err, admins) {
        console.log(admins)
        res.json(admins.filter(admin => admin.Name === req.admin.Name)) 
    });
    // console.log(admins)
}

function generateAccessToken(admin){
    return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
}

module.exports = {
    getAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    testToken
};