/** @format */

require("dotenv").config({ path: "./config/.env" }); // Load environment variables from an .env file into process.env

const jwt = require("jsonwebtoken"); // An implementation of JSON Web Tokens

const tokenRandom = process.env.TOKEN_RANDOM;
 
module.exports = (req, res, next) => {
/* try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, tokenRandom);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
 */

  try {
        const token = req.headers.authorization.split(' ')[1]; //extrait le token de l'authorization de la requete entrante
        const decodedToken = jwt.verify(token, tokenRandom); //décode le token, si invalide, une erreur sera générée
        const userId = decodedToken.userId; //extrait l'id utilisateur du token
        const role = decodedToken.role;
        if(userId) {
            req.currentUserId = userId; //save userId into request object
            req.admin = role == 1;
            next(); //utilisateur authentifié
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request !')
        });
    }
};