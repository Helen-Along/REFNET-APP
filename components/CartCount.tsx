import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { P } from "./ui/typography";
import { countTotalProductsInCart } from '~/lib/supabase';
import { useEmail } from '~/app/EmailContext';

export default function CartCount() {
    const { email } = useEmail()!;
    const [productCount, setProductCount] = useState<number | string>(0);

    useEffect(() => {
        async function fetchProductCount() {
            const count = await countTotalProductsInCart(email);
            setProductCount(count);
        }
        fetchProductCount();
    }, [email]);

    return (
        <View className='w-6 relative'>
            <Icon name="shopping-bag" size={20} color="white" />
            <P className='absolute top-0 right-0 bg-red-900 px-2 rounded-full text-["2px"]'>
                {productCount}
            </P>
        </View>
    );
}