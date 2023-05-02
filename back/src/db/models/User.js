import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    return await UserModel.create(newUser);
  }

  static async findByEmail({ email }) {
    return await UserModel.findOne({ email });
  }

  static async findById({ user_id }) {
    return await UserModel.findOne({ id: user_id });
  }

  static async findAll() {
    return await UserModel.find({});
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };
