import { ApiError } from "../errors/ApiError";
import Users, { validateUser } from "../models/Users";

export async function getUsers(req, res) {
    const users = await Users.findAll();
    res.json({
        message: "All user information retrieved",
        data: users
    });
}

export async function createUser(req, res) {
    
    const { error, value} = validateUser(req.body);
    if (error) throw ApiError.badRequest(error.message);
    
    const userInDatabase = await Users.findByPk(req.body.id);
    if (userInDatabase) throw ApiError.badRequest("ID already in use");

    const newUser = await Users.create(
        value, 
        {
            fields: ['id', 
                     'firstname', 
                     'lastname', 
                     'email', 
                     'birthdate', 
                     'signindate']
    });
        
    return res.status(201).json({
        message: 'User created successfully',
        data: newUser
    });
}

export async function getOneUser(req, res) {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (user) return res.status(200).json({
        message: "User information retrieved",
        data: user,
    });
    throw ApiError.notFound("User not found");
}

export async function userExists(req, res) {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (user) return res.status(200).json({ response: true });
    return res.status(200).json({ response: false });
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
    const { error } = validateUser({
            id,
            firstname, 
            lastname, 
            email, 
            birthdate, 
            signindate
    });
    if (error) throw ApiError.badRequest(error.message);
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
