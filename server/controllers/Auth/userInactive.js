import expressAsyncHandler from 'express-async-handler'
import User from '../../models/User.js'
import errorHandler from '../../middleware/error.js'

/*
  @Desc:   Allows a user to flip themselves Inactive
  @Route:  PUT /api/auth/:id
  @access: Private Auth user's only

  @desc:   This function is used so that a user can flip themselves inactive.
           This is so that if a user wants to leave platform, we dont delete them but instead flip them inactive.

           1: Finds the user by the id
           2: If user is already inactive, return an error
           3: If user is active, flip the user to inactive
           4: Save and Return the user as an JSON object
*/

export const userInactive = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (user.isActive === false) {
      return res.status(400).json({
        success: false,
        message: `You've already switched your account to inactive. Please contact support if you need to reactivate your account.`,
      })
    }
    user.isActive = false
    await user.save()
    res.status(200).json({
      status: 'success',
      data: {
        isActive: user.isActive,
      },
      message: `User ${user.username} has been successfully deactivated. Please contact support if you need to reactivate your account.`,
    })
  } catch (error) {
    console.error(error)
    errorHandler(error, req, res)
  }
})

export default userInactive
