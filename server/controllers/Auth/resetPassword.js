import User from '../../models/User.js'
import generateToken from '../../utils/generateToken.js'
import expressAsyncHandler from 'express-async-handler'
import errorHandler from '../../middleware/error.js'

/**
 * @description Forgot Password function
 * @access      Public
 * @route       PUT /api/auth/resetpassword/:resettoken
 *
 * @desc        This function basically will be used to reset the password of a
 *               user that forgot their password.
 *
 *              The way this works is in conjunction with the forgotPassword
 *              function.
 *
 *              First the forgotPassword function will send an email to the user
 *              with a reset token.
 *
 *              Second, the user will click on the link in the email to reset
 *              their password.
 *
 *              Third, the user will enter a new password and the reset token
 *              will be checked.
 *
 *              Fourth, the user will be updated with the new password.
 */
//
//we need to use the reset token to find the user and update the password

export const resetPassword = expressAsyncHandler(async (req, res) => {
  try {
    const { password } = req.body
    const { resettoken } = req.params
    // console.log(password, resettoken);
    const user = await User.findOne({
      resetPasswordToken: resettoken,
      resetPasswordExpire: { $gt: Date.now() },
    }).populate('subscription')
    if (!user) {
      return res.status(400).json({
        message: `Could not locate user account, please try resetting your password again`,
      })
    }
    user.password = password // then we update the password
    user.resetPasswordToken = undefined // then we remove the reset token
    user.resetPasswordExpire = undefined // then we remove the reset token
    await user.save() // then we save the user
    return res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      sex: user.sex,
      sub: user.subscription,
      isAdmin: user.role === 'admin' ? true : false,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error(error)
    errorHandler(error, req, res)
  }
})

export default resetPassword
