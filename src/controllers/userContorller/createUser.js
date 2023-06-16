const userModel = require("../../models/userModel")
const bcrypt = require("bcrypt")

const { emptyBody, isNotProvided, validTrim, isValidWord, isValidEmail, isValidPhone, isValidPwd, isValidPincode, isValidImage } = require("../../utils/validators")

const createUser = async (req, res) => {
    try {
        let files = req.files

        let { fname, lname, email, phone, password, address } = req.body

        if (emptyBody(req.body)) return res.status(400).send({ status: false, message: "provide some data" })
        
        if (!fname) return res.status(400).send({ status: false, message: "First name is required" })
        fname = validTrim(fname)
        if (!isValidWord(fname)) return res.status(400).send({ status: false, message: "enter a valid fname" })


        if (!lname) return res.status(400).send({ status: false, message: "last name is required" })
        lname = validTrim(lname)
        if (!isValidWord(lname)) return res.status(400).send({ status: false, message: "enter a valid lname" })

        if (!email) return res.status(400).send({ status: false, message: "email is required" })
        email = validTrim(email)
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "enter a valid email" })


        let checkEmail = await userModel.findOne({ email: email })
        if (checkEmail)
            return res
                .status(400)
                .send({ status: false, message: "Email already exist" })



        if (!phone) return res.status(400).send({ status: false, message: "phone is required" })
        phone = validTrim(phone)
        if (!isValidPhone(phone)) return res.status(400).send({ status: false, message: "enter a valid phone" })

        let checkPhone = await userModel.findOne({ phone: phone })
        if (checkPhone)
            return res
                .status(400)
                .send({ status: false, message: "Phone number already exist" })

        if (!password) return res.status(400).send({ status: false, message: "password is required" })
        password = password.trim()
        if (!isValidPwd(password)) return res.status(400).send({ status: false, message: "enter a valid password" })
        password = await bcrypt.hash(password, 10)


        if (address){
            let { shipping, billing } = JSON.parse(address)

            if (!shipping) return res.status(400).send({ status: false, message: "shipping address is required" })
    
    
            if (!isNotProvided(shipping.street)) return res.status(400).send({ status: false, message: "shipping street address is required" })
            let streetS = validTrim(shipping.street)
            if (!streetS) return res.status(400).send({ status: false, message: "shipping street address is required" })
    
            if (!isNotProvided(shipping.city)) return res.status(400).send({ status: false, message: "shipping city address is required" })
            let cityS = validTrim(shipping.city)
            if (!cityS) return res.status(400).send({ status: false, message: "shipping city address is required" })
    
            if (!isNotProvided(shipping.pincode)) return res.status(400).send({ status: false, message: "shipping pincode is required" })
            let pincodeS = shipping.pincode.trim()
            if (!pincodeS) return res.status(400).send({ status: false, message: "shipping pincode is required" })
            if (!isValidPincode(pincodeS)) return res.status(400).send({ status: false, message: "shipping pincode is not valid" })
    
            //_____________________________________
    
            if (!billing) return res.status(400).send({ status: false, message: "billing address is required" })
    
            if (!isNotProvided(billing.street)) return res.status(400).send({ status: false, message: "billing street address is required" })
            let streetB = validTrim(billing.street)
            if (!streetB) return res.status(400).send({ status: false, message: "billing street address is required" })
            //_________________________
            if (!isNotProvided(billing.city)) return res.status(400).send({ status: false, message: "billing city address is required" })
            let cityB = validTrim(billing.city)
            if (!cityB) return res.status(400).send({ status: false, message: "billing city address is required" })
            //___________________________
            if (!isNotProvided(billing.pincode)) return res.status(400).send({ status: false, message: "billing pincode is required" })
            let pincodeB = validTrim(billing.pincode)
            if (!pincodeB) return res.status(400).send({ status: false, message: "billing pincode is required" })
            if (!isValidPincode(pincodeB)) return res.status(400).send({ status: false, message: "billing pincode is not valid" })
        }

         //shipping: { street: shahu park, city: kolhapur, pincode:416004, }, billing: { street: shahu park,city: kolhapur,pincode: 416004, }
        if (files.length > 0) {
            if (!isValidImage(files[0].originalname)) return res.status(400).send({ status: false, message: "provide a valid image" })
        }
        
        //    uploding is pending


        let user = {
            fname: fname,
            lname: lname,
            email: email,
            profileImage: profileImage,
            phone: phone,
            password: password,
            address: {
                shipping: {
                    street: streetS,
                    city: cityS,
                    pincode: pincodeS,
                },
                billing: {
                    street: streetB,
                    city: cityB,
                    pincode: pincodeB,
                }
            }
        }
        const createUser = await userModel.create(user)

        res.status(201).send({ status: true, message: "User created successfully", data: createUser })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = createUser