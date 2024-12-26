import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

// interfaces

export interface FinancialRecord {
  // fin record ID from db
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}
interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void; //partial cos we might not update all the fin record details
  deleteRecord: (id: string) => void;
}

// context
export const FinancialRecordContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

// provider
export const FinancialRecordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  // Get user record from db
  useEffect(() => {
    const fetchRecords = async () => {
      if (!user) return;
      const response = await fetch(
        "http://localhost:5000/api/financial/" + user.id
      );

      const json = await response.json();
      if (response.ok) {
        console.log(json);
        setRecords(json);
      }
    };

    fetchRecords();
  }, [user]);

  // add financil record
  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch("http://localhost:5000/api/financial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    try {
      const newRecord = await response.json();
      if (response.ok) {
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (error) {}
  };

  // update a record
  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    const response = await fetch(`http://localhost:5000/api/financial${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecord),
    });
    try {
      const newrecord = await response.json();
      if (response.ok) {
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newrecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (error) {}
  };

  // update a record
  const deleteRecord = async (id: string) => {
    const response = await fetch(`http://localhost:5000/api/financial${id}`, {
      method: "DELETE",
    });
    try {
      if (response.ok) {
        const deleterecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deleterecord._id)
        );
      }
    } catch (error) {}
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

// use context

export const useFinancialRecord = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordContext
  );

  if (!context) {
    throw Error(
      "useFinancialRecord must be used inside an FinancialRecordContextProvider"
    );
  }
  return context;
};
