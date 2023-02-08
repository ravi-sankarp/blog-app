import * as brcypt from "bcryptjs";
export default {
  async hashPassword(pwd: string) {
    const salt = await brcypt.genSalt();
    const hashedPwd = await brcypt.hash(pwd, salt);
    return hashedPwd;
  },
  async comparePassword(pwd: string, hashedPwd: string) {
    const result = brcypt.compare(pwd, hashedPwd);
    return result;
  },
};
