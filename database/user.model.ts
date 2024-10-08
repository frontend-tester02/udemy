import { model, models, Schema } from 'mongoose'

const UserSchema = new Schema(
	{
		fullName: String,
		clerkId: String,
		email: String,
		picture: String,
		bio: String,
		phone: String,
		job: String,
		website: String,
		linkedin: String,
		github: String,
		youtube: String,
	},
	{ timestamps: true }
)

const User = models.User || model('User', UserSchema)
export default User
