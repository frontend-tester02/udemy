import { model, models, Schema } from 'mongoose'

const UserProgressSchema = new Schema({
	userId: { type: String },
	lessonId: { type: String },
	isCompleted: { type: Boolean, default: false },
})

const UserProgress =
	models.UserProgress || model('UserProgress', UserProgressSchema)
export default UserProgress
