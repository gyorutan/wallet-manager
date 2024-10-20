export type userRegisterInfo = {
  username: string;
  email: string;
  password: string;
};

export type userLoginInfo = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
};
