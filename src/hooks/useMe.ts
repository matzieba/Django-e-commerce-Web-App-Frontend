import React from 'react';
import { useQuery } from "react-query";
import { User } from "../types/user";
import { getUserMe } from "../clients/userClient";

export const useMe = () => {
    const { data: user } = useQuery<User>('userMe', getUserMe, {
    });

    const isSeller = React.useMemo(() => user?.type === "seller", [user]);
    const isClient = React.useMemo(() => user?.type === "client", [user]);

    return {
        user,
        isSeller,
        isClient,
    }
};