import { UserDetails } from "./../../types/types";
import { UserInputError } from "apollo-server";
import {
  userLoginSchema,
  userLoginType,
  userRegisterSchema,
  userRegisterType,
} from "./../../types/zodTypes";
import userService from "../../services/userService";
import jwtHelper from "../../utils/jwtHelper";
import passwordHelper from "../../utils/passwordHelper";
export const userResolver = {
  Mutation: {
    register: async (parent: undefined, args: { data: userRegisterType }) => {
      //validating user input using zod
      const result = await userRegisterSchema.safeParseAsync(args.data);

      if (!result.success) {
        //throwing apollo user input error if any errors exist
        throw new UserInputError(
          JSON.stringify(result.error.errors.map((err) => err.message))
        );
      }

      let userDetails: UserDetails | undefined;

      //checking if email already exists
      userDetails = await userService.findUserByEmail(result.data.email);

      // throwing an error if email was found
      if (userDetails) {
        throw new UserInputError("Email address already exists");
      }

      //checking if phone number already exists
      userDetails = await userService.findUserByPhoneNumber(result.data.phoneNumber);

      // throwing an error if phone number was found
      if (userDetails) {
        throw new UserInputError("Phone number already exists");
      }

      //checking if username already exists
      userDetails = await userService.findUserByUserName(result.data.userName);

      // throwing an error if userName was found
      if (userDetails) {
        throw new UserInputError("User Name already exists");
      }

      result.data.password = await passwordHelper.hashPassword(
        result.data.password
      );
      //saving the user details to the database
      const { id } = await userService.createNewUser(result.data);

      // generating jwt token with the saved id
      const token = await jwtHelper.generateJwtToken(id);

      return { token };
    },
  },
  Query: {
    login: async (parent: undefined, args: { data: userLoginType }) => {
      //validating user input using zod
      const data = await userLoginSchema.safeParseAsync(args.data);

      //throwing apollo user input error if any errors exist
      if (!data.success) {
        throw new UserInputError(
          JSON.stringify(data.error.errors.map((err) => err.message))
        );
      }

      const { email, password } = data.data;
      // fetching user details from db with the entered email
      const userDetails = await userService.findUserByEmail(email);

      // throwing error if user was not found
      if (!userDetails) {
        throw new UserInputError("Invalid credentials");
      }

      // checking if password is correct
      const isPasswordCorrect = await passwordHelper.comparePassword(
        password,
        userDetails.password
      );

      // throwing error if password is incorrect
      if (!isPasswordCorrect) {
        throw new UserInputError("Invalid credentials");
      }

      // generating jwt token with the user id
      const token = await jwtHelper.generateJwtToken(userDetails.id);

      return { token };
    },
  },
};
