import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import { getProduct } from "../../clients/productClient";
import { Product } from "../../types/product";
import { useProductCrud } from "../../hooks/useProducts";
import { useNavigate, useParams } from 'react-router-dom';
import { useMe } from "../../hooks/useMe";



export const ProductForm: React.FC = () => {

    const [ product, setProduct ] = React.useState<Product | null>(null);
    const { createProduct, updateProduct } = useProductCrud();
    const { productId } = useParams();
    const [ loading, setLoading ] = React.useState(false);
    const { isClient, isSeller } = useMe();
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                return;
            }
            try {
                setLoading(true);
                const productData = await getProduct(productId);
                setProduct(productData);
            } catch (error: any) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
    } = useForm<Product>({
        defaultValues: {
            id: 0,
            name:'',
            description: '',
            price: 0,
            image: undefined,
            thumbnail: undefined,
            category: '',
        },
    });

    React.useEffect(() => {
        if (product !== null) {
            for (const [key, value] of Object.entries(product)) {
                // @ts-ignore
                setValue(key as keyof FormValues, value);
            }
        }
    }, [product, setValue]);

    const onSubmit: SubmitHandler<Product> = async (data: Product) => {
        try {
            if (data.id === 0) {
                await createProduct(data);
            } else {
                await updateProduct({ productId: data.id, updatedProduct: data });
            }
            navigate(`/products/`);
        } catch (error: any) {
            throw new Error(error.response.data.detail);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('id')} type="hidden" />
            <input {...register('name', { required: true })} placeholder="Name" />
            <input {...register('description')} placeholder="Description" />
            <input {...register('price', { required: true })} placeholder="Price" type="number"/>
            <input {...register('category')} placeholder="Category" />
            {isSeller && <button type="submit">{isSubmitting ? 'Submitting...' : 'Submit'}</button>}
            {isClient && <button type="submit">{isSubmitting ? 'Submitting...' : 'Add to Cart'}</button>}
        </form>
    );
};