import axiosInstance from "./AxiosInstance";

class AccountServices {
  /**
   * Register a new account.
   *
   * @param fullName full name of the user
   * @param email email of the user
   * @param password password of the user
   * @returns response from the server
   */
  public static async register(
    fullName: string,
    email: string,
    password: string
  ) {
    return axiosInstance.post("/auth/register", {
      fullName,
      email,
      password,
    });
  }

  /**
   * Login to the system.
   *
   * @param email email to login
   * @param password password to login
   * @returns
   */
  public static async login(email: string, password: string) {
    return axiosInstance.post("/auth/login", {
      email,
      password,
    });
  }

  public static async getAccountInfo() {
    return axiosInstance.get("/accounts");
  }

  public static async updateAccount(
    fullName: string,
    provinceId: number,
    gender: number
  ) {
    return axiosInstance.put("/accounts", {
      fullName,
      provinceId,
      gender,
    });
  }
}

export default AccountServices;
