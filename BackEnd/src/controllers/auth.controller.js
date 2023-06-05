import express from "express";
import User from "../models/user.model";
import { verifyToken } from "../middlewares/app.midlleware";

const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens =[];
const authController = {

  registerUser: async (req,res) =>{
    try{
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password,salt);

      //tạo mới user
      const newUser = await new User({
        name:req.body.name,
        username: req.body.username,
        password:hashed,
        phone:req.body.phone,
        address:req.body.address,
        avatar:req.body.avatar,
        role: "User",
      })

      //lưu vào DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch(err){
      res.status(500).json(err)
    }
  },

  //Tạo ACCESS_TOKEN
  generateAccessToken: (userLogin)=>{
    return jwt.sign(
      {
        id:userLogin.id,
        role:userLogin.role,
      },
      process.env.JWT_ACCESS_KEY,
      {expiresIn:"7d"}
    );
  },

  //Tạo REFRESH_TOKEN
  generateRefreshToken: (userLogin)=>{
    return jwt.sign(
      {
        id:userLogin.id,
        role:userLogin.role,
      },
      process.env.JWT_REFRESH_KEY,
      {expiresIn:"365d"}
    );
  },

  loginUser: async(req,res)=>{
    try{

      const userLogin = await User.findOne({username:req.body.username});
      if(!userLogin){
        return res.status(404).json("Tài khoản sai hoặc không tồn tại!");
      };
      const validPassword = await bcrypt.compare(
        req.body.password,
        userLogin.password
      );
      if(!validPassword){
        return res.status(404).json("Sai mật khẩu!");
      };
      if(userLogin && validPassword){
        const accessToken = authController.generateAccessToken(userLogin);
        const refreshToken = authController.generateRefreshToken(userLogin);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken",refreshToken,{
          httpOnly:true,
          secure:false,
          sameSite:"strict",
        })
        const { password, ...other } = userLogin._doc;              
        return res.status(200).json({...other,accessToken});
      }

    }catch(err){
      return res.status(500).json(err)
    }
    
  },

  requestRefreshToken: async(req,res)=>{
    //Lấy refreshToken
    const refreshToken =req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json("Chưa Đăng nhập!");
    if(!refreshTokens.includes(refreshToken)){
      return res.status(403).json("refreh token không hợp lệ!");
    }
    jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,userLogin)=>{
      if(err){
        console.log(err)
      }
      refreshTokens = refreshTokens.filter((token)=>token!==refreshToken);
      //tạo mới accessToken,refreshToken
      const newAccessToken = authController.generateAccessToken(userLogin);
      const newRefreshToken = authController.generateRefreshToken(userLogin);
      res.cookie("refreshToken",newRefreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
      })
      res.status(200).json({accessToken:newAccessToken});
    })
  },

  logoutUser: async(req,res)=>{
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
    res.status(200).json("Đăng Xuất Thành Công");
  }
}

router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);
router.post('/refresh',authController.requestRefreshToken);
router.post('/logout',verifyToken,authController.logoutUser);

module.exports = router;
