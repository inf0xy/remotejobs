import { Schema, model, Types } from 'mongoose';

interface Company {
  name: string;
  location: string;
  logo: string;
  job: [Types.ObjectId]
};

const CompanySchema = new Schema<Company>({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false,
    allowNull: true
  },
  logo: {
    type: String,
    required: true
  },
  job: [{
    type: Schema.Types.ObjectId,
    ref: 'company'
  }]
});

const createCompany = async (company: { name: string; location: string; logo: string; job: []}) => {
  try {
    return await Company.create(company);
  } catch (err: any) {
    console.error(err);
    return err.message;
  }
};


const Company = model<Company>('company', CompanySchema);

export default { Company, createCompany };