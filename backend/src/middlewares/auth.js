import { expressjwt as jwt } from 'express-jwt'

function authJwt(
    app,
    secretKey = "seCreTo",
    excludedPaths = [
      "/api/users/login",  
    ]
) {
  app.use(
    "/api",
    jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
      path: excludedPaths,
    })
  );
}

export default authJwt
