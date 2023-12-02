import bcrypt from 'bcrypt';

export const encryptPassword = (user_pass: string) => bcrypt.hash(user_pass, 8);

export const isPasswordMatch = async (reqPassword: string, dbPassword: string) => {
  return bcrypt.compare(reqPassword, dbPassword);
};
