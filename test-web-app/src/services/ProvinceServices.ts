import axiosInstance from "./AxiosInstance";

class ProvinceServices {
  public static async getProvinces() {
    return axiosInstance.get("http://localhost:8080/api/provinces");
  }
}

export default ProvinceServices;
