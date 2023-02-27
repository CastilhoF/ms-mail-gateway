import CustomerEntity from "src/domain/entity/customer/customer.entity";
import BaseUseCase from "../base.usecase";

class RegisterUseCase implements BaseUseCase<CustomerEntity> {
  execute(...args: any[]): CustomerEntity | Promise<CustomerEntity> {
    throw new Error("Method not implemented.");
  }
}

export default RegisterUseCase;
