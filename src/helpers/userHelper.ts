import { User } from "../models/user"


class userHelper {


    async checkUserAlreadyExist(user_name: string) {

        try {
            let userExist = await User.findOne({ where: { 'user_name': user_name } });
            if (userExist) {
                return {
                    'success': true,
                    'message': 'User Already Exist',
                    'data': userExist
                }
            }
        } catch (e) {
            return {
                'success': false,
                'message': 'Internal Server Error',
                'data': {}

            };
        }
    }

    async addUser(body: any) {
        console.log("@userHelper addUser ");
        try {

            let createUser = await User.create(body);

            if (createUser) {
                return { 'success': true, 'message': 'User Created Successfully', 'data': createUser };
            }

        } catch (e) {
            return { 'success': false, 'message': 'Internal Server Error', 'data': {} };
        }
    }

    async getUserList() {
        console.log("@userHelper getUserList ");
        try {

            let userList = await User.findAndCountAll({ 'where': { 'status': 1 } });

            if (userList) {
                return { 'success': true, 'message': 'User Listed Successfully', 'data': userList };
            }

        } catch (e) {
            return { 'success': false, 'message': 'Internal Server Error', 'data': {} };
        }
    }

    async updateUser(body: any, id: any) {
        console.log("@userHelper updateUser ");
        try {

            let userList = await User.update({ ...body }, {where: { id: id }});
            console.log("userList",userList);
            

            if (userList) {
                return { 'success': true, 'message': 'User updated Successfully', 'data': userList };
            }

        } catch (e) {
            console.log("err",e);
            
            return { 'success': false, 'message': 'Internal Server Error', 'data': {} };
        }
    }

    async deleteUser(id: any) {
        console.log("@userHelper deleteUser ");
        try {

            let userList = await User.update({ "status" : 2 }, {where: { id: id }});            

            if (userList) {
                return { 'success': true, 'message': 'User removed Successfully', 'data': userList };
            }

        } catch (e) {
            console.log("err",e);
            
            return { 'success': false, 'message': 'Internal Server Error', 'data': {} };
        }
    }

}
export default new userHelper();