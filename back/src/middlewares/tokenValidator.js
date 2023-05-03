import jwt from "jsonwebtoken";

function tokenValidator(req, res, next) {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
    if (userToken === "null") {
        console.log("등록되지 않은 유저의 요청입니다.");
        res.status(400).json({message: "등록되지 않은 유저의 요청입니다."});
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const user_id = jwtDecoded.user_id;
        req.currentUserId = user_id;
        next();
    } catch (error) {
        res.status(400).send("정상적인 토큰이 아닙니다.");
        return;
    }
}

export { tokenValidator };
