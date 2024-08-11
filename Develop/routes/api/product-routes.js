const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
      include: [{ model: Category }, { model: Tag }],
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {  
  try {
    const product = await Product.destroy({
      where: { id: req.params.id },
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully!' });  
  } catch (err) {
    res.status(500).json(err);
  }
});
