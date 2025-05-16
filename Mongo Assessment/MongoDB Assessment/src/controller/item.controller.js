import asyncHandler from '../utils/asyncHandler.js';
import Item from '../models/itemSchema.model.js';
import Transaction from '../models/TransactionSchema.model.js';

const itemPost = asyncHandler(async (req, res) => {
  try {
    const { date, store, items } = req.body;

    if (!date || !store || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or items is empty.' });
    }

    const itemIds = [];

    for (const item of items) {
      if (!item.name || typeof item.quantity !== 'number' || typeof item.price !== 'number') {
        return res.status(400).json({ message: 'Each item must have a name, quantity, and price.' });
      }

      const newItem = new Item(item);
      const savedItem = await newItem.save();
      itemIds.push(savedItem._id);
    }

    const newSale = new Transaction({ date, store, items: itemIds });
    const savedSale = await newSale.save();

    res.status(201).json(savedSale);
  } catch (err) {
    console.error('Error creating sale:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const getRevenueByStoreAndMonth = asyncHandler(async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $lookup: {
          from: "items",
          localField: "items",
          foreignField: "_id",
          as: "itemDetails",
        },
      },

      { $unwind: "$itemDetails" },

      {
        $addFields: {
          itemRevenue: {
            $multiply: ["$itemDetails.quantity", "$itemDetails.price"],
          },
        },
      },

      {
        $group: {
          _id: {
            store: "$store",
            month: { $dateToString: { format: "%Y-%m", date: "$date" } },
          },
          totalRevenue: { $sum: "$itemRevenue" },
          totalItems: { $sum: 1 },
          totalPriceSum: { $sum: "$itemDetails.price" },
        },
      },

      {
        $addFields: {
          averagePrice: {
            $cond: {
              if: { $eq: ["$totalItems", 0] },
              then: 0,
              else: { $divide: ["$totalPriceSum", "$totalItems"] },
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          store: "$_id.store",
          month: "$_id.month",
          totalRevenue: { $round: ["$totalRevenue", 0] },
          averagePrice: { $round: ["$averagePrice", 2] },
        },
      },

      {
        $sort: { store: 1, month: 1 },
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error running aggregation:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


export { itemPost, getRevenueByStoreAndMonth };