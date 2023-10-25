import { useQuery } from "react-query";
import { User } from "../types/user";
import { getUserMe } from "../clients/userClient";

export const useMe = () => {
    const { data: user } = useQuery<User>('userMe', getUserMe, {
    });
    return user
};