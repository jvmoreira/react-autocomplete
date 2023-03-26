import { AutocompleteOption } from './autocomplete-fetcher';
import { buildStringHighlight } from '../string-highlight';

export async function staticCarMakerAutocompleteFetcher(carName: string): Promise<AutocompleteOption[]> {
  const fetchResult = await fetchCarMakerData();

  const filteredCarMakers = fetchResult.filter(carMaker => carMaker.name.toLowerCase().includes(carName.toLowerCase()));

  return filteredCarMakers.map(carMaker => ({
    key: carMaker.code,
    value: carMaker.name,
    highlightedValue: buildStringHighlight(carName, carMaker.name),
    description: carMaker.name,
    highlightedDescription: buildStringHighlight(carName, carMaker.name),
  }));
}

function fetchCarMakerData(): Promise<CarMaker[]> {
  return Promise.resolve(carMakerData);
}

interface CarMaker {
  code: string;
  name: string;
}

const carMakerData: CarMaker[] = [
  { code: '1', name: 'Acura' },
  { code: '189', name: 'ASTON MARTIN' },
  { code: '6', name: 'Audi' },
  { code: '7', name: 'BMW' },
  { code: '13', name: 'Citroën' },
  { code: '17', name: 'Dodge' },
  { code: '20', name: 'Ferrari' },
  { code: '21', name: 'Fiat' },
  { code: '22', name: 'Ford' },
  { code: '23', name: 'GM - Chevrolet' },
  { code: '25', name: 'Honda' },
  { code: '26', name: 'Hyundai' },
  { code: '28', name: 'Jaguar' },
  { code: '29', name: 'Jeep' },
  { code: '31', name: 'Kia Motors' },
  { code: '171', name: 'LAMBORGHINI' },
  { code: '33', name: 'Land Rover' },
  { code: '36', name: 'Maserati' },
  { code: '38', name: 'Mazda' },
  { code: '211', name: 'Mclaren' },
  { code: '39', name: 'Mercedes-Benz' },
  { code: '41', name: 'Mitsubishi' },
  { code: '43', name: 'Nissan' },
  { code: '44', name: 'Peugeot' },
  { code: '47', name: 'Porsche' },
  { code: '48', name: 'Renault' },
  { code: '195', name: 'Rolls-Royce' },
  { code: '49', name: 'Rover' },
  { code: '54', name: 'Subaru' },
  { code: '56', name: 'Toyota' },
  { code: '58', name: 'Volvo' },
  { code: '59', name: 'VW - VolksWagen' },
];
