import React, { useState } from "react";
import { IProduct } from "../models";
import axios from "axios";
import { ErrorMessage } from "./errorMessage";

const productData: IProduct = {
    title: '',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 42,
        count: 10
    }
};

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductProps) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const submitHandler = async (event: React.FormEvent) => {
        setError('');
        event.preventDefault();

        if (!value.trim().length) {
            setError('Please enter valid title');

            return;
        }

        productData.title = value;

        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData);

        onCreate(response.data);
    }
    const changeHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value);
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                className="border py-2 px-4 mb-2 w-full outline-0"
                placeholder="Enter product title..."
                value={value}
                onChange={changeHandler}
            />
            { error && <ErrorMessage error={error}/> }
            <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-red-500">Create</button>
        </form>
    );
}