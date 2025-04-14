import { describe, it, expect } from "@jest/globals";
import { constants } from "../constants";

describe("constants", () => {
    it("exports the right object", () => {
        expect(constants).toEqual(
            expect.objectContaining({
                passwordsaltRound: 10,
                adminResetForgetLink: "admin/auth/reset-password",
                adminAccountVerificationLink: "admin/auth/verify-account",
                adminLogin: "admin/auth/signin",
                userLogin: "auth/signin",
                userResetForgetLink: "auth/reset-password",
                userAccountVerificationLink: "auth/verify-account",
                superAdminResetForgetLink: "reset-password",
                deviceType: expect.objectContaining({
                    "MOBILE": 1,
                    "DESKTOP": 2,
                    "TABLET": 3,
                }),
                activityType: expect.objectContaining({
                    "LOGIN": 1,
                    "LOGOUT": 2,
                }),
                defaultFileSize: 10,
                profileFileSize: 10,
                supportedProfileImageTypes: expect.arrayContaining([
                    "image/jpg",
                    "image/jpeg",
                    "image/png",
                ]),
                role: expect.objectContaining({
                    "Admin": 1,
                    "Host": 2,
                    "User": 3,
                }),
                roleNumberToName: expect.objectContaining({
                    1: "Admin",
                    2: "Host",
                    3: "User",
                }),
                status: expect.objectContaining({
                    "Active": 1,
                    "Inactive": 2,
                }),
                statusNumberToName: expect.objectContaining({
                    1: "Active",
                    2: "Inactive",
                }),
                adminStatus: expect.objectContaining({
                    "Active": 1,
                    "Inactive": 2,
                }),
                adminStatusNumberToName: expect.objectContaining({
                    1: "Active",
                    2: "Inactive",
                }),
                userStatus: expect.objectContaining({
                    "Active": 1,
                    "Inactive": 2,
                }),
                userStatusNumberToName: expect.objectContaining({
                    1: "Active",
                    2: "Inactive",
                }),
                emailTemplateName: expect.objectContaining({
                    "Registration": "registration",
                    "Forget Password": "forgetPassword",
                }),
                customNotificationType: expect.objectContaining({
                    "General Notification": 1,
                }),
                notificationColor: expect.objectContaining({
                    "Red": "0xFFB32218",
                    "Yellow": "0xFFB54707",
                    "Green": "0xFF039754",
                    "Black": "0xFF475467",
                    "Blue": "0xFF311B92",
                }),
                notificationColorFontWeight: expect.objectContaining({
                    "Red": 700,
                    "Yellow": 700,
                    "Green": 700,
                    "Black": 400,
                    "Blue": 700,
                }),
                rateLimiter: expect.objectContaining({
                    "LOGIN_RATE_LIMIT": expect.objectContaining({
                        "windowMs": 3600000,
                        "maxLimit": 10,
                        "message": "You have exceeded the your hourly rate limit. Please contact Support.",
                    }),
                }),
            })
        );
    });
});
