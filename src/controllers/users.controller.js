const { ApiError } = require("../errors/ApiError");

class UsersController {

  constructor(aDatabase) {
    this.database = aDatabase;
    this.validateUser = aDatabase.getUserValidator();
  }

  async getUsers(req, res) {
    //console.log(this.database)
    const users = await this.database.getAllUsers();
    res.json({
      message: "All user information retrieved",
      data: users
    });
  }

  async createUser(req, res) {
    const { error, value } = this.validateUser(req.body);
    if (error) throw ApiError.badRequest(error.message);

    const userInDatabase = await this.database.getUser(req.body.id);
    if (userInDatabase) throw ApiError.badRequest("ID already in use");

    const newUser = await this.database.createUser(req.body);

    return res.status(201).json({
      message: 'User created successfully',
      data: newUser
    });
  }

  async getOneUser(req, res) {
    const { id } = req.params;
    const user = await this.database.getUser(id);

    if (user) return res.status(200).json({
      message: "User information retrieved",
      data: user,
    });
    throw ApiError.notFound("User not found");
  }

  async userExists(req, res) {
    const { id } = req.params;
    const user = await this.database.getUser(id)
    if (user) return res.status(200).json({ response: true });
    return res.status(200).json({ response: false });
  }

  async deleteUser(req, res) {

    const { id } = req.params;
    const userToDelete = await this.database.getUser(id)
    if (!userToDelete) throw ApiError.notFound("User not found")
    const userDeleted = await this.database.deleteUser(id)
    if (!userDeleted) throw ApiError.serverError("Server error")
    return res.status(200).json({
      message: 'User deleted successfully',
      data: userToDelete
    });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const newData = req.body;
    const finalUser = newData
    finalUser['id'] = id;

    const { error } = this.validateUser(finalUser);
    if (error) throw ApiError.badRequest(error.message);

    const userToUpdate = await this.database.getUser(id);
    if (!userToUpdate) throw ApiError.notFound("User not found")
    const userUpdated = await this.database.updateUser(id, newData)
    if (!userUpdated) throw ApiError.serverError("Server error")
    //Me evito un query a la base haciendo esto
    for (const [key, value] of Object.entries(userToUpdate)){
      if (!finalUser[key]){
        finalUser[key] = value;
      }
    }
    
    return res.status(200).json({
      message: 'User updated successfully',
      data: finalUser
    });
  }
}


module.exports = { UsersController }
