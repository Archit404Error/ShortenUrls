import mongoose from "mongoose";

import CustomerModel from "./models";

/**
 * Finds all customer docs in DB
 * @returns promise with all customer docs or error
 */
const getCustomers = async () => CustomerModel.find({});

/**
 * Finds a customer doc by id
 * @param id customer id
 * @returns promise with customer doc or error
 */
const getCustomerById = async (id: mongoose.Types.ObjectId) =>
  CustomerModel.find({ _id: id });

/**
 * Updates the name of a customer in DB
 * @param id customer id
 * @param name new name
 * @returns promise with updated customer doc or error
 */
const updateName = async (id: mongoose.Types.ObjectId, name: string) =>
  CustomerModel.findOneAndUpdate({ _id: id }, { name: name });

/**
 * Resets ages of all customers in DB to 0
 * @returns number of customers whose age was reset
 */
const resetAges = async () => {
  const customers = await getCustomers();
  customers.forEach(async (customer) => {
    customer.age = 0;
    await customer.save();
  });

  return customers.length;
};

export default {
  getCustomers,
  getCustomerById,
  updateName,
  resetAges,
};
