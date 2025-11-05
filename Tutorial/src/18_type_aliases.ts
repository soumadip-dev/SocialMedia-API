type Person = {
  id: string;
  address: string;
  salary: number;
};

const person1: Person = {
  id: '1',
  address: 'Dhaka',
  salary: 1000,
};

type Status = 'loading' | 'success' | 'error';
function getNextActionMessage(status: Status): string {
  switch (status) {
    case 'loading':
      return 'Please wait, loading in progress.';
    case 'success':
      return 'Loaded successfully.';
    case 'error':
      return 'An error occurred while loading.';
  }
}

type ToMerge1 = { price: number };
type ToMerge2 = { quantity: number };
type Merged = Person & ToMerge1 & ToMerge2;
