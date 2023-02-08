import { Schema } from 'mongoose';
import connection from '../libs/connection'

interface IUser {
	id: string;
	password: string;
	id_type: string;
}

const userSchema = new Schema<IUser>({
	id: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	id_type: { type: String }
});


export default connection.model('User', userSchema);