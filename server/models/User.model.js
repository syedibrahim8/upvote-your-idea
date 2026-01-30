import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
      {
            name: {
                  type: String,
                  trim: true,
            },

            email: {
                  type: String,
                  lowercase: true,
                  trim: true,
                  unique: true,
                  sparse: true,
            },

            emailOtp: {
                  type: Number,
            },

            isVerified: {
                  type: Boolean,
                  default: false,
            },

            password: {
                  type: String,
                  select: false,
            },

            authProvider: {
                  type: String,
                  enum: ["local", "google"],
                  default: "local",
            },

            googleId: {
                  type: String,
                  unique: true,
                  sparse: true,
            },

            avatar: {
                  type: String,
            },
      },
      { timestamps: true },
);

export default mongoose.model("User", userSchema);
