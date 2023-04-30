import is from "@sindresorhus/is";
import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator";
import { userAuthService } from "../services/userService";
import {validationParams} from "../utils/parameterValidator";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
    try {
        const params = Object.values(req.body);
        if(!validationParams(params))
        {
            console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
            res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
            return;
        }

        const {name,email,password} = req.body;
        const newUser = await userAuthService.addUser({
            name,
            email,
            password,
        });
        if (newUser.errorMessage) {
            res.status(500).json({message:"현재 사용중인 이메일입니다."});
        }
        res.status(201).json({id:newUser._id,email:newUser.email,name:newUser.name});
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
    try {
        const params = Object.values(req.body);
        if(!validationParams(params))
        {
            console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
            res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
            return;
        }
        const {email,password} = req.body;

        const user = await userAuthService.getUser({ email, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});
/**
 * @description
 *      /user/list 로 Post 요청시
 *      저장된 모든 유저의 정보를 반환합니다.
 *
 *      @return
 *          user {id:"id", email:"email", name:"name"}
 *          userslist [ {user_1},{user_2},...{user_n} ]
 */
userAuthRouter.post("/user/list",tokenValidator,
    tokenValidator,
    async function (req, res, next) {
        try {
            const userId = req.currentUserId;
            /**
             * Todo:
             *      요청한 유저의 인증정보 로그
             */

            const users = await userAuthService.getUsers();
            const res_arr = [];
            for(let i=0;i<users.length;i++){
                console.log(`${users[i]._id} ${users[i].email} ${users[i].name} `);
                res_arr.push({id:users[i]._id,email:users[i].email,name:users[i].name});
            }
            res.status(200).json(res_arr);
        } catch (error) {
            next(error);
        }
    });

/**
 * @description
 *      user의 토큰으로 해당되는 유저를 찾아
 *      해당 유저의 정보를 반환합니다.
 *      @return
 *          {id:"id",email:"email",name:"name"}
 */
userAuthRouter.post(
    "/user/current",
    tokenValidator,
    async function (req, res, next) {
        try {
            const user_id = req.currentUserId;
            if(!user_id){
                res.status(404).json({message:"유저를 찾을 수 없습니다."})
            }
            const current = await userAuthService.getUserInfo({
                user_id,
            });

            if (current.errorMessage) {
                throw new Error(current.errorMessage);
            }

            res.status(200).send({id:current._id,email:current.email,name:current.name});
        } catch (error) {
            next(error);
        }
    }
);

userAuthRouter.get(
    "/user/current",
    tokenValidator,
    async function (req, res, next) {
        try {
            const user_id = req.currentUserId;
            if(!user_id){
                res.status(404).json({message:"유저를 찾을 수 없습니다."})
            }
            const current = await userAuthService.getUserInfo({
                user_id,
            });

            if (current.errorMessage) {
                throw new Error(current.errorMessage);
            }
            console.log(`id : ${current._id} name: ${current.name}`);
            res.status(200).send(current);
        } catch (error) {
            next(error);
        }
    }
);
/**
 * @description
 *      user의 세션정보를 조회하여
 *      해당 user의 정보를 update합니다.
 *
 *      return {id:"id",description:"description"}
 */
userAuthRouter.post(
    "/user/update",
    tokenValidator,
    async function (req, res, next) {
        try {
            const params = Object.values(req.body);
            let userId ;
            if(!validationParams(params))
            {
                console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
                res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
                return;
            }
            const {description} = req.body;

            const user_id = req.currentUserId;
            if(!user_id){
                res.status(404).json({message:"유저를 찾을 수 없습니다."})
            }
            await userAuthService.getUserInfo({
                user_id,
            }).then((user)=>{
                if (user.errorMessage) {
                    throw new Error(user.errorMessage);
                }
                userId = user._id;
            })

            const toUpdate = { description:description };
            // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
            const updatedUser = await userAuthService.setUser({ userId, toUpdate });

            res.status(200).send({id:updatedUser._id,email:updatedUser.email,name:updatedUser.name});
        } catch (error) {
            next(error);
        }
    }
);


userAuthRouter.get(
    "/users/:id",
    tokenValidator,
    async function (req, res, next) {
        try {
            const params = Object.values(req.params);
            let userId ;
            if(!validationParams(params))
            {
                console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
                res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
                return;
            }

            const user_id = req.params.id;
            await userAuthService.getUserInfo({ user_id })
                .then((user) =>{
                    if (user.errorMessage) {
                        res.status(404).json({message:"유저를 찾을 수 없습니다."});
                    }
                    console.log(`${user.name} ${user.description} ${user.email}`);
                    res.status(200).send(user);
                } )
        } catch (error) {
            next(error);
        }
    }
);
userAuthRouter.put(
    "/user/:id",
    tokenValidator,
    async function (req, res, next) {
        try {
            const params = Object.values(req.params);
            let userId ;
            if(!validationParams(params))
            {
                console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
                res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
                return;
            }
            // URI로부터 사용자 id를 추출함.
            const user_id = req.params.id;
            // body data 로부터 업데이트할 사용자 정보를 추출함.
            const name = req.body.name ?? null;
            const email = req.body.email ?? null;
            const password = req.body.password ?? null;
            const description = req.body.description ?? null;

            const toUpdate = { name, email, password, description };

            // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
            const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

            if (updatedUser.errorMessage) {
                throw new Error(updatedUser.errorMessage);
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);

export { userAuthRouter };
