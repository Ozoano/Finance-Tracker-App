import FinancialRecordModel from "../schema/Financial-Records";
import { Request, Response } from "express";

// get a user
const getFinanceByUserID = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const records = await FinancialRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).json({ Msg: "No records found for the user." });
    }
    res.status(200).json(records);
  } catch (err) {
    res.status(500).send(err);
  }
};

// get all records
const GetAllFinance = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const records = await FinancialRecordModel.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).send(err);
  }
};

// POST
const CreateFinance = async (req: Request, res: Response) => {
  const newRecordBody = req.body;
  try {
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(200).json(savedRecord);
  } catch (err) {
    res.status(500).send(err);
  }
};

// PUT
const UpdateFinance = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    if (!record) return res.status(404).send();

    res.status(200).json(record);
  } catch (err) {
    res.status(500).send(err);
  }
};

// DELETE
const DeleteFinance = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).json(record);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getFinanceByUserID,
  DeleteFinance,
  UpdateFinance,
  CreateFinance,
  GetAllFinance,
};
