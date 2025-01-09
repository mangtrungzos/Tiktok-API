import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    full_name: string;
    nickname?: string;
    avatar?: string;
    bio?: string;
    tick: boolean;
    followings_count: number;
    followers_count: number;
    likes_count: number;
    website_url?: string;
    facebook_url?: string;
    youtube_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    created_at: Date;
    updated_at: Date;
}

const UserSchema: Schema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        full_name: { type: String, required: true },
        nickname: { type: String },
        avatar: { type: String },
        bio: { type: String },
        tick: { type: Boolean, default: false },
        followings_count: { type: Number, default: 0 },
        followers_count: { type: Number, default: 0 },
        likes_count: { type: Number, default: 0 },
        website_url: { type: String },
        facebook_url: { type: String },
        youtube_url: { type: String },
        twitter_url: { type: String },
        instagram_url: { type: String },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.model<IUser>('User', UserSchema);
