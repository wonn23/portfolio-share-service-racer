
export function errorHandler(error, req, res, next){
    console.log("\x1b[33m%s\x1b[0m", error);
    if(error.status === 400){
        res.status(400).json({message:"잘못된 요청입니다."});
    }
    else if(error.status === 401){
        res.status(401).json({message:"인증되지 않은 요청입니다."});
    }
    else if(error.status === 404){
        res.status(404).json({message:"페이지를 찾을수 없습니다."});
    }
    else if(error.status === 429){
        res.status(429).json({message:"너무 많은 요청을 보냈습니다."});
    }
    else if(error.status === 500){
        res.status(500).json({message:"요청을 처리할 수 없습니다."});
    }
    else if(error.status === 502){
        res.status(502).json({message:"잘못된 게이트웨이 요청입니다."});
    }
    else if(error.status === 503){
        res.status(502).json({message:"서버가 준비되지 않았습니다."});

    }
    else if(error.status === 504){
        res.status(502).json({message:"서버 응답시간이 지났습니다."});
    }
    else{
        res.status(500).json({message:"에러가 발생했습니다."});
    }
}