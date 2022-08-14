const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const crypto = require('crypto')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const cloudinary = require('cloudinary')

//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    
  })

  const { name, email, password } = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  })

  sendToken(user, 201, res)
})

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body
  //checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler('Please Enter Email & Password', 400))
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401))
  }

  const isPasswordMatched = await user.comparePassword(password)
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401))
  }
  sendToken(user, 200, res)
})

//Logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })
})

//Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new ErrorHandler('User not found', 404))
  }
  //get reset password token
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

  const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this password Reset link then, please ignore it.`

  try {
    await sendEmail({
      email: user.email,
      subject: `Koolfabs Password Recovery`,
      message,
    })
    res.status(200).json({
      success: true,
      message: `Reset Password Email sent to ${user.email} successfully.`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(error.message, 500))
  }
})

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })
  if (!user) {
    return next(
      new ErrorHandler(
        'Reset Password Token is invalid or has been expired.',
        400,
      ),
    )
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match.', 400))
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()
  sendToken(user, 200, res)
})

//Get user Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })
})

//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old Password is Incorrect', 400))
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400))
  }
  user.password = req.body.newPassword
  await user.save()

  sendToken(user, 200, res)
})
//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id)

    const imageId = user.avatar.public_id

    await cloudinary.v2.uploader.destroy(imageId)
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
    })

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })
})

//get all users --Admin
exports.getAllUser = catchAsyncErrors(async (req, res) => {
  const users = await User.find()
  res.status(200).json({
    success: true,
    users,
  })
})

//get single user --Admin
exports.getSingleUser = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorHandler(`user does not exists with Id:${req.params.id}`),
    )
  }
  res.status(200).json({
    success: true,
    user,
  })
})

//update user Role --Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })
})
//Delete user profile --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorHandler(`user does not exists with Id:${req.params.id}`, 400),
    )
  }
  const imageId = user.avatar.public_id

  await cloudinary.v2.uploader.destroy(imageId)
  await user.remove()

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  })
})
