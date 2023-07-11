import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


const authenticationUser = ( req: Request, res: Response, next: NextFunction ) => {
    
    // 1. Procesando la cadena de autorizacion para extraer el token
    const bearerToken = req.headers.authorization || '';    // bearerToken = Bearer 99999999999
    const arrBearerToken = bearerToken.split( ' ' );        // arrBearerToken [ 'Bearer', '99999999999' ]
    const token = arrBearerToken.pop();                     // token - 99999999999, arrBearerToken [ 'Bearer' ]

    // 2. Verificar la autenticidad del token
    const payload = verify( `${ token }`, `${ process.env.JWT_SECRET_KEY }` );

    // 3. Verificar si NO hay carga util
    if( ! payload ) {
        return res.json({
            msg: 'INVALID_TOKEN'
        });
    }

    // 4. Extraer la carga util
    // {
    //     userId:  userFound._id,
    //     rol: userFound.rol,
    //     name: userFound.nombre
    // }
    const { userId, rol, name } = payload as { userId: string, rol: string, name: string };
    console.log( userId, rol, name );

    

    next();
}


export {
    authenticationUser
};
