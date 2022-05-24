export class CreateEnterpriseDto {
  name: string;
  cnpj: string;
  description: string;
  userId: string;
  responsible: {
    name: string;
    telephone: string;
    zipcode: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}
