import sendVerificationEmail from "@/helper/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, username, password } = await request.json();
        console.log("Sign up request received:", { email, username, password });

        // is user existing
        const isExistingUser = await UserModel.findOne({ email });
        if (isExistingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        // Check if username already exists
        const isExistingUsername = await UserModel.findOne({ username, isVerified: true });
        if (isExistingUsername) {
            return Response.json({
                success: false,
                message: "Username already exists.",
            }, {
                status: 409,
            });
        }

        // Generate a verification code
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Check if user with the same email is already verified
        const isExistingUserByEmail = await UserModel.findOne({ email, isVerified: true })
        if (isExistingUserByEmail) {
            if (isExistingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User with this email is already verified.",
                });
            }
            // If user exists but is not verified, update the existing user
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1);
            isExistingUserByEmail.password = hashedPassword;
            isExistingUserByEmail.verifyCode = verifyCode;
            isExistingUserByEmail.verifyCodeExpire = expiryDate;
            await isExistingUserByEmail.save();

        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1)

            await UserModel.create({

                email,
                username,
                password: hashedPassword,
                isVerified: false,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                messages: [],
                isAcceptingMessages: true,
            });
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(email, verifyCode, username);
        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                {
                    status: 500,
                }
            );
        }
        return Response.json(
            {
                success: true,
                message: "User registered successfully. Please check your email to verify your account.",
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Error signing up user:", error);
        return Response.json(
            {
                success: false,
                message: "Error signing up user. Please try again later.",
            },
            {
                status: 500,
            }
        );
    }
}