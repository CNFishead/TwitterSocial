import expressAsyncHandler from 'express-async-handler'
import errorHandler from '../../middleware/error.js'
import User from '../../models/User.js'

/**
 * @description
 * @access      Public
 * @route      POST /api/auth/logout
 * @COMMENTS Going to comment this function out for now, we don't need a logout function for server side, this will be handled
 * by the client side.
 */

export const logout = expressAsyncHandler(async (req, res) => {
  try {
    //find the logged in user
    const user = await User.findById(req.user.id)
    //destroy the user's token
    const token = (user.token = undefined)
    console.log('token', token)
    //save the user
    await user.save()
    //return the user
    return user
  } catch (error) {
    console.error(error)
    errorHandler(error, req, res)
  }
})

export default logout
