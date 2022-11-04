import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';

export const getUser = async (parent, { input }, context) => {
    const auth = context.auth;
    const dbConnect = context.dbConnect;

    const token = input.token;

    if (token === null || token === undefined)
        return {
            data: null,
            status: {
                status: 401,
                message: 'User unauthenticated.'
            }
        };

    return await new Promise((resolve, reject) =>
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    )
        .then(async (data) => {
            let newDate = await dbConnect.collection('user').findOne({ _id: ObjectID(data._id) });

            return {
                data: {
                    ...newDate,
                    createdAt: newDate.createdAt,
                    updateAt: newDate.updateAt
                },
                status: {
                    status: 200,
                    message: ''
                }
            };
        })
        .catch((er) => {
            console.log(er);
            return {
                data: null,
                status: {
                    status: 401,
                    message: 'User unauthenticated.'
                }
            };
        });
};
