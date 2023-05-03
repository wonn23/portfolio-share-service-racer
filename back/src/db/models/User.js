import { UserModel } from "../schemas/user";

class User {
    static async create({ newUser }) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    static async findByEmail({ email }) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    static async findById({ userid }) {
        const user = await UserModel.findOne({ _id: userid });
        return user;
    }

    static async findAll() {
        const users = await UserModel.find({});
        return users;
    }

    static async verifyLogin({email, password}){
        const user = await UserModel.findOne({ email:email});
        return user;
    }

    static async update({ userid, fieldToUpdate, newValue }) {
        const filter = { _id: userid };
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
