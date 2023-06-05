const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");

const validateDbid = (req, res, next) => {
  if (ObjectId.isValid(req.params.id) == false)
    res.status(400).json({
      error: `Id (${req.params.id}) không hợp lệ`,
    });
  else next();
};

const raiseRecord404Error = (req, res) => {
  res.status(404).json({
    error: "không tìm thấy bản ghi của id: " + req.params.id,
  });
};

const errorHandler = (error, req, res, next) => {
  res.status(500).json({ error });
};

const validateUsername = (req, res, next) => {
  const { username } = req.params;
  // Thực hiện kiểm tra username
  // Ví dụ: Kiểm tra xem username có tồn tại trong cơ sở dữ liệu hay không
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: `Username (${username}) không hợp lệ`,
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Lỗi trong quá trình kiểm tra username",
      });
    });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, userLogin) => {
      if (err) {
       return res.status(403).json("Token đã hết hạn");
      }
      req.userLogin = userLogin;
      next();
    });
  } else {
    res.status(401).json("Chưa Đăng Nhập!");
  }
};

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req,res,()=>{
    if(req.userLogin.id === req.params.id || req.userLogin.role === "Admin"){
      next();
    } else {
      res.status(403).json("Không phải admin!")
    }
  })
};

module.exports = {
  validateDbid,
  validateUsername,
  raiseRecord404Error,
  errorHandler,
  verifyToken,
  verifyTokenAdmin,
};
