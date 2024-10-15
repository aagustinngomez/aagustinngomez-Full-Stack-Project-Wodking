export const getProducts = async (req, res) => {
    try {
        const productId = req.query.id; 
        const tag = req.query.tag; 

        // Mock data to simulate server response
        const products = [
            {
                "id": "5RnwNlpIEG0W4zclyV7q",
                "actualPrice": 80.66,
                "images": ["../img/zapa2.png"],
                "name": "NIKE",
                "sellPrice": 68.66,
                "shortDes": "Comfortable shoes for running",
                "tags": ["shoes"]
            },
            {
                "id": "6PDPqEltbWhHsHxoozMU",
                "actualPrice": 28.11,
                "images": ["../img/mujer.jpg"],
                "name": "REEBOK",
                "sellPrice": 24.12,
                "shortDes": "A comfortable woman tshirt",
                "tags": ["woman", "bestseller"]
            },
            {
                "id": "6sYAtrIKfV96bfuZJeXf",
                "actualPrice": 27.23,
                "images": ["../img/zapa6.png"],
                "name": "REEBOK RED",
                "sellPrice": 20.55,
                "shortDes": "Comfortable shoes for running",
                "tags": ["shoes"]
            },
            {
                "id": "6vqqhjXc1eCqVbyh3skD",
                "actualPrice": 19.22,
                "discount": 15,
                "images": ["../img/nobull.png"],
                "name": "NOBULL RED",
                "sellPrice": 17.55,
                "shortDes": "A comfortable men tshirt",
                "sizes": ["S", "M", "L"],
                "tags": ["Men", "bestseller"]
            },
            {
                "id": "DGNP21i5EjJuPs3qkV6t",
                "actualPrice": 40.66,
                "discount": 15,
                "images": ["../img/nobull.png"],
                "name": "NOBULL",
                "sellPrice": "39.99",
                "shortDes": "A comfortable men tshirt",
                "sizes": ["S", "M", "L"],
                "tags": ["Men", "bestseller"]
            },
            {
                "id": "F276o7AYfvToAGeEHrRX",
                "actualPrice": 30.12,
                "images": ["../img/soga.png"],
                "name": "Jump rope",
                "sellPrice": 25.11,
                "shortDes": "A comfortable accessories",
                "tags": ["accessories", "bestseller"]
            },
            {
                "id": "GGJHYfs7njfB8RnSpvdi",
                "actualPrice": 18.55,
                "discount": 18,
                "images": ["../img/product.jpg"],
                "images": ["../img/product.jpg"],
                "images": ["../img/product.jpg"],
                "images": ["../img/product.jpg"],
                "name": "WODKING",
                "sellPrice": 45.54,
                "shortDes": "A comfortable men tshirt",
                "sizes": ["S", "M", "L"],
                "tags": ["Men"]
            },
            {
                "id": "ICReBQ4pGTcQGMjXkvSX",
                "actualPrice": 25.12,
                "images": ["../img/mujer.jpg"],
                "name": "T shirt",
                "sellPrice": 21.11,
                "shortDes": "A comfortable woman tshirt",
                "tags": ["woman", "bestseller"]
            },
            {
                "id": "KgagpYiyJ04Sz4rKO9Do",
                "name": "NOBULL BLACK",
                "shortDes": "A comfortable men tshirt",
                "des": "Detailed description here",
                "images": ["../img/product.jpg"],
                "sizes": ["S", "M", "L"],
                "actualPrice": 41.24,
                "discount": 25,
                "sellPrice": 10.66,
                "tags": ["Men"]
            },
            {
                "id": "LyrDzxb53ngV92dku58W",
                "actualPrice": 31.36,
                "images": ["../img/mujer.jpg"],
                "name": "NIKE",
                "sellPrice": 29.12,
                "shortDes": "A comfortable woman tshirt",
                "tags": ["woman"]
            },
            {
                "id": "TSjBXgPYvvSCnV54cXmF",
                "actualPrice": 31.22,
                "discount": 14,
                "images": ["../img/zapa2.png"],
                "name": "NIKE",
                "sellPrice": 24.99,
                "shortDes": "A comfortable shoes",
                "tags": ["shoes"]
            },
            {
                "id": "Tx5cM7fae0pFwBf2IsYt",
                "actualPrice": 24.55,
                "discount": 15,
                "images": ["../img/product.jpg"],
                "name": "WODKING RED",
                "sellPrice": 18.51,
                "shortDes": "A comfortable men tshirt",
                "sizes": ["S", "M", "L"],
                "tags": ["Men", "bestseller"]
            },
            {
                "id": "UuW4XeuELdMvDVEf8vjC",
                "actualPrice": 50.61,
                "images": ["../img/zapa5.png"],
                "name": "REEBOK",
                "sellPrice": 24.99,
                "shortDes": "Comfortable shoes for running",
                "tags": ["shoes"]
            },
            {
                "id": "Ys3fhZdvq8HLMHNwZ3CJ",
                "actualPrice": 54.45,
                "images": ["../img/zapa6.png"],
                "name": "REEBOK",
                "sellPrice": 35.54,
                "shortDes": "Comfortable shoes for running",
                "tags": ["shoes"]
            },
            {
                "id": "Zkb9sDqq4ZlAqpCD7wIR",
                "actualPrice": 50.51,
                "images": ["../img/zapa6.png"],
                "name": "REEBOK",
                "sellPrice": 18.55,
                "shortDes": "Comfortable shoes for running",
                "tags": ["shoes", "bestseller"]
            },
            {
                "id": "aF6cO4BNJ4rhuL49OLd9",
                "actualPrice": 14.21,
                "images": ["../img/calleras.jpg"],
                "name": "Grips",
                "sellPrice": 12.12,
                "shortDes": "A comfortable accessories",
                "tags": ["accessories"]
            },
            {
                "id": "gv1qapx4ZNY4G9lywR2g",
                "actualPrice": 14.22,
                "discount": 10,
                "images": ["../img/nobull.png"],
                "name": "NOBULL GRAY",
                "sellPrice": 31.12,
                "shortDes": "A comfortable men tshirt",
                "sizes": ["S", "M", "L"],
                "tags": ["Men"]
            },
            {
                "id": "i73OIlp16zPYG4w8nhVj",
                "actualPrice": 30.55,
                "discount": 20,
                "images": ["../img/product.jpg"],
                "name": "WODKING 1",
                "sellPrice": 25.55,
                "shortDes": "A comfortable men tshirt",
                "sizes": ["S", "M", "L"],
                "tags": ["Men"]
            },
            {
                "id": "n6lFoXlgJgklS0fPKddm",
                "actualPrice": 14.21,
                "images": ["../img/muñequera.jpg"],
                "name": "Wrist wrap",
                "sellPrice": 13.21,
                "shortDes": "A comfortable accessories",
                "tags": ["accessories"]
            },
            {
                "id": "pKBZmRK23tjCzFrFdlQI",
                "actualPrice": 30.66,
                "discount": 14,
                "images": ["../img/product.jpg"],
                "name": "WODKING 2",
                "sellPrice": 26.88,
                "shortDes": "A comfortable men tshirt",
                "sizes": ["S", "M", "L"],
                "tags": ["Men"]
            },
            {
                "id": "qp1d83faf8L7LiiQXMnZ",
                "actualPrice": "31.12",
                "images": ["../img/cinto.jpg"],
                "name": "Weightlifting belt",
                "sellPrice": "21.12",
                "shortDes": "A comfortable accessories",
                "tags": ["accessories"]
            },
            {
                "id": "rz8VnPIU9eUwwH3Gelab",
                "actualPrice": 35.22,
                "images": ["../img/mujer.jpg"],
                "name": "WOMAN REEBOK",
                "sellPrice": 24.55,
                "shortDes": "A comfortable woman tshirt",
                "tags": ["woman"]
            },
            {
                "id": "w1XPndgSepptPEoOnq8n",
                "actualPrice": 24.26,
                "discount": 16,
                "images": ["../img/nobull.png"],
                "name": "NOBULL RED",
                "sellPrice": 21.22,
                "shortDes": "A comfortable men tshirt",
                "sizes": ["S", "M", "L"],
                "tags": ["Men"]
            },
            {
                "id": "wURYhKvanD0mTpvhhEsW",
                "actualPrice": 20.11,
                "images": ["./img/rodillera.jpg"],
                "name": "Knee pad",
                "sellPrice": 18.12,
                "shortDes": "A comfortable accessories",
                "tags": ["accessories"]
            },
            {
                "id": "fjNXAmCX8LQgwteuDkRv",
                "actualPrice": 70.12,
                "images": ["../img/product.jpg"],
                "name": "Casal",
                "sellPrice": 45.21,
                "shortDes": "Comfortable shoes for running",
                "tags": ["bestseller"]
            }
        ];

         // If an ID is provided, search for the product
         if (productId) {
            const product = products.find(p => p.id === productId);

            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            return res.status(200).json(product); 
        }
        
        if (tag) {
            const similarProducts = products.filter(p => p.tags.includes(tag));
            return res.status(200).json(similarProducts);
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al obtener los productos');
    }
};