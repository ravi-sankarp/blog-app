import { randomUUID } from "node:crypto";
import { userRegisterType } from "./../types/zodTypes";
import { UserDetails } from "./../types/types";
import { pool } from "./../db/connection";

export default {
  //find the details of a user by id
  async findUserById(id: string) {
    const [result] = await pool.query<[UserDetails]>(
      "select BIN_TO_UUID(id) as id,firstName,lastName,email,phoneNumber,createdOn from users where id=UUID_TO_BIN(?);",
      [id]
    );

    return result[0];
  },

  //find the details of a user by email
  async findUserByEmail(email: string) {
    const [result] = await pool.query<[UserDetails & { password: string }]>(
      "select BIN_TO_UUID(id) as id,firstName,lastName,email,phoneNumber,createdOn,password from users where email=?;",
      [email]
    );

    return result[0];
  },

  //find the details of a user by phone number
  async findUserByPhoneNumber(phoneNumber: string) {
    const [result] = await pool.query<[UserDetails]>(
      "select BIN_TO_UUID(id) as id,firstName,lastName,email,phoneNumber,createdOn from users where phoneNumber=?;",
      [phoneNumber]
    );

    return result[0];
  },

  //find the details of a user by username
  async findUserByUserName(userName: string) {
    const [result] = await pool.query<[UserDetails]>(
      "select BIN_TO_UUID(id) as id,firstName,lastName,email,phoneNumber,createdOn from users where userName=?;",
      [userName]
    );

    return result[0];
  },

  // create a new user
  async createNewUser(data: userRegisterType) {
    const id = randomUUID();
    await pool.query(
      `insert into users(id,userName,firstName,lastName,email,phoneNumber,password)
      values(UUID_TO_BIN(?),? , ? , ? ,? ,? , ? );`,
      [
        id,
        data.userName,
        data.firstName,
        data.lastName,
        data.email,
        data.phoneNumber,
        data.password,
      ]
    );
    return {
      id,
    };
  },

  // update user details
  async updateUserById(id: string, data: userRegisterType) {
    await pool.query(
      `update user
      set userName=?,
      set firstName=?,
      set lastName=?,
      set email=?,
      set phoneNumber=?,
      where id=?`,
      [
        data.userName,
        data.firstName,
        data.lastName,
        data.email,
        data.phoneNumber,
        id,
      ]
    );
  },

  // update user password
  async updateUserPasswordById(id: string, password: string) {
    await pool.query(
      `update user
      set password=? passwordChangedOn=NOW(),
      where id=?`,
      [password, id]
    );
  },

  //delete user
  async deleteUserById(id: string) {
    await pool.query("delete from users where id=?", [id]);
  },
};
