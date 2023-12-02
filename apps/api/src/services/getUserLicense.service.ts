import envConfig from "../configs/config";

type T_UserLicense = {
  og_id: number,
  subscription_end_date: string,
  subscription_status: string
};

export const getUserLicense = (
  userCheckType: 'email' | 'mobile_number', 
  userCheckValue: string | number
): Promise<T_UserLicense> => fetch(`${envConfig.SUBSMANAGER_URL}/userLicense?userCheckType=${userCheckType}&userCheckValue=${userCheckValue}&project_id=${envConfig.SUBSMANAGER_PROJECT_ID}`).then(res => res.json());