import jwt from 'jsonwebtoken'
export default function (role) {
	return function (req, res, next) {
		if(req.method === 'OPTIONS') {
			next();
		}
		try{
			const token = req.headers.authorization.split(' ')[1]; //Поделить запись в header: 'Bearer *token*', взять только сам токен
			if(!token){
				return res.status(401).json({message: "User not authorized"});
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY);
			if(decoded.role !== role){
				return res.status(403).json({message: "Access denied"})
			}
			req.user = decoded;
			next();
		} catch(e) {
			res.status(401).json({message: "User not authorized"});
		}
	}
}



