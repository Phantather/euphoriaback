import ProductsModel from "../../models/products.js";


export const createProduct = async (req, res) => {
    try {

        const {title, description, price, images, sizes, colors} = req.body

        const doc = new ProductsModel({
            title,
            description,
            price,
            images,
            sizes,
            colors
        })

        const product = await doc.save()

        res.status(201).json({
            message: 'Товар успешно создан',
            product: product
        });

        res.json({product})

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось создать товар'
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const { sizes, colors } = req.query;

        const filter = {};

        if (sizes) {
            filter.sizes = { $in: sizes.split(",") };
        }

        if (colors) {
            filter.colors = { $in: colors.split(",") };
        }

        const products = await ProductsModel.find(filter);

        if (!products || products.length === 0) {
            return res.status(404).json({
                message: 'Товары не найдены'
            });
        }

        res.status(200).json({
            message: 'Товары успешно найдены',
            products: products
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось получить товары'
        });
    }
}