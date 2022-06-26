import User from '../../models/User.js'
import crypto from 'crypto'
import sendEmail from '../../utils/sendEmail.js'
import expressAsyncHandler from 'express-async-handler'
import errorHandler from '../../middleware/error.js'

/**
 * @description Forgot Password
 * @access      Public Auth user only
 * @route      POST /api/auth/forgotpassword
 */

/**
 * @COMMENTS
 * 1: Function will be used to handle the forgot password process for the user
 *
 * 2: The body asks for the User's username, once that is passed in.
 * The function will then find the user in the database and send them an email
 * using the sendEmail function that's passed in.
 *
 * 3: We then generate a random token and save it to the user's resetPasswordToken so that we can validate the user's email.
 *
 * 4: Then they use the resetPasswordToken to reset their password.
 */
//

export const forgotPassword = expressAsyncHandler(async (req, res) => {
  try {
    //find the user by email
    const user = await User.findOne({ username: req.body.username }).populate(
      'subscription'
    )
    //if user not found return 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    //generate a token
    const resetToken = crypto.randomBytes(20).toString('hex')
    //set the resetPasswordToken and resetPasswordExpires
    user.resetPasswordToken = resetToken
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000

    //save the user
    await user.save()
    //send the email
    await sendEmail({
      email: user.email,
      subject: 'Password Reset',
      message: `
      <h3 style="color: #2e617c; padding: 2%;">Password Reset</h3>
      <p>You or someone with your username has requested a password reset</p>
      <p>Click this <a href="${req.protocol}s://${req.get(
        'host'
      )}/auth/resetpassword/${resetToken}">link</a> to set a new password</p>
      <p>If you do not wish to reset your password, please ignore this email.</p>
    `,
    })
    //if successful return 200 and the user object in json format
    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error(error)
    errorHandler(error, req, res)
  }
})

export default forgotPassword
