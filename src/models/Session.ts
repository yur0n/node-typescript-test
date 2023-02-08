import { Schema, Types } from 'mongoose';
import connection from '../libs/connection';

interface ISession {
	token: string;
	lastVisit: Date;
	user: Types.ObjectId;
}

const schema = new Schema<ISession>({
	token: { type: String, unique: true, required: true, },
	user: { type: Schema.Types.ObjectId, required: true, ref: 'User', },
	lastVisit: { type: Date, expires: '10m', default: Date.now },
});

export default connection.model('Session', schema);