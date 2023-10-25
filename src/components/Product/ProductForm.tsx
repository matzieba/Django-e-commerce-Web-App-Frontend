import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import { getProduct } from "../../clients/productClient";
import { Product } from "../../types/product";
import { useProductCrud } from "../../hooks/useProducts";
import { useParams } from 'react-router-dom';



export const ProductForm: React.FC = () => {

    const [ product, setProduct ] = React.useState<Product | null>(null);
    const { createProduct, updateProduct } = useProductCrud();
    const { productId } = useParams();
    const [ loading, setLoading ] = React.useState(false);


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

    const onSubmit: SubmitHandler<Product> = (data: Product) => {
        if (data.id === 0) {
            createProduct(data);
        } else {
            updateProduct({ productId: data.id, updatedProduct: data });
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
            <button type="submit">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
        </form>
    );
};