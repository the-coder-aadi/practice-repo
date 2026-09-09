import jwt from "jsonwebtoken";

const Refreshmiddleware = (req, res, next) => {
    try {
        const refreshToken = req.cookies["Refresh_Token"];

        if (!refreshToken) {
            return res.json({
                success:false,
                msg: "Refresh token not found",
            });
        }

        const verify = jwt.verify(
            refreshToken,
            process.env.REFRESH_KEY
        );

        req.user = verify;
        next();

    } catch (error) {
        return res.json({
            success:false,
            msg: "Invalid or expired refresh token",
        });
    }
};

export default Refreshmiddleware;