import 'dotenv/config'
import { app } from "./src/app";

const PORT = process.env.SERVER_PORT || 5000;
const HOST= process.env.HOST ||'localhost';
console.log(HOST);
app.listen(PORT,HOST, () => {
    console.log(`정상 실행 했습니다 : http://${HOST}:${PORT}`);
});
