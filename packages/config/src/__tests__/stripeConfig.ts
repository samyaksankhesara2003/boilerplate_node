import { describe, it, expect } from "@jest/globals";
import { stripeConfig } from "../stripe";

describe("jwtConfig", () => {
    it("loads stripe environment variables", () => {
        expect(stripeConfig.stripeLiveMode).toEqual(Number(process.env.STRIPE_LIVE_MODE) || 0);
        expect(stripeConfig.stripeSecretKey).toEqual(process.env.STRIPE_SECRET_KEY || '');
        expect(stripeConfig.stripeWebHookSecret).toEqual(process.env.STRIPE_WEB_HOOK_SECRET || '');
    });
});
