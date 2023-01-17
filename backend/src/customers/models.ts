import { getModelForClass, prop } from "@typegoose/typegoose";

class Job {
  @prop()
  public title!: string;

  @prop()
  public company!: string;
}

class Customer {
  @prop()
  public name!: string;

  @prop()
  public age!: number;

  // nesting a sub-document
  @prop()
  public job!: Job;
}

const CustomerModel = getModelForClass(Customer);
export default CustomerModel;
