import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import { ObjectID } from 'mongodb';

export const loginUser = async (parent, { input }, context) => {
    // const auth = context.auth;
    const dbConnect = context.dbConnect;

    const { email = '', password = '' } = input;

    if (email === null || password === null) {
        return {
            status: {
                status: 401,
                message: 'Usuário sem permissão'
            }
        };
    }

    const user = await dbConnect.collection('user').findOne({ email });

    try {
        const match = await bcrypt.compare(password, user.password);
        const accessToken = jwt.sign(JSON.stringify(user), process.env.SECRET);

        if (match === true) {
            return {
                data: { ...user },
                status: {
                    status: 200,
                    message: '',
                    accessToken: accessToken
                }
            };
        } else {
            return {
                data: null,
                status: {
                    status: 401,
                    message: 'User without permission',
                    accessToken: null
                }
            };
        }
    } catch (error) {
        return {
            data: null,
            status: {
                status: 401,
                message: 'User without permission',
                accessToken: null
            }
        };
    }
};

export const createUser = async (parent, { input }, context) => {
    // const auth = context.auth;
    const dbConnect = context.dbConnect;

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const exist = await dbConnect.collection('user').findOne({ email: input.email });

    if (exist === null) {
        return dbConnect
            .collection('user')
            .insertOne({
                name: input.name,
                surname: input.surname,
                email: input.email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then((result) => {
                return {
                    data: null,
                    status: {
                        status: 200,
                        message: 'User created.'
                    }
                };
            })
            .catch((err) => {
                return {
                    data: null,
                    status: {
                        status: 403,
                        message: 'Something was wrong in API.'
                    }
                };
            });
    } else {
        return {
            data: null,
            status: {
                status: 403,
                message: 'Email used, please create another account with another email.'
            }
        };
    }
};
