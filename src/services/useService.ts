import User, { IUser } from '../models/useModel';

// Get user
const getUser = async (): Promise<IUser[]> => {
    return await User.find();
};