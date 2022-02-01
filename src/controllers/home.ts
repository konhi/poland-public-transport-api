import { Request, Response } from "express";

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
    res.redirect("https://github.com/konhi/poland-public-transport-api");
};
