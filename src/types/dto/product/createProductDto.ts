import { HydrogenType, ProductionEnergySource, ProductionMethod } from '../../enums/product';
import { TransportType } from '../../enums/transportType';

export interface CreateProductDto {

   energySource: ProductionEnergySource;

  type: HydrogenType;

  productionMethod: ProductionMethod;

  transportType: TransportType;

  amountProduced: number;

  amountAvailable: number;

  countryOfProduction: string;

  cityOfProduction: string;

  producedOn: Date;

  storedFrom: Date;

  storedTo: Date;

  perUnitPrice: number;
}
