import { ApiError } from "../errors/ApiError";
import Users from "../models/Users";

export async function getUsers(req, res) {
    const users = await Users.findAll();
    res.json({
        data: users
    });
}
/*
export async function createUser(req, res, next) {
    try {
        const { id,
                firstname, 
                lastname, 
                email, 
                birthdate, 
                signindate } = req.body;
    
        const newUser = await Users.create(
            {   id,
                firstname, 
                lastname, 
                email, 
                birthdate, 
                signindate },

        {  fields: ['id', 'firstname', 'lastname', 'email', 'birthdate', 'signindate']});

        return res.status(200).json({
            message: 'User created successfully',
            data: newUser
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}
*/
export async function createUser(req, res) {
    const { id,
            firstname, 
            lastname, 
            email, 
            birthdate, 
            signindate } = req.body;

    const newUser = await Users.create(
        {   id,
            firstname, 
            lastname, 
            email, 
            birthdate, 
            signindate }, 
        {
            fields: ['id', 
                     'firstname', 
                     'lastname', 
                     'email', 
                     'birthdate', 
                     'signindate']
    });
        
    return res.status(200).json({
        message: 'User created successfully',
        data: newUser
    });
}

export async function getOneUser(req, res) {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (user) return res.status(200).json({ data: user });
    throw ApiError.notFound("User not found");
}

export async function deleteUser(req, res) {

    const { id } = req.params;
    const deletedUser = await Users.destroy({
        where: {
            id
        }
    });
    if (deletedUser){
        return res.status(200).json({
            message: 'User deleted successfully'
        });
    }
    throw ApiError.notFound("User not found");
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const { firstname, 
            lastname, 
            email, 
            birthdate, 
            signindate } = req.body;

    const userUpdated = await Users.update(
        {   firstname, 
            lastname, 
            email, 
            birthdate, 
            signindate },
        {   
            where: { id }
        });
    if (userUpdated){
        return res.status(200).json({
            message: 'User updated successfully'
        });
    }
    throw ApiError.notFound("User not found");
}